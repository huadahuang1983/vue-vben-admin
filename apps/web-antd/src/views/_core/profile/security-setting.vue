<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';

import { ProfileSecuritySetting } from '@vben/common-ui';

import { loadMyUserCredentialsApi } from '#/api';

const credentials = ref<any>({});
const strengthLabels = ['弱', '中', '强', '非常强', '异常强'];
const passwordStrengthDescription = computed(() => {
  return `当前密码强度：${strengthLabels[credentials.value.passwordStrength]}`;
});
const phoneDescription = computed(() => {
  return `已绑定手机：${credentials.value.phoneNumber ?? '未绑定'}`;
});
const passwordQuestionDescription = computed(() => {
  return `${credentials.value.hasPasswordQuestion ? '已设置密保问题' : '未设置密保问题'}，密保问题可有效保护账户安全`;
});
const emailDescription = computed(() => {
  return `已绑定邮箱：${credentials.value.email ?? '未绑定'}`;
});

onMounted(async () => {
  const data = await loadMyUserCredentialsApi();
  credentials.value = data;
});

const formSchema = computed(() => {
  return [
    {
      value: true,
      fieldName: 'accountPassword',
      label: '账户密码',
      description: passwordStrengthDescription.value,
    },
    {
      value: true,
      fieldName: 'securityPhone',
      label: '密保手机',
      description: phoneDescription.value,
    },
    {
      value: true,
      fieldName: 'securityQuestion',
      label: '密保问题',
      description: passwordQuestionDescription.value,
    },
    {
      value: true,
      fieldName: 'securityEmail',
      label: '备用邮箱',
      description: emailDescription.value,
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
