export class Profile{
  id?:number
  imageUrl:string
  name:string  
  position:string
  description:string
  constructor( name:string, position:string, description:string){
    this.description = description
    this.name = name
    this.position = position
  }
}