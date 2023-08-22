<template>
  <LayoutAuth>
    <template #contentForm>
      <div class="container__form--center">
        <h1 class="container__title title">
          Cadastre a <br />
          sua empresa
        </h1>
        <form>  
          <div class="container__form--flex">
            <CommonInput 
              @change="handleInput" 
              type="text" 
              entryType="nome" 
              placeholder="Nome da empresa*"
            >
              <template #icon>
                <img src="@/assets/images/icons/company.svg" alt="">
              </template>
            </CommonInput>
            <CommonInput 
              @change="handleInput" 
              type="text" 
              entryType="cnpj" 
              placeholder="Digite aqui o CNPJ*"
            >
              <template #icon>
                <img src="@/assets/images/icons/cnpj.svg" alt="">
              </template>
            </CommonInput>
          </div>
          <div class="container__form--flex">
            <CommonInput 
              @change="handleInput" 
              type="text" 
              entryType="telefone" 
              placeholder="Telefone para contato*"
            >
              <template #icon>
                <img src="@/assets/images/icons/tel.svg" alt="">
              </template>
            </CommonInput>
            <CommonInput 
              @change="handleInput" 
              type="text" 
              entryType="dono" 
              placeholder="Dono da empresa*"
            >
              <template #icon>
                <img src="@/assets/images/icons/name.svg" alt="">
              </template>
            </CommonInput>
          </div>
          <div class="container__form--flex">
            <CommonInput 
              @change="handleInput" 
              type="email" 
              entryType="email" 
              placeholder="Digite aqui o seu e-mail*"
            >
              <template #icon>
                <img src="@/assets/images/icons/email.svg" alt="">
              </template>
            </CommonInput>
            <CommonInput 
              @change="handleInput" 
              type="password" 
              entryType="senha" 
              placeholder="Digite aqui a sua senha*"
            >
              <template #icon>
                <img src="@/assets/images/icons/password.svg" alt="">
              </template>
            </CommonInput>
          </div>
          <div class="container__form-checkbox">
            <CommonCheckbox :checked="checked">
              <template #label>
                <span>Eu concordo com todas as declarações incluídas nos <strong class="link--emphasis">Termos de Uso</strong></span>
              </template>
            </CommonCheckbox>
          </div>
          <div class="container__form-btn--submit">
            <CommonButton @click-event="handleLogin" :loading="loading">
              <template #label>
                <span>Cadastre-se</span>
              </template>
            </CommonButton>
          </div>
        </form>
        <div class="container__form-nav">
          <div>
            <p class="container__text">Ainda não possui uma conta?</p>
            <router-link class="link--emphasis" to="/signIn"> Entrar agora </router-link>
          </div>
          <div>
            <p class="container__text">Ainda não possui uma conta?</p>
            <router-link class="link--emphasis" to="/forgot-password"> Redefinir senha </router-link>
          </div>
        </div>
      </div>
    </template>
    <template #contentImage>
      <img src="@/assets/images/bg/bg-company.png" width="1090" alt="" />
    </template>
  </LayoutAuth>
</template>

<script setup lang="ts">
import CommonInput from '@/components/common/CommonInput.vue';
import CommonButton from '@/components/common/CommonButton.vue';
import CommonCheckbox from '@/components/common/CommonCheckbox.vue';
import LayoutAuth from '@/components/layout/LayoutAuth.vue';
import { type Company } from '@/ts/interfaces/company';
import useCompanyService from '@/composables/useCompanyService';
import  validateFields from "@/composables/validateFields";
import { toast } from 'vue3-toastify';
import { ref } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();
const { createCompany } = useCompanyService();
const checked = ref(false);
const loading = ref(false);
const payload = {   
  nome: '',
  email: '',
  cnpj: '',
  telefone: '',
  dono: '',
  senha: '',
  tipo: "empresa"
}

function handleInput(field: keyof Company, value: string) {
  payload[field] = value;
}

function handleLogin() {
  loading.value = true;
  if (validateFields(payload)) {
    loading.value = false;
    return;
  }
  
  createCompany(payload)
    .then((response: any) => {
      loading.value = false;
      toast.success(response.message, {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      setTimeout(() => {
        router.push('/signIn')
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
.container__form--flex:not(:nth-child(3)) {
  display: flex;
  gap: 20px;
}
.container__form-btn--submit {
  max-width: 350px;
  margin: 0 auto;
}
.container__form-nav {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: var(--font-color);
  margin-top: 30px;
  gap: 20px;
}
.container__form-nav div {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}
.container__text {
  font-size: 14px;
}
.container__form-checkbox {
  margin-bottom: 20px;
}
.container__form-checkbox span {
  font-size: 13px;
}
</style>