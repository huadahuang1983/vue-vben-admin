<script setup lang="ts">
import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useVbenForm } from '#/adapter/form';
import { uploadFileApi } from '#/api';

const [Form, formApi] = useVbenForm({
  schema: [
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'path',
      label: $t('storage.fileDetail.field.path'),
      rules: '',
      description: '',
    },
    {
      component: 'DataDictRadioGroup',
      componentProps: {
        class: 'mr-2',
        dictType: 'StoragePlatform',
      },
      fieldName: 'platform',
      label: $t('storage.fileDetail.field.platform'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Upload',
      componentProps: {
        beforeUpload,
        maxCount: 1,
        placeholder: $t('common.upload'),
      },
      fieldName: 'fileList',
      label: $t('common.file'),
      rules: 'required',
    },
  ],
  showDefaultActions: false,
  handleSubmit: onSubmit,
});

const [Drawer, drawerApi] = useVbenDrawer({
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
  title: $t('common.upload'),
});

async function onSubmit(values: any) {
  const { fileDetailId } = drawerApi.getData<Record<string, any>>();
  const { platform, path, fileList } = values;
  const file = fileList[0];
  await uploadFileApi(file, platform, path, fileDetailId).then(() => {});
}

function beforeUpload() {
  return false;
}
</script>
<template>
  <Drawer>
    <Form />
  </Drawer>
</template>
