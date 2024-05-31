import { UserModel } from "../models/user";


export interface AuthState{
    user: UserModel | null
}