<script lang="ts" setup>
import type { VbenFormProps } from '@vben/common-ui';

import type { VxeGridProps } from '#/adapter/vxe-table';

import { onMounted, ref } from 'vue';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { DownOutlined } from '@ant-design/icons-vue';
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
import { loadDataDictItemPageApi, removeDataDictItemApi } from '#/api';
import { useDictionaryStore } from '#/store/dictionary';

import FormPage from './item-form.vue';

const dictionaryStore = useDictionaryStore();
const allDictMap = ref(new Map<string, Map<string, string>>());
let dataDictId: any;
let dictCode: any;

onMounted(async () => {
  allDictMap.value = await dictionaryStore.getAllDictMap();
});

async function loadPage(param: any) {
  return loadDataDictItemPageApi({ ...param, dataDictId });
}

const formOptions: VbenFormProps = {
  collapsed: true,
  schema: [
    {
      component: 'Input',
      fieldName: 'dataCode',
      label: $t('infra.dataDictItem.field.dataCode'),
    },
    {
      component: 'Input',
      fieldName: 'dataName',
      label: $t('infra.dataDictItem.field.dataName'),
    },
  ],
};
const gridOptions: VxeGridProps<any> = {
  ...createGridOptions(loadPage),

  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { align: 'left', type: 'checkbox', width: 50 },
    { field: 'dictCode', title: $t('infra.dataDictItem.field.dictCode') },
    { field: 'dataName', title: $t('infra.dataDictItem.field.dataName') },
    { field: 'dataCode', title: $t('infra.dataDictItem.field.dataCode') },
    {
      field: 'status',
      title: $t('infra.dataDictItem.field.status'),
      slots: { default: 'status' },
    },
    { field: 'orderNo', title: $t('infra.dataDictItem.field.orderNo') },
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

const formDefaultValues = {
  status: 'enabled',
};

function add() {
  const rowData = formDefaultValues;
  formViewerApi.setData({
    // 表单值
    values: { ...rowData, dataDictId, dictCode },
  });
  formViewerApi.open();
}

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

async function removeByIds(ids: Array<any>) {
  if (!ids || ids.length === 0) {
    message.warn($t('common.noDataSelected'));
    return;
  }
  Modal.confirm({
    onOk: async () => {
      await removeDataDictItemApi(ids);
      gridApi.query();
    },
    title: $t('common.deleteConfirm'),
  });
}

async function batchRemove() {
  const selectedRows = gridApi.grid.getCheckboxRecords();
  const ids: Array<any> = [];
  selectedRows.forEach((row) => {
    ids.push(row.dictItemId);
  });
  await removeByIds(ids);
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
        dataDictId = values.dataDictId;
        dictCode = values.dictCode;
      }
    }
  },
  title: $t('infra.dataDict.title'),
});
</script>
<template>
  <Drawer class="w-[800px]">
    <Page auto-content-height>
      <Grid>
        <template #toolbar_buttons>
          <Button class="mr-2" type="primary" @click="add()">
            {{ $t('common.new') }}
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
                    @click="removeByIds([row.dictItemId])"
                  >
                    {{ $t('common.remove') }}
                  </Button>
                </MenuItem>
              </Menu>
            </template>
          </Dropdown>
        </template>
        <template #status="{ row }">
          {{ allDictMap.get('GenericStatus')?.get(row.status) }}
        </template>
      </Grid>
      <FormViewer />
    </Page>
  </Drawer>
</template>
