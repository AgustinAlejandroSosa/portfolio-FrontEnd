import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Proyect } from 'src/models/proyect';
import { Base64Service } from 'src/services/base64.service';
import { ProyectService } from 'src/services/proyect.service';
import * as bootstrap from "bootstrap";
import * as $ from 'jquery';

@Component({
  selector: 'app-proyect',
  templateUrl: './proyect.component.html',
  styleUrls: ['./proyect.component.css']
})
export class ProyectComponent implements OnInit {
  constructor(private proyectService: ProyectService, private base64Service: Base64Service) { }

  imageFile: File;
  proyect: Proyect;

  previewLogo: String;
  remaining: number = 150

  title: string;
  description: string;
  date: string;
  repositoryLink: string;

  logo: boolean = false;
  logoDecision: boolean = false

  editDate: boolean = false;
  editDateDecision: boolean = false;

  editID: string;

  @Input() isLogged: boolean;
  @Input() item: Proyect;
  @Output() fillEditModal = new EventEmitter<number>();

  ngOnInit(): void {
    this.proyect = new Proyect(this.item.title, '', this.item.description, this.item.date, this.item.repositoryLink);
    if (this.item.imageUrl) {
      this.proyect.imageUrl = this.item.imageUrl;
    }
    this.proyectService.getById(this.item.id!).subscribe(res => {
      this.title = res.title
      this.description = res.description
      this.date = res.date
      this.repositoryLink = res.repositoryLink
      this.editID = res.id?.toString()!;
    })
  }

  fireEditModal() {
    this.fillEditModal.emit(this.item.id);
    console.log(this.item.id);
  }

  openModal() {
    let myModal = new bootstrap.Modal(document.getElementById(this.editID)!, {
      keyboard: false
    })
    myModal.show();
  }

  onEditProyect() {
    let data = new FormData();
    let dateFormatted = new Date(this.date).toISOString();

    data.append("title", this.proyect.title);
    data.append("description", this.proyect.description);
    data.append("date", dateFormatted);
    data.append("repositoryLink",this.proyect.repositoryLink);
    if (this.imageFile) {
      data.append("imageFile", this.imageFile, this.imageFile.name);
    }

    this.proyectService.update(this.item.id!, data).subscribe(res => {
      window.location.reload();
    })
  }

  onDeleteProyect() {
    this.proyectService.delete(this.item.id!).subscribe(res => {
      window.location.reload();
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
    this.editDate = false;
    this.editDateDecision = false;
    this.proyect = new Proyect(this.item.title, '', this.item.description, this.item.date, this.item.repositoryLink);
    if (this.item.imageUrl) {
      this.proyect.imageUrl = this.item.imageUrl;
    }
    this.openModal();
  }

  onChangeLogo(event: any) {
    this.imageFile = event.target.files[0];
    this.base64Service.extraerBase64(this.imageFile).then((img: any) => {
      this.previewLogo = img.base;
    })
  }

  onEditDate() {
    this.editDate = true;
    this.editDateDecision = true;
  }

  noEditDate() {
    this.editDateDecision = true;
  }

}
