<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { useVbenModal } from '@vben/common-ui';

import { Button, Form } from 'ant-design-vue';

import { loadMyUserCredentialsApi } from '#/api';
import { $t } from '#/locales';

import BindEmail from './bind-email.vue';
import BindPasswordQuestion from './bind-password-question.vue';
import BindPhoneNumber from './bind-phone-number.vue';
import UnbindEmail from './unbind-email.vue';
import UnbindPhoneNumber from './unbind-phone-number.vue';

const strengthLabels = ['弱', '中', '强', '非常强', '异常强'];
const passwordStrength = ref();
const username = ref();
const phoneNumber = ref();
const email = ref();
const securityQuestion = ref();
const mfaDevice = ref();

async function loadCredentials() {
  const credentials = await loadMyUserCredentialsApi();
  username.value = credentials.username;
  phoneNumber.value = credentials.phoneNumber;
  passwordStrength.value = strengthLabels[credentials.passwordStrength];
  email.value = credentials.email;
  securityQuestion.value = credentials.passwordQuestion;
  mfaDevice.value = credentials.mfaDevice;
}

onMounted(async () => {
  await loadCredentials();
});

const [BindPhoneNumberModal, bindPhoneNumberModalApi] = useVbenModal({
  connectedComponent: BindPhoneNumber,
  onClosed() {
    loadCredentials();
  },
});

function openBindPhoneNumberView() {
  bindPhoneNumberModalApi.open();
}

const [UnbindPhoneNumberModal, unbindPhoneNumberModalApi] = useVbenModal({
  connectedComponent: UnbindPhoneNumber,
  onClosed() {
    loadCredentials();
  },
});

function openUnbindPhoneNumberView() {
  unbindPhoneNumberModalApi.setData({
    values: {
      phoneNumber: phoneNumber.value,
    },
  });
  unbindPhoneNumberModalApi.open();
}

const [BindEmailModal, bindEmailModalApi] = useVbenModal({
  connectedComponent: BindEmail,
  onClosed() {
    loadCredentials();
  },
});

function openBindEmailView() {
  bindEmailModalApi.open();
}

const [UnbindEmailModal, unbindEmailModalApi] = useVbenModal({
  connectedComponent: UnbindEmail,
  onClosed() {
    loadCredentials();
  },
});

function openUnbindEmailView() {
  unbindEmailModalApi.setData({
    values: {
      email: email.value,
    },
  });
  unbindEmailModalApi.open();
}

const [BindPasswordQuestionModal, bindPasswordQuestionModalApi] = useVbenModal({
  connectedComponent: BindPasswordQuestion,
  onClosed() {
    loadCredentials();
  },
});

