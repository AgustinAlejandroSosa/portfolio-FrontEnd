import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './components/about/about.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SkillComponent } from './components/skill/skill.component';
import { ProyectComponent } from './components/proyect/proyect.component';
import { AppRoutingModule } from './app-routing.module';
import { LoginComponent } from './components/login/login.component';
import { Error404Component } from './components/error404/error404.component';
import { MainComponent } from './components/main/main.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ExperienceListComponent } from './components/experience/experience.list.component';
import { EducationListComponent } from './components/education/education-list.component';
import { SoftSkillListComponent } from './components/soft-skill-list/soft-skill-list.component';
import { HardSkillListComponent } from './components/hard-skill-list/hard-skill-list.component';
import { ProyectListComponent } from './components/proyect/proyect-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    ExperienceComponent,
    SkillComponent,
    ProyectComponent,
    LoginComponent,
    Error404Component,
    ExperienceListComponent,
    MainComponent,
    EducationListComponent,
    SoftSkillListComponent,
    HardSkillListComponent,
    ProyectListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
