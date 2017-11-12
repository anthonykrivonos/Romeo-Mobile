import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController, Events } from 'ionic-angular';

import { File } from '@ionic-native/file';

import { Storage } from '../../classes/storage/storage';
import { User } from '../../classes/api/user';
import { Email } from '../../classes/send/email';
import { Audio } from '../../classes/audio/audio';
import { List, Document } from '../../classes/database/database'

@Component({
      selector: 'page-myrenditions',
      templateUrl: 'myrenditions.html'
})
export class MyRenditionsPage {

      private user:User;
      public challenges:any;

      constructor(public storage:Storage, public navCtrl: NavController, private events:Events, private list:List, private document:Document) {
            events.subscribe(`user:login`, (user) => {
                  this.user = user;
                  this.getChallenges(this.user.getId());
            });
      }

      private getChallenges(id:number):void {
            console.log(`Calling get challenges`);
            if (this.user) {
                  this.document.read(`users/${id}/challenges`).then((list) => {
                        if (!list || list.length == 0) list = [];
                        Observable.zip(...list.map((challenge) => {
                              return this.document.readObservable(`challenges/${challenge}`)
                        })).subscribe((challenges) => {
                              this.challenges = challenges || [];
                              console.log(`Challenges:\n` + JSON.stringify(challenges));
                        });
                  }).catch();
            }
      }

      public logOut():void {
            this.events.publish('logout');
      }

}
