<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';

import { computed, ref } from 'vue';

import { useVbenForm, useVbenModal, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import {
  modifyPhoneNumberApi,
  sendVerifyCodeApi,
  sendVerifyCodeToMeApi,
} from '#/api';

defineOptions({ name: 'ModifyPhoneNumber' });

const loading = ref(false);
const formApiRef = ref();

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
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('user.userCredential.field.phoneNumber'),
      },
      fieldName: 'phoneNumber',
      label: $t('user.userCredential.field.phoneNumber'),
      rules: 'required',
    },
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
        placeholder: $t('authentication.code'),
        handleSendCode: async () => {
          const values = await formApiRef.value.getValues();
          sendVerifyCodeApi({ receiver: values.phoneNumber });
        },
      },
      fieldName: 'newVerifyCode',
      label: $t('authentication.code'),
      rules: z.string().min(1, { message: $t('authentication.codeTip') }),
    },
  ];
});

async function handleSubmit(values) {
  loading.value = true;
  await modifyPhoneNumberApi(values);
  loading.value = false;
}

const [Form, formApi] = useVbenForm({
  schema: formSchema,
  showDefaultActions: false,
  handleSubmit,
});

formApiRef.value = formApi;

const [Modal, modalApi] = useVbenModal({
  title: $t('user.modifyPhoneNumber'),
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
