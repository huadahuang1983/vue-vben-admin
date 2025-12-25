<script setup lang="ts">
import { ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { uploadImageDataApi } from '#/api';
import { ImageCropper } from '#/components';

defineOptions({
  name: 'ImageCropperUpload',
});

const imageCropper = ref(null);
const imageSrc = ref();
const imageCropRound = ref();

const [Modal, modalApi] = useVbenModal({
  onCancel() {
    modalApi.close();
  },
  onConfirm: async () => {
    if (!imageCropper.value) {
      return;
    }
    const imageData = imageCropper.value.cropImage();
    const file = {
      file: imageData,
      path: 'avatar/',
    };
    const { url } = await uploadImageDataApi(file);
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
      ref="imageCropper"
      :crop-round="imageCropRound"
      :src="imageSrc"
    />
  </Modal>
</template>
