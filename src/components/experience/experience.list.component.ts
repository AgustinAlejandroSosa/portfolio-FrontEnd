import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/models/experience';
import { Base64Service } from 'src/services/base64.service';
import { ExperienceService } from 'src/services/experience.service';
import { TokenService } from 'src/services/token.service';
import * as bootstrap from "bootstrap";
import * as $ from 'jquery';

@Component({
  selector: 'app-experience-list',
  templateUrl: './experience.list.component.html',
  styleUrls: ['./experience.list.component.css']
})

export class ExperienceListComponent implements OnInit {

  imageFile: File;
  isLogged: boolean = false;
  previewLogo: String;

  remaining: number = 150
  experience: Experience;

  dateSince: string;
  dateTo: string;

  logo: boolean = false;
  logoDecision: boolean = false

  items: Experience[];


  constructor(private experienceService: ExperienceService, private tokenService: TokenService, private base64Service: Base64Service) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }

    this.experience = new Experience("", "", "", "", "");

    this.experienceService.getAll().subscribe(res => {
      this.items = res;
    })
  }

  onChangeLogo(event: any) {
    this.imageFile = event.target.files[0];
    this.base64Service.extraerBase64(this.imageFile).then((img: any) => {
      this.previewLogo = img.base;
    })
  }

  onSaveExperience() {
    let data = new FormData();
    let dateToFormatted = new Date(this.experience.dateTo).toISOString();
    let dateSinceFormatted = new Date(this.experience.dateSince).toISOString();

    data.append("title", this.experience.title);
    data.append("description", this.experience.description);
    data.append("dateSince", dateSinceFormatted)
    data.append("dateTo", dateToFormatted);
    if (this.imageFile) {
      data.append("imageFile", this.imageFile, this.imageFile.name);
    }

    this.experienceService.create(data).subscribe(res => {
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
    this.experience = new Experience("", "", "", "", "");
  }
}
