<script lang="ts" setup>
import { useVbenDrawer, z } from '@vben/common-ui';
import { $t } from '@vben/locales';

import { useVbenForm } from '#/adapter/form';
import { registerUserCredentialByUserIdApi, sendVerifyCodeApi } from '#/api';

defineOptions({
  name: 'UserCredentialDrawer',
});

const [Form, formApi] = useVbenForm({
  schema: [
    {
      component: 'RadioGroup',
      componentProps: {
        class: 'mr-2',
        optionType: 'button',
        buttonStyle: 'solid',
        onChange: (e: any) => {
          showSubmitButton(e.target.value);
        },
        options: [
          {
            label: $t('user.userCredential.field.phoneNumber'),
            value: 'phoneNumber',
          },
          {
            label: $t('user.userCredential.field.username'),
            value: 'username',
          },
          { label: $t('user.userCredential.field.email'), value: 'email' },
        ],
      },
      label: $t('user.userCredential.accountType'),
      fieldName: 'accountType',
      rules: 'required',
    },
    {
      component: 'VbenInput',
      componentProps: {
        placeholder: $t('authentication.mobile'),
      },
      fieldName: 'phoneNumber',
      label: $t('authentication.mobile'),
      rules: z
        .string()
        .min(1, { message: $t('authentication.mobileTip') })
        .refine((v) => /^\d{11}$/.test(v), {
          message: $t('authentication.mobileErrortip'),
        }),
      dependencies: {
        show(values) {
          return values.accountType === 'phoneNumber';
        },
        triggerFields: ['accountType'],
      },
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'email',
      label: $t('user.userCredential.field.email'),
      rules: z.string().min(1).email(),
      description: '',
      dependencies: {
        show(values: any) {
          return values.accountType === 'email';
        },
        triggerFields: ['accountType'],
      },
    },
    {
      component: 'VbenPinInput',
      componentProps: {
        createText: (countdown: number) => {
          const text =
            countdown > 0
              ? $t('authentication.sendText', [countdown])
              : $t('authentication.sendCode');
          return text;
        },
        placeholder: $t('authentication.code'),
        handleSendCode: () => {
          formApi.getValues().then((values) => {
            const { phoneNumber, email, accountType } = values;
            let receiver;
            if (accountType === 'phoneNumber') {
              receiver = phoneNumber;
            }
            if (accountType === 'email') {
              receiver = email;
            }
            sendVerifyCodeApi({ username: receiver });
          });
        },
      },
      fieldName: 'verifyCode',
      label: $t('authentication.code'),
      rules: z.string().min(1, { message: $t('authentication.codeTip') }),
      dependencies: {
        show(values) {
          return ['email', 'phoneNumber'].includes(values.accountType);
        },
        triggerFields: ['accountType'],
      },
    },
    {
      component: 'Input',
      componentProps: {
        class: 'mr-2',
      },
      fieldName: 'username',
      label: $t('user.userCredential.field.username'),
      rules: '',
      description: '',
      dependencies: {
        show(values: any) {
          return values.accountType === 'username';
        },
        triggerFields: ['accountType'],
      },
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        passwordStrength: true,
        placeholder: $t('authentication.password'),
      },
      fieldName: 'password',
      label: $t('authentication.password'),
      renderComponentContent() {
        return {
          strengthText: () => $t('authentication.passwordStrength'),
        };
      },
      rules: z.string().min(1, { message: $t('authentication.passwordTip') }),
      dependencies: {
        show(values) {
          return values.accountType === 'username';
        },
        triggerFields: ['accountType'],
      },
    },
    {
      component: 'VbenInputPassword',
      componentProps: {
        placeholder: $t('authentication.confirmPassword'),
      },
      dependencies: {
        rules(values) {
          const { password } = values;
          return z
            .string({ required_error: $t('authentication.passwordTip') })
            .min(1, { message: $t('authentication.passwordTip') })
            .refine((value) => value === password, {
              message: $t('authentication.confirmPasswordTip'),
            });
        },
        show(values) {
          return values.accountType === 'username';
        },
        triggerFields: ['password', 'accountType'],
      },
      fieldName: 'confirmPassword',
      label: $t('authentication.confirmPassword'),
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
      const { values } = drawerApi.getData<Record<string, any>>();
      if (values) {
        formApi.setValues(values);
        const { accountType } = values;
        showSubmitButton(accountType);
      }
    }
  },
  title: $t('user.userCredential.title'),
});

async function showSubmitButton(accountType: string) {
  const rawData = drawerApi.getData().values;
  const { phoneNumber, username, email } = rawData;

  let show = true;
  if (accountType === 'phoneNumber' && phoneNumber) {
    show = false;
  }
  if (accountType === 'username' && username) {
    show = false;
  }
  if (accountType === 'email' && email) {
    show = false;
  }
  drawerApi.setState({ showConfirmButton: show });
  const updateSchema = [
    { componentProps: { disabled: false }, fieldName: 'accountType' },
  ];

  schema.forEach((item) => {
    if (item.fieldName !== 'accountType') {
      updateSchema.push({
        componentProps: { disabled: !show },
        fieldName: item.fieldName,
      });
    }
  });

  formApi.updateSchema(updateSchema);
}

async function onSubmit(values: any) {
  const rawData = drawerApi.getData().values;
  const { userId } = rawData;
  const { accountType } = values;
  let params = {};
  if (accountType === 'phoneNumber') {
    params = { phoneNumber: values.phoneNumber, verifyCode: values.verifyCode };
  }
  if (accountType === 'email') {
    params = { email: values.email, verifyCode: values.verifyCode };
  }
  if (accountType === 'username') {
    params = { username: values.username, password: values.password };
  }
  await registerUserCredentialByUserIdApi(userId, params);
  drawerApi.setData({ success: true });
}
</script>
<template>
  <Drawer class="w-[600px]">
    <Form />
  </Drawer>
</template>
