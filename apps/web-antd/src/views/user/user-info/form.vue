<script lang="ts" setup>
import { shallowRef } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useVbenForm } from '#/adapter/form';
import { saveUserInfoApi } from '#/api';
import { RandomInput } from '#/components';

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
      fieldName: 'phoneNumber',
      label: $t('user.userInfo.field.phoneNumber'),
      rules: '',
      description: '',
    },
    {
      component: shallowRef(RandomInput),
      componentProps: {
        class: 'mr-2',
        count: 10,
        initValue: true,
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
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'email',
      label: $t('user.userInfo.field.email'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'avatar',
      label: $t('user.userInfo.field.avatar'),
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
      component: 'DataDictRadioGroup',
      componentProps: {
        class: 'mr-2',
        dictType: 'UserStatus',
      },
      fieldName: 'userStatus',
      label: $t('user.userInfo.field.userStatus'),
      rules: 'required',
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
      const enableEdit = !!disabled;
      formApi.setState({ commonConfig: { disabled: enableEdit } });
    }
  },
  title: $t('user.userInfo.title'),
});

async function onSubmit(values: any) {
  const formData = drawerApi.getData().values;
  values.userId = formData.userId;
  await saveUserInfoApi(values);
  drawerApi.setData({ success: true });
}
</script>
<template>
  <Drawer class="w-[600px]">
    <Form />
  </Drawer>
</template>
