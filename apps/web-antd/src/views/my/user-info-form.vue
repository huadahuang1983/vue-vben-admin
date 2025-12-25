<script lang="ts" setup>
import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useVbenForm } from '#/adapter/form';
import { updateMyUserInfoApi } from '#/api';

defineOptions({
  name: 'UserInfoDrawer',
});
const [Form, formApi] = useVbenForm({
  schema: [
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'nickname',
      label: $t('user.userInfo.field.nickname'),
      rules: 'required',
      description: '',
    },
    {
      component: 'DataDictRadioGroup',
      componentProps: {
        class: 'mr-2',
        dictType: 'Gender',
      },
      fieldName: 'gender',
      label: $t('user.userInfo.field.gender'),
      rules: '',
      description: '',
    },
    {
      component: 'DataDictSelect',
      componentProps: {
        class: 'mr-2',
        dictType: 'Language',
      },
      fieldName: 'locale',
      label: $t('user.userInfo.field.locale'),
      rules: '',
      description: '',
    },
    {
      component: 'Textarea',
      componentProps: {
        class: 'mr-2',
        rows: 4,
      },
      fieldName: 'description',
      label: $t('user.userInfo.field.description'),
      rules: '',
      description: '',
    },
  ],
  showDefaultActions: false,
  handleSubmit: onSubmit,
});

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm: async () => {
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    await formApi.submitForm();
    drawerApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { values, disabled } = drawerApi.getData<Record<string, any>>();
      if (values) {
        formApi.setValues(values);
      }
      if (disabled) {
        formApi.setState({ commonConfig: { disabled } });
      }
    }
  },
  title: '用户信息',
});

async function onSubmit(values: any) {
  const formData = drawerApi.getData().values;
  values.userId = formData.userId;
  await updateMyUserInfoApi(values);
  drawerApi.setData({ success: true });
}
</script>
<template>
  <Drawer class="w-[600px]">
    <Form />
  </Drawer>
</template>
