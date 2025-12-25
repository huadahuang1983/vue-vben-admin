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
import { loadUserThirdPartyPageApi, removeUserThirdPartyApi } from '#/api';
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
      fieldName: 'userId',
      label: $t('user.userThirdParty.field.userId'),
    },
    {
      component: 'Input',
      fieldName: 'uuid',
      label: $t('user.userThirdParty.field.uuid'),
    },
    {
      component: 'Input',
      fieldName: 'username',
      label: $t('user.userThirdParty.field.username'),
    },
  ],
};
const gridOptions: VxeGridProps<any> = {
  ...createGridOptions(loadUserThirdPartyPageApi),

  columns: [
    { title: '序号', type: 'seq', width: 50 },
    { align: 'left', type: 'checkbox', width: 50 },
    { field: 'userId', title: $t('user.userThirdParty.field.userId') },
    { field: 'uuid', title: $t('user.userThirdParty.field.uuid') },
    { field: 'username', title: $t('user.userThirdParty.field.username') },
    { field: 'nickname', title: $t('user.userThirdParty.field.nickname') },
    { field: 'email', title: $t('user.userThirdParty.field.email') },
    { field: 'gender', title: $t('user.userThirdParty.field.gender') },
    { field: 'source', title: $t('user.userThirdParty.field.source') },
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

const formDefaultValues = {};

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
      await removeUserThirdPartyApi(ids);
      gridApi.query();
    },
    title: $t('common.deleteConfirm'),
  });
}

async function batchRemove() {
  const selectedRows = gridApi.grid.getCheckboxRecords();
  const ids: Array<any> = [];
  selectedRows.forEach((row) => {
    ids.push(row.userThirdPartyId);
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
                  @click="removeByIds([row.userThirdPartyId])"
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
  </Page>
</template>
