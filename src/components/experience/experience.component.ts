import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Experience } from 'src/models/experience';
import { Base64Service } from 'src/services/base64.service';
import { ExperienceService } from 'src/services/experience.service';
import * as bootstrap from "bootstrap";
import * as $ from 'jquery';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css']
})
export class ExperienceComponent implements OnInit {
  constructor(private base64Service: Base64Service, private experienceService: ExperienceService) {
  }
  imageFile: File;
  experience: Experience;

  previewLogo: String;
  remaining: number = 150

  title: string;
  description: string;
  dateSince: string;
  dateTo: string;

  logo: boolean = false;
  logoDecision: boolean = false

  editDate:boolean = false;
  editDateDecision:boolean = false;
  
  editID: string;

  @Input() isLogged: boolean;
  @Input() item: Experience;
  @Output() fillEditModal = new EventEmitter<number>();


  ngOnInit(): void {
    this.experience = new Experience('', this.item.title, this.item.dateSince, this.item.dateTo, this.item.description);
    if (this.item.imageUrl) {
      this.experience.imageUrl = this.item.imageUrl;
    }
    this.experienceService.getById(this.item.id!).subscribe(res => {
      this.title = res.title
      this.description = res.description
      this.dateSince = res.dateSince
      this.dateTo = res.dateTo
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

  onEditExperience() {
    let data = new FormData();
    let dateToFormatted = new Date(this.dateTo).toISOString();
    let dateSinceFormatted = new Date(this.dateSince).toISOString();

    data.append("title", this.experience.title);
    data.append("description", this.experience.description);
    data.append("dateSince", dateSinceFormatted)
    data.append("dateTo", dateToFormatted);
    if (this.imageFile) {
      data.append("imageFile", this.imageFile, this.imageFile.name);
    }

    this.experienceService.update(this.item.id!, data).subscribe(res => {
      window.location.reload();
    })
  }

  deleteExperience() {
    this.experienceService.delete(this.item.id!).subscribe(res => {
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
    this.experience = new Experience('', this.item.title, this.item.dateSince, this.item.dateTo, this.item.description);
    if (this.item.imageUrl) {
      this.experience.imageUrl = this.item.imageUrl;
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
