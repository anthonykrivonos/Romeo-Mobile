import { Component } from '@angular/core';
import { Events, NavController, NavParams } from 'ionic-angular';
import {
      Injectable,
      OnInit,
      ElementRef,
      Renderer,
      EventEmitter,
      Inject
} from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { transformY } from '../../animations/transformY';

export var YOUTUBE_API_KEY: string = 'AIzaSyDOfT_BO81aEZScosfTYMruJobmpjqNeEk';
export var YOUTUBE_API_URL: string = 'https://www.googleapis.com/youtube/v3/search';

export class SearchResult {
      id: string;
      title: string;
      description: string;
      thumbnailUrl: string;
      videoUrl: string;
      constructor(obj?: any) {
            this.id              = obj && obj.id             || null;
            this.title           = obj && obj.title          || null;
            this.description     = obj && obj.description    || null;
            this.thumbnailUrl    = obj && obj.thumbnailUrl   || null;
            this.videoUrl        = obj && obj.videoUrl       ||
            `https://www.youtube.com/watch?v=${this.id}`;
      }
}

@Injectable()
export class YouTubeService {
      constructor(public http: HttpClient, @Inject(YOUTUBE_API_KEY) private apiKey: string, @Inject(YOUTUBE_API_URL) private apiUrl: string) {}
      search(query: string): Observable<SearchResult[]> {
            let params: string = [
                  `q=${query}`,
                  `key=${this.apiKey}`,
                  `part=snippet`,
                  `type=video`,
                  `maxResults=30`
            ].join('&');
            let queryUrl: string = `${this.apiUrl}?${params}`;
            console.log(`Getting from: ${queryUrl}`);
            return this.http.get(queryUrl).map((res) => {
                  return res['items'].map(item => {
                        return new SearchResult({
                              id: item.id.videoId,
                              title: item.snippet.title,
                              description: item.snippet.description,
                              thumbnailUrl: item.snippet.thumbnails.high.url
                        });
                  });
            });
      }
}

export var youTubeServiceInjectables: Array<any> = [
      {provide: YouTubeService, useClass: YouTubeService},
      {provide: YOUTUBE_API_KEY, useValue: YOUTUBE_API_KEY},
      {provide: YOUTUBE_API_URL, useValue: YOUTUBE_API_URL}
];

@Component({
      outputs: ['loading', 'results'],
      selector: 'search-box',
      template: `
            <ion-searchbar type="text" class="form-control" placeholder="Search for YouTube Rendition..." autofocus></ion-searchbar>
      `
})
export class SearchBox implements OnInit {

      loading: EventEmitter<boolean> = new EventEmitter<boolean>();
      results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

      constructor(public youtube: YouTubeService, private el: ElementRef) {}

      ngOnInit(): void {
            Observable.fromEvent(this.el.nativeElement, 'keyup')
            .map((e: any) => e.target.value)
            .filter((text: string) => text.length > 1)
            .debounceTime(250)
            .do(() => this.loading.next(true))
            .map((query: string) => this.youtube.search(query))
            .switch()
            .subscribe(
                  (results: SearchResult[]) => {
                        this.loading.next(false);
                        this.results.next(results);
                  },
                  (err: any) => {
                        console.error(JSON.stringify(err));
                        this.loading.next(false);
                  },
                  () => {
                        this.loading.next(false);
                  }
            );
      }
}

@Component({
      inputs: ['result'],
      selector: 'search-result',
      template: `
            <ion-item class="video" (tap)="formVideo()">
                  <ion-thumbnail item-end>
                        <img src="{{result.thumbnailUrl}}">
                  </ion-thumbnail>
                  <h2>{{result.title}}</h2>
                  <p>{{result.description}}</p>
            </ion-item>
      `
})
export class SearchResultComponent {
      result: SearchResult;

      constructor(private events:Events, private el: ElementRef, private renderer: Renderer) {}

      formVideo():void {
            this.events.publish(`form:video`, this.result);
            [].forEach.call(document.getElementsByClassName('video'), (vid) => {
                  vid.style.backgroundColor = 'white';
            });
            this.el.nativeElement.getElementsByClassName('video')[0].style.backgroundColor = '#ededed';
      }
}

@Component({
      selector: 'youtube-search',
      templateUrl: 'youtube.html',
      animations: [transformY('searchbarToggle', 1000, '0vh', '40vh')]
})
export class YoutubeComponent {
      constructor(public navCtrl: NavController, public navParams: NavParams) {}
      ionViewDidLoad() {
            console.log('ionViewDidLoad YoutubeComponent');
      }
      results: SearchResult[];
      updateResults(results: SearchResult[]): void {
            this.results = results;
      }
}
