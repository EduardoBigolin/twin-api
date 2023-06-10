import { Comment } from "./Comment";

export interface CommentRepository {
  create(comment: Comment): Promise<Comment>;
}
