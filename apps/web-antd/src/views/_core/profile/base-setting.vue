<script setup lang="ts">
import type { BasicOption } from '@vben/types';

import type { VbenFormSchema } from '#/adapter/form';

import { computed, onMounted, ref } from 'vue';

import { ProfileBaseSetting } from '@vben/common-ui';

import {
  getUserInfoApi,
  loadAllEnabledRoleApi,
  updateMyUserInfoApi,
} from '#/api';

const profileBaseSettingRef = ref();

const roleOptions = ref<BasicOption[]>();

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      fieldName: 'realName',
      component: 'Input',
      label: '姓名',
    },
    {
      fieldName: 'username',
      component: 'Input',
      label: '用户名',
    },
    {
      fieldName: 'roles',
      component: 'Select',
      componentProps: {
        mode: 'tags',
        options: roleOptions,
      },
      label: '角色',
    },
    {
      fieldName: 'desc',
      component: 'Textarea',
      label: '个人简介',
    },
  ];
});

async function loadRoleOptions() {
  const roles = await loadAllEnabledRoleApi();
  roleOptions.value = roles.map((item: any) => ({
    label: item.roleName,
    value: item.roleId,
  }));
}

onMounted(async () => {
  await loadRoleOptions();
  const data = await getUserInfoApi();
  profileBaseSettingRef.value.getFormApi().setValues(data);
});

async function handleSubmit(values: any) {
  await updateMyUserInfoApi(values);
}
</script>
<template>
  <ProfileBaseSetting
    ref="profileBaseSettingRef"
    :form-schema="formSchema"
    @submit="handleSubmit"
  />
</template>
