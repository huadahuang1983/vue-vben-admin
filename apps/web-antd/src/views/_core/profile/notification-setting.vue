<script setup lang="ts">

import { ProfileNotificationSetting } from '@vben/common-ui';
import { loadLatestNotificationApi } from '#/api';
import { onMounted, ref } from 'vue';

const formSchema = ref<any>([]);

async function loadMyNotification() {
  const data = await loadLatestNotificationApi(20);
  formSchema.value = data.map((item: any) => {
    return {
      fieldName: item.messageNotificationId,
      value: !item.isRead,
      label: item.title,
      description: item.message,
    }
  });
}

onMounted(async () => {
  await loadMyNotification();
});

</script>
<template>
  <ProfileNotificationSetting :form-schema="formSchema" />
</template>
