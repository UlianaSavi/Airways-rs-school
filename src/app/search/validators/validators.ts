import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { City } from '../models/cities.model';

export function dateDestinationValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const date: string = control.value;
    if (date === null || date) return null;
    return {
      invalid: true,
    };
  };
}

export function validCityValidator(cities: City[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const citiesArray = cities.map((e) => e.name);
    const checkInput = !citiesArray.includes(control.value);
    return checkInput ? { validCountry: { value: control.value } } : null;
  };
}

export function validSameCities(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const formGroup = control.parent as FormGroup;
    if (!formGroup) {
      return null;
    }
    const from = formGroup.get('from')?.value;
    const destination = formGroup.get('destination')?.value;
    const checkSame = from === destination;
    return checkSame ? { checkSame: { value: control.value } } : null;
  };
}
