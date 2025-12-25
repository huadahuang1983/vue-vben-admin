<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import VueCropper from 'vue-cropperjs';

import {
  ArrowDownOutlined,
  ArrowLeftOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
  CloudUploadOutlined,
  ColumnHeightOutlined,
  ColumnWidthOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  ScissorOutlined,
  SyncOutlined,
  UploadOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons-vue';
import {
  Button,
  message,
  Tooltip,
  Upload,
  UploadDragger,
} from 'ant-design-vue';

import 'cropperjs/dist/cropper.css';

interface Props {
  src?: string;
  cropRound?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  src: '',
  cropRound: false,
});

const emit = defineEmits<{
  (e: 'crop', data: string): void;
}>();

const cropper = ref<any>(null);
const imgSrc = ref('');
const scaleX = ref<null | number>(null);
const scaleY = ref<null | number>(null);

const getCropperWrapperCls = computed(() => {
  const cls = ['image-cropper-wrapper'];
  if (props.cropRound) {
    cls.push('image-cropper-wrapper-round');
  }
  return cls;
});

onMounted(() => {
  const src = props.src;
  if (src) {
    imgSrc.value = src;
  }
});

const cropImage = () => {
  if (!cropper.value) {
    return;
  }
  if (props.cropRound) {
    // Crop
    const croppedCanvas = cropper.value.getCroppedCanvas();
    // Round
    const roundedCanvas = getRoundedCanvas(croppedCanvas);
    const dataUrl = roundedCanvas.toDataURL();
    emit('crop', dataUrl);
    return dataUrl;
  }
  // get image data for post processing, e.g. upload or setting image src
  const dataUrl = cropper.value.getCroppedCanvas().toDataURL();
  emit('crop', dataUrl);
  return dataUrl;
};

const flipX = () => {
  if (!cropper.value) {
    return;
  }
  let scale = scaleX.value;
  scale = scale ? -scale : -1;
  cropper.value.scaleX(scale);
  scaleX.value = scale;
};

const flipY = () => {
  if (!cropper.value) {
    return;
  }
  let scale = scaleY.value;
  scale = scale ? -scale : -1;
  cropper.value.scaleY(scale);
  scaleY.value = scale;
};

const move = (offsetX: number, offsetY: number) => {
  if (!cropper.value) {
    return;
  }
  cropper.value.move(offsetX, offsetY);
};

const reset = () => {
  if (!cropper.value) {
    return;
  }
  cropper.value.reset();
};

const rotate = (deg: number) => {
  if (!cropper.value) {
    return;
  }
  cropper.value.rotate(deg);
};

const zoom = (percent: number) => {
  if (!cropper.value) {
    return;
  }
  cropper.value.relativeZoom(percent);
};

const destroy = () => {
  if (!cropper.value) {
    return;
  }
  cropper.value.destroy();
};

const handleDrop = () => {};

const beforeUpload = (file: File) => {
  if (!file.type.includes('image/')) {
    message.error('Please select an image file');
    return false;
  }
  if (typeof FileReader === 'function') {
    const reader = new FileReader();
    reader.addEventListener('load', (event) => {
      imgSrc.value = event.target?.result as string;
      // rebuild cropperjs with the updated source
      if (cropper.value) {
        cropper.value.replace(event.target?.result as string);
      }
    });
    reader.readAsDataURL(file);
  } else {
    message.error('Sorry, FileReader API not supported');
  }
  return false;
};

const getRoundedCanvas = (sourceCanvas: HTMLCanvasElement) => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const width = sourceCanvas.width;
  const height = sourceCanvas.height;

  canvas.width = width;
  canvas.height = height;
  context!.imageSmoothingEnabled = true;
  context!.drawImage(sourceCanvas, 0, 0, width, height);
  context!.globalCompositeOperation = 'destination-in';
  context!.beginPath();
  context!.arc(
    width / 2,
    height / 2,
    Math.min(width, height) / 2,
    0,
    2 * Math.PI,
    true,
  );
  context!.fill();
  return canvas;
};

defineExpose({
  cropImage,
  flipX,
  flipY,
  move,
  reset,
  rotate,
  zoom,
  destroy,
});
</script>

