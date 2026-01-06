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
      fieldName: 'title',
      label: $t('message.messageNotification.field.title'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'messageType',
      label: $t('message.messageNotification.field.messageType'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'messageGroup',
      label: $t('message.messageNotification.field.messageGroup'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'bizType',
      label: $t('message.messageNotification.field.bizType'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'receiverId',
      label: $t('message.messageNotification.field.receiverId'),
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
      label: $t('message.messageNotification.field.content'),
      rules: '',
      description: '',
    },
    {
      component: 'Switch',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'isRead',
      label: $t('message.messageNotification.field.isRead'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'senderId',
      label: $t('message.messageNotification.field.senderId'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'senderName',
      label: $t('message.messageNotification.field.senderName'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'senderAvatar',
      label: $t('message.messageNotification.field.senderAvatar'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'sendTime',
      label: $t('message.messageNotification.field.sendTime'),
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
      label: $t('message.messageNotification.field.title'),
    },
    {
      component: 'Input',
      fieldName: 'content',
      label: $t('message.messageNotification.field.content'),
    },
    {
      component: 'Input',
      fieldName: 'receiverId',
      label: $t('message.messageNotification.field.receiverId'),
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
      title: $t('message.messageNotification.field.title'),
      cellRender: { name: 'CellValueLink', attrs: { onClick: onActionClick } },
    },
    {
      field: 'bizType',
      title: $t('message.messageNotification.field.bizType'),
    },
    {
      field: 'receiverId',
      title: $t('message.messageNotification.field.receiverId'),
    },
    {
      field: 'isRead',
      title: $t('message.messageNotification.field.isRead'),
      formatter: 'formatBoolean',
      width: 40,
    },
    {
      field: 'senderName',
      title: $t('message.messageNotification.field.senderName'),
    },
    {
      field: 'sendTime',
      title: $t('message.messageNotification.field.sendTime'),
      formatter: 'formatDateTime',
      width: 110,
    },
    {
      align: 'center',
      cellRender: {
        attrs: {
          nameField: 'title',
          nameTitle: $t('message.messageNotification.name'),
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
