<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import { AuthenticationQrCodeLogin } from '@vben/common-ui';
import { LOGIN_PATH } from '@vben/constants';

import { QRCode } from 'ant-design-vue';
import { v4 as uuid } from 'uuid';

import { useAuthStore } from '#/store';

defineOptions({ name: 'QrCodeLogin' });

const authStore = useAuthStore();
const loading = ref(false);
const status = ref<'active' | 'expired' | 'loading' | 'scanned'>('active');
const text = ref('');
const clientId = ref(uuid());

async function createQrcodeText() {
  text.value = `clientId=${clientId.value}`;
}

function connectServer() {
  const eventSource = new EventSource(
    `/api/auth/sse?clientId=${clientId.value}`,
  );
  eventSource.addEventListener('message', (event) => {
    handleMessage(event.data);
  });
  eventSource.addEventListener('error', () => {
    status.value = 'expired';
    eventSource.close();
  });
}

function handleMessage(data: string) {
  const message = JSON.parse(data);
  if (message.event === 'scanned') {
    status.value = 'scanned';
  }
  if (message.event === 'timeout') {
    status.value = 'expired';
  }
  if (message.event === 'confirm') {
    loading.value = true;
    try {
      authStore.authLogin({
        secretKey: message.data,
      });
    } finally {
      loading.value = false;
    }
  }
}

async function refreshQrcode() {
  await createQrcodeText();
  connectServer();
  status.value = 'active';
}

onMounted(() => {
  refreshQrcode();
});
</script>

<template>
  <AuthenticationQrCodeLogin :loading="loading" :login-path="LOGIN_PATH">
    <template #qrcode>
      <QRCode
        :value="text"
        :size="240"
        :bordered="false"
        :status="status"
        @refresh="refreshQrcode"
      />
    </template>
  </AuthenticationQrCodeLogin>
</template>
