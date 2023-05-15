import { Component, OnInit } from '@angular/core';
import { Proyect } from 'src/models/proyect';
import { Base64Service } from 'src/services/base64.service';
import { ProyectService } from 'src/services/proyect.service';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-proyect-list',
  templateUrl: './proyect-list.component.html',
  styleUrls: ['./proyect-list.component.css']
})
export class ProyectListComponent implements OnInit {

  isLogged: boolean = false;
  items: Proyect[];
  proyect: Proyect;
  date: string;
  remaining: number = 150;

  logo: boolean = false;
  logoDecision: boolean = false;

  imageFile: File
  previewLogo: String

  constructor(private proyectService: ProyectService, private tokenService: TokenService, private base64Service: Base64Service) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }

    this.proyect = new Proyect("", "", "", "", "");

    this.proyectService.getAll().subscribe(res => {
      this.items = res;
    })
  }

  onChangeLogo(event: any) {
    this.imageFile = event.target.files[0];
    this.base64Service.extraerBase64(this.imageFile).then((img: any) => {
      this.previewLogo = img.base;
    })
  }

  addLogo() {
    this.logo = true;
    this.logoDecision = true;
  }

  noLogo() {
    this.logoDecision = true;
  }

  resetLogo() {
    this.logo = false;
    this.logoDecision = false;
    this.proyect = new Proyect("", "", "", "", "");
  }

  onSaveProyect() {
    let data = new FormData();
    let dateFormatted = new Date(this.date).toISOString();

    data.append("title", this.proyect.title);
    data.append("description", this.proyect.description);
    data.append("date", dateFormatted);
    data.append("repositoryLink", this.proyect.repositoryLink);
    if (this.imageFile) {
      data.append("imageFile", this.imageFile, this.imageFile.name);
      console.log(this.imageFile);
    }

    this.proyectService.create(data).subscribe(res => {
      window.location.reload();
    })
  }
}
