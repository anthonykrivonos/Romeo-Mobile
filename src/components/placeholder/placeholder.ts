import { Component, Input } from '@angular/core';

@Component({
      selector: 'romeo-placeholder',
      templateUrl: 'placeholder.html'
})
export class PlaceholderComponent {
      @Input() text: string;

      constructor() {
      }

}
