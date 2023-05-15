export class Experience {
  id?:number
  imageUrl: string
  title: string
  description: string
  dateSince: string
  dateTo:string
  constructor(imageUrl: string, title: string, dateSince: string,dateTo:string, description: string) {
    this.dateSince = dateSince
    this.dateTo = dateTo
    this.title = title
    this.description = description
    this.imageUrl = imageUrl
  }
}