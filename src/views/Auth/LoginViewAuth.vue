<template>
  <LayoutAuth>
    <template #contentForm>
      <div class="container__form--center">
        <div class="container__logo">
          <img src="@/assets/images/logobrand.svg" alt="Localiza Bus" />
        </div>
        <h1 class="container__title title">Login</h1>
        <form>
          <CommonInput
            @change="handleInput"
            type="email"
            entryType="email"
            placeholder="Digite o seu e-mail"
          />
            
          <CommonInput
            @change="handleInput"
            type="password"
            entryType="password"
            placeholder="Digite a sua senha"
          />
            
          <div class="container__form-checkbox">
            <CommonCheckbox :checked="checked">
              <template #label>
                <span>Mantenha-me logado</span>
              </template>
            </CommonCheckbox>

            <router-link class="container__form-link" to="/forgot-password">
              Esqueceu sua senha?
            </router-link>
          </div>
          <div class="container__form-btn--submit">
            <CommonButton @click-event="handleLogin" :loading="loading">
              <template #label>
                <span>Entrar</span>
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
import CommonCheckbox from '@/components/common/CommonCheckbox.vue'
import CommonInput from '@/components/common/CommonInput.vue'
import LayoutAuth from '@/components/layout/LayoutAuth.vue'
import useUserService from '@/composables/useUserService'
import useValidateFields from '@/utils/validateFields'
import { UserCredentials } from '@/ts/interfaces/user'
import { toast } from 'vue3-toastify'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const { signIn } = useUserService()
const authStore = useAuthStore()
const router = useRouter()
const checked = ref(false)
const loading = ref(false)
const payload: UserCredentials = { email: '', password: '' }

function handleInput(field: keyof UserCredentials, value: string) {
  payload[field] = value
}

async function handleLogin() {
  loading.value = true

  if (useValidateFields(payload)) {
    loading.value = false
    return
  }

  await signIn(payload)
    .then(({ data }) => {
      loading.value = false
      authStore.setTokens({
        accessToken: data.token,
        refreshToken: data.refreshToken,
        id: data.id,
        type: data.type
      })
      router.push({
        name: 'Home',
        path: '/'
      })
    })
    .catch(({ response }) => {
      loading.value = false
      if (typeof response.data.message === 'string') {
        toast.error(response.data.message, {
          position: toast.POSITION.BOTTOM_LEFT
        })
      } else {
        response.data.message.forEach(({ msg }: any) => {
          toast.error(msg, {
            position: toast.POSITION.BOTTOM_LEFT
          })
        })
      }
    })
}

</script>

<style scoped>

.container__form-checkbox {
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  margin-bottom: 25px;
  width: 100%;
}
.container__form-link {
  color: #2BB673;
  font-size: 14px;
  display: flex;
  text-decoration: underline;
  width: 100%;
  justify-content: flex-end;
}
.container__form-btn--submit {
  max-width: 250px;
  margin: 0 auto;
}

.common__input:first-child {
  margin-bottom: 15px;
}
.common__input {
  width: 430px;
}
.container__text {
  font-size: 14px;
}
</style>
<style>
.container__form-checkbox .common__checkbox {
  width: 100%;
}

</style>
