<script lang="ts" setup>
import type { VbenFormSchema } from '@vben/common-ui';

import { computed, ref } from 'vue';

import { useVbenForm, useVbenModal, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { modifyPasswordApi } from '#/api';

defineOptions({ name: 'ModifyPassword' });

const loading = ref(false);

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: $t('my.securitySetting.oldPassword'),
        autocomplete: 'off',
      },
      fieldName: 'oldPassword',
      label: $t('my.securitySetting.oldPassword'),
      rules: 'required',
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

async function handleSubmit(values) {
  loading.value = true;
  await modifyPasswordApi({
    password: values.oldPassword,
    newPassword: values.password,
  });
  loading.value = false;
}

const [Form, formApi] = useVbenForm({
  schema: formSchema,
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
