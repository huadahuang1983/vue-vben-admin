<script setup lang="ts">
import { toRefs } from 'vue';

import { UploadOutlined } from '@ant-design/icons-vue';
import { Button, message, Upload } from 'ant-design-vue';

import { uploadFileApi } from '#/api';

interface FileUploaderProps {
  platform?: string;
  path?: string;
}

defineOptions({
  name: 'FileUploader',
});

const props = defineProps<FileUploaderProps>();
const { platform, path } = toRefs(props);

// 自定义文件上传公共函数
// e - 上传组件返回的上传实例，里面包括 file，和一些组件方法
// e.file - 上传的文件实例对象
// e.onSuccess(ret, xhr)
// e.onError(err, ret)
const customUpload = (e) => {
  // uploadApi 你的二次封装上传接口
  uploadFileApi(platform.value, path.value, e.file)
    .then((res) => {
      // 调用实例的成功方法通知组件该文件上传成功
      e.onSuccess(res, e);
    })
    .catch((error) => {
      // 调用实例的失败方法通知组件该文件上传失败
      message.error(error);
      e.onError(error);
    });
};
</script>
<template>
  <Upload v-bind="props" :custom-request="customUpload">
    <Button type="link">
      <UploadOutlined />
      {{ $t('common.upload') }}
    </Button>
  </Upload>
</template>
