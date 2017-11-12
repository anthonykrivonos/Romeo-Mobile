import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class Auth {

      constructor(private auth:AngularFireAuth) {}

      public loginWithId(id:number):Promise<any> {
            return new Promise((resolve, reject) => {
                  this.auth.auth.signInWithCustomToken(id.toString()).then(() => {
                        resolve();
                  }).catch(() => {
                        reject();
                  });
            });
      }

      public logOut():Promise<any> {
            return new Promise((resolve, reject) => {
                  this.auth.auth.signOut().then(() => {
                        resolve();
                  }).catch(() => {
                        reject();
                  });
            });
      }

      public changeState():Promise<any> {
            return new Promise((resolve, reject) => {
                  this.auth.authState.subscribe((user) => {
                        if (user) resolve();
                        else reject();
                  });
            });
      }

}
