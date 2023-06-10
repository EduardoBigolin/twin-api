import { Entity } from "../common/Entity";

export interface IComment {
  userId: string;
  productId: string;
  comment: string;
}

export class Comment extends Entity {
  public userId: string;
  public productId: string;
  public comment: string;

  public validate(comment: string) {
    if (comment.length < 1) {
      throw new Error("Comment must be at least 1 character long");
    }
  }

  constructor(data: IComment) {
    super();
    this.validate(data.comment);
    this.userId = data.userId;
    this.productId = data.productId;
    this.comment = data.comment;
  }
}
