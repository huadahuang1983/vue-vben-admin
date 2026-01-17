<script lang="ts" setup>
import type {
  OnActionClickParams,
  VxeGridListeners,
  VxeGridProps,
} from '#/adapter/vxe-table';

import { Page, useVbenDrawer } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { loadOperationLogPageApi } from '#/api';

import { useColumns, useGridFormSchema } from './data';
import FormPage from './modules/form.vue';

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: FormPage,
  destroyOnClose: true,
  onClosed: onRefresh,
});

const gridEvents: VxeGridListeners = {};

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    schema: useGridFormSchema(),
    submitOnChange: true,
  },
  gridOptions: {
    columns: useColumns(onActionClick),
    height: 'auto',
    keepSource: true,
    toolbarConfig: { buttons: [] },
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await loadOperationLogPageApi({
            page: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
            orders: [{ column: 'operation_log_id', asc: false }],
          });
        },
      },
    },
    rowConfig: {
      keyField: 'operationLogId',
    },
  } as VxeGridProps,
  gridEvents,
});

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
    case 'detail': {
      onDetail(e.row);
      break;
    }
  }
}
</script>
<template>
  <Page auto-content-height>
    <Grid />
    <FormDrawer />
  </Page>
</template>
