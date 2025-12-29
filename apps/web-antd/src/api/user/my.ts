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

export async function setPasswordByPhoneApi(param: any) {
  return requestClient.post(
    '/user/my/credential/password-by-phone-number',
    param,
  );
}

export async function modifyUsernameApi(param: any) {
  return requestClient.post('/user/my/credential/username', param);
}

export async function modifyPhoneNumberApi(param: any) {
  return requestClient.post('/user/my/credential/phone-number', param);
}
