import { Exception, StatusCode } from "../common/Exception";

export class ContentPage {
  public title: string;
  public content: string;

  private validate(title: string, content: string) {
    if (!title) {
      throw new Exception("Title is required", StatusCode.BAD_REQUEST);
    }
    if (!content) {
      throw new Exception("Content is required", StatusCode.BAD_REQUEST);
    }
  }

  constructor(title: string, content: string) {
    this.validate(title, content);
    this.title = title;
    this.content = content;
  }
}
