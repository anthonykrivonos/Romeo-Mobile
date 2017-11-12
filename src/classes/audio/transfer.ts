import { Injectable } from '@angular/core';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File, DirectoryEntry } from '@ionic-native/file';

@Injectable()
export class Transfer {

      constructor(private fileTransfer:FileTransfer, private file:File) {}

      public upload(path:string, endpoint:string):Promise<any> {
            return new Promise((resolve, reject) => {
                  let options: FileUploadOptions = {
                        fileKey: 'file',
                        fileName: 'audio.wav',
                        chunkedMode: true,
                        mimeType: 'image/wav'
                  }
                  this.fileTransfer.create().upload(path, endpoint, options).then(() => {
                        resolve();
                  }).catch(() => {
                        reject();
                  })
            });
      }
}
