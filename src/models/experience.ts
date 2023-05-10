export class Experience {
  imageUrl: string
  title: string
  description: string
  date: string
  constructor(imageUrl: string, title: string, date: string, description: string) {
    this.date = date
    this.title = title
    this.description = description
    this.imageUrl = imageUrl
  }
}