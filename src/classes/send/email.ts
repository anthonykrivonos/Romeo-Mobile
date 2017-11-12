import { Injectable } from '@angular/core';
import { EmailComposer } from '@ionic-native/email-composer';

@Injectable()
export class Email {

      constructor(private emailComposer:EmailComposer) {}

      sendMail(to:string, subject:string, body:string, attachments:any):void {
            this.emailComposer.open({
                  to,
                  attachments,
                  subject,
                  body,
                  isHtml: true
            });
      }
}
