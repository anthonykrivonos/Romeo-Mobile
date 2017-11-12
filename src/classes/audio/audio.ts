import { Injectable } from '@angular/core';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions } from '@ionic-native/media-capture';
import { File } from '@ionic-native/file';
import { NativeAudio } from '@ionic-native/native-audio';

@Injectable()
export class Audio {

      constructor(private media:MediaCapture, private nativeAudio:NativeAudio, private file:File) {}

      public play(uid:string, path:string, volume:number):void {
            this.nativeAudio.preloadComplex(uid, path, volume, 1, 0);
            this.nativeAudio.play(uid).then(() => {
                  this.nativeAudio.unload(uid);
            }).catch(() => {
                  this.nativeAudio.unload(uid);
            });
      }

      public record():Promise<any> {
            return new Promise((resolve, reject) => {
                  this.media.captureAudio({limit:1}).then((mediaFile:MediaFile[]) => {
                        let file:MediaFile = mediaFile[0];
                        resolve(file.fullPath);
                  }).catch(()=>reject());
            });
      }
}
