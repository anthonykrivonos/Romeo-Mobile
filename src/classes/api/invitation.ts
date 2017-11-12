import { Injectable } from '@angular/core';

@Injectable()
export class Invitation {

      private challenge_id:number;
      private challenger_id:number;
      private text:string;
      private date_created:string;

      constructor(challenge_id:number, challenger_id:number, text:string, date_created:string) {
            this.challenge_id = challenge_id;
            this.challenger_id = challenger_id;
            this.text = text;
            this.date_created = date_created;
      }

      public getChallengeId():number { return this.challenge_id; }

      public getChallengerId():number { return this.challenger_id; }

      public getText():string { return this.text; }

      public getDateCreated():string { return this.date_created; }

      public fromObject(invitation:any):Invitation {
            return new Invitation(
                  invitation.challenge_id || 0,
                  invitation.challenger_id || 0,
                  invitation.text || "",
                  invitation.date_created || ""
            );
      }
}
