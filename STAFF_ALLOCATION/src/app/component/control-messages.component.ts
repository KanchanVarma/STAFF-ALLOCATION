import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../services/validation.service';

@Component({
  selector: 'control-messages',
  template: `<div *ngIf="errorMessage !== null">{{errorMessage}}</div>`
})
export class ControlMessagesComponent {
  @Input() control: FormControl;
  @Input() parent: string;
  @Input() parent2: string;
  constructor() { }

  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(this.parent,propertyName, this.control.errors[propertyName],this.parent2);
      }
    }

    return null;
  }
}