<script setup lang="ts">
import type { TreeSelectProps } from 'ant-design-vue';

import { onMounted, ref } from 'vue';

import { TreeSelect } from 'ant-design-vue';

import { loadMenuByParentId } from './menu-api';

defineOptions({
  name: 'MenuTreeSelect',
});

const treeData = ref<TreeSelectProps['treeData']>([]);

onMounted(async () => {
  treeData.value = await loadMenuByParentId();
});

const loadData = async (treeNode: TreeSelectProps['treeData'][number]) => {
  const { value } = treeNode;
  treeNode.loading = true;
  const treeNodeData = await loadMenuByParentId(value);
  treeNode.loading = false;
  treeNodeData.forEach((item) => {
    treeNode.children.push(item);
  });
};
</script>
<template>
  <TreeSelect
    :allow-clear="true"
    :load-data="loadData"
    :placeholder="$t('common.placeholder.select')"
    :tree-data="treeData"
    class="min-w-60"
  />
</template>