function openBindPasswordQuestionView() {
  bindPasswordQuestionModalApi.open();
}
// const formSchema = computed(() => {
//   return [
//     {
//       value: false,
//       fieldName: 'accountPassword',
//       label: '账户密码',
//       description: `当前密码强度：${strengthLabels[credentials.value.passwordStrength]}`,
//     },
//     {
//       value: true,
//       fieldName: 'securityPhone',
//       label: '密保手机',
//       description: `已绑定手机：${credentials.value.phoneNumber ?? '未绑定'}`,
//     },
//     {
//       value: phoneNumberChecked,
//       fieldName: 'securityQuestion',
//       label: '密保问题',
//       description: `${credentials.value.hasPasswordQuestion ? '已设置密保问题' : '未设置密保问题'}，密保问题可有效保护账户安全`,
//     },
//     {
//       value: true,
//       fieldName: 'securityEmail',
//       label: '备用邮箱',
//       description: `已绑定邮箱：${credentials.value.email ?? '未绑定'}`,
//     },
//     {
//       value: false,
//       fieldName: 'securityMfa',
//       label: 'MFA 设备',
//       description: '未绑定 MFA 设备，绑定后，可以进行二次确认',
//     },
//   ];
// });
</script>
<template>
  <Form class="space-y-8">
    <div class="space-y-4">
      <div
        class="flex flex-row items-center justify-between rounded-lg border p-4"
      >
        <div class="space-y-0.5">
          <div class="text-lg font-bold">
            {{ $t('profile.securitySetting.accountPassword') }}
          </div>
          <div class="text-base text-gray-500">
            {{ $t('profile.securitySetting.usernameLabel') }}
            <span class="font-bold text-red-500">{{ username }}</span>
            <span class="ml-8">{{
              $t('profile.securitySetting.accountPasswordStrengthLabel')
            }}</span>
            <span class="font-bold text-red-500">{{ passwordStrength }}</span>
          </div>
        </div>
        <div class="flex justify-end"></div>
      </div>
    </div>
    <div class="space-y-4">
      <div
        class="flex flex-row items-center justify-between rounded-lg border p-4"
      >
        <div class="space-y-0.5">
          <div class="text-lg font-bold">
            {{ $t('profile.securitySetting.securityPhone') }}
          </div>
          <div class="text-base text-gray-500">
            {{ $t('profile.securitySetting.securityPhoneLabel') }}
            <span class="font-bold text-red-500">{{
              phoneNumber ? phoneNumber : $t('profile.securitySetting.noBind')
            }}</span>
            <span class="pl-2 font-bold text-green-500">
              <Button
                v-if="!phoneNumber"
                type="link"
                @click="openBindPhoneNumberView"
              >
                {{ $t('profile.securitySetting.bind') }}
              </Button>
              <Button
                v-if="phoneNumber"
                type="link"
                @click="openUnbindPhoneNumberView"
              >
                {{ $t('profile.securitySetting.unbind') }}
              </Button>
            </span>
          </div>
        </div>
        <div class="flex justify-end"></div>
      </div>
    </div>
    <div class="space-y-4">
      <div
        class="flex flex-row items-center justify-between rounded-lg border p-4"
      >
        <div class="space-y-0.5">
          <div class="text-lg font-bold">
            {{ $t('profile.securitySetting.securityEmail') }}
          </div>
          <div class="text-base text-gray-500">
            {{ $t('profile.securitySetting.securityEmailLabel') }}
            <span class="font-bold text-red-500">{{
              email ? email : $t('profile.securitySetting.noBind')
            }}</span>
            <span class="pl-2 font-bold text-green-500">
              <Button v-if="!email" type="link" @click="openBindEmailView">
                {{ $t('profile.securitySetting.bind') }}
              </Button>
              <Button v-if="email" type="link" @click="openUnbindEmailView">
                {{ $t('profile.securitySetting.unbind') }}
              </Button>
            </span>
          </div>
        </div>
        <div class="flex justify-end"></div>
      </div>
    </div>
    <div class="space-y-4">
      <div
        class="flex flex-row items-center justify-between rounded-lg border p-4"
      >
        <div class="space-y-0.5">
          <div class="text-lg font-bold">
            {{ $t('profile.securitySetting.securityQuestion') }}
          </div>
          <div class="text-base text-gray-500">
            {{
              securityQuestion
                ? $t('profile.securitySetting.securityQuestionLabel')
                : $t('profile.securitySetting.securityQuestionDescription')
            }}
            <span class="font-bold text-red-500">{{ securityQuestion }}</span>
            <span class="pl-2 font-bold text-green-500">
              <Button type="link" @click="openBindPasswordQuestionView">
                {{ $t('profile.securitySetting.bind') }}
              </Button>
            </span>
          </div>
        </div>
        <div class="flex justify-end"></div>
      </div>
    </div>
    <div class="space-y-4">
      <div
        class="flex flex-row items-center justify-between rounded-lg border p-4"
      >
        <div class="space-y-0.5">
          <div class="text-lg font-bold">
            {{ $t('profile.securitySetting.securityMfaDevice') }}
          </div>
          <div class="text-base text-gray-500">
            {{
              mfaDevice
                ? $t('profile.securitySetting.securityMfaDeviceLabel')
                : $t('profile.securitySetting.securityMfaDeviceDescription')
            }}
            <span class="font-bold text-red-500">{{ mfaDevice }}</span>
          </div>
        </div>
        <div class="flex justify-end"></div>
      </div>
    </div>
  </Form>
  <BindPhoneNumberModal />
  <UnbindPhoneNumberModal />
  <BindEmailModal />
  <UnbindEmailModal />
  <BindPasswordQuestionModal />
</template>
