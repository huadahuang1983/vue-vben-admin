<script setup lang="ts">
import type { NotificationItem } from '@vben/layouts';

import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { Notification } from '@vben/layouts';
import { useAccessStore } from '@vben/stores';

import { message } from 'ant-design-vue';
import { EventSourcePolyfill } from 'event-source-polyfill';

import {
  clearNotificationApi,
  loadLatestNotificationApi,
  markAllNotificationApi,
} from '#/api';

defineOptions({
  name: 'MyNotification',
});

const router = useRouter();
const accessStore = useAccessStore();
const notifications = ref<NotificationItem[]>([]);

const showDot = computed(() =>
  notifications.value.some((item) => !item.isRead),
);

const sse = ref();

function connectServer() {
  const eventSource = new EventSourcePolyfill(
    `${import.meta.env.VITE_GLOB_API_URL}/sse/connect/private`,
    {
      heartbeatTimeout: 300_000,
      headers: {
        Authorization: `Bearer ${accessStore.accessToken}`,
      },
    },
  );
  sse.value = eventSource;
  eventSource.addEventListener('message', (event) => {
    handleMessage(event.data);
  });
}

function handleMessage(body: string) {
  const returnData = JSON.parse(body);
  const msg = {
    id: returnData.id,
    title: returnData.title,
    message: returnData.content,
    date: returnData.time,
    avatar: returnData.avatar,
    isRead: false,
  };
  notifications.value.push(msg);
  message.info(returnData.content);
}

onMounted(async () => {
  connectServer();
  const list = await loadLatestNotificationApi(10);
  notifications.value = [...notifications.value, ...list];
});
async function handleNoticeClear() {
  notifications.value = [];
  await clearNotificationApi();
}

async function handleMakeAll() {
  notifications.value.forEach((item) => (item.isRead = true));
  await markAllNotificationApi();
}

function handleViewAll() {
  router.push('/message/notification/my-list');
}
</script>
<template>
  <Notification
    :dot="showDot"
    :notifications="notifications"
    @clear="handleNoticeClear"
    @make-all="handleMakeAll"
    @view-all="handleViewAll"
  />
</template>
