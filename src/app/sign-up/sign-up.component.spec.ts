import { SignUpComponent } from './sign-up.component';
import {FormBuilder} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {of} from "rxjs";
import {Router, Routes} from "@angular/router";
import {fakeAsync, TestBed} from "@angular/core/testing";
import {RouterTestingModule} from "@angular/router/testing";
import {HomeComponent} from "../home/home.component";
import {AppComponent} from "../app.component";
import {Location} from "@angular/common";

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let service: AuthService;
  let router: Router;
  let location: Location;

  const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'sign-up', component: SignUpComponent}
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      declarations: [HomeComponent, SignUpComponent, AppComponent]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);

    const spy = jasmine.createSpyObj('HttpClient', { post: of({}), get: of({}) });

    service = new AuthService(spy);
    component = new SignUpComponent(new FormBuilder(), service, router);
  })

  it('should create sign-up form', () => {
    component.ngOnInit();
    expect(component.form.get('firstname')).toBeTruthy();
    expect(component.form.contains('lastname')).toBeTruthy();
  });

  it('After sign-up redirects you to /home', fakeAsync(() => {
    const location: Location = TestBed.inject(Location);

    router.navigate([""]).then(() => {
      expect(location.path()).toBe("/home");
    });
  }));

});
