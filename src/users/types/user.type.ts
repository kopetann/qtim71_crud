import { UserEntity } from "@app/users/user.entity";

export type UserType = Omit<UserEntity, "hashPass">