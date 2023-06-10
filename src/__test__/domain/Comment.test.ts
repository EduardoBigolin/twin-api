import { faker } from "@faker-js/faker";
import { describe, it } from "vitest";
import { Comment } from "../../domain/comment/Comment";
import { User } from "../../domain/user/User";

// describe("Comment", () => {
//   it("should validate comment", () => {
//     const input = {
//       name: faker.name.fullName(),
//       email: faker.internet.email(),
//       password: faker.internet.password(),
//     };
//     const user = new User({
//       name: input.name,
//       email: input.email,
//       password: input.password,
//     });
//     const comment = new Comment({
//       userId: user.getId(),
//       productId: "1",
//       comment: "This is a comment",
//     });
//     expect(comment).to;
//   }
// });
