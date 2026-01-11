<script lang="ts" setup>
import type { OAuth2CodeLoginParam } from '#/api';

import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

import { checkOauth2UserBindApi, oauth2CodeAuthenticationApi } from '#/api';
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
  const { accessToken } = await oauth2CodeAuthenticationApi(codeParam);
  const { isBound } = await checkOauth2UserBindApi({ accessToken });
  if (isBound) {
    authStore.authLogin({ secretKey: accessToken });
  } else {
    router.push({ name: 'OAuth2BindUser', query: { secretKey: accessToken } });
  }
}

onMounted(async () => {
  handleSubmit();
});
</script>

<template><div></div></template>
