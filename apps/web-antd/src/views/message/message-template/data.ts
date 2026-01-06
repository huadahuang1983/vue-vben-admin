import type { VbenFormSchema } from '#/adapter/form';
import type { OnActionClickFn, VxeTableGridOptions } from '#/adapter/vxe-table';

import { $t } from '#/locales';

export function useFormSchema(): VbenFormSchema[] {
  return [
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
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'templateCode',
      label: $t('message.messageTemplate.field.templateCode'),
    },
    {
      component: 'Input',
      fieldName: 'title',
      label: $t('message.messageTemplate.field.title'),
    },
  ];
}

export function useColumns(
  onActionClick: OnActionClickFn,
): VxeTableGridOptions['columns'] {
  return [
    { title: $t('common.sequence'), type: 'seq', width: 50 },
    { align: 'left', type: 'checkbox', width: 50 },
    {
      field: 'templateCode',
      title: $t('message.messageTemplate.field.templateCode'),
      cellRender: { name: 'CellValueLink', attrs: { onClick: onActionClick } },
    },
    { field: 'title', title: $t('message.messageTemplate.field.title') },
    {
      field: 'mediumType',
      title: $t('message.messageTemplate.field.mediumType'),
      cellRender: {
        attrs: {
          dictType: 'MediumType',
        },
        name: 'CellDataDictTag',
      },
    },
    {
      field: 'messageType',
      title: $t('message.messageTemplate.field.messageType'),
      cellRender: {
        attrs: {
          dictType: 'MessageType',
        },
        name: 'CellDataDictTag',
      },
    },
    { field: 'bizType', title: $t('message.messageTemplate.field.bizType') },
    {
      field: 'channelId',
      title: $t('message.messageTemplate.field.channelId'),
    },
    {
      field: 'status',
      title: $t('message.messageTemplate.field.status'),
      cellRender: {
        attrs: {
          dictType: 'GenericStatus',
        },
        name: 'CellDataDictTag',
      },
    },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'templateName',
          nameTitle: $t('message.messageTemplate.name'),
          onClick: onActionClick,
        },
        name: 'CellOperation',
      },
      field: 'operation',
      fixed: 'right',
      title: $t('common.operation'),
      width: 130,
    },
  ];
}
