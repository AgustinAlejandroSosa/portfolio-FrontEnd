import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  name:string="Agustín Sosa"
  position:string="Desarrollador"
  description:string="Soy un jóven emprendedor que se encuentra en constante movimiento, familizarizado desde temprana edad con la tecnología y apasionado por enfocar sus beneficios al servicio de las personas. Poseo un proyecto propio en el cuál busco integrar al mundo digital a nuevos emprendimientos locales."
}
