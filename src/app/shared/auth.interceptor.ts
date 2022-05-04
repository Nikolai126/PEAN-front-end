import {Injectable} from "@angular/core";
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from "@angular/common/http";
import {Observable, tap, throwError} from "rxjs";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(this.auth.isAuthenticated()) {
      req = req.clone({
        headers: req.headers.set('auth', this.auth.token)
      });
    }
    return next.handle(req)
      .pipe(
        tap({
          next: ((value) => {
            if(value instanceof HttpResponse) {
              this.auth.isAuthenticated();
            }
          }),
          error: (err => {
            if (err instanceof HttpErrorResponse) {
              if(err.status === 401) {
                this.auth.refreshTokens();
                return;
              }
              else if (err.status === 403) {
                this.router.navigate(['sign-in']);
                return;
              }
            }
          })
        })
      )
  }

}
