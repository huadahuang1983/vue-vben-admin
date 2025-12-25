<script lang="ts" setup>
import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useVbenForm } from '#/adapter/form';
import { saveMessageTemplateApi } from '#/api';

defineOptions({
  name: 'MessageTemplateDrawer',
});
const [Form, formApi] = useVbenForm({
  schema: [
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'templateCode',
      label: $t('message.messageTemplate.field.templateCode'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'title',
      label: $t('message.messageTemplate.field.title'),
      rules: 'required',
      description: '',
    },
    {
      component: 'DataDictRadioGroup',
      componentProps: {
        class: 'mr-2',
        dictType: 'MediumType',
      },
      fieldName: 'mediumType',
      label: $t('message.messageTemplate.field.mediumType'),
      rules: 'required',
      description: '',
    },
    {
      component: 'DataDictRadioGroup',
      componentProps: {
        class: 'mr-2',
        dictType: 'MessageType',
      },
      fieldName: 'messageType',
      label: $t('message.messageTemplate.field.messageType'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'messageGroup',
      label: $t('message.messageTemplate.field.messageGroup'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'bizType',
      label: $t('message.messageTemplate.field.bizType'),
      rules: '',
      description: '',
    },
    {
      component: 'Textarea',
      componentProps: {
        class: 'mr-2',
        rows: 4,
      },
      fieldName: 'content',
      label: $t('message.messageTemplate.field.content'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'attachments',
      label: $t('message.messageTemplate.field.attachments'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'channelId',
      label: $t('message.messageTemplate.field.channelId'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'outTemplateId',
      label: $t('message.messageTemplate.field.outTemplateId'),
      rules: '',
      description: '',
    },
    {
      component: 'DataDictRadioGroup',
      componentProps: {
        class: 'mr-2',
        dictType: 'GenericStatus',
      },
      fieldName: 'status',
      label: $t('message.messageTemplate.field.status'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Switch',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'enablePending',
      label: $t('message.messageTemplate.field.enablePending'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Switch',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'enableDelivery',
      label: $t('message.messageTemplate.field.enableDelivery'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'deliveryStartTime',
      label: $t('message.messageTemplate.field.deliveryStartTime'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'deliveryEndTime',
      label: $t('message.messageTemplate.field.deliveryEndTime'),
      rules: '',
      description: '',
    },
    {
      component: 'Switch',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'isBatchSend',
      label: $t('message.messageTemplate.field.isBatchSend'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Switch',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'isSeparateSend',
      label: $t('message.messageTemplate.field.isSeparateSend'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Textarea',
      componentProps: {
        class: 'mr-2',
        rows: 4,
      },
      fieldName: 'param',
      label: $t('message.messageTemplate.field.param'),
      rules: '',
      description: '',
    },
    {
      component: 'Textarea',
      componentProps: {
        class: 'mr-2',
        rows: 4,
      },
      fieldName: 'remark',
      label: $t('message.messageTemplate.field.remark'),
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
  title: $t('message.messageTemplate.title'),
});

async function onSubmit(values: any) {
  const formData = drawerApi.getData().values;
  values.messageTemplateId = formData.messageTemplateId;
  await saveMessageTemplateApi(values);
  drawerApi.setData({ success: true });
}
</script>
<template>
  <Drawer class="w-[600px]">
    <Form />
  </Drawer>
</template>
