<script setup lang="ts">
import { ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { CheckboxGroup } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import {
  loadAllEnabledRoleApi,
  loadRoleIdsByUserApi,
  saveUserRoleByUserApi,
} from '#/api';

defineOptions({
  name: 'ConfigRoleDrawer',
});

const allRoles = ref<string[]>([]);
const checkedRoleIds = ref<string[]>([]);

const [Form, formApi] = useVbenForm({
  showDefaultActions: false,
  handleSubmit: onSubmit,
});

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm: async () => {
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    await formApi.submitForm();
    drawerApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { values } = drawerApi.getData<Record<string, any>>();
      if (values) {
        formApi.setValues(values);
        loadRole();
      }
    }
  },
  title: '配置权限',
});

function getUserId() {
  const formData = drawerApi.getData().values;
  const userId = formData.userId;
  return userId;
}

async function onSubmit() {
  await saveUserRoleByUserApi(getUserId(), checkedRoleIds.value);
}

function loadRole() {
  loadAllEnabledRoleApi().then((res) => {
    const roles = [];
    res.forEach((element) => {
      roles.push({
        label: element.roleName,
        value: element.roleId,
      });
    });
    allRoles.value = roles;
    loadRoleIdsByUserApi(getUserId()).then((res) => {
      checkedRoleIds.value = res;
    });
  });
}
</script>
<template>
  <Drawer>
    <Form>
      <CheckboxGroup v-model:value="checkedRoleIds" :options="allRoles" />
    </Form>
  </Drawer>
</template>
