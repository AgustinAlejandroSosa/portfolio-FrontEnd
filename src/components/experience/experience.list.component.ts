import { Component, OnInit } from '@angular/core';
import { Experience } from 'src/models/experience';
import { Base64Service } from 'src/services/base64.service';
import { ExperienceService } from 'src/services/experience.service';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-experience-list',
  templateUrl: './experience.list.component.html',
  styleUrls: ['./experience.list.component.css']
})

export class ExperienceListComponent implements OnInit {

  imageFile: File;
  isLogged: boolean = false;
  previewImage: String;

  remaining:number = 150
  experience:Experience;

  date:string;

  constructor(private experienceService:ExperienceService, private tokenService: TokenService, private base64Service: Base64Service) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }

    this.experience = new Experience("","","","")

  }

  onChangeImage(event: any) {
    this.imageFile = event.target.files[0];
    this.base64Service.extraerBase64(this.imageFile).then((img: any) => {
      this.previewImage = img.base;
    })
  }

  onSaveExperience(){

  }

  enviarFecha(){
    let date = new Date(this.date);
    let formattedDate = date.toISOString();

    this.experienceService.sendPhoto(date).subscribe(res => {
      console.log(res);
    })
  }

}
