<script setup lang="ts">
import type { UserCredentialModel } from '#/api';

import { onMounted, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { Button, Col, Divider, Modal, Row } from 'ant-design-vue';

import { deleteUserApi, loadMyUserCredentialApi } from '#/api';

import ModifyPassword from './modify-password.vue';
import ModifyPhoneNumber from './modify-phone-number.vue';
import ModifyUsername from './modify-username.vue';

const userCredential = ref<UserCredentialModel>({});

onMounted(() => {
  loadMyUserCredentialApi().then((res) => {
    userCredential.value = res;
  });
});

function deleteUser() {
  Modal.confirm({
    title: $t('user.deleteUser'),
    content: $t('user.deleteUserHint'),
    onOk: async () => {
      await deleteUserApi();
    },
  });
}

const [ModifyPasswordModal, modifyPasswordModalApi] = useVbenModal({
  connectedComponent: ModifyPassword,
});

function openModifyPasswordView() {
  modifyPasswordModalApi.open();
}

const [ModifyUsernameModal, modifyUsernameModalApi] = useVbenModal({
  connectedComponent: ModifyUsername,
});

function openModifyUsernameView() {
  modifyUsernameModalApi.open();
}

const [ModifyPhoneNumberModal, modifyPhoneNumberModalApi] = useVbenModal({
  connectedComponent: ModifyPhoneNumber,
});

function openModifyPhoneNumberView() {
  modifyPhoneNumberModalApi.open();
}
</script>
<template>
  <div class="p-4">
    <div class="text-xl font-bold">{{ $t('user.userCredential.title') }}</div>
    <Divider />
    <Row class="flex items-center">
      <Col :span="4" class="text-right">
        <span>{{ $t('user.userCredential.field.username') }}:</span>
      </Col>
      <Col>
        <span class="ml-4">{{ userCredential.username }}</span>
      </Col>
      <Col>
        <Button type="link" @click="openModifyUsernameView">
          {{ $t('common.change') }}
        </Button>
      </Col>
    </Row>
    <Row class="flex items-center">
      <Col :span="4" class="text-right">
        <span>{{ $t('user.userCredential.field.phoneNumber') }}:</span>
      </Col>
      <Col>
        <span class="ml-4">{{ userCredential.phoneNumber }}</span>
      </Col>
      <Col>
        <Button type="link" @click="openModifyPhoneNumberView">
          {{ $t('common.change') }}
        </Button>
      </Col>
    </Row>
    <Row class="flex items-center">
      <Col :span="4" class="text-right" />
      <Col>
        <Button type="link" @click="openModifyPasswordView">
          {{ $t('user.modifyPassword') }}
        </Button>
        <Button danger type="link" @click="deleteUser">
          {{ $t('user.deleteUser') }}
        </Button>
      </Col>
    </Row>
  </div>
  <ModifyPasswordModal />
  <ModifyUsernameModal />
  <ModifyPhoneNumberModal />
</template>
