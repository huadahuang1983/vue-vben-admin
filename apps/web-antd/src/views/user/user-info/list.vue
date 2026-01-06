<script lang="ts" setup>
import type {
  OnActionClickParams,
  VxeGridListeners,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { loadUserInfoPageApi, removeUserInfoApi } from '#/api';

import { useColumns, useGridFormSchema } from './data';
import ConfigRolePage from './modules/config-role.vue';
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
          code: 'delete',
          name: $t('common.remove'),
          status: 'danger',
        },
      ],
    },
    proxyConfig: {
      ajax: {
        query: async ({ page }, formValues) => {
          return await loadUserInfoPageApi({
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
      keyField: 'userId',
    },
  } as VxeTableGridOptions,
  gridEvents,
});

function onCreate() {
  formDrawerApi.setData({ values: { status: 'enabled' } }).open();
}

const onDelete = (removeRecords: any[]) => {
  const recordIds = removeRecords.map((item) => item.userId);
  removeUserInfoApi(recordIds).then(() => {
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
    case 'configRole': {
      onConfigRole(e.row);
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

const [ConfigRoleDrawer, configRoleDrawerApi] = useVbenDrawer({
  connectedComponent: ConfigRolePage,
});
function onConfigRole(row: any) {
  configRoleDrawerApi.setData({
    values: row,
  });
  configRoleDrawerApi.open();
}
</script>
<template>
  <Page auto-content-height>
    <Grid />
    <FormDrawer />
    <ConfigRoleDrawer />
  </Page>
</template>
