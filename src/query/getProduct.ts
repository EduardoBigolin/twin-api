import { PrismaClient } from "@prisma/client";

export class GetProductById {
  public prisma = new PrismaClient();
  async execute(id: string) {
    const product = await this.prisma.product.findUnique({
      where: {
        id: id,
      },
      include: {
        Comment: {
          select: {
            content: true,
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });
    if (!product) return null;
    return {
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      priceOriginal: product.price,
      priceDiscount:
        product.discount > 2
          ? (product.price * product.discount) / 100
          : product.price,
      comments: product.Comment.map((comment) => {
        return {
          comment: comment.content,
          userId: comment.user.name,
        };
      }),
    };
  }
}
