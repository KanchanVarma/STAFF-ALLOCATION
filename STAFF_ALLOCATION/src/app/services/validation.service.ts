import { AbstractControl, ValidatorFn } from "@angular/forms";
import { AppMessage } from "../constants/app-msg";

export class ValidationService {
  static getValidatorErrorMessage(parent: string, validatorName: string, validatorValue?: any, parent2?: string) {
    let config = {
      'required': parent + AppMessage.REQUIRED,
      'invalidEmailAddress': parent +AppMessage.INVALIDEMAILADDRESS,
      'invalidPassword': parent + AppMessage.INVALIDEMAILPASSWORD,
      'minlength':AppMessage.MINLENGTH + parent + AppMessage.SHOULDBE +`${validatorValue.requiredLength}`,
      'maxlength':AppMessage.MAXLENGTH + parent + AppMessage.SHOULDBE +`${validatorValue.requiredLength}`,
      'max': AppMessage.MAXVALUE + parent +AppMessage.SHOULDBE+` ${validatorValue.max}`,
      'min':  AppMessage.MINVALUE+ parent + AppMessage.SHOULDBE+`${validatorValue.min}`,
      'isNotLessThan': parent + AppMessage.LESSTHAN + parent2,
      'isNotLessThanOrEqual': parent + AppMessage.LESSTHANEQUAL + parent2,
      'isNotGreaterThanOrEqual': parent + AppMessage.GREATERTHANEQUAL + parent2,
      'isNotGreaterThan': parent + AppMessage.GREATERTHAN + parent2,
      'numberLength': parent +AppMessage.NUMBERLENGTH + validatorValue.requiredLength,
      'numberLengtheq': parent +AppMessage.NUMBERLENGTHEQ + validatorValue.requiredLength,
      'pattern':parent + AppMessage.INVALID,
      'email': parent +AppMessage.INVALIDEMAILADDRESS,
    };
    return config[validatorName];
  }


  static creditCardValidator(control) {
    // Visa, MasterCard, American Express, Diners Club, Discover, JCB
    if (control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/)) {
      return null;
    } else {
      return { 'invalidCreditCard': true };
    }
  }

  static emailValidator(control) {
    // RFC 2822 compliant regex
    if (control.value.match(/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*.[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/)) {
      return null;
    } else {
      return { 'invalidEmailAddress': true };
    }
  }

  static passwordValidator(control) {
    // {6,100}           - Assert password is between 6 and 100 characters
    // (?=.*[0-9])       - Assert a string has at least one number
    if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
      return null;
    } else {
      return { 'invalidPassword': true };
    }
  }
}

export function numberLength(value: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    var forbidden
    if (control.value != null) {
      if (control.value.toString().length > value)
        forbidden = true;
      return forbidden ? { 'numberLength': { value: control.value, requiredLength: value } } : null;
    };
  }
}

export function numberminlength(value: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    var forbidden
    if (control.value != null) {
      if (control.value.toString().length < value)
        forbidden = true;
      return forbidden ? { 'numberLengtheq': { value: control.value, requiredLength: value } } : null;
    };
  }
}

export function isLessThanValidator(value: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    var forbidden
    if (value <= control.value)
      forbidden = true;
    return forbidden ? { 'isNotLessThan': { value: control.value } } : null;
  };
}
export function isLessThanValidatorOrEqual(value: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    
    if(!value)
      return {'isNotLessThanOrEqual':{value: control.value}};
    var forbidden=false
    if (control.value > value)
      forbidden = true;
      
    console.log("CALL VALID ",value,"my ",control.value,forbidden)
    return forbidden ? { 'isNotLessThanOrEqual': { value: control.value } } : null;
  };
}
export function isGreaterThanValidatorOrEqual(value: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    
    if(!value)
      return {'isNotLessThanOrEqual':{value: control.value}};
    var forbidden =false
    if (control.value < value)
      forbidden = true;
      
    console.log("CALL VALID ",value,"my ",control.value,forbidden)
    return forbidden ? { 'isNotGreaterThanOrEqual': { value: control.value } } : null;
  };
}

export function isGreaterThanValidator(value: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    var forbidden
    if (value >= control.value)
      forbidden = true;
    return forbidden ? { 'isNotGreaterThan': { value: control.value } } : null;
  };
}

export function OnlyNumbersAndLetterValidator(): ValidatorFn {
  return (currentControl: AbstractControl): { [key: string]: any } | null => {
    var forbidden
    if (currentControl.value != null && currentControl.value != "") {
      if (!RegExp(/^[WMQHY][1-9][0-9]?$/).test(currentControl.value)) {
        //let temp = {};
        // temp[propertyName] = true;
        forbidden = true;
        // console.log("temp ",temp)
        return forbidden ? { 'invalidMonthType': { value: currentControl.value } } : null;
      }

    } 
    }
  }

  

    