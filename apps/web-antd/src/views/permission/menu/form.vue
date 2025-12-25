<script lang="ts" setup>
import { shallowRef } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useVbenForm } from '#/adapter/form';
import { saveMenuApi } from '#/api';
import { MenuTreeSelect } from '#/components';

defineOptions({
  name: 'MenuDrawer',
});
const [Form, formApi] = useVbenForm({
  schema: [
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'name',
      label: $t('permission.menu.field.name'),
      rules: 'required',
      description: $t('permission.menu.comment.name'),
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'title',
      label: $t('permission.menu.field.title'),
      rules: 'required',
      description: $t('permission.menu.comment.title'),
      dependencies: {
        triggerFields: ['menuType'],
        show(values: any) {
          return values.menuType === 'menu';
        },
      },
    },
    {
      component: 'DataDictRadioGroup',
      componentProps: {
        class: 'mr-2',
        dictType: 'MenuType',
      },
      fieldName: 'menuType',
      label: $t('permission.menu.field.menuType'),
      rules: 'required',
      description: '',
    },
    {
      component: shallowRef(MenuTreeSelect),
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'parentId',
      label: $t('permission.menu.field.parentId'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'accessCode',
      label: $t('permission.menu.field.accessCode'),
      rules: '',
      description: '',
      dependencies: {
        triggerFields: ['menuType'],
        show: (values) => {
          return values.menuType === 'action';
        },
      },
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'path',
      label: $t('permission.menu.field.path'),
      rules: '',
      description: '',
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'component',
      label: $t('permission.menu.field.component'),
      rules: '',
      description: $t('permission.menu.comment.component'),
      dependencies: {
        triggerFields: ['menuType'],
        show: (values) => {
          return values.menuType === 'menu';
        },
      },
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'icon',
      label: $t('permission.menu.field.icon'),
      rules: '',
      description: '',
      dependencies: {
        triggerFields: ['menuType'],
        show: (values) => {
          return values.menuType === 'menu';
        },
      },
    },
    {
      component: 'Switch',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'affixTab',
      label: $t('permission.menu.field.affixTab'),
      rules: 'required',
      description: '',
      dependencies: {
        triggerFields: ['menuType'],
        show: (values) => {
          return values.menuType === 'menu';
        },
      },
    },
    {
      component: 'Switch',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'hiddenInMenu',
      label: $t('permission.menu.field.hiddenInMenu'),
      rules: '',
      description: '',
      dependencies: {
        triggerFields: ['menuType'],
        show: (values) => {
          return values.menuType === 'menu';
        },
      },
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'redirect',
      label: $t('permission.menu.field.redirect'),
      rules: '',
      description: '',
      dependencies: {
        triggerFields: ['menuType'],
        show: (values) => {
          return values.menuType === 'menu';
        },
      },
    },
    {
      component: 'Switch',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'keepAlive',
      label: $t('permission.menu.field.keepAlive'),
      rules: '',
      description: '',
      dependencies: {
        triggerFields: ['menuType'],
        show: (values) => {
          return values.menuType === 'menu';
        },
      },
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'iframeSrc',
      label: $t('permission.menu.field.iframeSrc'),
      rules: '',
      description: '',
      dependencies: {
        triggerFields: ['menuType'],
        show: (values) => {
          return values.menuType === 'menu';
        },
      },
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'link',
      label: $t('permission.menu.field.link'),
      rules: '',
      description: '',
      dependencies: {
        triggerFields: ['menuType'],
        show: (values) => {
          return values.menuType === 'menu';
        },
      },
    },
    {
      component: 'InputNumber',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'orderNo',
      label: $t('permission.menu.field.orderNo'),
      rules: '',
      description: '',
      dependencies: {
        triggerFields: ['menuType'],
        show: (values) => {
          return values.menuType === 'menu';
        },
      },
    },
    {
      component: 'DataDictRadioGroup',
      componentProps: {
        class: 'mr-2',
        dictType: 'GenericStatus',
      },
      fieldName: 'status',
      label: $t('permission.menu.field.status'),
      rules: 'required',
      description: '',
    },
    {
      component: 'Switch',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'isLeaf',
      label: $t('permission.menu.field.isLeaf'),
      rules: 'required',
      description: '',
      dependencies: {
        triggerFields: ['menuType'],
        show: (values) => {
          return values.menuType === 'menu';
        },
      },
    },
    {
      component: 'Textarea',
      componentProps: {
        class: 'mr-2',
        rows: 4,
      },
      fieldName: 'remark',
      label: $t('permission.menu.field.remark'),
      rules: '',
      description: '',
    },
  ],
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
      const { values, disabled } = drawerApi.getData<Record<string, any>>();
      if (values) {
        formApi.setValues(values);
      }
      const enableEdit = !!disabled;
      formApi.setState({ commonConfig: { disabled: enableEdit } });
    }
  },
  title: $t('permission.menu.title'),
});

async function onSubmit(values: any) {
  const formData = drawerApi.getData().values;
  values.menuId = formData.menuId;
  await saveMenuApi(values);
  drawerApi.setData({ success: true });
}
</script>
<template>
  <Drawer class="w-[600px]">
    <Form />
  </Drawer>
</template>
