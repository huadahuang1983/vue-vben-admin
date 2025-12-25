<script lang="ts" setup>
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { onMounted, ref } from 'vue';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { DownOutlined, UploadOutlined } from '@ant-design/icons-vue';
import {
  Button,
  Dropdown,
  Menu,
  MenuItem,
  message,
  Modal,
} from 'ant-design-vue';

import { createGridOptions } from '#/adapter/default-options';
import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { deleteFileByIdApi, loadFileDetailPageApi } from '#/api';
import { FileDownloader } from '#/components';
import { useDictionaryStore } from '#/store/dictionary';

import FormPage from './form.vue';
import UploadPage from './upload.vue';

const dictionaryStore = useDictionaryStore();
const allDictMap = ref(new Map<string, Map<string, string>>());

onMounted(async () => {
  allDictMap.value = await dictionaryStore.getAllDictMap();
});

const formOptions: VbenFormProps = {
  collapsed: true,
  schema: [
    {
      component: 'Input',
      fieldName: 'originalFilename',
      label: $t('storage.fileDetail.field.originalFilename'),
    },
    {
      component: 'Input',
      fieldName: 'filename',
      label: $t('storage.fileDetail.field.filename'),
    },
    {
      component: 'Input',
      fieldName: 'path',
      label: $t('storage.fileDetail.field.path'),
    },
    {
      component: 'Input',
      fieldName: 'platform',
      label: $t('storage.fileDetail.field.platform'),
    },
  ],
};
const gridOptions: VxeGridProps<any> = {
  ...createGridOptions(loadFileDetailPageApi),

  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { align: 'left', type: 'checkbox', width: 50 },
    {
      field: 'originalFilename',
      title: $t('storage.fileDetail.field.originalFilename'),
    },
    { field: 'filename', title: $t('storage.fileDetail.field.filename') },
    { field: 'path', title: $t('storage.fileDetail.field.path') },
    {
      field: 'size',
      title: $t('storage.fileDetail.field.size'),
      formatter: 'dataStorageUnit',
    },
    { field: 'contentType', title: $t('storage.fileDetail.field.contentType') },
    { field: 'platform', title: $t('storage.fileDetail.field.platform') },
    {
      field: 'action',
      fixed: 'right',
      slots: { default: 'action' },
      title: $t('common.action'),
      width: 200,
    },
  ],
};
const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });

const [FormViewer, formViewerApi] = useVbenDrawer({
  connectedComponent: FormPage,
  onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      const { success } = formViewerApi.getData();
      if (success) {
        gridApi.query();
      }
    }
  },
});

function details(rowData: any) {
  formViewerApi.setData({
    // 表单值
    values: rowData,
    disabled: true,
  });
  formViewerApi.open();
}

function edit(rowData: any) {
  formViewerApi.setData({
    // 表单值
    values: rowData,
  });
  formViewerApi.open();
}

async function removeByIds(ids: Array<string>) {
  if (!ids || ids.length === 0) {
    message.warn($t('common.noDataSelected'));
    return;
  }
  Modal.confirm({
    onOk: async () => {
      await deleteFileByIdApi(ids);
      gridApi.query();
    },
    title: $t('common.deleteConfirm'),
  });
}

async function batchRemove() {
  const selectedRows = gridApi.grid.getCheckboxRecords();
  const ids: Array<any> = [];
  selectedRows.forEach((row) => {
    ids.push(row.fileDetailId);
  });
  await removeByIds(ids);
}

const [UploadViewer, uploadViewerApi] = useVbenDrawer({
  connectedComponent: UploadPage,
  onOpenChange(isOpen: boolean) {
    if (!isOpen) {
      const { success } = uploadViewerApi.getData();
      if (success) {
        gridApi.query();
      }
    }
  },
});

function toUpload() {
  uploadViewerApi.open();
}
</script>
<template>
  <Page auto-content-height>
    <Grid>
      <template #toolbar_buttons>
        <Button class="mr-2" @click="toUpload">
          <UploadOutlined />{{ $t('common.upload') }}
        </Button>
        <Button class="mr-2" danger type="default" @click="batchRemove">
          {{ $t('common.remove') }}
        </Button>
      </template>
      <template #action="{ row }">
        <Button class="mr-2 p-0" type="link" @click="details(row)">
          {{ $t('common.details') }}
        </Button>
        <Button class="mr-2 p-0" type="link" @click="edit(row)">
          {{ $t('common.edit') }}
        </Button>
        <FileDownloader
          :file-id="row.fileDetailId"
          class="mr-2 p-0"
          type="link"
        />
        <Dropdown trigger="click">
          <Button class="p-0" type="link">
            {{ $t('common.more') }}<DownOutlined />
          </Button>
          <template #overlay>
            <Menu>
              <MenuItem>
                <Button
                  class="mr-2 p-0"
                  danger
                  type="link"
                  @click="removeByIds([row.fileDetailId])"
                >
                  {{ $t('common.remove') }}
                </Button>
              </MenuItem>
            </Menu>
          </template>
        </Dropdown>
      </template>
    </Grid>
    <FormViewer />
    <UploadViewer />
  </Page>
</template>
