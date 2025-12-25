import { requestClient } from '#/api/request';

export interface UserCredentialModel {
  username?: string;
  phoneNumber?: string;
}

export async function loadMyUserCredentialApi() {
  return requestClient.get('/user/my/credential');
}

export async function deleteUserApi() {
  return requestClient.post('/user/my/delete');
}

export async function modifyPasswordApi(param: any) {
  return requestClient.post('/user/my/credential/password', param);
}

export async function modifyUsernameApi(param: any) {
  return requestClient.post('/user/my/credential/username', param);
}

export async function modifyPhoneNumberApi(param: any) {
  return requestClient.post('/user/my/credential/phone-number', param);
}
