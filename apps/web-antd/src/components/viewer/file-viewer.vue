<script setup lang="ts">
import { ref } from 'vue';

import { Button } from 'ant-design-vue';

defineOptions({
  name: 'FileViewer',
});

const open = ref<boolean>(false);
const fileUrl = ref();
const pageWidth = ref(800);
const pageHeight = ref(1200);

function show(url: any) {
  fileUrl.value = url;
  open.value = true;
  // createOverlay();
}

function close() {
  window.URL.revokeObjectURL(fileUrl.value);
  fileUrl.value = null;
  open.value = false;
}

defineExpose({ show });
</script>
<template>
  <div>
    <div v-show="open" class="overlay flex justify-center">
      <div class="overlat-triangle triangle"></div>
      <Button type="link" @click="close">
        <span
          class="overlat-triangle icon-[carbon--close-outline]"
          style="width: 48px; height: 48px"
        ></span>
      </Button>
      <iframe
        v-show="fileUrl"
        :height="pageHeight"
        :src="fileUrl"
        :width="pageWidth"
        frameborder="0"
        style="position: fixed; top: 0; z-index: 2000"
      ></iframe>
    </div>
  </div>
</template>
<style>
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  background: rgb(0 0 0 / 50%); /* 半透明黑色 */
}

.overlat-triangle {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 1000;
}

.triangle {
  width: 0;
  height: 0;
  border-top: 90px solid #1f1d1d;
  border-right: 0 solid transparent;
  border-left: 90px solid transparent;
}
</style>
