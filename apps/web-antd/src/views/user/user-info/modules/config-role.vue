<script setup lang="ts">
import { ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { CheckboxGroup } from 'ant-design-vue';

import { useVbenForm } from '#/adapter/form';
import {
  loadAllEnabledRoleApi,
  loadRoleByUserIdApi,
  saveRoleByUserIdApi,
} from '#/api';
import { $t } from '#/locales';

defineOptions({
  name: 'ConfigRoleDrawer',
});

const allRoles = ref();
const checkedRoleIds = ref<string[]>([]);

const [Form, formApi] = useVbenForm({
  showDefaultActions: false,
  handleSubmit: onSubmit,
});

const [Drawer, drawerApi] = useVbenDrawer({
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
  title: $t('user.configRole'),
});

function getUserId() {
  const formData = drawerApi.getData().values;
  const userId = formData.userId;
  return userId;
}

async function onSubmit() {
  await saveRoleByUserIdApi(getUserId(), checkedRoleIds.value);
}

function loadRole() {
  loadAllEnabledRoleApi().then((res) => {
    const roles: any[] = [];
    res.forEach((element: any) => {
      roles.push({
        label: element.roleName,
        value: element.roleId,
      });
    });
    allRoles.value = roles;
    loadRoleByUserIdApi(getUserId()).then((res) => {
      checkedRoleIds.value = res.map((item: any) => item.roleId);
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
