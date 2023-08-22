<template>
  <DefaultAuth>
    <template #contentForm>
      <div class="container__form--center">
        <div class="container__form-logo">
          <img src="@/assets/images/logo.svg" alt="" />
        </div>
        <h1 class="container__form-title title"> 
          <img src="@/assets/images/icons/code.svg" alt="" />
          Autentique sua conta
        </h1>
        <p class="container__form-text">
          Por favor, confirme sua conta digitando o código de autorização enviado para o seu e-mail.
        </p>
        <form action="">
           <CommonInputCode
              @change-code="handleInput" 
              type="text" 
              placeholder="*"
            >
            <template #icon>
              <img src="@/assets/images/icons/email.svg" alt="">
            </template>
          </CommonInputCode>
          <div class="container__form-btn--submit">
            <CommonButton
              :loading="loading"
              @click-event="handleLogin"
            >
              <template #label>
                <span>Enviar</span>
              </template>
            </CommonButton>
          </div>
        </form>
        <div class="container__form-login">
          <router-link class="link--emphasis" to="/singIn">Não recebeu? Reenvie um novo código</router-link>
        </div>
      </div>
    </template>
    <template #contentImage>
      <img src="@/assets/images/bg/bg-company.png" width="1090" alt="" />
    </template>
  </DefaultAuth>
</template>

<script setup lang="ts">
import CommonButton from '@/components/common/CommonButton.vue';
import CommonInputCode from '@/components/common/CommonInputCode.vue';
import DefaultAuth from '@/components/default/DefaultAuth.vue';
import useUserService from '@/composables/useUserService';
import validateFields from '@/composables/validateFields';
import { toast } from 'vue3-toastify';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const { tokenVerify } = useUserService();
const loading = ref(false);
const payload = {token: ''}

function handleInput(value: string) {
  payload.token = value;
}

function handleLogin() {
  loading.value = true;
  if (validateFields(payload)) {
    loading.value = false;
    return;
  }
  
  tokenVerify(payload.token)
    .then((response: any) => {
      loading.value = false;
      toast.success(response.message, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      setTimeout(() => {
        router.push(`/recover-password?code=${payload.token}`)
      }, 3000);
    })
    .catch(({ response }: any) => {
      loading.value = false;
      toast.error(response.data.message, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    });
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
  max-width: 150px;
}

.container__form-login {
  display: grid;
  place-items: center;
  margin-top: 30px;
}
</style>