import { ActiveUserReturnType, UserModel } from "./../../models/User";
import { Query, Resolver, Arg } from "type-graphql";
import { ReturnType } from "../query/ActiveUserReturnType";

@Resolver()
export class QueryResolver {
  @Query(() => String, { nullable: false })
  async hello(@Arg("name") name: string): Promise<string> {
    return `Hello ${name}`;
  }

  @Query(() => ActiveUserReturnType, { nullable: true })
  async activeUser(@Arg("id") id: string): Promise<ReturnType> {
    const user = await UserModel.findById(id);

    if (!user) {
      return {
        user: null!,
        errorMessage: "User does not exists"
      };
    }

    return {
      user,
      errorMessage: "No error."
    };
  }
}
