<script lang="ts" setup>
import type {
  OnActionClickParams,
  VxeGridListeners,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';

import { Page, useVbenDrawer } from '@vben/common-ui';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { loadDataDictPageApi, removeDataDictApi } from '#/api';

import { useColumns, useGridFormSchema } from './data';
import FormPage from './modules/form.vue';
import ItemListPage from './modules/item-list.vue';

const [ItemListDrawer, itemListDrawerApi] = useVbenDrawer({
  connectedComponent: ItemListPage,
  destroyOnClose: true,
});

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
          return await loadDataDictPageApi({
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
      keyField: 'dataDictId',
    },
  } as VxeTableGridOptions,
  gridEvents,
});

function onCreate() {
  formDrawerApi.setData({ values: { status: 'enabled' } }).open();
}

const onDelete = (removeRecords: any[]) => {
  const recordIds = removeRecords.map((item) => item.dataDictId);
  removeDataDictApi(recordIds).then(() => {
    gridApi.query();
  });
};

function onEdit(row: any) {
  formDrawerApi.setData({ values: row }).open();
}

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

function onItemList(row: any) {
  itemListDrawerApi.setData({ values: row }).open();
}

function onActionClick(e: OnActionClickParams) {
  switch (e.code) {
    case 'data': {
      onItemList(e.row);
      break;
    }
    case 'delete': {
      onDelete([e.row]);
      break;
    }
    case 'detail': {
      onDetail(e.row);
      break;
    }
    case 'edit': {
      onEdit(e.row);
      break;
    }
  }
}
</script>
<template>
  <Page auto-content-height>
    <Grid />
    <FormDrawer />
    <ItemListDrawer />
  </Page>
</template>
