<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { $t } from '@vben/locales';
import { useUserStore } from '@vben/stores';

import { Button, message } from 'ant-design-vue';

import { getUserInfoApi, updateMyUserInfoApi, uploadDataApi } from '#/api';
import { ImageCropper } from '#/components';

const imageCropper = ref();
const imageSrc = ref();
const imageCropRound = ref(false);
const userStore = useUserStore();
const loading = ref(false);

onMounted(async () => {
  const data = await getUserInfoApi();
  imageSrc.value = data.avatar;
});

async function handleSubmit() {
  if (!imageCropper.value) {
    return;
  }
  loading.value = true;
  const imageData = imageCropper.value.cropImage();
  const file = {
    file: imageData,
    path: 'avatar/',
  };
  const { url } = await uploadDataApi(file);
  await updateMyUserInfoApi({ avatar: url });
  message.success($t('common.success'));
  if (userStore.userInfo !== null) {
    userStore.userInfo.avatar = url;
  }
  loading.value = false;
}
</script>
<template>
  <ImageCropper
    ref="imageCropper"
    :crop-round="imageCropRound"
    :img-src="imageSrc"
  />
  <Button type="primary" @click="handleSubmit" :loading="loading">
    {{ $t('common.submit') }}
  </Button>
</template>
