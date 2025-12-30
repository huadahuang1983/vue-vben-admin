<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { ProfileSecuritySetting } from '@vben/common-ui';

import { loadMyUserCredentialsApi } from '#/api';

const credentials = ref<any>({});
const strengthLabels = ['弱', '中', '强', '非常强', '异常强'];

onMounted(async () => {
  credentials.value = await loadMyUserCredentialsApi();
});

const formSchema = computed(() => {
  return [
    {
      value: false,
      fieldName: 'accountPassword',
      label: '账户密码',
      description: `当前密码强度：${strengthLabels[credentials.value.passwordStrength]}`,
    },
    {
      value: true,
      fieldName: 'securityPhone',
      label: '密保手机',
      description: `已绑定手机：${credentials.value.phoneNumber ?? '未绑定'}`,
    },
    {
      value: true,
      fieldName: 'securityQuestion',
      label: '密保问题',
      description: `${credentials.value.hasPasswordQuestion ? '已设置密保问题' : '未设置密保问题'}，密保问题可有效保护账户安全`,
    },
    {
      value: true,
      fieldName: 'securityEmail',
      label: '备用邮箱',
      description: `已绑定邮箱：${credentials.value.email ?? '未绑定'}`,
    },
    {
      value: false,
      fieldName: 'securityMfa',
      label: 'MFA 设备',
      description: '未绑定 MFA 设备，绑定后，可以进行二次确认',
    },
  ];
});
</script>
<template>
  <ProfileSecuritySetting :form-schema="formSchema" />
</template>