<template>
  <div>
    <div :class="getCropperWrapperCls">
      <section class="cropper-area">
        <div class="img-cropper">
          <VueCropper
            v-if="imgSrc"
            ref="cropper"
            :img-style="{ 'max-height': '430px' }"
            :initial-aspect-ratio="1"
            :src="imgSrc"
            drag-mode="move"
            preview=".preview"
          />
          <div v-else class="crop-placeholder">
            <UploadDragger
              :before-upload="beforeUpload"
              :show-upload-list="false"
              @drop="handleDrop"
            >
              <p class="ant-upload-drag-icon">
                <CloudUploadOutlined />
              </p>
              <p class="ant-upload-text">
                {{ $t('common.uploadDraggerText') }}
              </p>
              <p class="ant-upload-hint">
                {{ $t('common.uploadDraggerHint') }}
              </p>
            </UploadDragger>
          </div>
        </div>
        <div class="actions">
          <Tooltip :title="$t('common.image.zoomIn')">
            <Button type="link" @click.prevent="zoom(0.2)">
              <ZoomInOutlined />
            </Button>
          </Tooltip>
          <Tooltip :title="$t('common.image.zoomOut')">
            <Button type="link" @click.prevent="zoom(-0.2)">
              <ZoomOutOutlined />
            </Button>
          </Tooltip>
          <Tooltip :title="$t('common.image.moveLeft')">
            <Button type="link" @click.prevent="move(-10, 0)">
              <ArrowLeftOutlined />
            </Button>
          </Tooltip>
          <Tooltip :title="$t('common.image.moveRight')">
            <Button type="link" @click.prevent="move(10, 0)">
              <ArrowRightOutlined />
            </Button>
          </Tooltip>
          <Tooltip :title="$t('common.image.moveUp')">
            <Button type="link" @click.prevent="move(0, -10)">
              <ArrowUpOutlined />
            </Button>
          </Tooltip>
          <Tooltip :title="$t('common.image.moveDown')">
            <Button type="link" @click.prevent="move(0, 10)">
              <ArrowDownOutlined />
            </Button>
          </Tooltip>
          <Tooltip :title="$t('common.image.rotateRight')">
            <Button type="link" @click.prevent="rotate(90)">
              <RotateRightOutlined />
            </Button>
          </Tooltip>
          <Tooltip :title="$t('common.image.rotateLeft')">
            <Button type="link" @click.prevent="rotate(-90)">
              <RotateLeftOutlined />
            </Button>
          </Tooltip>
          <Tooltip :title="$t('common.image.flipX')">
            <Button type="link" @click.prevent="flipX">
              <ColumnWidthOutlined />
            </Button>
          </Tooltip>
          <Tooltip :title="$t('common.image.flipY')">
            <Button type="link" @click.prevent="flipY">
              <ColumnHeightOutlined />
            </Button>
          </Tooltip>
          <Tooltip :title="$t('common.image.crop')">
            <Button type="link" @click.prevent="cropImage">
              <ScissorOutlined />
            </Button>
          </Tooltip>
          <Tooltip :title="$t('common.image.reset')">
            <Button type="link" @click.prevent="reset">
              <SyncOutlined />
            </Button>
          </Tooltip>
          <Upload :before-upload="beforeUpload" :show-upload-list="false">
            <Tooltip :title="$t('common.upload')">
              <Button type="link"><UploadOutlined /></Button>
            </Tooltip>
          </Upload>
        </div>
      </section>
      <section class="preview-area">
        <div class="preview mt-2"></div>
      </section>
    </div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.image-cropper-wrapper {
  display: flex;
  justify-content: space-between;
}

.cropper-area {
  width: 600px;
}

.actions {
  margin-top: 1rem;
}

.actions button {
  padding: 5px;
}

.preview-area {
  width: 300px;
  padding-left: 20px;
}

.preview-area p:last-of-type {
  margin-top: 1rem;
}

.preview {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

/* stylelint-disable-next-line no-duplicate-selectors */
.image-cropper-wrapper {
  &-round {
    .cropper-view-box,
    .cropper-face,
    .preview {
      border-radius: 50%;
    }
  }
}
</style>
