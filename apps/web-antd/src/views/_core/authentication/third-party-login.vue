<script setup lang="ts">
import type { ClientRegistrationResult } from '#/api';

import { onMounted, ref } from 'vue';

import { createIconifyIcon } from '@vben/icons';
import { $t } from '@vben/locales';

import { Button } from 'ant-design-vue';

import {
  loadAllOauth2PlatformApi,
  loadOauth2AuthorizeUrlApi,
  openWindow,
} from '#/api';

defineOptions({
  name: 'ThirdPartyLogin',
});

const clientRegistrations = ref<ClientRegistrationResult[]>([]);

onMounted(async () => {
  const data = await loadAllOauth2PlatformApi();
  data.forEach((item) => {
    const iconName = item.iconName ?? 'tdesign:error-triangle';
    const registrationId = item.registrationId;
    const iconColor = item.iconColor;
    clientRegistrations.value.push({ registrationId, iconName, iconColor });
  });
});

async function authorize(registrationId: string) {
  const authorizeUrl = await loadOauth2AuthorizeUrlApi(registrationId);
  openWindow(authorizeUrl, 'Authorize');
}
</script>

<template>
  <div class="w-full sm:mx-auto md:max-w-md">
    <div class="mt-4 flex items-center justify-between">
      <span class="w-[35%] border-b border-input dark:border-gray-600"></span>
      <span class="text-center text-xs uppercase text-muted-foreground">
        {{ $t('authentication.thirdPartyLogin') }}
      </span>
      <span class="w-[35%] border-b border-input dark:border-gray-600"></span>
    </div>

    <div class="mt-4 flex flex-wrap justify-center">
      <Button
        v-for="clientRegistration in clientRegistrations"
        :key="clientRegistration.registrationId"
        class="mb-3"
        shape="round"
        size="large"
        type="link"
        @click="authorize(clientRegistration.registrationId)"
      >
        <template #icon>
          <Component
            :is="createIconifyIcon(`${clientRegistration.iconName}`)"
            :color="clientRegistration.iconColor"
            class="size-8"
          />
        </template>
      </Button>
    </div>
  </div>
</template>
