import { Component, Input, OnInit } from '@angular/core';
import { Events, ModalController } from 'ionic-angular';

import { TimeSince } from '../../classes/timesince/timesince';
import { Document } from '../../classes/database/database';
import { User } from '../../classes/api/user';
import { Challenge } from '../../classes/api/challenge';

import { ChallengeboardPage } from '../../pages/challengeboard/challengeboard';

@Component({
      selector: 'romeo-challenge',
      templateUrl: 'challenge.html'
})
export class ChallengeComponent implements OnInit {
      @Input() id:number;
      @Input() name:string;
      @Input() creator_id:number;
      @Input() audio_url:string;
      @Input() transcript:string;
      @Input() submissions:any;
      @Input() thumbnail_url:string;
      @Input() date_created:number;

      public alphaDate:string;
      public user:User;

      public challengeBoard:any;

      constructor(private events:Events, private timeSince:TimeSince, private document:Document, private modalCtrl:ModalController) {
            events.subscribe('challengeboard:close', () => {
                  if (this.challengeBoard) {
                        this.challengeBoard.dismiss();
                  }
            });
      }

      public ngOnInit():void {
            this.getUser();
            this.getDate();
      }

      public openChallenge():void {
            if (this.user && this.alphaDate) {
                  this.challengeBoard = this.modalCtrl.create(ChallengeboardPage, {
                        challenge: this.toChallengeObject(),
                        user: this.user,
                        alphaDate: this.alphaDate
                  });
                  this.challengeBoard.present();
            }
      }

      private toChallengeObject():Challenge {
            return new Challenge(
                  this.id,
                  this.creator_id,
                  this.name,
                  this.audio_url,
                  this.transcript,
                  this.submissions,
                  this.date_created,
                  this.thumbnail_url
            );
      }

      private getDate():void {
            this.alphaDate = this.timeSince.timeOf(this.date_created) || "No Date";
      }

      private getUser():void {
            let userMethods = new User(null, null, null, null, null, null);
            this.document.read(`users/${this.creator_id}`).then((user) => {
                  this.user = userMethods.fromObject(user);
            });
      }

}
