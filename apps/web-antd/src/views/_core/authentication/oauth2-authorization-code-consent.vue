<script lang="ts" setup>
import type { OAuth2AuthorizationConsentInfo } from '#/api';

import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { Page } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { useAccessStore } from '@vben/stores';

import { Button, Card, Descriptions, List, Space, Tag } from 'ant-design-vue';
import Cookies from 'js-cookie';

import { loadOAuth2AuthorizationConsentInfoApi } from '#/api';

defineOptions({ name: 'OAuth2AuthorizationCodeConsent' });

const router = useRouter();
const accessStore = useAccessStore();

const loading = ref(false);
const consentInfo = ref<null | OAuth2AuthorizationConsentInfo>(null);
const clientId = ref('');

async function loadConsentInfo() {
  const query = router.currentRoute.value.query;
  clientId.value = query.client_id as string;
  if (clientId.value) {
    try {
      consentInfo.value = await loadOAuth2AuthorizationConsentInfoApi(
        clientId.value,
      );
    } catch (error) {
      console.error('Failed to load consent info:', error);
    }
  }
}

function getPostUrl() {
  const baseUrl = `${window.location.protocol}//${window.location.host}`;
  const resultUrl = `${baseUrl}/oauth2/authorize`;
  return resultUrl;
}

async function handleAuthorize() {
  const form = document.createElement('form');
  form.setAttribute('id', 'myForm');
  form.setAttribute('method', 'post');
  form.setAttribute('action', getPostUrl());
  const params = new URLSearchParams(window.location.search);
  params.forEach((value, key) => {
    const values: string[] = [];
    if (key === 'scope') {
      values.push(...value.split(' '));
    } else {
      values.push(value);
    }
    values.forEach((item) => {
      const input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', key);
      input.setAttribute('value', item);
      form.append(input);
    });
  });
  document.body.append(form);

  form.submit();
}

function handleCancel() {
  Cookies.remove('AccessToken');
  accessStore.setLoginExpired(true);
  router.push({ name: 'Login' });
}

onMounted(async () => {
  loadConsentInfo();
});
</script>

<template>
  <Page class="flex min-h-screen items-center justify-center">
    <Card v-if="consentInfo" class="w-full max-w-lg shadow-lg">
      <template #title>
        <div class="text-xl font-bold">
          {{ $t('page.auth.oauth2AuthorizationConsent') }}
        </div>
      </template>
      <template #extra>
        <div
          v-if="consentInfo.clientIcon"
          class="h-10 w-10 overflow-hidden rounded-full"
        >
          <img
            :src="consentInfo.clientIcon"
            :alt="consentInfo.clientName"
            class="h-full w-full object-cover"
          />
        </div>
      </template>

      <div class="mb-4 text-muted-foreground">
        {{ $t('page.auth.oauth2AuthorizationConsentDescription') }}
      </div>

      <Descriptions :column="1" bordered size="small" class="mb-4">
        <Descriptions.Item :label="$t('page.auth.applicationName')">
          {{ consentInfo.clientName }}
        </Descriptions.Item>
        <Descriptions.Item
          v-if="consentInfo.clientDescription"
          :label="$t('page.auth.applicationDescription')"
        >
          {{ consentInfo.clientDescription }}
        </Descriptions.Item>
        <Descriptions.Item :label="$t('page.auth.redirectUri')">
          {{ consentInfo.redirectUri }}
        </Descriptions.Item>
      </Descriptions>

      <div class="mb-4">
        <div class="mb-2 font-semibold">
          {{ $t('page.auth.requestedPermissions') }}
        </div>
        <List :data-source="consentInfo.scopes" size="small">
          <template #renderItem="{ item }">
            <List.Item>
              <Tag color="blue">{{ item }}</Tag>
            </List.Item>
          </template>
        </List>
      </div>

      <Space class="flex justify-end">
        <Button @click="handleCancel">
          {{ $t('page.auth.cancel') }}
        </Button>
        <Button type="primary" :loading="loading" @click="handleAuthorize">
          {{ $t('page.auth.authorize') }}
        </Button>
      </Space>
    </Card>
    <div v-else class="text-center text-muted-foreground">Loading...</div>
  </Page>
</template>
