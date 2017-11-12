import { Component, OnInit } from '@angular/core';
import { NavController, ModalController, NavParams, Events } from 'ionic-angular';
import { Observable } from 'rxjs';

import { User } from '../../classes/api/user';
import { Challenge } from '../../classes/api/challenge';
import { Document } from '../../classes/database/database';
import { TimeSince } from '../../classes/timesince/timesince';
import { Audio } from '../../classes/audio/audio';

import { RenditionPage } from '../rendition/rendition';

@Component({
      selector: 'page-challengeboard',
      templateUrl: 'challengeboard.html',
})
export class ChallengeboardPage implements OnInit {

      public user:User;
      public challenge:Challenge;
      public alphaDate:string;
      public submissions:Observable<any>;

      private rendition:any;

      constructor(public navCtrl: NavController, public modalCtrl:ModalController, public navParams: NavParams, private events:Events, private document:Document, private timeSince:TimeSince, private audio:Audio) {
            events.subscribe('rendition:close', () => {
                  if (this.rendition) {
                        this.rendition.dismiss();
                  }
            });
      }

      public ngOnInit():void {
            this.user = this.navParams.get('user');
            this.challenge = this.navParams.get('challenge');
            this.alphaDate = this.navParams.get('alphaDate');
            this.loadSubmissions().then((submissions) => {
                  this.submissions = submissions;
            });
      }

      public close():void {
            this.events.publish('challengeboard:close');
      }

      public timeOf(date:number):string {
            return this.timeSince.timeOf(date);
      }

      public playAudio(id:string, path:string):void {
            this.audio.play(id, path, 6);
      }

      public newRendition():void {
            if (this.challenge) {
                  this.rendition = this.modalCtrl.create(RenditionPage, {
                        challenge: this.challenge
                  });
                  this.rendition.present();
            }
      }

      public logOut():void {
            
      }

      private ionViewDidEnter():void {
            console.log(this.user.getProfilePicture());
      }

      private loadSubmissions():Promise<any> {
            return new Promise((resolve, reject) => {
                  let submissions = this.challenge.getSubmissions();
                  if (submissions && submissions.length > 0) {
                        Observable.zip(...submissions.map((submission) => {
                              return this.document.readObservable(`users/${submission.id}`)
                        })).take(1).subscribe((users) => {
                              submissions = submissions.map((sub, i) => {
                                    sub["user"] = users[i];
                                    return sub;
                              }).sort((subA, subB) => {
                                    return subA.score > subB.score;
                              });
                              resolve(submissions);
                        });
                  }
            });
      }

}
