import { atom } from 'recoil';
export const emailState = atom({
  key: 'emailState',
  default: '',
});
export const passwordState = atom({
  key: 'passwordState',
  default: '',
});
export const userDataState = atom({
  key: 'userDataState',
  default: {},
});
