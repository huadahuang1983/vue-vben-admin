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
      fieldName: 'messageTemplateId',
      label: $t('message.messageHistory.field.messageTemplateId'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'title',
      label: $t('message.messageHistory.field.title'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'mediumType',
      label: $t('message.messageHistory.field.mediumType'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'messageType',
      label: $t('message.messageHistory.field.messageType'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'messageGroup',
      label: $t('message.messageHistory.field.messageGroup'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'bizType',
      label: $t('message.messageHistory.field.bizType'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'receiverId',
      label: $t('message.messageHistory.field.receiverId'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'sendTime',
      label: $t('message.messageHistory.field.sendTime'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'senderName',
      label: $t('message.messageHistory.field.senderName'),
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
      label: $t('message.messageHistory.field.content'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'attachments',
      label: $t('message.messageHistory.field.attachments'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'channelId',
      label: $t('message.messageHistory.field.channelId'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'outTemplateId',
      label: $t('message.messageHistory.field.outTemplateId'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'status',
      label: $t('message.messageHistory.field.status'),
      rules: '',
      description: '',
    },
  ];
}

export function useGridFormSchema(): VbenFormSchema[] {
  return [
    {
      component: 'Input',
      fieldName: 'title',
      label: $t('message.messageHistory.field.title'),
    },
    {
      component: 'Input',
      fieldName: 'content',
      label: $t('message.messageHistory.field.content'),
    },
    {
      component: 'Input',
      fieldName: 'receiverId',
      label: $t('message.messageHistory.field.receiverId'),
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
      field: 'title',
      title: $t('message.messageHistory.field.title'),
      cellRender: {
        name: 'CellValueLink',
        attrs: {
          onClick: onActionClick,
        },
      },
    },
    {
      field: 'mediumType',
      title: $t('message.messageHistory.field.mediumType'),
    },
    {
      field: 'messageType',
      title: $t('message.messageHistory.field.messageType'),
    },
    { field: 'bizType', title: $t('message.messageHistory.field.bizType') },
    {
      field: 'receiverId',
      title: $t('message.messageHistory.field.receiverId'),
    },
    { field: 'sendTime', title: $t('message.messageHistory.field.sendTime') },
    {
      field: 'senderName',
      title: $t('message.messageHistory.field.senderName'),
    },
    { field: 'channelId', title: $t('message.messageHistory.field.channelId') },
    { field: 'status', title: $t('message.messageHistory.field.status') },
    {
      field: 'deliveryStatus',
      title: $t('message.messageHistory.field.deliveryStatus'),
    },
    {
      field: 'deliveryTime',
      title: $t('message.messageHistory.field.deliveryTime'),
    },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'title',
          nameTitle: $t('message.messageHistory.name'),
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
