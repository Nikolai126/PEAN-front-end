import { Injectable } from '@angular/core';
import {Observable, ReplaySubject} from "rxjs";
import GoogleAuth = gapi.auth2.GoogleAuth;

@Injectable({
  providedIn: 'root'
})
export class GoogleAuthService {

  private auth2: gapi.auth2.GoogleAuth
  private subject = new ReplaySubject<gapi.auth2.GoogleUser>(1)

  constructor() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '901264455734-9ruqcfi8ibi3dr4brj3vh0dqmgir1bha.apps.googleusercontent.com'
      })
    });
  }

  signIn() {
    this.auth2.signIn({

      scope: 'https://www.googleapis.com/auth/gmail.readonly'
    }).then( user => {
      this.subject.next(user);
    }).catch()
  }

  signOut() {
    this.auth2.signOut()
      .then( () => {
        // @ts-ignore
        return this.subject.next(null);
      })
  }

  public observable(): Observable<gapi.auth2.GoogleUser> {
    return this.subject.asObservable();
  }
}
