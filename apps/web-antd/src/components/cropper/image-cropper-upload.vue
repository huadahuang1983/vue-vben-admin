<script setup lang="ts">
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { uploadDataApi } from '#/api';
import { ImageCropper } from '#/components';

defineOptions({
  name: 'ImageCropperUpload',
});

const imageCropper = ref();
const imageSrc = ref();
const imageCropRound = ref();

const [Modal, modalApi] = useVbenModal({
  onConfirm: async () => {
    if (!imageCropper.value) {
      return;
    }
    const imageData = imageCropper.value.cropImage();
    const file = {
      file: imageData,
      path: 'avatar/',
    };
    const { url } = await uploadDataApi(file);
    const { handler } = modalApi.getData<Record<string, any>>();
    if (handler) {
      handler(url, imageData);
    }
    modalApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { src, cropRound } = modalApi.getData<Record<string, any>>();
      imageSrc.value = src;
      imageCropRound.value = cropRound;
    }
  },
});
</script>
<template>
  <Modal class="w-[900px]">
    <ImageCropper
      :ref="imageCropper"
      :crop-round="imageCropRound"
      :src="imageSrc"
    />
  </Modal>
</template>
