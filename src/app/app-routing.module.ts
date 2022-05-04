import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {AuthComponent} from "./auth/auth.component";
import {CreatePostComponent} from "./create-post/create-post.component";
import {OnePostComponent} from "./one-post/one-post.component";

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'sign-in', component: AuthComponent},
  {path: 'create-post', component: CreatePostComponent},
  {path: 'update/:id', component: CreatePostComponent},
  {path: 'home/:id', component: OnePostComponent},
  {path: 'home/filter/:id', component: HomeComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
