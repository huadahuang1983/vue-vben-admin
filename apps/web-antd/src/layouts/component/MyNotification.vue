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
  markMyNotificationApi,
  removeMyNotificationApi,
} from '#/api';
import defaultAvatar from '#/assets/images/mdi--user.png';

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

function disconnectServer() {
  if (sse.value) {
    sse.value.close();
    sse.value = undefined;
  }
}

function connectServer() {
  disconnectServer();
  const eventSource = new EventSourcePolyfill(`/api/message/sse`, {
    heartbeatTimeout: 300_000,
    headers: {
      Authorization: `Bearer ${accessStore.accessToken}`,
    },
  });
  sse.value = eventSource;
  eventSource.addEventListener('message', (event) => {
    handleMessage(event.data);
  });
}

accessStore.$subscribe((mutation, state) => {
  if (state.accessToken) {
    connectServer();
  }
});

function handleMessage(body: string) {
  const returnData = JSON.parse(body);
  const { id, data } = returnData;
  const msg = {
    id,
    title: data.title,
    message: data.content,
    date: data.time,
    avatar: data.avatar ?? defaultAvatar,
    isRead: data.isRead,
  };
  notifications.value.push(msg);
  message.info(data.content);
}

onMounted(async () => {
  connectServer();
  const list = await loadLatestNotificationApi(10);
  list.forEach((item: any) => {
    item.avatar = item.avatar ?? defaultAvatar;
    item.id = item.messageNotificationId;
  });
  notifications.value = [...notifications.value, ...list];
});

async function handleNoticeClear() {
  notifications.value.length = 0;
  await clearNotificationApi();
}

async function handleMakeAll() {
  notifications.value.forEach((item) => (item.isRead = true));
  await markAllNotificationApi();
}

function handleViewAll() {
  router.push({ name: 'MyNotificationList' });
}

function handleRead(item: NotificationItem) {
  item.isRead = true;
  markMyNotificationApi([item.id]);
}

async function handleRemove(item: NotificationItem) {
  notifications.value = notifications.value.filter((i) => i.id !== item.id);
  await removeMyNotificationApi([item.id]);
}
</script>
<template>
  <Notification
    :dot="showDot"
    :notifications="notifications"
    @clear="handleNoticeClear"
    @make-all="handleMakeAll"
    @view-all="handleViewAll"
    @read="handleRead"
    @remove="handleRemove"
  />
</template>
