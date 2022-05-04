import { AbstractControl } from '@angular/forms';

export function ValidationTags(control: AbstractControl) {
  const stringOfTags = control.value;
  const comma = ',';
  if (!control.value) {
    return null;
  }
  const validResult = splitString(stringOfTags, comma);
  if (!validResult) {
    return { invalidTags: true };
  }
  return null;
}

function splitString(stringOfTags: string, separator: string): boolean {
  const arrayOfStrings = stringOfTags.split(separator);
  return arrayOfStrings.length < 6;
}
