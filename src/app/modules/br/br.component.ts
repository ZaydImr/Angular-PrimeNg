import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-br',
  templateUrl: './br.component.html',
  animations: [
    trigger('showHide', [
      state('true', style({
        height: '0',
        opacity: 0
      })),
      state('false', style({
        height: 'fit-content',
        opacity: 1
      })),
      transition('true => false', [
        animate('300ms ease-out', keyframes([
          style({ height: 'fit-content' }),
          style({ opacity: 1 })
        ]))
      ]),
      transition('false => true', [
        animate('300ms  ease-in', keyframes([
          style({ opacity: 0, height: '0' })
        ]))
      ]),
    ])
  ]
})
export class BrComponent implements OnInit {

  advancedSearch: any = {
  };

  isCollapsed: any = {
    advancedSearch: false,
    list: true
  };

  constructor() { }

  ngOnInit(): void {
  }

}
