import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Document {

      private DEBUG:boolean = true;

      constructor(private db:AngularFireDatabase) {}

      public create(path:string, value:any):Promise<any> {
            return new Promise((resolve, reject) => {
                  this.db.object(path).set(value).then(() => {
                        this.log(`Created '${value}' at path: '${path}'`);
                        resolve(value);
                  }).catch(() => {
                        this.log(`Could not create '${value}' at path: '${path}'`, true);
                        reject();
                  });
            });
      }

      public read(path:string):Promise<any> {
            return new Promise((resolve, reject) => {
                  this.db.object(path).valueChanges().subscribe((value) => {
                        if (value != null) {
                              this.log(`Read '${value}' at path: '${path}'`);
                              resolve(value);
                        } else {
                              this.log(`Could not read '${value}' at path: '${path}'`, true);
                              reject();
                        }
                  });
            });
      }


      public readObservable(path:string):Observable<any> {
            return this.db.object(path).valueChanges();
      }

      public update(path:string, value:any):Promise<any> {
            return new Promise((resolve, reject) => {
                  this.db.object(path).update(value).then(() => {
                        this.log(`Updated '${value}' at path: '${path}'`);
                        resolve(value);
                  }).catch(() => {
                        this.log(`Could not update '${value}' at path: '${path}'`, true);
                        reject();
                  });
            });
      }

      public delete(path:string):Promise<any> {
            return new Promise((resolve, reject) => {
                  this.create(path, null).then(() => {
                        this.log(`Deleted from path: '${path}'`);
                        resolve();
                  }).catch(() => {
                        this.log(`Could not delete from path: '${path}'`, true);
                        reject();
                  });
            });
      }

      private log(message:any, error:boolean = false) {
            if (!error && this.DEBUG) {
                  console.log(`OBJECT:\n${message}`);
            } else if (this.DEBUG) {
                  console.error(`OBJECT:\n${message}`);
            }
      }
}
