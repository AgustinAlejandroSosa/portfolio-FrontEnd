import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/models/experience';
import { Base64Service } from 'src/services/base64.service';
import { EducationService } from 'src/services/education.service';
import { ExperienceService } from 'src/services/experience.service';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-education-list',
  templateUrl: './education-list.component.html',
  styleUrls: ['./education-list.component.css']
})
export class EducationListComponent implements OnInit {

  imageFile: File;
  isLogged: boolean = false;
  previewLogo: String;

  remaining: number = 150
  education: Experience;

  dateSince: string;
  dateTo: string;

  logo: boolean = false;
  logoDecision: boolean = false
  items: Experience[];


  constructor(private educationService: EducationService, private tokenService: TokenService, private base64Service: Base64Service) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }

    this.educationService.getAll().subscribe(res => {
      this.items = res;
    })
    this.education = new Experience("", "", "", "", "");

  }

  onChangeLogo(event: any) {
    this.imageFile = event.target.files[0];
    this.base64Service.extraerBase64(this.imageFile).then((img: any) => {
      this.previewLogo = img.base;
    })
  }

  onSaveEducation() {
    let data = new FormData();
    let dateToFormatted = new Date(this.dateTo).toISOString();
    let dateSinceFormatted = new Date(this.dateSince).toISOString();

    data.append("title", this.education.title);
    data.append("description", this.education.description);
    data.append("dateSince", dateSinceFormatted)
    data.append("dateTo", dateToFormatted);
    if (this.imageFile) {
      data.append("imageFile", this.imageFile, this.imageFile.name);
    }

    this.educationService.create(data).subscribe(res => {
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
    this.education = new Experience("", "", "", "", "");
  }
}
