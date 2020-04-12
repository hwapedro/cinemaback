import { ObjectId } from '~/types';
import { Ref } from '@typegoose/typegoose';

export const oidToString = (s: ObjectId | Ref<any, any>) => s.toString();