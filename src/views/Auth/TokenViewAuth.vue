<template>
  <LayoutAuth>
    <template #contentForm>
      <div class="container__form--center">
        <h1 class="container__form-title title">
          Autentique sua conta
        </h1>
        <p class="container__form-text">
          Por favor, confirme sua conta digitando o código de autorização
          enviado para o seu e-mail.
        </p>
        <form action="">
          <CommonInputCode
            @change-code="handleInput"
            type="text"
            placeholder="*"
          >
            <template #icon>
              <img src="@/assets/images/icons/email.svg" alt="" />
            </template>
          </CommonInputCode>
          <div class="container__form-btn--submit">
            <CommonButton :loading="loading" @click-event="handleLogin">
              <template #label>
                <span>Enviar</span>
              </template>
            </CommonButton>
          </div>
        </form>
        <div class="container__form-login">
          <router-link class="link--emphasis" to="/singIn"
            >Não recebeu? Reenvie um novo código</router-link>
        </div>
      </div>
    </template>
  </LayoutAuth>
</template>

<script setup lang="ts">
import CommonButton from '@/components/common/CommonButton.vue'
import CommonInputCode from '@/components/common/CommonInputCode.vue'
import LayoutAuth from '@/components/layout/LayoutAuth.vue'
import useUserService from '@/composables/useUserService'
import useValidateFields from '@/utils/validateFields'
import { toast } from 'vue3-toastify'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { tokenVerify } = useUserService()
const loading = ref(false)
const payload = { token: '' }

function handleInput(value: string) {
  payload.token = value
}

function handleLogin() {
  loading.value = true
  if (useValidateFields(payload)) {
    loading.value = false
    return
  }

  tokenVerify(payload.token)
    .then((response: any) => {
      loading.value = false
      toast.success(response.message, {
        position: toast.POSITION.BOTTOM_LEFT
      })
      setTimeout(() => {
        router.push(`/recover-password?code=${payload.token}`)
      }, 3000)
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
  line-height: 166.667%;
  margin-bottom: 20px;
}
.container__form-title {
  margin-bottom: 5px;
}

.container__form-btn--submit {
  max-width: 250px;
}

.container__form-login {

  margin-top: 30px;
}
</style>
