<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';

import { computed, ref } from 'vue';

import { useVbenForm, useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { modifyUsernameApi } from '#/api';

defineOptions({ name: 'ModifyUsername' });

const loading = ref(false);

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: $t('my.securitySetting.oldPassword'),
        autocomplete: 'off',
      },
      fieldName: 'password',
      label: $t('my.securitySetting.oldPassword'),
      rules: 'required',
    },
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('authentication.username'),
      },
      fieldName: 'username',
      label: $t('authentication.username'),
      rules: 'required',
    },
  ];
});

async function handleSubmit(values) {
  loading.value = true;
  await modifyUsernameApi(values);
  loading.value = false;
}

const [Form, formApi] = useVbenForm({
  schema: formSchema,
  showDefaultActions: false,
  handleSubmit,
});

const [Modal, modalApi] = useVbenModal({
  title: $t('user.modifyUsername'),
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
