<script setup lang="ts">
import type { TreeProps } from 'ant-design-vue';

import { ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useVbenForm } from '#/adapter/form';
import {
  loadMenuByMenuTypeApi,
  loadMenuKeyByRoleApi,
  saveRoleMenuByRoleApi,
} from '#/api';
import { FlatTree } from '#/components';

defineOptions({
  name: 'ConfigPermissionDrawer',
});

const expandedKeys = ref<string[]>([]);
const treeData = ref<TreeProps['treeData']>([]);
const checkedKeys = ref<string[]>([]);
const noneLeafIds: Array<string> = []; // 非叶子节点id

function makeTreeNode(menu: any): any {
  return {
    key: menu.menuId,
    title: $t(menu.title),
    class: menu.isLeaf ? 'flat_tree_leaf' : null,
    isLeaf: true,
    children: [],
  };
}

function createTree(parent: any, menus: any) {
  menus.forEach((element: any) => {
    if (parent.key === element.parentId) {
      const treeNode = makeTreeNode(element);
      parent.isLeaf = false;
      if (!noneLeafIds.includes(parent.key)) {
        noneLeafIds.push(parent.key);
      }
      expandedKeys.value = [...expandedKeys.value, parent.key];
      createTree(treeNode, menus);
      parent.children.push(treeNode);
    }
  });
}

const [Form, formApi] = useVbenForm({
  showDefaultActions: false,
  handleSubmit: onSubmit,
});

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm: async () => {
    const { valid } = await formApi.validate();
    if (!valid) {
      return;
    }
    await formApi.submitForm();
    drawerApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { values } = drawerApi.getData<Record<string, any>>();
      if (values) {
        formApi.setValues(values);
        loadMenu();
      }
    }
  },
  title: '配置权限',
});

function getRoleId() {
  const formData = drawerApi.getData().values;
  const roleId = formData.roleId;
  return roleId;
}

async function onSubmit() {
  await saveRoleMenuByRoleApi(getRoleId(), checkedKeys.value);
}

function loadMenu() {
  loadMenuByMenuTypeApi().then((menus) => {
    const roots: TreeProps['treeData'] = [];
    menus.forEach((element: any) => {
      if (element.parentId === '0') {
        const treeNode = makeTreeNode(element);
        createTree(treeNode, menus);
        roots.push(treeNode);
      }
    });
    treeData.value = roots;
    loadMenuKeyByRoleApi(getRoleId()).then((res) => {
      res.forEach((element: any) => {
        if (!noneLeafIds.includes(element)) {
          checkedKeys.value.push(element);
        }
      });
    });
  });
}
</script>
<template>
  <Drawer>
    <Form>
      <FlatTree
        v-model="checkedKeys"
        v-model:expanded-keys="expandedKeys"
        :tree-data="treeData"
      />
    </Form>
  </Drawer>
</template>
