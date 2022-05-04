import {FormControl} from "@angular/forms";
import {Observable} from "rxjs";

export class ValidatorEmailExist {
  static existEmail(control: FormControl): Promise<any> | Observable<any> {
    return new Promise(resolve => {
      setTimeout(() => {
        if (control.value === '1') {

        }
      }, 1000)
    })
  }
}
