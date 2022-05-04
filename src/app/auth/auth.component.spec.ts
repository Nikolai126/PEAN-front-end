import {AuthService} from "../services/auth.service";
import {Router, Routes} from "@angular/router";
import {HomeComponent} from "../home/home.component";
import {TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {AppComponent} from "../app.component";
import {of} from "rxjs";
import {AuthComponent} from "./auth.component";

describe('authComponent', () => {
  let component: AuthComponent;
  let service: AuthService;
  let router: Router;

  const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'sign-up', component: AuthComponent}
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [HomeComponent, AuthComponent, AppComponent]
    });

    router = TestBed.inject(Router);

    const spy = jasmine.createSpyObj('HttpClient', { post: of({}), get: of({}) });

    service = new AuthService(spy);
    component = new AuthComponent(service, router);
  })

  it('should create auth form', () => {
    component.ngOnInit();
    expect(component.form.get('email')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();
  });
});
