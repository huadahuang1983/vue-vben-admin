<script lang="ts" setup>
import { ref } from 'vue';

import { Page, useVbenDrawer } from '@vben/common-ui';

import { useVbenVxeGrid, type OnActionClickParams, type VxeGridListeners, type VxeTableGridOptions } from '#/adapter/vxe-table';
import { loadDataDictItemPageApi, removeDataDictItemApi } from '#/api';

import FormPage from './item-form.vue';
import { useColumns, useGridFormSchema } from './item-data';
import { $t } from '#/locales';

const dataDictId = ref('');
const dictCode = ref('');

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
          return await loadDataDictItemPageApi({
            dataDictId: dataDictId.value,
            dictCode: dictCode.value,
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
      keyField: 'dictItemId',
    },
  } as VxeTableGridOptions,
  gridEvents,
});

function onCreate() {
  formDrawerApi
    .setData({ values: { dataDictId: dataDictId.value, dictCode: dictCode.value, status: 'enabled' } })
    .open();
}

const onDelete = (removeRecords: any[]) => {
  const recordIds = removeRecords.map((item) => item.dictItemId);
  removeDataDictItemApi(recordIds).then(() => {
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
    case 'detail': {
      onDetail(e.row);
      break;
    }
  }
}

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm: async () => {
    drawerApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { values } = drawerApi.getData<Record<string, any>>();
      if (values) {
        dataDictId.value = values.dataDictId;
        dictCode.value = values.dictCode;
      }
    }
  },
  title: $t('infra.dataDict.title'),
});
</script>
<template>
  <Drawer class="w-[800px]">
    <Page auto-content-height>
      <Grid />
      <FormDrawer />
    </Page>
  </Drawer>
</template>
