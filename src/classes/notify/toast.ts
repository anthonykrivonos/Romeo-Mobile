import { Component, Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class Toast {
      constructor(private toastCtrl:ToastController) {}

      showToast(message:string, position:string = 'top', duration:number = 2000) {
            let toast = this.toastCtrl.create({
                  cssClass: 'toast',
                  message: message,
                  duration: duration,
                  position: position,
                  showCloseButton: true
            });
            toast.present();
            toast.onDidDismiss(() => {
                  console.log('Dismissed toast');
            });
      }
}
