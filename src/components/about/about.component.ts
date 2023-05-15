import { Component, OnInit } from '@angular/core';
import { Image } from 'src/models/Image';
import { Banner } from 'src/models/banner';
import { Profile } from 'src/models/profile';
import { BannerService } from 'src/services/banner.service';
import { Base64Service } from 'src/services/base64.service';
import { ImageService } from 'src/services/image.service';
import { ProfileService } from 'src/services/profile.service';
import { TokenService } from 'src/services/token.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  remaining: number = 300;
  isLogged: boolean = false;;
  bannerFile: File;
  profileFile: File;
  bannerImg: string;
  previewBanner: string
  previewProfile: string

  profile: Profile;
  name: string;
  position: string;
  description: string;
  profileImg: string;

  constructor(private tokenService: TokenService, private bannerService: BannerService, private profileService: ProfileService, private base64Service: Base64Service) { }

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    }

    this.bannerService.get().subscribe(res => {
      if (res != null) {
        this.bannerImg = res.url;
      }
    });

    this.profileService.get().subscribe(res => {
      if (res != null) {
        this.name = res.name || "Nombre"
        this.position = res.position || "Posición"
        this.description = res.description || "Breve descripción de la persona"
        this.profile = new Profile(res.name || "Nombre", res.position || "Posición", res.description || "Breve descripción de la persona")

        if (res.imageUrl) {
          this.profileImg = res.imageUrl;
          this.profile.imageUrl = res.imageUrl;
        } else {
          this.profileImg = "../../assets/img/perfil.png"
        }

      } else {
        this.name = "Nombre"
        this.position = "Posición"
        this.description = "Breve descripción de la persona"
        this.profileImg = "../../assets/img/perfil.png"

        this.profile = new Profile("Nombre", "Posición", "Breve descripción de la persona");
        this.profile.imageUrl = "../../assets/img/perfil.png";
      }
    })
  }

  onChangeBanner(event: any) {
    this.bannerFile = event.target.files[0];
    this.base64Service.extraerBase64(this.bannerFile).then((img: any) => {
      this.previewBanner = img.base;
    })
  }

  onSaveBanner() {
    const imageData = new FormData();
    imageData.append('imageFile', this.bannerFile, this.bannerFile.name);
    this.bannerService.create(imageData).subscribe((res) => {
      window.location.reload();
    })
  }

  onDeleteBanner() {
    this.bannerService.delete().subscribe((res) => {
      window.location.reload();
    })
  }

  onChangeProfilePhoto(event: any) {
    this.profileFile = event.target.files[0];
    this.base64Service.extraerBase64(this.profileFile).then((img: any) => {
      this.previewProfile = img.base;
    })
  }

  onSaveProfile() {

    let newProfile: Profile = new Profile(this.profile.name, this.profile.position, this.profile.description);
    this.profileService.create(newProfile).subscribe(res => {
      window.location.reload();
    })
  }

  onSaveProfilePhoto() {
    const imageData = new FormData();

    imageData.append('imageFile', this.profileFile, this.profileFile.name);

    this.profileService.savePhoto(imageData).subscribe(res => {
      window.location.reload();
    })
  }

  remainingCharacters(description: string) {
    this.remaining = 300 - description.length;
  }

  resetState() {
    this.profile.name = this.name
    this.profile.description = this.description
    this.profile.position = this.position
  }
}
