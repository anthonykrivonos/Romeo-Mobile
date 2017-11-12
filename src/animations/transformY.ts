import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

export function transformY(toggle:string, duration:number, start:any, end:any) {
    return trigger(toggle, [
          state('true', style({height: start})),
          state('false',   style({height: end})),
          transition('true => false', animate(duration + 'ms ease-in')),
          transition('false => true', animate(duration + 'ms ease-out'))
    ]);
}
