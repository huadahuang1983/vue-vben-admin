import { requestClient } from '#/api/request';

export async function loadMyUserInfoApi() {
  return requestClient.get('/user/my/info');
}

export async function updateMyUserInfoApi(param: any) {
  return requestClient.post('/user/my/info', param);
}

export async function loadMyUserCredentialsApi() {
  return requestClient.get('/user/my/credential');
}

export async function changeMyPasswordApi(param: any) {
  return requestClient.post('/user/my/credential/password', param);
}

export async function deleteUserApi() {
  return requestClient.post('/user/my/delete');
}

export async function bindPhoneNumberApi(param: any) {
  return requestClient.post('/user/my/credential/phone-number', param);
}

export async function unbindPhoneNumberApi(param: any) {
  return requestClient.post('/user/my/credential/phone-number/unbind', param);
}

export async function bindEmailApi(param: any) {
  return requestClient.post('/user/my/credential/email', param);
}

export async function unbindEmailApi(param: any) {
  return requestClient.post('/user/my/credential/email/unbind', param);
}

export async function bindPasswordQuestionApi(param: any) {
  return requestClient.post('/user/my/credential/password-question', param);
}
