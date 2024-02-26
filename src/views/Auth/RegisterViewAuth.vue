<template>
  <LayoutAuth>
    <template #contentForm>
      <div class="container__form--center">
        <div class="container__logo">
          <img src="@/assets/images/logobrand.svg" alt="Localiza Bus" />
        </div>
        <h1 class="container__title title">Crie uma conta</h1>
        <form>
          <div class="container__form--flex">
            <CommonInput
              @change="handleInput"
              type="text"
              entryType="name"
              placeholder="Nome da empresa*"
            >
              <template #icon>
                <img src="@/assets/images/icons/company.svg" alt="" />
              </template>
            </CommonInput>
            <CommonInputRegex
              @change="handleInput"
              type="text"
              entryType="cnpj"
              placeholder="Digite aqui o CNPJ*"
            >
              <template #icon>
                <img src="@/assets/images/icons/cnpj.svg" alt="" />
              </template>
            </CommonInputRegex>
          </div>
          <div class="container__form--flex">
            <CommonInputRegex
              @change="handleInput"
              type="text"
              entryType="phone_number"
              placeholder="Telefone para contato*"
            >
              <template #icon>
                <img src="@/assets/images/icons/tel.svg" alt="" />
              </template>
            </CommonInputRegex>
            <CommonInput
              @change="handleInput"
              type="text"
              entryType="owner"
              placeholder="Dono da empresa*"
            >
              <template #icon>
                <img src="@/assets/images/icons/name.svg" alt="" />
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
                <img src="@/assets/images/icons/email.svg" alt="" />
              </template>
            </CommonInput>
            <CommonInput
              @change="handleInput"
              type="password"
              entryType="password"
              placeholder="Digite aqui a sua senha*"
            >
              <template #icon>
                <img src="@/assets/images/icons/password.svg" alt="" />
              </template>
            </CommonInput>
          </div>
          <div class="container__form-checkbox">
            <CommonCheckbox :checked="checked">
              <template #label>
                <span
                  >Eu concordo com todas as declarações incluídas nos
                  <strong class="link--emphasis">Termos de Uso</strong></span
                >
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
      </div>
    </template>
  </LayoutAuth>
</template>

<script setup lang="ts">
import CommonInputRegex from '@/components/common/CommonInputRegex.vue'
import CommonInput from '@/components/common/CommonInput.vue'
import CommonButton from '@/components/common/CommonButton.vue'
import CommonCheckbox from '@/components/common/CommonCheckbox.vue'
import LayoutAuth from '@/components/layout/LayoutAuth.vue'
import { Company } from '@/ts/interfaces/company'
import { type } from '@/ts/enum/type'
import useCompanyService from '@/composables/useCompanyService'
import useValidateFields from '@/utils/validateFields'
import { toast } from 'vue3-toastify'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const { createCompany } = useCompanyService()
const checked = ref(false)
const loading = ref(false)
const payload: Company = {
  name: '',
  email: '',
  cnpj: '',
  phone_number: '',
  owner: '',
  password: '',
  type: type.COMPANY
}

function handleInput(field: keyof Company, value: string) {
  payload[field] = value
}

function handleLogin() {
  loading.value = true
  if (useValidateFields(payload)) {
    loading.value = false
    return
  }

  createCompany(payload)
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
.container__form-btn--submit {
  max-width: 250px;
  margin: 0 auto;
  width: 100%;
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
  font-size: 12px;
}
@media (max-width: 1023px) {
  .container__form--flex:not(:nth-child(3)) {
    display: block;
  }
}
.container__form--center form {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;
}
.container__form--flex {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;
}
</style>
