<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';

import { ref } from 'vue';

import { useVbenForm, useVbenModal, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { bindEmailApi, sendVerifyCodeApi } from '#/api';

defineOptions({ name: 'BindEmail' });

const loading = ref(false);
const formApiRef = ref();

const formSchema: VbenFormSchema[] = [
  {
    component: 'VbenInput',
    componentProps: {
      placeholder: $t('user.userCredential.field.email'),
    },
    fieldName: 'email',
    label: $t('user.userCredential.field.email'),
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
        sendVerifyCodeApi({ username: values.email });
      },
    },
    fieldName: 'verifyCode',
    label: $t('authentication.code'),
    rules: z.string().min(1, { message: $t('authentication.codeTip') }),
  },
];

async function handleSubmit(values: Record<string, any>) {
  loading.value = true;
  bindEmailApi(values).finally(() => {
    loading.value = false;
  });
}

const [Form, formApi] = useVbenForm({
  schema: formSchema,
  showDefaultActions: false,
  handleSubmit,
});

formApiRef.value = formApi;

const [Modal, modalApi] = useVbenModal({
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { values, disabled } = modalApi.getData<Record<string, any>>();
      if (values) {
        formApi.setValues(values);
      }
      const enableEdit = !!disabled;
      formApi.setState({ commonConfig: { disabled: enableEdit } });
    }
  },
  onConfirm: async () => {
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    await formApi.submitForm();
    modalApi.close();
  },
  title: $t('profile.securitySetting.bindEmail'),
});
</script>

<template>
  <Modal>
    <Form />
  </Modal>
</template>
