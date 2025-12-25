<!-- MyCustomComponent.vue -->
<script setup lang="ts">
import type { OptionItemBasicModel } from '../type';

import { onMounted, ref } from 'vue';

import { Select, SelectOption } from 'ant-design-vue';

import { useDictionaryStore } from '#/store/dictionary';

interface DataDictProps {
  dictType?: string;
}

defineOptions({
  name: 'DataDictSelect',
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
  <Select
    :placeholder="$t('common.placeholder.select')"
    v-bind="props"
    :allow-clear="true"
    :filter-option="false"
    :show-search="false"
    class="min-w-60"
  >
    <SelectOption
      v-for="opt in dictOptions"
      :key="opt.value"
      :value="opt.value"
    >
      {{ opt.label }}
    </SelectOption>
  </Select>
</template>
