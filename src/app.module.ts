import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { AboutComponent } from './components/about/about.component';
import { EducationComponent } from './components/education/education.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { SoftSkillComponent } from './components/soft-skill/soft.skill.component';
import { ProyectComponent } from './components/proyect/proyect.component';
import { HardSkillComponent } from './components/hard-skill/hard-skill.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AboutComponent,
    EducationComponent,
    ExperienceComponent,
    HardSkillComponent,
    SoftSkillComponent,
    ProyectComponent,
    HardSkillComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
