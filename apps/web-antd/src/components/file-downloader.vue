<script setup lang="ts">
import type { AxiosRequestConfig } from '@vben/request';

import { toRefs } from 'vue';

import { downloadFileFromBlob } from '@vben/utils';

import { Button } from 'ant-design-vue';
import axios from 'axios';

import { downloadFilePresignedApi, loadFileDetailByIdApi } from '#/api';

const props = defineProps({
  fileId: {
    type: String,
    default: '',
  },
});

const { fileId } = toRefs(props);

async function doDownload(
  url: string,
  filename: string = '',
  config: AxiosRequestConfig = {},
) {
  config.headers = {
    ...config?.headers,

    'Content-Type': 'application/x-www-form-urlencoded',
  };
  axios({
    url,
    method: 'GET',
    responseType: 'blob',
    timeout: 30 * 60 * 1000,
    headers: { ...config.headers },
  }).then((res: any) => {
    const blob = res.data;
    downloadFileFromBlob({ fileName: filename, source: blob });
  });
}
async function download() {
  const presignedResult = await downloadFilePresignedApi({
    id: fileId.value,
    contentDisposition: 'attachment',
  });
  const fileInfo = await loadFileDetailByIdApi(fileId.value);
  if (presignedResult) {
    doDownload(presignedResult.url, fileInfo.originalFilename);
  } else {
    doDownload(fileInfo.url, fileInfo.originalFilename);
  }
}
</script>
<template>
  <Button v-bind="props" @click="download">
    {{ $t('common.download') }}
  </Button>
</template>
