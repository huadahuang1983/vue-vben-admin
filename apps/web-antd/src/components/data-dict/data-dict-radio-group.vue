<!-- MyCustomComponent.vue -->
<script setup lang="ts">
import type { OptionItemBasicModel } from '../type';

import { onMounted, ref } from 'vue';

import { RadioButton, RadioGroup } from 'ant-design-vue';

import { useDictionaryStore } from '#/store/dictionary';

interface DataDictProps {
  dictType?: string;
}

defineOptions({
  name: 'DataDictRadioGroup',
});

const props = withDefaults(defineProps<DataDictProps>(), {
  dictType: '',
});

const dictionaryStore = useDictionaryStore();

const dictOptions = ref<OptionItemBasicModel[]>([]);

onMounted(async () => {
  dictOptions.value = await dictionaryStore.getDictList(props.dictType);
});
</script>

<template>
  <RadioGroup v-bind="props" button-style="solid">
    <RadioButton v-for="opt in dictOptions" :key="opt.value" :value="opt.value">
      {{ opt.label }}
    </RadioButton>
  </RadioGroup>
</template>
