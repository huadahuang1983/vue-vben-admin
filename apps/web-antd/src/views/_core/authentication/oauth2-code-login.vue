<script lang="ts" setup>
import type { OAuth2CodeLoginParam } from '#/api';

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { oauth2CodeAuthenticationApi } from '#/api';
import { useAuthStore } from '#/store';

defineOptions({ name: 'OAuth2Code' });

const router = useRouter();
const authStore = useAuthStore();

async function handleSubmit() {
  const query = router.currentRoute.value.query;
  const params = router.currentRoute.value.params;
  const codeParam: OAuth2CodeLoginParam = {
    registrationId: params.registrationId,
    state: query.state,
    code: query.code,
  };
  const { accessToken, mode } = await oauth2CodeAuthenticationApi(codeParam);
  if (accessToken) {
    if (mode === 'OIDC') {
      authStore.authLogin({ secretKey: accessToken });
    } else {
      localStorage.setItem('OAuth2Token', accessToken);
      router.push({ name: 'Login', query: { mode: 'oauth2' } });
    }
  } else {
    router.push({ name: 'Login' });
  }
}

onMounted(async () => {
  handleSubmit();
});
</script>

<template><div></div></template>
