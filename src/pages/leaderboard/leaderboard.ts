import { Component, Input } from '@angular/core';
import { NavController, Events } from 'ionic-angular';
import { Observable } from 'rxjs';

import { User } from '../../classes/api/user';
import { List } from '../../classes/database/database';

@Component({
      selector: 'page-leaderboard',
      templateUrl: 'leaderboard.html'
})
export class LeaderboardPage {
      public user:User;
      public challenges:Observable<any>;

      constructor(public navCtrl: NavController, private events:Events, private list:List) {
            events.subscribe(`user:login`, (user) => {
                  this.user = user;
            });
            this.challenges = this.list.readObservable(`challenges`);
      }

      public ionViewDidEnter():void {
            this.challenges.take(1).subscribe((challenges) => {
                  console.log(challenges);
            })
      }

      public logOut():void {
            this.events.publish('logout');
      }
}
