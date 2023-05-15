export class Skill {
  id?:number
  name: string
  imageUrl: string
  hard:boolean
  constructor (name:string, imageUrl:string,hard:boolean){
    this.name = name
    this.imageUrl = imageUrl
    this.hard = hard
  }
}