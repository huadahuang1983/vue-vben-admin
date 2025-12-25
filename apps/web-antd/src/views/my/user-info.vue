<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useVbenDrawer, useVbenModal } from '@vben/common-ui';

import { Avatar, Button, Col, Divider, Input, Row } from 'ant-design-vue';

import { loadMyUserInfoApi, updateMyUserInfoApi } from '#/api';
import { ImageCropperUpload } from '#/components';
import { $t } from '#/locales';
import { useDictionaryStore } from '#/store/dictionary';

import UserInfoDrawer from './user-info-form.vue';

defineOptions({
  name: 'MyUserInfo',
});

const dictionaryStore = useDictionaryStore();
const gender = ref();
const userStatus = ref();
const locale = ref();

const myUserInfo = ref({
  phoneNumber: '',
  avatar: '',
  nickname: '',
  registerTime: '',
  gender: '',
  birthday: '',
  country: '',
  locale: '',
  email: '',
  description: '',
  userStatus: '',
});

onMounted(async () => {
  loadMyUserInfo();
});

async function loadMyUserInfo() {
  const userInfo = await loadMyUserInfoApi();
  const userStatusMap = await dictionaryStore.getDictMap('UserStatus');
  userStatus.value = userStatusMap.get(userInfo.userStatus);
  const genderMap = await dictionaryStore.getDictMap('Gender');
  gender.value = genderMap.get(userInfo.gender);
  const localeMap = await dictionaryStore.getDictMap('Language');
  locale.value = localeMap.get(userInfo.locale);
  myUserInfo.value = userInfo;
}

const [Drawer, drawerApi] = useVbenDrawer({
  connectedComponent: UserInfoDrawer,
});

function openUserInfoDrawer() {
  drawerApi.setData({
    // 表单值
    values: myUserInfo.value,
  });
  drawerApi.open();
}

const [Modal, modalApi] = useVbenModal({
  connectedComponent: ImageCropperUpload,
  title: $t('my.avatar.uploadTitle'),
});

async function handleSubmit(url: string, imageData: string) {
  myUserInfo.value.avatar = imageData;
  await updateMyUserInfoApi({ avatar: url });
}

function openAvatarUploadModal() {
  modalApi.setData({
    src: myUserInfo.value.avatar,
    handler: handleSubmit,
  });
  modalApi.open();
}

const phoneNumber = ref();
const isEditPhoneNumber = ref(false);
async function phoneNumberSubmit() {
  await updateMyUserInfoApi({ phoneNumber: phoneNumber.value });
  isEditPhoneNumber.value = false;
  loadMyUserInfo();
}
const email = ref();
const isEditEmail = ref(false);
async function emailSubmit() {
  await updateMyUserInfoApi({ email: email.value });
  isEditEmail.value = false;
  loadMyUserInfo();
}
</script>
<template>
  <div>
    <Row class="h-28 w-full">
      <Col class="ml-4 content-center justify-center">
        <Avatar :size="80" :src="myUserInfo.avatar" shape="circle" />
      </Col>
      <Col class="content-center justify-center pl-4 pt-4">
        <div class="text-xl font-bold">{{ myUserInfo.nickname }}</div>
        <div class="text-xs">
          {{ $t('user.userInfo.field.registerTime') }}：
          {{ myUserInfo.registerTime }}
        </div>
        <div>
          <Button type="link" @click="openAvatarUploadModal">
            {{ $t('my.avatar.changeAvatar') }}
          </Button>
        </div>
      </Col>
    </Row>
    <Divider />
    <div class="h-full w-full">
      <Row class="flex items-center">
        <Col :span="4" class="text-right">
          {{ $t('user.userInfo.field.phoneNumber') }}：
        </Col>
        <Col :span="8">
          <div v-if="!isEditPhoneNumber">
            <span>{{ myUserInfo.phoneNumber }}</span>
            <span>
              <Button type="link" @click="isEditPhoneNumber = true">
                {{ $t('common.edit') }}
              </Button>
            </span>
          </div>
          <div v-if="isEditPhoneNumber">
            <Input v-model:value="phoneNumber" class="w-[200px]" />
            <Button type="link" @click="phoneNumberSubmit">
              {{ $t('common.submit') }}
            </Button>
            <Button type="link" @click="isEditPhoneNumber = false">
              {{ $t('common.cancel') }}
            </Button>
          </div>
        </Col>
        <Col :span="4" class="text-right">
          {{ $t('user.userInfo.field.nickname') }}：
        </Col>
        <Col>{{ myUserInfo.nickname }}</Col>
      </Row>
      <Row class="flex items-center">
        <Col :span="4" class="text-right">
          {{ $t('user.userInfo.field.email') }}：
        </Col>
        <Col :span="8">
          <div v-if="!isEditEmail">
            <span>{{ myUserInfo.email }}</span>
            <span>
              <Button type="link" @click="isEditEmail = true">
                {{ $t('common.edit') }}
              </Button>
            </span>
          </div>
          <div v-if="isEditEmail">
            <Input v-model:value="email" class="w-[200px]" />
            <Button type="link" @click="emailSubmit">
              {{ $t('common.submit') }}
            </Button>
            <Button type="link" @click="isEditEmail = false">
              {{ $t('common.cancel') }}
            </Button>
          </div>
        </Col>
        <Col :span="4" class="text-right">
          {{ $t('user.userInfo.field.gender') }}：
        </Col>
        <Col>{{ gender }}</Col>
      </Row>
      <Row>
        <Col :span="4" class="text-right">
          {{ $t('user.userInfo.field.birthday') }}：
        </Col>
        <Col :span="8">{{ myUserInfo.birthday }}</Col>
        <Col :span="4" class="text-right">
          {{ $t('user.userInfo.field.userStatus') }}：
        </Col>
        <Col>{{ userStatus }}</Col>
      </Row>
      <Row>
        <Col :span="4" class="text-right">
          {{ $t('user.userInfo.field.country') }}：
        </Col>
        <Col :span="8">{{ myUserInfo.country }}</Col>
        <Col :span="4" class="text-right">
          {{ $t('user.userInfo.field.locale') }}：
        </Col>
        <Col>{{ locale }}</Col>
      </Row>
      <Row>
        <Col :span="4" class="text-right">
          {{ $t('user.userInfo.field.description') }}：
        </Col>
        <Col :span="18">
          <span>{{ myUserInfo.description }}</span>
        </Col>
      </Row>
      <Row>
        <Col :span="24" class="content-center justify-center text-center">
          <Button type="link" @click="openUserInfoDrawer">
            {{ $t('common.edit') }}
          </Button>
        </Col>
      </Row>
    </div>
  </div>
  <Drawer />
  <Modal />
</template>
