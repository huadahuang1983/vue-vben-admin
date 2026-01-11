<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';

import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { AuthenticationCodeLogin, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { createPincodeText, oauth2BindUserApi, sendVerifyCodeApi } from '#/api';
import { useAuthStore } from '#/store';

defineOptions({ name: 'OAuth2BindUser' });

const authStore = useAuthStore();
const router = useRouter();

const loading = ref(false);
const phoneNumber = ref('');

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('authentication.mobile'),
        onInput: (e: any) => {
          phoneNumber.value = e.target.value;
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
        createText: createPincodeText,
        placeholder: $t('authentication.code'),
        handleSendCode: () => {
          sendVerifyCodeApi({ username: phoneNumber.value });
        },
      },
      fieldName: 'code',
      label: $t('authentication.code'),
      rules: z.string().min(1, { message: $t('authentication.codeTip') }),
    },
  ];
});

async function handleSubmit(params: any) {
  const routeParams = router.currentRoute.value.query;
  const { secretKey } = routeParams;
  const userBind = {
    secretKey,
    username: params.phoneNumber,
    verificationCode: params.code,
  };
  await oauth2BindUserApi(userBind);
  authStore.authLogin({ secretKey });
}
</script>

<template>
  <AuthenticationCodeLogin
    :form-schema="formSchema"
    :loading="loading"
    :title="$t('page.auth.oauth2BindUser')"
    :sub-title="$t('page.auth.oauth2BindUserDescription')"
    :submit-button-text="$t('page.auth.bindUser')"
    @submit="handleSubmit"
  />
</template>
