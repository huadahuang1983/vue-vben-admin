<script lang="ts" setup>
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { Page } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { Button, message, Modal } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  loadMyNotificationPageApi,
  markMyNotificationApi,
  removeMyNotificationApi,
} from '#/api';

const formOptions: VbenFormProps = {
  collapsed: true,
  schema: [
    {
      component: 'Input',
      fieldName: 'title',
      label: $t('message.messageNotification.field.title'),
    },
  ],
};
const gridOptions: VxeGridProps<any> = {
  checkboxConfig: {
    highlight: true,
  },
  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { align: 'left', type: 'checkbox', width: 50 },
    { field: 'title', title: $t('message.messageNotification.field.title') },
    {
      field: 'bizType',
      title: $t('message.messageNotification.field.bizType'),
    },
    {
      field: 'content',
      title: $t('message.messageNotification.field.content'),
      showOverflow: true,
      width: 400,
    },
    { field: 'isRead', title: $t('message.messageNotification.field.isRead') },
    {
      field: 'senderName',
      title: $t('message.messageNotification.field.senderName'),
    },
    {
      field: 'sendTime',
      title: $t('message.messageNotification.field.sendTime'),
    },
    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: $t('common.action'),
      width: 180,
    },
  ],
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  showOverflow: true,
  sortConfig: {
    trigger: 'cell',
    remote: true,
  },
  proxyConfig: {
    sort: true,
    response: {
      list: null,
      result: 'records',
      total: 'total',
    },
    ajax: {
      query: async ({ page, sorts }, formValues) => {
        const orders: Array<any> = [];
        if (sorts) {
          sorts.forEach((it) => {
            orders.push({ column: it.field, asc: it.order === 'asc' });
          });
        }
        return await loadMyNotificationPageApi({
          current: page.currentPage,
          size: page.pageSize,
          orders,
          ...formValues,
        });
      },
    },
  },
  customConfig: {
    mode: 'drawer',
  },
  toolbarConfig: {
    slots: {
      buttons: 'toolbar_buttons',
    },
    custom: true,
    // export: true,
    // import: true,
    refresh: true,
    zoom: true,
  },
};
const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });

async function removeByIds(ids: Array<any>) {
  if (!ids || ids.length === 0) {
    message.warn($t('common.noDataSelected'));
    return;
  }
  Modal.confirm({
    onOk: async () => {
      await removeMyNotificationApi(ids);
      gridApi.query();
    },
    title: $t('common.deleteConfirm'),
  });
}

async function batchRemove() {
  const selectedRows = gridApi.grid.getCheckboxRecords();
  const ids: Array<any> = [];
  selectedRows.forEach((row) => {
    ids.push(row.messageNotificationId);
  });
  await removeByIds(ids);
}

async function markByIds(ids: Array<any>) {
  if (!ids || ids.length === 0) {
    message.warn($t('common.noDataSelected'));
    return;
  }
  await markMyNotificationApi(ids);
  gridApi.query();
}

async function batchMark() {
  const selectedRows = gridApi.grid.getCheckboxRecords();
  const ids: Array<any> = [];
  selectedRows.forEach((row) => {
    ids.push(row.messageNotificationId);
  });
  await markByIds(ids);
}
</script>
<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar_buttons>
        <Button class="mr-2" type="primary" @click="batchMark">
          {{ $t('message.myNotification.markRead') }}
        </Button>
        <Button class="mr-2" danger type="default" @click="batchRemove">
          {{ $t('common.remove') }}
        </Button>
      </template>
      <template #action="{ row }">
        <Button type="link" @click="markByIds([row.messageNotificationId])">
          {{ $t('message.myNotification.markRead') }}
        </Button>
        <Button
          danger
          type="link"
          @click="removeByIds([row.messageNotificationId])"
        >
          {{ $t('common.remove') }}
        </Button>
      </template>
    </Grid>
  </Page>
</template>
