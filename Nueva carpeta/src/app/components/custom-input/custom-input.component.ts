import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SkipSelf,
  ViewChild,
} from '@angular/core';
import { ControlContainer } from '@angular/forms';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new SkipSelf(), ControlContainer]],
    },
  ],
})
export class CustomInputComponent implements OnInit {
  @Input() type: string;
  @Input() name: string;
  @Input() controlName: string;
  @Input() required: boolean;

  constructor() {}

  ngOnInit() {}
}
