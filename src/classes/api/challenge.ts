import { Injectable } from '@angular/core';

@Injectable()
export class Challenge {

      private id:number;
      private creator_id:number;
      private name:string;
      private audio_url:string;
      private transcript:string;
      private submissions:any;
      private date_created:number;
      private tumbnail_url:string;

      constructor(id:number, creator_id:number, name:string, audio_url:string, transcript:string, submissions:any, date_created:number, tumbnail_url:string) {
            this.id = id;
            this.creator_id = creator_id;
            this.name = name;
            this.audio_url = audio_url;
            this.transcript = transcript;
            this.submissions = submissions;
            this.date_created = date_created;
            this.tumbnail_url = tumbnail_url;
      }

      public getId():number { return this.id; }

      public getCreatorId():number { return this.creator_id; }

      public getName():string { return this.name; }

      public getAudio():string { return this.audio_url; }

      public getTranscript():string { return this.transcript; }

      public getSubmissions():any { return this.submissions; }

      public getDateCreated():number { return this.date_created; }

      public getThumbnailUrl():string { return this.tumbnail_url; }

      public fromObject(challenge:any):Challenge {
            return new Challenge(
                  challenge.id || 0,
                  challenge.creator_id || 0,
                  challenge.name || "",
                  challenge.audio_url || "",
                  challenge.transcript || "",
                  challenge.submissions || [],
                  challenge.date_created || "",
                  challenge.tumbnail_url || ""
            );
      }
}
