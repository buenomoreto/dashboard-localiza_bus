<template>
  <LayoutAuth>
    <template #contentForm>
      <div class="container__form--center">
        <div class="container__logo">
          <img src="@/assets/images/logo.svg" alt="Localiza Bus" />
        </div>
        <h1 class="container__title title">
          Login
        </h1>
        <form>
          <CommonInput 
            @change="handleInput" 
            type="email" 
            entryType="email" 
            placeholder="Digite o seu e-mail"
          >
            <template #icon>
              <img src="@/assets/images/icons/email.svg" alt="Digite o seu e-mail">
            </template>
          </CommonInput>
          <CommonInput
            @change="handleInput" 
            :type="typePassword" 
            entryType="senha" 
            placeholder="Digite a sua senha"
          >
            <template #icon>
              <img src="@/assets/images/icons/password.svg" alt="Digite o seu e-mail">
            </template>
            <template #iconCustom>
              <button class="container__form-btn--visibility" type="button" @click="passwordVisibility()">
                <img v-show="!visibility" src="@/assets/images/icons/eye-slash.svg"> 
                <img v-show="visibility" src="@/assets/images/icons/eye.svg"> 
              </button>
            </template>
          </CommonInput>
          <div class="container__form-checkbox">
            <CommonCheckbox :checked="checked">
              <template #label>
                <span>Manter-me logado</span>
              </template>
            </CommonCheckbox>
            
            <router-link class="container__form-link" to="/forgot-password"> Esqueceu sua senha? </router-link>
          </div>
          <div class="container__form-btn--submit">
            <CommonButton @click-event="handleLogin" :loading="loading">
              <template #label>
                <span>Entrar</span>
              </template>
            </CommonButton>
          </div>
        </form>
        <div class="container__form-register">
          <p class="container__text">Ainda não possui uma conta?</p>
          <router-link class="link--emphasis" to="/register"> Cadastre-se </router-link>
        </div>
      </div>
    </template>
    <template #contentImage>
      <img src="@/assets/images/bg/bg-login.png" width="1090" alt="" />
    </template>
  </LayoutAuth>
</template>

<script setup lang="ts">
import CommonButton from '@/components/common/CommonButton.vue';
import CommonCheckbox from '@/components/common/CommonCheckbox.vue';
import CommonInput from '@/components/common/CommonInput.vue';
import LayoutAuth from '@/components/layout/LayoutAuth.vue';
import { type UserCredentials } from '@/ts/interfaces/user';
import useUserService from '@/composables/useUserService';
import useValidateFields from '@/composables/useValidateFields';
import { toast } from 'vue3-toastify';
import { ref } from 'vue'

const { signIn } = useUserService();

const checked = ref(false);
const loading = ref(false);
const visibility = ref(false);
const typePassword = ref('password');
const payload = { email: '', senha: '' }

function handleInput(field: keyof UserCredentials, value: string) {
  payload[field] = value;
}

function handleLogin() {
  loading.value = true;

  if (useValidateFields(payload)) {
    loading.value = false;
    return;
  }

  signIn(payload)
    .then((response) => {
      loading.value = false;
      localStorage.setItem('userloggedIn', JSON.stringify(response.data));
    })
    .catch(({ response }) => {
      loading.value = false;
      toast.error(response.data.message, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    });
}

function passwordVisibility(){
  visibility.value = !visibility.value
  typePassword.value = visibility.value ? 'text' : 'password';
}
</script>

<style scoped>
.container__logo {
  margin-bottom: 40px;
}
.container__form-checkbox {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
  margin-bottom: 40px;
}
.container__form-link {
  color: var(--font-color);
  font-size: 13px;
  display: flex;
  align-items: flex-end;
}
.container__form-btn--submit {
  max-width: 350px;
  margin: 0 auto;
}

.container__form-register {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--font-color);
  margin-top: 50px;
  gap: 5px;
}

.container__text {
  font-size: 14px;
}

.container__form-btn--visibility {
  cursor: pointer;
}
</style>
