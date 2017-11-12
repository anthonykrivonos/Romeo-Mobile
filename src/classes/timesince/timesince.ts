import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class TimeSince {
      constructor() {}

      public observeTimeSince(date:string):Promise<any> {
            return new Promise((resolve, reject) => {
                  Observable.timer(1, 30000).subscribe(() => {
                        resolve(this.timeSince(date));
                  });
            });
      }

      public timeSince(date:any):string {
            date = parseInt(date);
            var seconds = Math.floor((Date.now() - date) / 1000);
            var interval = Math.floor(seconds / 31536000);
            if (interval >= 1) return interval + "y";
            interval = Math.floor(seconds / 2592000);
            if (interval >= 1) return interval + "mo";
            interval = Math.floor(seconds / 604800);
            if (interval >= 1) return interval + "w";
            interval = Math.floor(seconds / 86400);
            if (interval >= 1) return interval + "d";
            interval = Math.floor(seconds / 3600);
            if (interval >= 1) return interval + "h";
            interval = Math.floor(seconds / 60);
            if (interval >= 1) return interval + "m";
            return "now";
      }

      public timeDifference(older:any, newer:any, maxDifference:number = null):any {
            return maxDifference == null ? newer - older : newer - older > maxDifference;
      }

      public timeOf(date:number = null):string {
            var dt = new Date(date || Date.now());
            var months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];
            var hours = dt.getHours()%12 == 0 ? 12 : dt.getHours()%12;
            var period = dt.getHours() > 12 ? "pm" : "am";
            var suffix;
            if (dt.getDate().toString().endsWith("1") && !dt.getDate().toString().endsWith("11")) {
                  suffix = "st";
            } else if (dt.getDate().toString().endsWith("2") && !dt.getDate().toString().endsWith("12")) {
                  suffix = "nd";
            } else if (dt.getDate().toString().endsWith("3") && !dt.getDate().toString().endsWith("13")) {
                  suffix = "rd";
            } else {
                  suffix = "th";
            }
            var minutes = dt.getMinutes() < 9 ? "0" + dt.getMinutes() : dt.getMinutes();
            return months[dt.getMonth()] + " " + dt.getDate() + suffix + ", " + hours + ":" + minutes + period;
      }

}
