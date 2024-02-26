<template>
  <LayoutAuth>
    <template #contentForm>
      <div class="container__form--center">
        <h1 class="container__form-title title">Redefinir senha</h1>
        <p class="container__form-text">
          Por favor, preencha os campos abaixo com a nova senha desejada e sua
          confirmação.
        </p>
        <form action="">
          <CommonInput
            @change="handleInput"
            type="password"
            entryType="password"
            placeholder="Digite a sua nova senha*"
          >
            <template #icon>
              <img src="@/assets/images/icons/password.svg" alt="" />
            </template>
          </CommonInput>
          <CommonInput
            @change="handleInput"
            type="password"
            entryType="confirmPassword"
            placeholder="Confirme a sua nova senha*"
          >
            <template #icon>
              <img src="@/assets/images/icons/password.svg" alt="" />
            </template>
          </CommonInput>
          <div class="container__form-btn--submit">
            <CommonButton :loading="loading" @click-event="handleLogin">
              <template #label>
                <span>Redefinir Senha</span>
              </template>
            </CommonButton>
          </div>
        </form>
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
import type { AccessCredentials } from '@/ts/interfaces/user'
import { toast } from 'vue3-toastify'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const { updatePassword } = useUserService()
const loading = ref(false)
const payload: AccessCredentials = {
  password: '',
  token: '',
  confirmPassword: ''
}

function handleInput(field: keyof AccessCredentials, value: string) {
  payload[field] = value
}

function handleLogin() {
  let { password, token, confirmPassword } = payload
  loading.value = true

  if (route.query.code) {
    token = route.query.code.toString()
  }

  if (password !== confirmPassword) {
    loading.value = false
    toast.error('Confirmação da senha incorreta.', {
      position: toast.POSITION.BOTTOM_LEFT
    })
    return
  }

  if (useValidateFields({ password, confirmPassword })) {
    loading.value = false
    return
  }

  updatePassword({ password, token })
    .then((response: any) => {
      loading.value = false
      toast.success(response.message, {
        position: toast.POSITION.BOTTOM_LEFT
      })
      setTimeout(() => {
        router.push('/signIn')
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
  color: #393e46;
  font-size: 14px;
  line-height: 166.667%;
  margin-bottom: 20px;
}
.container__form-title {
  margin-bottom: 10px;
  margin-top: 20px;
}

.container__form-btn--submit {
  max-width: 250px;
  width: 100%;
  margin-top: 15px;
}

.container__form-login {
  display: grid;
  place-items: center;
  margin-top: 30px;
}
.container__form--center form {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
}
</style>
