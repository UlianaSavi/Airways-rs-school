import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateDestinationValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const date: string = control.value;
    if (date === null || date) return null;
    return {
      invalid: true,
    };
  };
}
