export class Proyect {
  title: string
  srcImg: string
  description: string
  date: string
  repositoryLink: string
  constructor(title: string, srcImg: string, description: string, date: string, repositoryLink: string) {
    this.title = title
    this.srcImg = srcImg
    this.description = description
    this.date = date
    this.repositoryLink = repositoryLink
  }
}