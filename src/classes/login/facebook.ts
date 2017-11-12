import { Injectable } from '@angular/core';
import { Facebook as FacebookClass, FacebookLoginResponse } from '@ionic-native/facebook';

@Injectable()
export class Facebook {

      private PERMISSIONS:any = ['public_profile', 'user_friends', 'email'];

      constructor(private facebook:FacebookClass) {}

      public login():Promise<any> {
            return new Promise((resolve, reject) => {
                  this.facebook.login(this.PERMISSIONS).then((res: FacebookLoginResponse) => {
                        this.api(res.authResponse.userID).then((res) => {
                              resolve(res);
                        }).catch(() => {
                              reject();
                        });
                  }).catch((e) => {
                        reject();
                  });
            });
      }

      public api(id:string):Promise<any> {
            return new Promise((resolve, reject) => {
                  this.facebook.api('/' + id + '?fields=name,picture', this.PERMISSIONS).then((res) => {
                        resolve({
                              id: res.id,
                              name: res.name,
                              profile_picture: res.picture.data.url
                        });
                  }).catch((e) => {
                        console.log('Error logging into Facebook', e)
                        reject();
                  });
            });
      }

      public logout():Promise<any> {
            return new Promise((resolve, reject) => {
                  this.facebook.logout().then(() => {
                        console.log('Logged out of Facebook!');
                        resolve();
                  }).catch((e) => {
                        console.log('Error logging out of Facebook', e);
                        reject();
                  });
            });
      }
}
