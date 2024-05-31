import { createAction, props } from "@ngrx/store";
import { UserModel } from "../models/user";


export const setUser = createAction('[UI Component] Set User', props<{user: UserModel}>());
export const unsetUser = createAction('[UI Component] Unset User');