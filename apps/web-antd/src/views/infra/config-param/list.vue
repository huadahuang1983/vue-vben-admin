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
import { loadConfigParamPageApi, removeConfigParamApi } from '#/api';
import { useDictionaryStore } from '#/store/dictionary';

import FormPage from './form.vue';

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
      fieldName: 'paramCode',
      label: $t('infra.configParam.field.paramCode'),
    },
    {
      component: 'Input',
      fieldName: 'paramName',
      label: $t('infra.configParam.field.paramName'),
    },
    {
      component: 'Input',
      fieldName: 'paramType',
      label: $t('infra.configParam.field.paramType'),
    },
    {
      component: 'Input',
      fieldName: 'paramValue',
      label: $t('infra.configParam.field.paramValue'),
    },
  ],
};
const gridOptions: VxeGridProps<any> = {
  ...createGridOptions(loadConfigParamPageApi),

  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { align: 'left', type: 'checkbox', width: 50 },
    { field: 'paramCode', title: $t('infra.configParam.field.paramCode') },
    { field: 'paramName', title: $t('infra.configParam.field.paramName') },
    {
      field: 'paramType',
      title: $t('infra.configParam.field.paramType'),
      slots: { default: 'paramType' },
    },
    { field: 'paramValue', title: $t('infra.configParam.field.paramValue') },
    {
      field: 'status',
      title: $t('infra.configParam.field.status'),
      slots: { default: 'status' },
    },
    { field: 'remark', title: $t('infra.configParam.field.remark') },
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
  paramType: 'private',
  status: 'enabled',
};

function add() {
  const rowData = formDefaultValues;
  formViewerApi.setData({
    // 表单值
    values: rowData,
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
      await removeConfigParamApi(ids);
      gridApi.query();
    },
    title: $t('common.deleteConfirm'),
  });
}

async function batchRemove() {
  const selectedRows = gridApi.grid.getCheckboxRecords();
  const ids: Array<any> = [];
  selectedRows.forEach((row) => {
    ids.push(row.configParamId);
  });
  await removeByIds(ids);
}
</script>
<template>
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
                  @click="removeByIds([row.configParamId])"
                >
                  {{ $t('common.remove') }}
                </Button>
              </MenuItem>
            </Menu>
          </template>
        </Dropdown>
      </template>
      <template #paramType="{ row }">
        {{ allDictMap.get('ConfigParamType')?.get(row.paramType) }}
      </template>
      <template #status="{ row }">
        {{ allDictMap.get('GenericStatus')?.get(row.status) }}
      </template>
    </Grid>
    <FormViewer />
  </Page>
</template>
