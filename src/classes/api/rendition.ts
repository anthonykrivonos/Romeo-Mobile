import { Injectable } from '@angular/core';

@Injectable()
export class Rendition {

      private id:number;
      private audio_url:string;
      private transcript:string;
      private score:string;
      private date_created:number;

      constructor(id:number, audio_url:string, transcript:string, score:string, date_created:number) {
            this.id = id;
            this.audio_url = audio_url;
            this.transcript = transcript;
            this.score = score;
            this.date_created = date_created;
      }

      public getId():number { return this.id; }

      public getAudio():string { return this.audio_url; }

      public getTranscript():string { return this.transcript; }


      public getScore():string { return this.score; }

      public getDateCreated():number { return this.date_created; }

      public fromObject(rendition:any):Rendition {
            return new Rendition(
                  rendition.id || 0,
                  rendition.audio || "",
                  rendition.transcript || "",
                  rendition.score || "",
                  rendition.date_created || 0
            );
      }

      public toObject(rendition:Rendition):any {
            return {
                  id: rendition.getId() || 0,
                  audio_url: rendition.audio_url || "",
                  transcript: rendition.transcript || "",
                  score: rendition.score || "",
                  date_created: rendition.date_created || 0
            };
      }
}
