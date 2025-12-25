<script lang="ts" setup>
import type { OAuth2CodeLoginParam } from '#/api';

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { LOGIN_PATH } from '@vben/constants';
import { useAccessStore } from '@vben/stores';

import { oauth2CodeAuthenticationApi } from '#/api';

defineOptions({ name: 'OAuth2Code' });

const router = useRouter();
const accessStore = useAccessStore();

async function handleSubmit() {
  const query = router.currentRoute.value.query;
  const params = router.currentRoute.value.params;
  const codeParam: OAuth2CodeLoginParam = {
    registrationId: params.registrationId,
    state: query.state,
    code: query.code,
  };
  const oauth2CodeLoginResult = await oauth2CodeAuthenticationApi(codeParam);
  if (oauth2CodeLoginResult.isBound) {
    accessStore.setAccessToken(oauth2CodeLoginResult.accessToken);
    router.push(LOGIN_PATH);
  } else {
    window.location.href = oauth2CodeLoginResult.redirectUrl;
  }
}

onMounted(async () => {
  handleSubmit();
});
</script>

<template><div></div></template>
