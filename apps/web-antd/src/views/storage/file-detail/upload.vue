<script setup lang="ts">
import { shallowRef } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useVbenForm } from '#/adapter/form';
import { uploadFileApi } from '#/api';
import { FileUploader } from '#/components';

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
      component: shallowRef(FileUploader),
      componentProps: {
        beforeUpload,
        maxCount: 1,
      },
      fieldName: 'file',
      label: $t('common.file'),
      rules: 'required',
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
  title: $t('common.upload'),
});

async function onSubmit(values: any) {
  const { platform, path, file } = values;
  await uploadFileApi(platform, path, file.file).then(() => {
    drawerApi.setData({ success: true });
  });
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
