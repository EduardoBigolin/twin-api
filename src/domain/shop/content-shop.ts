import { Exaction, StatusCode } from "../common/Exaction";

export class ContentPage {
  public title: string;
  public content: string;

  private validate(title: string, content: string) {
    if (!title) {
      throw new Exaction("Title is required", StatusCode.BAD_REQUEST);
    }
    if (!content) {
      throw new Exaction("Content is required", StatusCode.BAD_REQUEST);
    }
  }

  constructor(title: string, content: string) {
    this.validate(title, content);
    this.title = title;
    this.content = content;
  }
}
