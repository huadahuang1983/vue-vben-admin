import { $t } from '@vben/locales';

import { requestClient } from '#/api/request';

export interface SendVerifyCodeParams {
  username?: string;
  captchaId?: string;
  captchaCode?: string;
}

/** 登录接口参数 */
export interface CodeLoginParams {
  username: string;
  verifyCode: string;
}

export interface QrcodeSessionResult {
  sessionId: string;
  expireIn: number;
}

export interface ClientRegistrationResult {
  registrationId: string;
  iconName: string;
  iconColor?: string;
}

export interface OAuth2CodeLoginParam {
  registrationId: any;
  code: any;
  state: any;
}

export interface OAuth2AuthorizationConsentInfo {
  clientId: string;
  clientName: string;
  clientDescription?: string;
  clientIcon?: string;
  scopes: string[];
  redirectUri: string;
  state?: string;
}

/**
 * 发送验证验证码，支持短信和邮件模式
 */
export async function sendVerifyCodeApi(data: SendVerifyCodeParams) {
  return requestClient.post<any>('/auth/send-verification-code', data);
}

export async function sendVerifyCodeToMeApi(type?: 'email' | 'sms') {
  return requestClient.post<any>(
    `/user/my/verify-code/send?type=${type || 'sms'}`,
  );
}

export async function forgetPasswordSendApi(data: SendVerifyCodeParams) {
  return requestClient.post<any>('/user/forget-password/send', data);
}

/**
 * 重置密码
 */
export async function forgetResetPasswordApi(query: string, param: any) {
  return requestClient.post(`/user/forget-reset-password${query}`, param);
}

/**
 * 注册用户
 */
export async function registerApi(param: any) {
  return requestClient.post<boolean>('/user/register', param);
}

/**
 * 获取二维码登录的会话信息
 */
export async function loadQrcodeSessionApi() {
  return requestClient.post<QrcodeSessionResult>('/user/auth/qrcode/create');
}

/**
 * 加载所有三方平台进行Oauth2登录认证
 */
export async function loadAllOauth2PlatformApi() {
  return requestClient.get<ClientRegistrationResult[]>(
    '/oauth2/client-registration/icons',
  );
}

/**
 * 获取指定平台的Oauth2授权地址
 */
export async function loadOauth2AuthorizeUrlApi(registrationId: string) {
  const body = await requestClient.get(
    `/oauth2/authorization/${registrationId}`,
    {
      responseReturn: 'raw',
    },
  );
  return body.data;
}

export async function checkOauth2UserBindApi(params: any) {
  return requestClient.post(`/oauth2/user/check-bind`, params);
}

/**
 * Oauth2登录成功后的用户绑定，即外部用户编号与内部用户编号绑定
 */
export function oauth2BindUserApi(params: any) {
  return requestClient.post('/oauth2/user/bind', params);
}

/**
 * 获取OAuth2授权确认页面信息
 */
export async function loadOAuth2AuthorizationConsentInfoApi(clientId: string) {
  return requestClient.get<OAuth2AuthorizationConsentInfo>(
    `/oauth2/registered-client/authorization-consent/info/${clientId}`,
  );
}

/**
 * Oauth2授权后的回调，提交code到后端进行认证
 */
export async function oauth2CodeAuthenticationApi(
  params: OAuth2CodeLoginParam,
) {
  const body = await requestClient.get(
    `/login/oauth2/code/${params.registrationId}?code=${params.code}&state=${params.state}`,
    {
      responseReturn: 'raw',
    },
  );
  return body.data;
}

export function createPincodeText(countdown: number) {
  const text =
    countdown > 0
      ? $t('authentication.sendText', [countdown])
      : $t('authentication.sendCode');
  return text;
}

export interface SecurityPredictModel {
  username?: string;
  requireCaptcha?: boolean;
}

/**
 * 加载验证码
 */
export async function loadCaptchaApi(params: any) {
  return requestClient.post('captcha/get', params);
}

export interface VerifyCodePredictModel {
  username: string;
  requireCaptcha?: boolean;
}

/**
 * 加载发送验证码的相关提示信息
 */
export async function loadVerifyCodePredictApi(params: VerifyCodePredictModel) {
  return requestClient.post<VerifyCodePredictModel>(
    '/message/verify-code/predict',
    params,
  );
}

export async function configUserCredentialByUserIdApi(
  userId: string,
  params: any,
) {
  return requestClient.post(`/user/credential/config/${userId}`, params);
}

/**
 * 部分oauth2认证平台通过打开新的窗口进行授权认证
 */
export function openWindow(
  openUrl: string,
  name: string,
  callback?: (e: MessageEvent) => void,
  mode: number = 0,
) {
  if (mode === 1) {
    // 获取屏幕宽度和高度
    const width = screen.width * 0.5;
    const height = screen.height * 0.5;
    const left = (screen.width - width) / 2;
    const top = (screen.height - height) / 2;
    const features = `height=${height}, width=${width}, top=${top}, left=${
      left
    }, toolbar=no, menubar=no, scrollbars=no, resizable=no,location=n o, status=no`;
    window.open(openUrl, name, features);
  } else {
    window.open(openUrl, name);
  }
  window.addEventListener(
    'message',
    (e) => {
      if (callback) {
        callback(e);
      }
    },
    false,
  );
}
