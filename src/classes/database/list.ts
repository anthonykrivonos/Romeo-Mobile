import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class List {

      private DEBUG:boolean = true;

      constructor(private db:AngularFireDatabase) {}

      public create(path:string, value:any):Promise<any> {
            return new Promise((resolve, reject) => {
                  if (value instanceof Array) {
                        this.db.object(path).set(value).then(() => {
                              this.log(`Set '${value}' at path: '${path}'`);
                              resolve(value);
                        }).catch(() => {
                              this.log(`Could not set '${value}' at path: '${path}'`, true);
                              reject();
                        });
                  } else reject();
            });
      }

      public add(path:string, value:any):Promise<any> {
            return new Promise((resolve, reject) => {
                  this.db.list(path).push(value).then(() => {
                        this.log(`Added '${value}' to path: '${path}'`);
                        resolve(value);
                  });
            });
      }

      public push(path:string, value:any, appendId:boolean = false):Promise<any> {
            return new Promise((resolve, reject) => {
                  this.read(path).then((list) => {
                        if (appendId) value['id'] = list && list.length ? list.length : 0;
                        if (!list || list.length == 0) list = [];
                        if (!list.includes(value)) list.push(value);
                        this.db.object(path).set(list).then(() => {
                              this.log(`Pushed #'${value}' to path: '${path}'\nSet '${JSON.stringify(list)}' at path: ${path}`);
                              resolve();
                        }).catch(() => {
                              this.log(`Could not push #'${value}' to path: '${path}'\nCould not set '${JSON.stringify(list)}' at path: ${path}`, true);
                              reject();
                        });
                  });
            });
      }

      public read(path:string):Promise<any> {
            return new Promise((resolve, reject) => {
                  this.db.list(path).valueChanges().subscribe((value) => {
                        this.log(`Read '${value || []}' from path: '${path}'`);
                        resolve(value || []);
                  });
            });
      }

      public readObservable(path:string):Observable<any> {
            return this.db.list(path).valueChanges();
      }

      public readAtIndex(path:string, index:number):Promise<any> {
            return new Promise((resolve, reject) => {
                  this.read(path).then((value) => {
                        if (value && value instanceof Array && value.length > index) {
                              this.log(`Read '${JSON.stringify(value)}' from path: '${path}'\nRead '${value[index]}' from index: ${index}`);
                              resolve(value[index]);
                        } else {
                              this.log(`Could not read '${JSON.stringify(value)}' from path: '${path}'\nCould not read '${value[index]}' from index: ${index}`, true);
                              reject();
                        }
                  });
            });
      }

      public delete(path:string):Promise<any> {
            return new Promise((resolve, reject) => {
                  this.db.object(path).remove().then(() => {
                        this.log(`Deleted path: '${path}'`);
                        resolve();
                  }).catch(() => {
                        this.log(`Could not delete path: '${path}'`, true);
                        reject();
                  });
            });
      }

      public deleteIndex(path:string, index:number):Promise<any> {
            return new Promise((resolve, reject) => {
                  this.read(path).then((list) => {
                        list.splice(index, 1);
                        this.db.object(path).set(list).then(() => {
                              this.log(`Removed index #'${index}' at path: '${path}'\nSet '${JSON.stringify(list)}' at path: ${path}`);
                              resolve();
                        }).catch(() => {
                              this.log(`Could not remove index #'${index}' at path: '${path}'\nCould not set '${JSON.stringify(list)}' at path: ${path}`, true);
                              reject();
                        });
                  });
            });
      }

      private log(message:any, error:boolean = false) {
            if (!error && this.DEBUG) {
                  console.log(`LIST:\n${message}`);
            } else if (this.DEBUG) {
                  console.error(`LIST:\n${message}`);
            }
      }
}
