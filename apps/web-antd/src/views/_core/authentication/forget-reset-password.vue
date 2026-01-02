<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';
import type { Recordable } from '@vben/types';

import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

import { AuthenticationRegister, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { forgetResetPasswordApi } from '#/api';

defineOptions({ name: 'ForgetResetPassword' });

const loading = ref(false);
const router = useRouter();

const formSchema = computed((): VbenFormSchema[] => {
  return [
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
    loading.value = true;
    const resetPasswordParam = {
      password: value.password,
    };
    const query = window.location.search;
    forgetResetPasswordApi(query, resetPasswordParam).then(() => {
      router.push({name: 'Login'});
    }).finally(() => {
      loading.value = false;
    });
}
</script>

<template>
  <AuthenticationRegister
    :form-schema="formSchema"
    :loading="loading"
    @submit="handleSubmit"
  >
    <template #title>
      {{ $t('page.auth.resetPassword') }}
    </template>
    <template #subTitle>
      {{ $t('page.auth.resetPasswordDescription') }}
    </template>
    <template #submitButtonText>
      {{ $t('page.auth.resetPassword') }}
    </template>
  </AuthenticationRegister>
</template>
