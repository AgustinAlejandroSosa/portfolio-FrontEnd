import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-proyect',
  templateUrl: './proyect.component.html',
  styleUrls: ['./proyect.component.css']
})
export class ProyectComponent {
  title: string = "title"
  stack: string = "Js Bootstrap & MERN"
  link: string = "https://www.github.com/AgustinAlejandroSosa"
  description: string = "20/08/2021"
  deployLink?: string
  @Input() isLogged: boolean;
}
