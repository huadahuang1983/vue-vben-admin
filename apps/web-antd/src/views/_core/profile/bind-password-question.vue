<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';

import { ref } from 'vue';

import { useVbenForm, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { bindPasswordQuestionApi } from '#/api';

defineOptions({ name: 'BindPasswordQuestion' });

const loading = ref(false);
const formApiRef = ref();

const formSchema: VbenFormSchema[] = [
  {
    component: 'VbenInput',
    componentProps: {
      placeholder: $t('user.userCredential.field.passwordQuestion'),
    },
    fieldName: 'passwordQuestion',
    label: $t('user.userCredential.field.passwordQuestion'),
    rules: 'required',
  },
  {
    component: 'VbenInput',
    componentProps: {
      placeholder: $t('user.userCredential.field.passwordAnswer'),
    },
    fieldName: 'passwordAnswer',
    label: $t('user.userCredential.field.passwordAnswer'),
    rules: 'required',
  },
];

async function handleSubmit(values: Record<string, any>) {
  loading.value = true;
  bindPasswordQuestionApi(values).finally(() => {
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
  title: $t('profile.securitySetting.securityQuestion'),
});
</script>

<template>
  <Modal>
    <Form />
  </Modal>
</template>
