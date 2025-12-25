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

export interface OAuth2AuthenticationResult {
  accessToken: string;
  expireAt: Date;
  redirectUrl: string;
}

export interface OAuth2BindParam {
  securityId: any;
  username?: string;
  password?: string;
  receiver?: string;
  verifyCode?: string;
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

export interface OAuth2CodeLoginResult {
  redirectUrl: string;
  securityId: string;
  isBound: boolean;
  accessToken: string;
}

/**
 * 发送验证验证码，支持短信和邮件模式
 * @param data
 * @returns
 */
export async function sendVerifyCodeApi(data: SendVerifyCodeParams) {
  return requestClient.post<any>('/message/verify-code/send', data);
}

export async function sendVerifyCodeToMeApi(data: SendVerifyCodeParams) {
  return requestClient.post<any>('/user/verify-code/send-me', data);
}

export interface ResetPasswordParam {
  username: string;
  verifyCode: string;
  password: string;
  confirmPassword: string;
}

/**
 * 重置密码
 * @param param
 */
export async function resetPasswordApi(param: ResetPasswordParam) {
  return requestClient.post('/user/reset-password', param);
}

/**
 * 注册用户
 * @param param zhu
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
    '/oauth2/client-registration/all',
  );
}

/**
 * 获取指定平台的Oauth2授权地址
 */
export function loadOauth2AuthorizeUrlApi(params: string) {
  return requestClient.get<string>(`/oauth2/authorization/${params}`);
}

/**
 * Oauth2登录成功后的用户绑定，即外部用户编号与内部用户编号绑定
 */
export function oauth2BindUserApi(params: OAuth2BindParam) {
  return requestClient.post<OAuth2AuthenticationResult>(
    '/oauth2/client-registration/bind',
    params,
  );
}

/**
 *  Oauth2授权后的回调，提交code到后端进行认证
 */
export async function oauth2CodeAuthenticationApi(
  params: OAuth2CodeLoginParam,
) {
  return requestClient.get<OAuth2CodeLoginResult>(
    `/login/oauth2/code/${params.registrationId}?code=${params.code}&state=${params.state}`,
  );
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
 * 加载认证相关提示信息
 * @param param j
 */
export async function loadAuthPredictApi(params: SecurityPredictModel) {
  return requestClient.post<SecurityPredictModel>('/auth/predict', params);
}

/**
 * 加载验证码
 * @param params
 * @returns
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
 * @param param j
 */
export async function loadVerifyCodePredictApi(params: VerifyCodePredictModel) {
  return requestClient.post<VerifyCodePredictModel>(
    '/message/verify-code/predict',
    params,
  );
}

/**
 * 部分oauth2认证平台通过打开新的窗口进行授权认证
 * @param openUrl
 * @param name
 * @param callback
 * @param mode
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
