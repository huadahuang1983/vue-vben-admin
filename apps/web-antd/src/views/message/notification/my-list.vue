<script lang="ts" setup>
import type {
  OnActionClickParams,
  VxeGridListeners,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  loadMyNotificationPageApi,
  markMyNotificationApi,
  removeMyNotificationApi,
} from '#/api';

import { useColumns, useGridFormSchema } from './data';
import FormPage from './modules/form.vue';

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: FormPage,
  destroyOnClose: true,
  onClosed: onRefresh,
});

const gridEvents: VxeGridListeners = {
  toolbarButtonClick(params) {
    if (params.code === 'markRead') {
      const selectedRows = gridApi.grid.getCheckboxRecords();
      onMarkRead(selectedRows);
    }
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useGridFormSchema(),
    submitOnChange: true,
  },
  gridOptions: {
    columns: useColumns(onActionClick),
    height: 'auto',
    keepSource: true,
    toolbarConfig: {
      buttons: [
        {
          code: 'markRead',
          name: $t('message.myNotification.markRead'),
          status: 'primary',
        },
        {
          code: 'delete',
          name: $t('common.delete'),
          status: 'danger',
        },
      ],
    },
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await loadMyNotificationPageApi({
            page: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
            orders: [{ column: 'message_notification_id', asc: false }],
          });
        },
        delete: ({ body }) => {
          return onDelete(body.removeRecords);
        },
      },
    },
    rowConfig: {
      keyField: 'messageNotificationId',
    },
  } as VxeTableGridOptions,
  gridEvents,
});

const onDelete = (removeRecords: any[]) => {
  const recordIds = removeRecords.map((item) => item.messageNotificationId);
  removeMyNotificationApi(recordIds).then(() => {
    gridApi.query();
  });
};

function onDetail(row: any) {
  formDrawerApi.setData({
    values: row,
    disabled: true,
  });
  formDrawerApi.open();
}

function onRefresh() {
  gridApi.query();
}

function onActionClick(e: OnActionClickParams) {
  switch (e.code) {
    case 'delete': {
      onDelete([e.row]);
      break;
    }
    case 'detail': {
      onDetail(e.row);
      break;
    }
    case 'markRead': {
      onMarkRead([e.row]);
      break;
    }
  }
}

async function onMarkRead(rows: Array<any>) {
  if (!rows || rows.length === 0) {
    message.warn($t('common.noDataSelected'));
    return;
  }
  const ids: Array<any> = [];
  rows.forEach((row) => {
    ids.push(row.messageNotificationId);
  });
  await markMyNotificationApi(ids);
  gridApi.query();
}
</script>
<template>
  <Page auto-content-height>
    <Grid />
    <FormDrawer />
  </Page>
</template>
