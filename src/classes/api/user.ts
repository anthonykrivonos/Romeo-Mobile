import { Injectable } from '@angular/core';

@Injectable()
export class User {

      private id:number;
      private name:string;
      private renditions:any;
      private invitations:any;
      private score:string;
      private profile_picture:string;

      constructor(id:number, name:string, renditions:any, invitations:any, score:string, profile_picture:string) {
            this.id = id;
            this.name = name;
            this.renditions = renditions;
            this.invitations = invitations;
            this.score = score;
            this.profile_picture = profile_picture;
      }

      public getId():number { return this.id; }

      public getName():string { return this.name; }

      public getRenditions():string { return this.renditions; }

      public getInvitations():any { return this.invitations; }

      public getScore():string { return this.score; }

      public getProfilePicture():string { return this.profile_picture; }

      public setId(id:number):void { this.id = id; }

      public setName(name:string):void { this.name = name; }

      public setRenditions(renditions:any):void { this.renditions = renditions; }

      public setInvitations(invitations:any):void { this.invitations = invitations; }

      public setScore(score:string):void { this.score = score; }

      public setProfilePicture(profile_picture:string):void { this.profile_picture = profile_picture; }

      public fromObject(user:any):User {
            return new User(
                  user.id || 0,
                  user.name || "",
                  user.renditions || [],
                  user.invitations || [],
                  user.score || "",
                  user.profile_picture || ""
            );
      }

      public toObject(user:any):any {
            return {
                  id: user.getId() || 0,
                  name: user.getName() || "",
                  renditions: user.getRenditions() || [],
                  invitations: user.getInvitations() || [],
                  score: user.getScore() || "",
                  profile_picture: user.getProfilePicture() || ""
            };
      }
}
