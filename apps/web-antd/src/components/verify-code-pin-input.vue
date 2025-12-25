<script setup lang="ts">
import { toRefs } from 'vue';

import { VbenPinInput } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { message } from 'ant-design-vue';

import { sendVerifyCodeApi } from '#/api';

defineOptions({ name: 'VerifyCodePinInput' });

const props = defineProps({
  username: { type: String, default: '' },
});
const { username } = toRefs(props);

function createText(countdown: number) {
  const text =
    countdown > 0
      ? $t('authentication.sendText', [countdown])
      : $t('authentication.sendCode');
  return text;
}
async function handleSendCode() {
  if (!username.value) {
    message.warn($t('message.verifyCode.receiverRequired'));
    return;
  }

  await sendVerifyCodeApi({ username: username.value });
}
</script>
<template>
  <div>
    <VbenPinInput
      :create-text="createText"
      :handle-send-code="handleSendCode"
      :placeholder="$t('authentication.code')"
    />
  </div>
</template>
