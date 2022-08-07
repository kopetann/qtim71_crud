import { UserType } from "@app/users/types/user.type";

export interface UserResponseInterface {
  user: UserType & { token: string };
}