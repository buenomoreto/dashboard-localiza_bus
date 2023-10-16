<template>
  <LayoutAuth>
    <template #contentForm>
      <div class="container__form--center">
        <h1 class="container__form-title title">Esqueceu sua senha?</h1>
        <p class="container__form-text">
          Preencha abaixo seu endereço de e-mail para receber as instruções
          necessárias e criar uma nova senha.
        </p>
        <form action="">
          <CommonInput
            @change="handleInput"
            type="email"
            entryType="email"
            placeholder="Digite aqui o seu e-mail*"
          >
            <template #icon>
              <img src="@/assets/images/icons/email.svg" alt="" />
            </template>
          </CommonInput>
          <div class="container__form-btn--submit">
            <CommonButton :loading="loading" @click-event="handleLogin">
              <template #label>
                <span>Enviar email</span>
              </template>
            </CommonButton>
          </div>
        </form>
        <div class="container__form-login">
          <router-link class="link--emphasis" to="/singIn">
            Fazer login</router-link
          >
        </div>
      </div>
    </template>
    <template #contentImage>
      <img src="@/assets/images/bg/bg-company.png" width="1090" alt="" />
    </template>
  </LayoutAuth>
</template>

<script setup lang="ts">
import CommonButton from '@/components/common/CommonButton.vue'
import CommonInput from '@/components/common/CommonInput.vue'
import LayoutAuth from '@/components/layout/LayoutAuth.vue'
import useUserService from '@/composables/useUserService'
import useValidateFields from '@/utils/validateFields'
import { useDevice } from '@/composables/useDevice'
import { toast } from 'vue3-toastify'
import { ref } from 'vue'

type Payload = {
  [key: string]: any
  email: string
}

const { windowSize } = useDevice()
const { accountRecovery } = useUserService()
const loading = ref(false)
const payload: Payload = { email: '' }

function handleInput(field: keyof Payload, value: string) {
  payload[field] = value
}

function handleLogin() {
  loading.value = true
  if (useValidateFields(payload, windowSize.width)) {
    loading.value = false
    return
  }

  accountRecovery(payload)
    .then((response: any) => {
      loading.value = false
      toast.success(response.message, {
        position: toast.POSITION.BOTTOM_LEFT
      })
    })
    .catch(({ response }: any) => {
      loading.value = false
      toast.error(response.data.message, {
        position: toast.POSITION.BOTTOM_LEFT
      })
    })
}
</script>
<style scoped>
.container__form-text {
  font-size: 16px;
  color: #fff;
  margin-bottom: 35px;
}
.container__form-title {
  margin-bottom: 10px;
  margin-top: 20px;
}

.container__form-btn--submit {
  max-width: 350px;
  margin: 0 auto;
}

.container__form-login {
  display: grid;
  place-items: center;
  margin-top: 30px;
}
</style>
