<template>
  <LayoutAuth>
    <template #contentForm>
      <div class="container__form--center">
        <!-- <div class="container__form-logo">
          <img src="@/assets/images/logo.svg" alt="" />
        </div> -->
        <h1 class="container__form-title title">Redefinir senha</h1>
        <p class="container__form-text">Por favor, preencha os campos abaixo com a nova senha desejada e sua confirmação.</p>
        <form action="">
          <CommonInput @change="handleInput" type="password" entryType="senha" placeholder="Digite a sua nova senha*">
            <template #icon>
              <img src="@/assets/images/icons/password.svg" alt="" />
            </template>
          </CommonInput>
          <CommonInput @change="handleInput" type="password" entryType="confirmarSenha" placeholder="Confirme a senha*">
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
import type { AccessCredentials } from '@/ts/interfaces/user'
import { useDevice } from '@/composables/useDevice'
import { toast } from 'vue3-toastify'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const { windowSize } = useDevice()
const route = useRoute()
const router = useRouter()
const { updatePassword } = useUserService()
const loading = ref(false)
const payload = { password: '', token: '', confirmarSenha: '' }

function handleInput(field: keyof AccessCredentials, value: string) {
  payload[field] = value
}

function handleLogin() {
  let { password, token, confirmarSenha } = payload
  loading.value = true

  if (route.query.code) {
    token = route.query.code.toString()
  }

  if (password !== confirmarSenha) {
    loading.value = false
    toast.error('Confirmação da senha incorreta.', {
      position: toast.POSITION.BOTTOM_LEFT
    })
    return
  }

  if (useValidateFields({ password, confirmarSenha }, windowSize.width)) {
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
      response.data.message.forEach((e: any) => {
          toast.error(e.msg, {
          position: toast.POSITION.BOTTOM_LEFT
        })
      });
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
