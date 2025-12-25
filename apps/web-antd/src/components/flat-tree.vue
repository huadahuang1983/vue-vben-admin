<script setup lang="ts">
import { Tree } from 'ant-design-vue';

interface FlatTreeProps {
  treeData: any;
  expandedKeys: any;
}

defineOptions({
  name: 'FlatTree',
});

const props = withDefaults(defineProps<FlatTreeProps>(), {});
const checkedKeys = defineModel<string[]>();
</script>
<template>
  <div class="flat_tree">
    <Tree v-bind="props" v-model:checked-keys="checkedKeys" checkable />
  </div>
</template>
<style lang="scss" scoped>
/* stylelint-disable-next-line selector-class-pattern */
.flat_tree {
  :deep(.ant-tree-list-holder-inner) {
    display: inline-block !important;
  }
}
</style>
<style>
/* stylelint-disable-next-line selector-class-pattern */
.flat_tree_leaf {
  display: inline-flex !important;
  width: 200px;
}
</style>
