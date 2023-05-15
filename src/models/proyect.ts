export class Proyect {
  id?:number
  title: string
  imageUrl: string
  description: string
  date: string
  repositoryLink: string
  constructor(title: string, imageUrl: string, description: string, date: string, repositoryLink: string) {
    this.title = title
    this.imageUrl = imageUrl
    this.description = description
    this.date = date
    this.repositoryLink = repositoryLink
  }
}