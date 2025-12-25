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
import { loadMessageTemplatePageApi, removeMessageTemplateApi } from '#/api';
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
      fieldName: 'templateCode',
      label: $t('message.messageTemplate.field.templateCode'),
    },
    {
      component: 'Input',
      fieldName: 'title',
      label: $t('message.messageTemplate.field.title'),
    },
  ],
};
const gridOptions: VxeGridProps<any> = {
  ...createGridOptions(loadMessageTemplatePageApi),

  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { align: 'left', type: 'checkbox', width: 50 },
    {
      field: 'templateCode',
      title: $t('message.messageTemplate.field.templateCode'),
    },
    { field: 'title', title: $t('message.messageTemplate.field.title') },
    {
      field: 'mediumType',
      title: $t('message.messageTemplate.field.mediumType'),
      slots: { default: 'mediumType' },
    },
    {
      field: 'messageType',
      title: $t('message.messageTemplate.field.messageType'),
      slots: { default: 'messageType' },
    },
    { field: 'bizType', title: $t('message.messageTemplate.field.bizType') },
    {
      field: 'channelId',
      title: $t('message.messageTemplate.field.channelId'),
    },
    {
      field: 'status',
      title: $t('message.messageTemplate.field.status'),
      slots: { default: 'status' },
    },
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
  enablePending: true,
  enableDelivery: true,
  isBatchSend: false,
  isSeparateSend: false,
  enableNotification: false,
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
      await removeMessageTemplateApi(ids);
      gridApi.query();
    },
    title: $t('common.deleteConfirm'),
  });
}

async function batchRemove() {
  const selectedRows = gridApi.grid.getCheckboxRecords();
  const ids: Array<any> = [];
  selectedRows.forEach((row) => {
    ids.push(row.messageTemplateId);
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
                  @click="removeByIds([row.messageTemplateId])"
                >
                  {{ $t('common.remove') }}
                </Button>
              </MenuItem>
            </Menu>
          </template>
        </Dropdown>
      </template>
      <template #mediumType="{ row }">
        {{ allDictMap.get('MediumType')?.get(row.mediumType) }}
      </template>
      <template #messageType="{ row }">
        {{ allDictMap.get('MessageType')?.get(row.messageType) }}
      </template>
      <template #status="{ row }">
        {{ allDictMap.get('GenericStatus')?.get(row.status) }}
      </template>
    </Grid>
    <FormViewer />
  </Page>
</template>
