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
import { $t } from '#/locales';

const profileBaseSettingRef = ref();

const roleOptions = ref<BasicOption[]>();

const formSchema = computed((): VbenFormSchema[] => {
  return [
    {
      fieldName: 'nickname',
      component: 'Input',
      label: $t('profile.userInfo.nickname'),
    },
    {
      fieldName: 'username',
      component: 'Input',
      componentProps: {
        disabled: true,
      },
      label: $t('profile.userInfo.username'),
    },
    {
      fieldName: 'roles',
      component: 'Select',
      componentProps: {
        mode: 'tags',
        options: roleOptions,
        disabled: true,
      },
      label: $t('profile.userInfo.roles'),
    },
    {
      fieldName: 'description',
      component: 'Textarea',
      label: $t('profile.userInfo.description'),
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
  const formValues = {
    nickname: data.realName,
    username: data.username,
    roles: data.roles,
    description: data.desc,
  };
  profileBaseSettingRef.value.getFormApi().setValues(formValues);
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
