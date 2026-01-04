<script lang="ts" setup>
import type {
  OnActionClickParams,
  VxeGridListeners,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';

import { onMounted } from 'vue';

import { Page, useVbenDrawer } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { loadConfigParamPageApi, removeConfigParamApi } from '#/api';

import { useColumns, useGridFormSchema } from './data';
import FormPage from './modules/form.vue';

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: FormPage,
  destroyOnClose: true,
  onClosed: onRefresh,
});

const gridEvents: VxeGridListeners = {
  toolbarButtonClick(params) {
    if (params.code === 'create') {
      onCreate();
    }
  },
};

const [Grid, gridApi] = useVbenVxeGrid({
  formOptions: {
    fieldMappingTime: [['createTime', ['startTime', 'endTime']]],
    schema: useGridFormSchema(),
    submitOnChange: true,
  },
  gridOptions: {
    columns: useColumns(onActionClick),
    height: 'auto',
    keepSource: true,
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await loadConfigParamPageApi({
            page: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
          });
        },
        delete: ({ body }) => {
          return onDelete(body.removeRecords);
        },
      },
    },
    rowConfig: {
      keyField: 'configParamId',
    },
  } as VxeTableGridOptions,
  gridEvents,
});

function onCreate() {
  formDrawerApi
    .setData({ values: { paramType: 'public', status: 'enabled' } })
    .open();
}

const onDelete = (removeRecords: any[]) => {
  const recordIds = removeRecords.map((item) => item.configParamId);
  removeConfigParamApi(recordIds).then(() => {
    gridApi.query();
  });
};

function onEdit(row: any) {
  formDrawerApi.setData({ values: row }).open();
}

function onView(row: any) {
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
    case 'edit': {
      onEdit(e.row);
      break;
    }
    case 'view': {
      onView(e.row);
      break;
    }
  }
}

onMounted(() => {
  onRefresh();
});
</script>
<template>
  <Page auto-content-height>
    <Grid />
    <FormDrawer />
  </Page>
</template>
