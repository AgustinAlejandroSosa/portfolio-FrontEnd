import { Component } from '@angular/core';
import { Skill } from 'src/models/skill';
import { Base64Service } from 'src/services/base64.service';
import { SkillService } from 'src/services/skill.service';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-soft-skill-list',
  templateUrl: './soft-skill-list.component.html',
  styleUrls: ['./soft-skill-list.component.css']
})
export class SoftSkillListComponent {

  isLogged:boolean = false;
  items:Skill[];
  skill:Skill;
  logo:boolean;
  logoDecision:boolean;

  logoFile:File
  previewLogo:String

  constructor(private tokenService: TokenService, private base64Service:Base64Service, private skillService:SkillService) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }

    this.skill = new Skill('','',false);

    this.skillService.getSoftSkills().subscribe(res =>{
      this.items = res;
    })
  }

  onChangeLogo(event: any) {
    this.logoFile = event.target.files[0];
    this.base64Service.extraerBase64(this.logoFile).then((img: any) => {
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
    this.skill = new Skill("", "", false);
  }

  onSaveSkill() {
    let data = new FormData();

    data.append("name", this.skill.name);
    data.append("hard", "false");
    if (this.logoFile) {
      data.append("logoFile", this.logoFile, this.logoFile.name);
      console.log(this.logoFile);
    }

    this.skillService.create(data).subscribe(res => {
      window.location.reload();
    })
  }
}
