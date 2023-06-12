import { Comment } from "../../domain/comment/Comment";
import { CommentRepository } from "../../domain/comment/comment-repository";
import { Exception } from "../../domain/common/Exception";
import { StatusCode } from "../../domain/common/status-code";
import { ProductRepository } from "../../domain/product/product-repository";
import { IUserRepository } from "../../domain/user/user-repository";

interface CommentData {
  userId: string;
  productId: string;
  comment: string;
}

interface RepositoryComment {
  readonly commentRepository: CommentRepository;
  readonly userRepository: IUserRepository;
  readonly productRepository: ProductRepository;
}

export class AddComment {
  private readonly commentRepository: CommentRepository;
  private readonly userRepository: IUserRepository;
  private readonly productRepository: ProductRepository;

  constructor(repository: RepositoryComment) {
    this.commentRepository = repository.commentRepository;
    this.userRepository = repository.userRepository;
    this.productRepository = repository.productRepository;
  }

  public async execute(data: CommentData) {
    try {
      const user = await this.userRepository.findById(data.userId);
      if (!user) {
        throw new Exception("User not found", StatusCode.BAD_REQUEST);
      }
      const product = await this.productRepository.getById(data.productId);
      if (!product) {
        throw new Exception("Product not found", StatusCode.BAD_REQUEST);
      }
      const comment = new Comment(data);
      await this.commentRepository.create(comment);

      return {
        statusCode: StatusCode.OK,
        body: {
          message: "Comment created with success",
          comment: comment.id,
        },
      };
    } catch (error: any) {
      return {
        statusCode: error.statusCode,
        body: { response: error.message },
      };
    }
  }
}
