import { Component, Input, OnInit } from '@angular/core';
import { Skill } from 'src/models/skill';
import { Base64Service } from 'src/services/base64.service';
import { SkillService } from 'src/services/skill.service';
import * as bootstrap from "bootstrap";
import * as $ from 'jquery';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  name: string;
  imageUrl: string;
  editID: string
  editSkill: Skill = new Skill('', '', false);

  logoFile: File;
  previewLogo: string;
  logo: boolean;
  logoDecision: boolean;

  @Input() isLogged: boolean;
  @Input() item: Skill;

  constructor(private skillService: SkillService, private base64Service: Base64Service) { }

  ngOnInit(): void {
    this.editSkill.name = this.item.name;
    this.name = this.item.name;
    if (this.item.imageUrl) {
      this.editSkill.imageUrl = this.item.imageUrl;
      this.imageUrl = this.item.imageUrl;
    } else {
      this.imageUrl = "/assets/img/hardSkillDefault.png";
    }

    this.skillService.getById(this.item.id!).subscribe(res => {
      this.editID = res.id?.toString()!;
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
    this.editSkill = new Skill(this.item.name, this.item.imageUrl, this.item.hard);
    this.openModal();
  }

  onEditSkill() {
    let data = new FormData();

    data.append("name", this.editSkill.name);
    data.append("hard", this.item.hard.toString());
    if (this.logoFile) {
      data.append("logoFile", this.logoFile, this.logoFile.name);
    }

    this.skillService.update(this.item.id!, data).subscribe(res => {
      window.location.reload();
    })
  }

  onDeleteSkill() {
    this.skillService.delete(this.item.id!).subscribe(res => {
      window.location.reload();
    })
  }

  openModal() {
    let myModal = new bootstrap.Modal(document.getElementById(this.editID)!, {
      keyboard: false
    })
    myModal.show();
  }
}
