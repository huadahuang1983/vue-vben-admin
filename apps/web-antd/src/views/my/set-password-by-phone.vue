<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';

import { computed, ref } from 'vue';

import { useVbenForm, useVbenModal, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { sendVerifyCodeToMeApi, setPasswordByPhoneApi } from '#/api';

defineOptions({ name: 'SetPasswordByPhone' });

const loading = ref(false);

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenPinInput',
      componentProps: {
        createText: (countdown: number) => {
          const text =
            countdown > 0
              ? $t('authentication.sendText', [countdown])
              : $t('authentication.sendCode');
          return text;
        },
        placeholder: $t('my.securitySetting.oldVerifyCode'),
        handleSendCode: () => {
          sendVerifyCodeToMeApi({});
        },
      },
      fieldName: 'verifyCode',
      label: $t('my.securitySetting.oldVerifyCode'),
      rules: z.string().min(1, { message: $t('authentication.codeTip') }),
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

async function handleSubmit(values: any) {
  loading.value = true;
  await setPasswordByPhoneApi({
    verifyCode: values.verifyCode,
    password: values.password,
  });
  loading.value = false;
}

const [Form, formApi] = useVbenForm({
  schema: [...formSchema.value],
  showDefaultActions: false,
  handleSubmit,
});

const [Modal, modalApi] = useVbenModal({
  title: $t('user.modifyPassword'),
  onConfirm: async () => {
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    await formApi.submitForm();
    modalApi.close();
  },
});
</script>

<template>
  <Modal>
    <Form />
  </Modal>
</template>
