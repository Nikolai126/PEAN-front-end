import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";
import {regUser} from "../shared/interfaces";
import {constants} from "./constants";
import {authUser} from "../shared/interfaces";

@Injectable({providedIn: "root"})
export class AuthService {

  userEmail: string;
  message: string;
  error: string | Object;
  private _isAuth$ = new BehaviorSubject(false);

  constructor(
    private http: HttpClient,
  ) { }

  get token(): string | any {
    if(localStorage.getItem('accessToken')) {
      return JSON.stringify(localStorage.getItem('accessToken'));
    }
    else {
      return null;
    }
  }

  signUp(user: regUser): Observable<any> {
    return this.http.post(`${constants.baseUrl}/sign-up`, user, {withCredentials: true});
  }

  login(user: authUser): Observable<any> {
    return this.http.post(`${constants.baseUrl}/sign-in`, user, {withCredentials: true});
  }

  isAuthenticated(): boolean {
    // return this._isAuth$.asObservable()
    return !!this.token
  }

  logout() {
    this.http.get(`${constants.baseUrl}/logout`, {withCredentials: true}).subscribe({
      error: err => {
        this.error = err.error.message;
      }
    });
    this.setToken(null);
  }

  setToken(accessToken: string | null) {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    else {
      localStorage.clear();
    }
  }

  refreshTokens() {
    this.http.post(`${constants.baseUrl}/refresh`, {withCredentials: true}).subscribe({
      next: (value) => {
        this.setToken(value.toString());
      },
      error: err => {
        this.error = err.error.message;
      }
    })
  }

  getUserEmail(): Observable<any> {
    return this.http.get(`${constants.baseUrl}/get-email`, {withCredentials: true});
  }

}
