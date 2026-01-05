<script lang="ts" setup>
import type {
  OnActionClickParams,
  VxeGridListeners,
  VxeTableGridOptions,
} from '#/adapter/vxe-table';

import { Page, useVbenDrawer } from '@vben/common-ui';
import {
  downloadFileFromBlobPart,
  downloadFileFromImageUrl,
  downloadFileFromUrl,
} from '@vben/utils';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import {
  isEmbedPreviewFile,
  isImageFile,
  loadFileDetailPageApi,
  removeFileDetailApi,
} from '#/api';
import { $t } from '#/locales';

import { useColumns, useGridFormSchema } from './data';
import FormPage from './modules/form.vue';
import UploadPage from './modules/upload.vue';

const [FormDrawer, formDrawerApi] = useVbenDrawer({
  connectedComponent: FormPage,
  destroyOnClose: true,
  onClosed: onRefresh,
});

const gridEvents: VxeGridListeners = {
  toolbarButtonClick(params) {
    if (params.code === 'create') {
      onCreate();
    } else if (params.code === 'upload') {
      onUpload();
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
          code: 'upload',
          name: $t('common.upload'),
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
          return await loadFileDetailPageApi({
            page: page.currentPage,
            pageSize: page.pageSize,
            ...formValues,
            orders: [{ column: 'file_detail_id', asc: false }],
          });
        },
        delete: ({ body }) => {
          return onDelete(body.removeRecords);
        },
      },
    },
    rowConfig: {
      keyField: 'fileDetailId',
    },
  } as VxeTableGridOptions,
  gridEvents,
});

function onCreate() {
  formDrawerApi.setData({ values: {} }).open();
}

const onDelete = (removeRecords: any[]) => {
  const recordIds = removeRecords.map((item) => item.fileDetailId);
  removeFileDetailApi(recordIds).then(() => {
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
    case 'detail': {
      onDetail(e.row);
      break;
    }
    case 'download': {
      if (isImageFile(e.row.filename)) {
        downloadFileFromImageUrl({
          source: e.row.url,
        });
      } else if (isEmbedPreviewFile(e.row.filename)) {
        downloadFileFromBlobPart({
          source: e.row.url,
          fileName: e.row.originalFilename,
        });
      } else {
        downloadFileFromUrl({
          source: e.row.url,
          fileName: e.row.originalFilename,
        });
      }
      break;
    }
    case 'edit': {
      onEdit(e.row);
      break;
    }
    case 'replace': {
      onReplace(e.row);
      break;
    }
  }
}

const [UploadDrawer, uploadDrawerApi] = useVbenDrawer({
  connectedComponent: UploadPage,
  destroyOnClose: true,
  onClosed: onRefresh,
});

function onUpload() {
  uploadDrawerApi.open();
}

function onReplace(row: any) {
  uploadDrawerApi
    .setData({
      values: row,
    })
    .open();
}
</script>
<template>
  <Page auto-content-height>
    <Grid />
    <FormDrawer />
    <UploadDrawer />
  </Page>
</template>
