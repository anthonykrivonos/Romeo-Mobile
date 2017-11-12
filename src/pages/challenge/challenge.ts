import { Component, OnInit, Input } from '@angular/core';
import { Events, NavController } from 'ionic-angular';

import { TimeSince } from '../../classes/timesince/timesince';
import { Audio } from '../../classes/audio/audio';
import { List } from '../../classes/database/database';
import { Alert, Toast } from '../../classes/notify/notify';

import { User } from '../../classes/api/user';

import { HttpClient } from '@angular/common/http';

@Component({
      selector: 'page-challenge',
      templateUrl: 'challenge.html'
})
export class ChallengePage implements OnInit {
      public user:User;

      public API_URL:string = "";

      public name:string;
      public title:string;
      public date:string;
      public transcript:string;
      public thumbnailUrl:string;
      public videoUrl:string;
      public audioUrl:string;
      public score:string;

      public scores:any;

      public transcriptReceived:boolean = false;

      constructor(public navCtrl: NavController, private timeSince:TimeSince, private audio:Audio, private events:Events, private http:HttpClient, private list:List, private alert:Alert, private toast:Toast) {
            events.subscribe(`form:video`, (video) => {
                  this.title = video.title;
                  this.thumbnailUrl = video.thumbnailUrl;
            });
            events.subscribe(`user:login`, (user) => {
                  this.user = user;
            });
      }

      public ngOnInit():void {
            this.getDate();
      }

      private getDate():void {
            this.date = this.timeSince.timeOf() || "now";
      }

      private reset():void {
            this.name = null;
            this.title = null;
            this.date = null;
            this.transcript = null;
            this.thumbnailUrl = null;
            this.videoUrl = null;
            this.audioUrl = null;
            this.score = null;
            this.scores = null;
            this.transcriptReceived = false;
      }

      public analyze():void {
            this.http.post(this.API_URL, {
                  video_url: this.videoUrl
            }).map((res) => {
                  this.transcript = res['transcript'];
                  this.score = res['score'];
                  this.audioUrl = res['audio_url'];
            });
            this.transcriptReceived = true;
      }

      public playAudio():void {
            this.audio.play(this.videoUrl, this.audioUrl, 8);
      }

      public submit():void {
            this.alert.showAlert('Submit Challenge?', 'Your challenge will appear on public leaderboards.', () => {
                  this.list.push(`challenges`, {
                        name: this.name,
                        creator_id: this.user.getId(),
                        audio_url: this.audioUrl,
                        transcript: this.transcript,
                        thumbnail_url: this.thumbnailUrl,
                        submissions: [],
                        date_created: Date.now()
                  }, true).then(() => {
                        this.reset();
                  }).catch(() => {
                        this.toast.showToast('Could not submit challenge.');
                  });
            });
      }

      public logOut():void {
            this.events.publish('logout');
      }

}
