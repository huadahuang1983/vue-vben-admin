<script setup lang="ts">
  import { useVbenModal } from '@vben/common-ui';
import { onMounted, ref } from 'vue';

import { Form, Switch, Button } from 'ant-design-vue';

import { changeAccountStatusApi, loadMyUserCredentialsApi } from '#/api';

import BindPhoneNumber from './bind-phone-number.vue';
import UnbindPhoneNumber from './unbind-phone-number.vue';
import BindEmail from './bind-email.vue';
import UnbindEmail from './unbind-email.vue';
import { $t } from '#/locales';

const strengthLabels = ['弱', '中', '强', '非常强', '异常强'];
const passwordStrength = ref();
const phoneNumber = ref();
const email = ref();
const mfaDevice = ref();

const accountPasswordChecked = ref(true);
const securityPhoneChecked = ref(true);
const securityEmailChecked = ref(true);
const securityMfaDeviceChecked = ref(true);

async function loadCredentials() {
  const credentials = await loadMyUserCredentialsApi();
  phoneNumber.value = credentials.phoneNumber;
  securityPhoneChecked.value = credentials.phoneNumberStatus;
  passwordStrength.value = strengthLabels[credentials.passwordStrength];
  accountPasswordChecked.value = credentials.usernameStatus;
  email.value = credentials.email;
  securityEmailChecked.value = credentials.emailStatus;
  mfaDevice.value = credentials.mfaDevice;
  securityMfaDeviceChecked.value = credentials.mfaDeviceStatus;
}

onMounted(async () => {
  await loadCredentials();
});

function handleAccountPasswordChange(value: any) {
  changeAccountStatusApi('username', value).then(() => {
    accountPasswordChecked.value = value;
  });
}

function handleSecurityPhoneChange(value: any) {
  changeAccountStatusApi('phoneNumber', value).then(() => {
    securityPhoneChecked.value = value;
  });
}

function handleSecurityEmailChange(value: any) {
  changeAccountStatusApi('email', value).then(() => {
    securityEmailChecked.value = value;
  });
}

function handleSecurityMfaDeviceChange(value: any) {
  changeAccountStatusApi('mfaDevice', value).then(() => {
    securityMfaDeviceChecked.value = value;
  });
}

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
      <div class="flex flex-row items-center justify-between rounded-lg border p-4">
        <div class="space-y-0.5">
          <div class="text-lg font-bold"> {{ $t('profile.securitySetting.accountPassword') }} </div>
          <div class="text-base text-gray-500">
            {{ $t('profile.securitySetting.accountPasswordDescription') }}<span class="text-red-500 font-bold">{{ passwordStrength }}</span>
          </div>
        </div>
        <div class="flex justify-end">
          <Switch v-model:checked="accountPasswordChecked" @change="handleAccountPasswordChange" />
        </div>
      </div>
    </div>
    <div class="space-y-4">
      <div class="flex flex-row items-center justify-between rounded-lg border p-4">
        <div class="space-y-0.5">
          <div class="text-lg font-bold"> {{ $t('profile.securitySetting.securityPhone') }} </div>
          <div class="text-base text-gray-500">
            {{ $t('profile.securitySetting.securityPhoneDescription') }}
            <span class="text-red-500 font-bold">{{ phoneNumber ? phoneNumber : $t('profile.securitySetting.noBind') }}</span>
            <span class="pl-2 text-green-500 font-bold">
              <Button v-if="!phoneNumber" type="link" @click="openBindPhoneNumberView">
                {{ $t('profile.securitySetting.bind') }}
              </Button>
              <Button v-if="phoneNumber" type="link" @click="openUnbindPhoneNumberView">
                {{ $t('profile.securitySetting.unbind') }}
              </Button>
            </span>
          </div>
        </div>
        <div class="flex justify-end">
          <Switch v-model:checked="securityPhoneChecked"  @change="handleSecurityPhoneChange" />
        </div>
      </div>
    </div>
    <div class="space-y-4">
      <div class="flex flex-row items-center justify-between rounded-lg border p-4">
        <div class="space-y-0.5">
          <div class="text-lg font-bold"> {{ $t('profile.securitySetting.securityEmail') }} </div>
          <div class="text-base text-gray-500">
            {{ $t('profile.securitySetting.securityEmailDescription') }}
            <span class="text-red-500 font-bold">{{ email ? email : $t('profile.securitySetting.noBind') }}</span>
            <span class="pl-2 text-green-500 font-bold">
              <Button v-if="!email" type="link" @click="openBindEmailView">
                {{ $t('profile.securitySetting.bind') }}
              </Button>
              <Button v-if="email" type="link" @click="openUnbindEmailView">
                {{ $t('profile.securitySetting.unbind') }}
              </Button>
            </span>
          </div>
        </div>
        <div class="flex justify-end">
          <Switch v-model:checked="securityEmailChecked"  @change="handleSecurityEmailChange" />
        </div>
      </div>
    </div>
    <div class="space-y-4">
      <div class="flex flex-row items-center justify-between rounded-lg border p-4">
        <div class="space-y-0.5">
          <div class="text-lg font-bold"> {{ $t('profile.securitySetting.securityMfaDevice') }} </div>
          <div class="text-base text-gray-500">
            {{ $t('profile.securitySetting.securityMfaDeviceDescription') }}<span class="text-red-500 font-bold">{{ mfaDevice }}</span>
          </div>
        </div>
        <div class="flex justify-end">
          <Switch v-model:checked="securityMfaDeviceChecked"  @change="handleSecurityMfaDeviceChange" />
        </div>
      </div>
    </div>
  </Form>
  <BindPhoneNumberModal />
  <UnbindPhoneNumberModal />
  <BindEmailModal />
  <UnbindEmailModal />
</template>
