import { Component, OnInit } from '@angular/core';
import { Events, IonicPage, NavController, NavParams } from 'ionic-angular';
import { Observable } from 'rxjs';

import { User } from '../../classes/api/user';
import { Challenge } from '../../classes/api/challenge';
import { Rendition } from '../../classes/api/rendition';
import { List } from '../../classes/database/database';
import { Storage } from '../../classes/storage/storage';
import { Email } from '../../classes/send/email';
import { Audio } from '../../classes/audio/audio';
import { Transfer } from '../../classes/audio/transfer';
import { Alert, Toast } from '../../classes/notify/notify';

@Component({
      selector: 'page-rendition',
      templateUrl: 'rendition.html',
})
export class RenditionPage implements OnInit {

      public user:User;
      public challenge:Challenge;

      private audio_url:string;
      private audio_path:string;
      private transcript:string;
      private score:string;

      private API_URL:string = "https://powerful-caverns-39622.herokuapp.com/rendition";

      public loading:boolean = false;

      constructor(public navCtrl: NavController, public navParams: NavParams, private events:Events, private list:List, private storage:Storage, private email:Email, private audio:Audio, private transfer:Transfer, private alert:Alert, private toast:Toast) {}

      public ngOnInit():void {
            let userMethods = new User(null, null, null, null, null, null);
            this.challenge = this.navParams.get('challenge');
            this.storage.get('user').then((user) => {
                  this.user = userMethods.fromObject(user);
            });
      }

      public close():void {
            this.events.publish('rendition:close');
      }

      public record():void {
            this.loading = true;
            this.audio.record().then((path:string) => {
                  this.loading = false;
                  this.audio_path = path;
                  //this.email.sendMail('abkrivonos@gmail.com', 'Test', 'Body', [path]);
            }).catch(() => {
                  this.loading = false;
            });
      }

      private submissionObject():any {
            let renditionMethods = new Rendition(null, null, null, null, null);
            let rendition = new Rendition(this.user.getId(), this.audio_url, this.transcript, this.score, Date.now());
            return renditionMethods.toObject(rendition);
      }

      public submit():void {
            this.transfer.upload(this.audio_path, this.API_URL).then((res:any) => {
                  this.audio_url = res.audio_url;
                  this.transcript = res.transcript;


                  // Diff checking

                  this.score = res.score;
                  this.list.push(`challenges/${this.challenge.getId()}/submissions`, this.submissionObject()).then(() => {
                        this.list.push(`users/${this.user.getId()}/challenges`, this.challenge.getId()).then(() => {
                              this.close();
                              this.toast.showToast(`You scored a ${this.score} on '${this.challenge.getName()}'`);
                        }).catch(() => {
                              alert(`Could not add to challenges.`);
                        });
                  }).catch(() => {
                        alert(`Could not add to submissions.`);
                  });
            }).catch(() => {
                  alert(`Could not upload file to server.`);
            });
      }

}
