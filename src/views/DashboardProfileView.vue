<template>
  <LayoutDashboard>
    <template #content>
      <div class="content-top" v-if="company">
        <UploadFile v-if="company.user_photo" :photo="company.user_photo" :owner="company.owner" @file="handleFileUpload" />
        <div class="user-name">
          {{ company.name }}
          <div class="user-verified">
            <img
              src="@/assets/images/icons/menu/verified.svg"
              alt="Usuário verificado"
            />
            Perfil verificado
          </div>
        </div>
      </div>
      <div class="content-form">
        <Form 
          :key="JSON.stringify(entity)" 
          @data="handleData" 
          :entities="entity" 
        />
        <CommonButton
          class="active"
          @click-event="() => updateToCompany()"
        >
          <template #label> Enviar </template>
        </CommonButton>
      </div>
    </template>
  </LayoutDashboard>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { toast } from 'vue3-toastify'
import { Company } from '@/ts/interfaces/company'
import LayoutDashboard from '@/components/layout/LayoutDashboard.vue'
import Form from '@/components/FormDynamic.vue'
import CommonButton from '@/components/common/CommonButton.vue'
import useCompanyService from '@/composables/useCompanyService'
import { useUserStore } from '@/stores/user'
import UploadFile from '@/components/UploadFile.vue'

const useStore = useUserStore()
const { updateCompany, uploadFile } = useCompanyService()

const payload = ref({} as Company)
const company = ref()
const entity = ref([{}])

const handleFileUpload = async (file: any) => {
  
  uploadFile(undefined, file)
    .then(({ message }: any) => {
      toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }).catch((_) => {})
}

function updateEntity() {
  entity.value = [
    {
      name: 'company',
      active: true,
      data: [
        {
          regex: false,
          entryType: 'name',
          label: 'Nome',
          placeholder: 'Nome da empresa',
          value: company.value.name,
          type: 'text'
        },
        {
          regex: true,
          entryType: 'cnpj',
          label: 'CNPJ',
          placeholder: 'CNPJ da empresa',
          value: company.value.cnpj,
          type: 'text'
        },
        {
          regex: false,
          entryType: 'owner',
          label: 'Dono',
          placeholder: 'Dono da empresa',
          value: company.value.owner,
          type: 'text'
        },
        {
          regex: true,
          entryType: 'phone_number',
          label: 'Telefone',
          placeholder: 'Telefone da empresa',
          value: company.value.phone_number,
          type: 'text'
        },
        {
          regex: false,
          entryType: 'email',
          label: 'Email',
          placeholder: 'Email da empresa',
          value: company.value.email,
          type: 'text'
        },
        {
          regex: false,
          entryType: 'password',
          label: 'Senha',
          placeholder: 'Senha da empresa',
          value: '',
          type: 'password'
        }
      ]
    }
  ]
}

function handleData(data: Company) {
  payload.value = data
}

async function updateToCompany() {
  const updatedFields: Company = {};

  Object.entries(payload.value).forEach(([key, value]) => {
    if (value !== "") {
      updatedFields[key] = value;
    }
  });

  if (Object.keys(updatedFields).length > 0) {
    await updateCompany(undefined, updatedFields)
      .then(({ message }: any) => {
        toast.success(message, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }).catch((_) => {});
  } else {
    toast.error('Nenhum campo para atualizar', {
      position: toast.POSITION.BOTTOM_RIGHT
    })
  }
}



watch(useStore, (newValue) => {
  company.value = newValue.userData
  updateEntity()
}, { deep: true})
</script>
<style scoped>
.content-top {
  display: flex;
  align-items: flex-end;
  justify-content: flex-start;
  gap: 5px;
  background-image: url('../assets/images/profile/bg-profile.png');
  background-repeat: no-repeat;
  background-size: 100% 140px;
  min-height: 200px;
  padding-left: 25px;
  margin-bottom: 40px;
}
.user-name {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  text-align: left;
  flex-direction: column;
  gap: 5px;
  color: #222831;
  font-size: 16px;
  font-weight: 700;
}
.content-form {
  margin-left: 25px;
}
.active {
  max-width: 585px;
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
}
</style>
<style>
.active .common__button__inner {
  max-width: 135px;
  border-radius: 10px;
}
.disabled {
  opacity: 0.5;
  pointer-events: none;
}
.company 
.name, 
.owner, 
.email, 
.password {
  width: 100%;
}
</style>
