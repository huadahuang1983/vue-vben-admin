<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';
import type { Recordable } from '@vben/types';

import { computed, ref } from 'vue';

import { AuthenticationCodeLogin, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { message } from 'ant-design-vue';

import { sendVerifyCodeApi } from '#/api';
import { useAuthStore } from '#/store';

defineOptions({ name: 'CodeLogin' });

const loading = ref(false);
const CODE_LENGTH = 6;
const authStore = useAuthStore();
const phoneNumber = ref();
const sendCodeDisabled = ref(true);

function handleSendCode() {
  if (!phoneNumber.value || !/^\d{11}$/.test(phoneNumber.value)) {
    message.warn($t('message.verifyCode.receiverRequired'));
    return;
  }
  sendVerifyCodeApi({ username: phoneNumber.value });
}

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('authentication.mobile'),
        onInput: (event: InputEvent) => {
          const value = (event.target as HTMLInputElement).value;
          if (value && /^\d{11}$/.test(value)) {
            sendCodeDisabled.value = false;
            phoneNumber.value = value;
          } else {
            sendCodeDisabled.value = true;
          }
        },
      },
      fieldName: 'phoneNumber',
      label: $t('authentication.mobile'),
      rules: z
        .string()
        .min(1, { message: $t('authentication.mobileTip') })
        .refine((v) => /^\d{11}$/.test(v), {
          message: $t('authentication.mobileErrortip'),
        }),
    },
    {
      component: 'VbenPinInput',
      componentProps: {
        disabled: sendCodeDisabled,
        codeLength: CODE_LENGTH,
        createText: (countdown: number) => {
          const text =
            countdown > 0
              ? $t('authentication.sendText', [countdown])
              : $t('authentication.sendCode');
          return text;
        },
        handleSendCode,
        placeholder: $t('authentication.code'),
      },
      fieldName: 'code',
      label: $t('authentication.code'),
      rules: z.string().length(CODE_LENGTH, {
        message: $t('authentication.codeTip', [CODE_LENGTH]),
      }),
    },
  ];
});
/**
 * 异步处理登录操作
 * Asynchronously handle the login process
 * @param values 登录表单数据
 */
async function handleLogin(values: Recordable<any>) {
  loading.value = true;
  try {
    await authStore.authLogin({
      phoneNumber: values.phoneNumber,
      code: values.code,
    });
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <AuthenticationCodeLogin
    :form-schema="formSchema"
    :loading="loading"
    @submit="handleLogin"
  />
</template>
