<template>
  <LayoutDashboard>
    <template #content>
      <div class="content-top" v-if="company">
        <div class="user-photo">
          <img
            v-if="company.user_photo"
            :src="company.user_photo"
            :alt="company.owner"
            width="82"
            height="82"
          />
          <img
            v-else
            src="@/assets/images/default-profile.png"
            :alt="company.owner"
            width="82"
            height="82"
          />
          <div class="user-photo-container">
            <label for="userPhotoUpload" class="user-photo--upload">
              <img
                src="@/assets/images/profile/upload.svg"
                alt="Alterar foto do usuário"
              />
            </label>
            <input
              type="file"
              id="userPhotoUpload"
              ref="fileInput"
              @change="handleFileUpload"
              style="display: none"
              accept="image/*"
            />
          </div>
        </div>
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
        <Form @data="handleData" :entities="entity" />
        <CommonButton
          class="active"
          :class="{ disabled: !Object.keys(payload).length }"
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

const useStore = useUserStore()
const { updateCompany, uploadFile } = useCompanyService()
const user = JSON.parse(localStorage.getItem('userLogged') || 'null')
const entity = ref([{}])
const fileInput = ref<HTMLInputElement | null>(null)
let payload = ref({} as Company)
const company = ref()

watch(useStore, (newValue) => {
  company.value = newValue.userData
  updateEntity()
})

const handleFileUpload = async () => {
  if (
    fileInput.value &&
    fileInput.value.files &&
    fileInput.value.files.length > 0
  ) {
    const file = fileInput.value.files[0]
    const formData = new FormData()
    formData.append('user_photo', file)

    uploadFile(user.id, formData)
      .then(({ message }: any) => {
        toast.success(message, {
          position: toast.POSITION.BOTTOM_RIGHT
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }
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
  await updateCompany(user.id, payload.value)
    .then(({ message }: any) => {
      toast.success(message, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
    .catch((error) => {
      console.log(error)
    })
}
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
.user-photo {
  background-color: #fff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 6px;
  border: 3px solid #2bb673;
  border-radius: 100%;
  box-shadow: 0px 10px 15px 0px rgba(43, 182, 115, 0.1);
  position: relative;
  overflow: hidden;
  cursor: pointer;
}
.user-photo img {
  border-radius: 100%;
}
.user-photo:hover .user-photo--upload {
  transform: translateY(0);
  transition: 0.5s;
}
.user-photo--upload {
  bottom: -3px;
  left: 4px;
  transform: translateY(100%);
  transition: 0.5s;
  position: absolute;
  background-image: url(../assets/images/profile/shape-upload.svg);
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-repeat: no-repeat;
  background-size: cover;
  height: 30px;
  max-width: 86px;
  cursor: pointer;
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
</style>
