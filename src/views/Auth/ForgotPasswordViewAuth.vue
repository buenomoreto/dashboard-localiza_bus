<template>
  <LayoutAuth>
    <template #contentForm>
      <div class="container__form--center">
        <h1 class="container__form-title title">Esqueci minha senha</h1>
        <p class="container__form-text">
          Digite seu endereço de e-mail para receber as instruções necessárias e criar uma nova senha.
        </p>
        <form action="">
          <CommonInput
            @change="handleInput"
            type="email"
            entryType="email"
            placeholder="Digite seu e-mail*"
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
            Voltar para o login
          </router-link>
        </div>
      </div>
    </template>
  </LayoutAuth>
</template>

<script setup lang="ts">
import CommonButton from '@/components/common/CommonButton.vue'
import CommonInput from '@/components/common/CommonInput.vue'
import LayoutAuth from '@/components/layout/LayoutAuth.vue'
import useUserService from '@/composables/useUserService'
import useValidateFields from '@/utils/validateFields'
import { toast } from 'vue3-toastify'
import { ref } from 'vue'

type Payload = {
  [key: string]: any
  email: string
}

const { accountRecovery } = useUserService()
const loading = ref(false)
const payload: Payload = { email: '' }

function handleInput(field: keyof Payload, value: string) {
  payload[field] = value
}

function handleLogin() {
  loading.value = true
  if (useValidateFields(payload)) {
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
  color: #393E46;
  font-size: 14px;
  font-weight: 400;
  margin-bottom: 20px;
  line-height: 166.667% ; 
}
.container__form-title {
  margin-bottom: 5px;
}

.container__form-btn--submit {
  max-width: 250px;
  margin: 0 auto;
  margin-top: 25px;
}

.container__form-login {
  display: grid;
  place-items: center;
  margin-top: 30px;
}
</style>
