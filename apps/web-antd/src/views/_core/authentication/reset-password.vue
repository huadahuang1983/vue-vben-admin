<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';
import type { Recordable } from '@vben/types';

import type { ResetPasswordParam } from '#/api';

import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { AuthenticationRegister, z } from '@vben/common-ui';
import { LOGIN_PATH } from '@vben/constants';
import { $t } from '@vben/locales';

import { resetPasswordApi } from '#/api';

defineOptions({ name: 'ResetPassword' });

const loading = ref(false);
const router = useRouter();
const query = router.currentRoute.value.query;
const username = query.username;
const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('authentication.usernameTip'),
      },
      defaultValue: username,
      disabled: true,
      fieldName: 'username',
      label: $t('authentication.username'),
      rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
    },
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('authentication.codeTip'),
        autocomplete: 'off',
      },
      fieldName: 'verifyCode',
      label: $t('authentication.username'),
      rules: z.string().min(1, { message: $t('authentication.code') }),
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        passwordStrength: true,
        placeholder: $t('authentication.password'),
      },
      fieldName: 'password',
      label: $t('authentication.password'),
      renderComponentContent() {
        return {
          strengthText: () => $t('authentication.passwordStrength'),
        };
      },
      rules: z.string().min(1, { message: $t('authentication.passwordTip') }),
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: $t('authentication.confirmPassword'),
      },
      dependencies: {
        rules(values) {
          const { password } = values;
          return z
            .string()
            .min(1, { message: $t('authentication.passwordTip') })
            .refine((value) => value === password, {
              message: $t('authentication.confirmPasswordTip'),
            });
        },
        triggerFields: ['password'],
      },
      fieldName: 'confirmPassword',
      label: $t('authentication.confirmPassword'),
      rules: z.string().min(1, { message: $t('authentication.passwordTip') }),
    },
  ];
});

async function handleSubmit(value: Recordable<any>) {
  try {
    loading.value = true;
    const resetPasswordParam: ResetPasswordParam = {
      username: value.username,
      verifyCode: value.verifyCode,
      password: value.password,
      confirmPassword: value.confirmPassword,
    };
    await resetPasswordApi(resetPasswordParam);
    router.push(LOGIN_PATH);
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.error('Reset password failed:', error);
  }
}
</script>

<template>
  <AuthenticationRegister
    :form-schema="formSchema"
    :loading="loading"
    @submit="handleSubmit"
  >
    <template #title>
      {{ $t('auth.resetPassword') }}
    </template>
    <template #subTitle>
      {{ $t('auth.resetPasswordDescription') }}
    </template>
  </AuthenticationRegister>
</template>
