import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { SharedModule } from "./shared/shared.module";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { AuthComponent } from './auth/auth.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { OnePostComponent } from './one-post/one-post.component';
import { AuthService } from "./services/auth.service";
import { AuthInterceptor } from "./shared/auth.interceptor";
import { SearchPipe } from "./shared/pipes/search.pipe";

const INTERCEPTOR_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  multi: true,
  useClass: AuthInterceptor
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    SignUpComponent,
    AuthComponent,
    CreatePostComponent,
    OnePostComponent,
    SearchPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [AuthService, INTERCEPTOR_PROVIDER],
  bootstrap: [AppComponent]
})
export class AppModule { }
