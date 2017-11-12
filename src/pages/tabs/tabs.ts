import { Component } from '@angular/core';
import { Events, ModalController } from 'ionic-angular';

import { MyRenditionsPage } from '../myrenditions/myrenditions';
import { ChallengePage } from '../challenge/challenge';
import { LeaderboardPage } from '../leaderboard/leaderboard';
import { LoginPage } from '../login/login';

import { User } from '../../classes/api/user';
import { Facebook } from '../../classes/login/facebook';
import { Auth } from '../../classes/login/auth';
import { Storage } from '../../classes/storage/storage';
import { Toast } from '../../classes/notify/toast';

@Component({
      templateUrl: 'tabs.html'
})
export class TabsPage {

      public leaderboard = LeaderboardPage;
      public myRenditions = MyRenditionsPage;
      public challenge = ChallengePage;

      public user:User;

      constructor(public events:Events, private modalCtrl: ModalController, private auth:Auth, private storage:Storage, private facebook:Facebook, private toast:Toast) {
            events.subscribe('logout', () => {
                  this.logOut();
            });
      }

      public ionViewDidEnter():void {
            this.login();
      }

      private login():void {
            this.storage.get('user').then((user) => {
                  this.events.publish('user:login', user);
                  console.log(`Got user!`);
            }).catch(() => {
                  let modal = this.modalCtrl.create(LoginPage);
                  modal.present();
                  modal.onDidDismiss((user:User) => this.user = user);
                  console.log(`Login Modal opening!`);
            });
      }

      public logOut():void {
            this.storage.remove('user').then(() => {
                  this.auth.logOut().then(() => {
                        this.facebook.logout().then(() => {
                              let modal = this.modalCtrl.create(LoginPage);
                              modal.present();
                              modal.onDidDismiss((user:User) => this.user = user);
                              this.toast.showToast('Logged out!');
                        });
                  });
            });
      }
}
