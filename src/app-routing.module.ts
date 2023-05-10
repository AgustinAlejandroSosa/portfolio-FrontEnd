import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoginComponent } from 'src/components/login/login.component';
import { Error404Component } from './components/error404/error404.component';
import { MainComponent } from './components/main/main.component';

const routes: Routes = [
  {path: '', redirectTo:'portfolio', pathMatch:'full'},
  {path:'portfolio', component:MainComponent, pathMatch:'full'},
  {path:'login', component: LoginComponent, pathMatch:'full'},
  {path:'**', component:Error404Component}
  
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    CommonModule
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
