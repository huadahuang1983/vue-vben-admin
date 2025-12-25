<script setup lang="ts">
import { onMounted } from 'vue';

import { Button, Input } from 'ant-design-vue';
import { v4 } from 'uuid';

interface RandomInputProps {
  disabled?: boolean;
  count?: number;
  initValue?: boolean;
}
const props = defineProps<RandomInputProps>();
const modelValue = defineModel<string>();
onMounted(() => {
  if (!modelValue.value && props.initValue) {
    gen();
  }
});
function gen() {
  const randomValue = v4().replaceAll('-', '').toUpperCase();
  modelValue.value =
    props.count === undefined
      ? randomValue
      : randomValue.slice(0, Math.max(0, props.count));
}
</script>
<template>
  <div class="flex w-full">
    <Input v-bind="props" v-model:value="modelValue" />
    <Button :disabled="disabled" class="ml-2" type="primary" @click="gen">
      {{ $t('common.randomValue') }}
    </Button>
  </div>
</template>
