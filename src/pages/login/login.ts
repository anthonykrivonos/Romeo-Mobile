import { Component } from '@angular/core';
import { Events, NavController, NavParams } from 'ionic-angular';

import { Facebook } from '../../classes/login/facebook';
import { Auth } from '../../classes/login/auth';
import { User } from '../../classes/api/user';
import { Storage } from '../../classes/storage/storage';
import { List, Document } from '../../classes/database/database';

@Component({
      selector: 'page-login',
      templateUrl: 'login.html',
})
export class LoginPage {

      private user:User;

      constructor(public events:Events, public navCtrl: NavController, public navParams: NavParams, private facebook:Facebook, private auth:Auth, private storage:Storage, private List:List, private document:Document) {}

      public login():void {
            this.facebook.login().then((res) => {
                  let userMethods = new User(null, null, null, null, null, null);
                  let user:User = userMethods.fromObject(res);
                  this.document.read(`users/${user.getId().toString()}`).then((usr) => {
                        usr = userMethods.fromObject(usr);
                        user.setScore(usr.getScore() || "A");
                        user.setRenditions(usr.getRenditions() || []);
                        user.setInvitations(usr.getRenditions() || []);
                        this.document.update(`users/${user.getId().toString()}`, userMethods.toObject(user)).then(() => {
                              this.auth.loginWithId(user.getId());
                              this.storage.set('user',user).then(() => {
                                    this.user = user;
                                    this.events.publish('user:login', user);
                                    this.navCtrl.pop();
                              });
                        }).catch(() => {
                              alert(`Error logging in at User Update`);
                        });
                  }).catch(() => {
                        this.document.create(`users/${user.getId().toString()}`, userMethods.toObject(user)).then(() => {
                              this.auth.loginWithId(user.getId());
                              this.navCtrl.pop();
                        }).catch(() => {
                              alert(`Error logging in at User Creation`);
                        });
                  });
            }).catch(() => {
                  alert(`Error logging in at Facebook Login`);
            });
      }

}
