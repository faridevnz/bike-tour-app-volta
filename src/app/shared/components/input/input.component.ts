import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { inputType } from './types/inputType';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputComponent,
    },
  ],
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() placeholder: string;
  @Input() type: inputType;
  @Input() nameIcon: string = '';
  @Input() value: unknown;
  @Input() readOnly: boolean = false;
  @Input() isInvalid: boolean = false;

  @Output() iconClicked: EventEmitter<void> = new EventEmitter<void>();

  constructor() {}

  propagateChange(value: unknown) {}
  propagateTouch() {}

  writeValue(value: unknown): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.propagateTouch = fn;
  }

  ngOnInit() {}

  onClicked() {
    this.iconClicked.emit();
  }

  onInputChange(value: unknown) {
    this.propagateChange(value);
  }
}
