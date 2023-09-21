import { UserAttributeI } from './user.interface';

export interface DecodedToken {
  payload: UserAttributeI | null;
  expired: boolean | string | Error;
}
