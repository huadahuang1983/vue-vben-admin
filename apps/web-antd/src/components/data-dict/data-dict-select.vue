<!-- MyCustomComponent.vue -->
<script setup lang="ts">
import type { OptionItemBasicModel } from '../type';

import { onMounted, ref } from 'vue';

import { Select, SelectOption } from 'ant-design-vue';

import { loadDataDictItemByDictCodeApi } from '#/api';
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

async function loadDataDictItems(dictType: string) {
  if (!dictionaryStore.isLoaded(dictType)) {
    const dataDictItems = await loadDataDictItemByDictCodeApi(dictType);
    dictionaryStore.setDataDictItems(dictType, dataDictItems);
    dictionaryStore.setLoaded(dictType, true);
  }
  return dictionaryStore.getDataDictItems(dictType);
}

onMounted(async () => {
  const dataDictItems = await loadDataDictItems(props.dictType);
  dictOptions.value = dataDictItems.map((item) => ({
    label: item.dataName,
    value: item.dataCode,
  }));
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
