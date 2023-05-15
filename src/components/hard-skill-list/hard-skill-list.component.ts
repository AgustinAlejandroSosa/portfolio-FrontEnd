import { Component, OnInit } from '@angular/core';
import { Skill } from 'src/models/skill';
import { Base64Service } from 'src/services/base64.service';
import { SkillService } from 'src/services/skill.service';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-hard-skill-list',
  templateUrl: './hard-skill-list.component.html',
  styleUrls: ['./hard-skill-list.component.css']
})
export class HardSkillListComponent implements OnInit {

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

    this.skillService.getHardSkills().subscribe(res => {
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
    data.append("hard", "true");
    if (this.logoFile) {
      data.append("logoFile", this.logoFile, this.logoFile.name);
    }

    this.skillService.create(data).subscribe(res => {
      window.location.reload();
    })
  }
}
