import { Injectable } from '@angular/core';
import { NativeStorage } from '@ionic-native/native-storage';

@Injectable()
export class Storage {
      constructor(private nativeStorage:NativeStorage) {}

      public get(item:string):Promise<any> {
            return new Promise((resolve, reject) => {
                  this.nativeStorage.getItem(item).then((itm) => {
                        resolve(itm)
                  }).catch(() => {
                        reject();
                  });
            });
      }

      public set(item:string, value:any):Promise<any> {
            return new Promise((resolve, reject) => {
                  this.nativeStorage.setItem(item, value).then(() => {
                        resolve(value);
                  }).catch(() => {
                        reject();
                  });
            });
      }

      public remove(item:string):Promise<any> {
            return new Promise((resolve, reject) => {
                  this.nativeStorage.remove(item).then(() => {
                        resolve();
                  }).catch(() => {
                        reject();
                  });
            });
      }

      public clear():Promise<any> {
            return new Promise((resolve, reject) => {
                  this.nativeStorage.clear().then(() => {
                        resolve();
                  }).catch(() => {
                        reject();
                  });
            });
      }
}
