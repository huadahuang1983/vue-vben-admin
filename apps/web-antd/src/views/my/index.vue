<script setup lang="ts">
import type { ItemType } from 'ant-design-vue';

import { h, markRaw, ref } from 'vue';

import { $t } from '@vben/locales';

import { SafetyCertificateOutlined, UserOutlined } from '@ant-design/icons-vue';
import { Layout, LayoutContent, LayoutSider, Menu } from 'ant-design-vue';

import SecuritySetting from './security-setting.vue';
import MyUserInfo from './user-info.vue';

const items = ref<ItemType[]>(createMenuItems());
function createMenuItems(): ItemType[] {
  return [
    {
      label: $t('my.userInfo.title'),
      key: 'MyUserInfo',
      icon: () => h(UserOutlined),
    },
    {
      label: $t('my.securitySetting.title'),
      key: 'SecuritySetting',
      icon: () => h(SafetyCertificateOutlined),
    },
  ];
}
const MyUserInfoView = markRaw(MyUserInfo);
const SecuritySettingView = markRaw(SecuritySetting);
const viewComponent = ref(MyUserInfoView);
function menuClick(menuInfo: ItemType) {
  if (!menuInfo) {
    return;
  }
  if (menuInfo.key === 'MyUserInfo') {
    viewComponent.value = MyUserInfoView;
  }
  if (menuInfo.key === 'SecuritySetting') {
    viewComponent.value = SecuritySettingView;
  }
}
const current = ref<string[]>(['userInfo']);
</script>
<template>
  <Layout class="h-full w-full">
    <LayoutSider class="mt-2 h-full">
      <Menu
        v-model:selected-keys="current"
        :items="items"
        class="h-full"
        @click="menuClick"
      />
    </LayoutSider>
    <LayoutContent class="mt-2 h-full w-full">
      <Component :is="viewComponent" />
    </LayoutContent>
  </Layout>
</template>
