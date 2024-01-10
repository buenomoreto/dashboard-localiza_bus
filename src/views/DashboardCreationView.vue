<template>
  <LayoutDashboard>
    <template #content>
      <div class="row">
        <div class="content-top">
          <h1>{{ translates[name] }}</h1>
          <BaseBreadcrumb :name="translates[name]" />
        </div>
        <div class="content-actions">
          <div class="content-actions__entities">
            <CommonButton
              @click-event="() => setActiveEntity(entity.name)"
              :class="{ active: entity.active }"
              v-for="entity in entities"
              :key="entity.name"
            >
              <template #label>
                {{ translates[entity.name] }}
              </template>
            </CommonButton>
          </div>
          <div class="content-actions__operation">
            <CommonButton @click-event="() => handleCancel()" class="cancel">
              <template #label> Cancelar </template>
            </CommonButton>
            <CommonButton class="active" @click-event="() => handleCreation()">
              <template #label> Enviar </template>
            </CommonButton>
          </div>
        </div>
        <div class="content-timeline">
          <Timeline :entities="entities" />
        </div>
        <div class="content-form">
          <div class="content-form-top">
            <div>
              <h2>
                {{ translates[entity.name] }}
              </h2>
              <p>Preencha os dados do {{ translates[entity.name] }}.</p>
            </div>
            <button
              v-if="entity.name != 'bus'"
              class="btn-action"
              :class="[toggle ? 'btn--create' : 'btn--listing']"
              @click="changeToggle"
            >
              <img
                v-if="toggle"
                src="@/assets/images/icons/create.svg"
                width="35"
                height="35"
                alt=""
              />
              <img
                v-else
                src="@/assets/images/icons/cancel.svg"
                width="50"
                height="50"
                alt=""
              />
            </button>
          </div>
          <Form
            @data="handleData"
            :entities="entities"
            v-if="!toggle || entity.name == 'bus'"
          />
          <div class="content-listing" v-if="toggle">
            <template v-if="listing?.data.length">
              <Listing
                v-for="item in listing.data"
                :key="item.id"
                :id="item.id"
                :routeName="name"
              >
                <template #image>
                  <img
                    v-if="item.user_photo"
                    :src="item.user_photo"
                    alt="Foto do usuário"
                  />
                  <div v-else class="icon-bus">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M3.33337 11.25V15.75C3.33337 17.1666 4.49171 18.3333 5.91671 18.3333H14.0834C15.5 18.3333 16.6667 17.175 16.6667 15.75V11.25C16.6667 11.0166 16.4834 10.8333 16.25 10.8333H3.75004C3.51671 10.8333 3.33337 11.0166 3.33337 11.25ZM7.40004 15.3166C7.20837 15.5166 6.94171 15.625 6.66671 15.625C6.60004 15.625 6.53337 15.6166 6.46671 15.6083C6.40004 15.5916 6.33337 15.575 6.26671 15.5416C6.20837 15.5166 6.14171 15.4833 6.09171 15.45C6.03337 15.4083 5.97504 15.3666 5.93337 15.3166C5.73337 15.125 5.62504 14.8583 5.62504 14.5833C5.62504 14.3083 5.73337 14.0416 5.93337 13.85C5.97504 13.8 6.03337 13.7583 6.09171 13.7166C6.14171 13.6833 6.20837 13.65 6.26671 13.625C6.33337 13.5916 6.40004 13.575 6.46671 13.5583C6.80004 13.4916 7.15837 13.6083 7.40004 13.85C7.60004 14.0416 7.70837 14.3083 7.70837 14.5833C7.70837 14.8583 7.60004 15.125 7.40004 15.3166ZM14.0667 15.3166C14.025 15.3666 13.9667 15.4083 13.9084 15.45C13.8584 15.4833 13.7917 15.5166 13.7334 15.5416C13.6667 15.575 13.6 15.5916 13.5417 15.6083C13.4667 15.6166 13.4 15.625 13.3334 15.625C13.2667 15.625 13.2 15.6166 13.1334 15.6083C13.0667 15.5916 13 15.575 12.9334 15.5416C12.875 15.5166 12.8084 15.4833 12.7584 15.45C12.7 15.4083 12.6417 15.3666 12.6 15.3166C12.4 15.125 12.2917 14.8583 12.2917 14.5833C12.2917 14.3083 12.4 14.0416 12.6 13.85C12.6417 13.8 12.7 13.7583 12.7584 13.7166C12.8084 13.6833 12.875 13.65 12.9334 13.625C13 13.5916 13.0667 13.575 13.1334 13.5583C13.2667 13.5333 13.4 13.5333 13.5417 13.5583C13.6 13.575 13.6667 13.5916 13.7334 13.625C13.7917 13.65 13.8584 13.6833 13.9084 13.7166C13.9667 13.7583 14.025 13.8 14.0667 13.85C14.2667 14.0416 14.375 14.3083 14.375 14.5833C14.375 14.8583 14.2667 15.125 14.0667 15.3166Z"
                        fill="white"
                      />
                      <path
                        d="M14.0834 1.66669H5.91671C4.49171 1.66669 3.33337 2.82502 3.33337 4.25002V6.25002C3.33337 6.48335 3.51671 6.66669 3.75004 6.66669H16.25C16.4834 6.66669 16.6667 6.48335 16.6667 6.25002V4.25002C16.6667 2.82502 15.5084 1.66669 14.0834 1.66669ZM12.0834 4.79169H7.91671C7.57504 4.79169 7.29171 4.50835 7.29171 4.16669C7.29171 3.82502 7.57504 3.54169 7.91671 3.54169H12.0834C12.425 3.54169 12.7084 3.82502 12.7084 4.16669C12.7084 4.50835 12.425 4.79169 12.0834 4.79169Z"
                        fill="white"
                      />
                      <path
                        d="M16.25 10H3.75004C3.51671 10 3.33337 9.81667 3.33337 9.58333V7.91667C3.33337 7.68333 3.51671 7.5 3.75004 7.5H16.25C16.4834 7.5 16.6667 7.68333 16.6667 7.91667V9.58333C16.6667 9.81667 16.4834 10 16.25 10Z"
                        fill="white"
                      />
                    </svg>
                  </div>
                </template>
                <template #name>
                  {{ item.name }}
                </template>
                <template #sub-name>
                  {{ item.license_plate || item.cpf }}
                </template>
                <template #sub-name-optional>
                  {{
                    item.line
                      ? item.line.color + ' ' + item.line.name
                      : item.phone_number
                  }}
                </template>
              </Listing>
            </template>
          </div>
          <div
            class="not-found"
            v-if="toggle && !listing?.data.length && entity.name != 'bus'"
          >
            Você ainda não cadastrou nenhum {{ translates[entity.name] }},
            clique no “+” para começar.
          </div>
        </div>
      </div>
    </template>
  </LayoutDashboard>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toast } from 'vue3-toastify'
import { translates } from '@/mock/translates'
import { Bus } from '@/ts/interfaces/bus'
import { Driver } from '@/ts/interfaces/driver'
import { Line } from '@/ts/interfaces/line'
import { Point } from '@/ts/interfaces/point'
import useDynamicService from '@/composables/useDynamicService'
import useValidateFields from '@/utils/validateFields'
import BaseBreadcrumb from '@/components/base/BaseBreadcrumb.vue'
import LayoutDashboard from '@/components/layout/LayoutDashboard.vue'
import CommonButton from '@/components/common/CommonButtonDash.vue'
import Timeline from '@/components/base/BaseTimeline.vue'
import Form from '@/components/FormDynamic.vue'
import Listing from '@/components/Listing.vue'

const { create, getAll } = useDynamicService()
const route = useRoute()
const router = useRouter()
const listing = ref()
const toggle = ref(true)
const name = ref(extractName(route.path))
const user = JSON.parse(localStorage.getItem('userLogged') || 'null')
let payload = {} as Bus | Driver | Line | Point

const entities = ref([
  {
    name: 'bus',
    active: true,
    data: [
      {
        regex: false,
        entryType: 'name',
        label: 'Nome/ID',
        placeholder: 'Nome',
        type: 'text'
      },
      {
        regex: false,
        entryType: 'brand',
        label: 'Marca',
        placeholder: 'Marca do veículo',
        type: 'text'
      },
      {
        regex: false,
        entryType: 'model',
        label: 'Modelo',
        placeholder: 'Modelo do veículo',
        type: 'text'
      },
      {
        regex: true,
        entryType: 'license_plate',
        label: 'Placa',
        placeholder: 'Placa do veículo',
        type: 'text'
      },
      {
        regex: false,
        entryType: 'ticket_price',
        label: 'Valor da passagem',
        placeholder: 'Em R$',
        type: 'text'
      },
      {
        regex: false,
        entryType: 'operational_status',
        label: 'Status operacional',
        placeholder: 'Status Operacional',
        type: 'checkbox'
      }
    ]
  },
  {
    name: 'line',
    active: false,
    data: [
      {
        regex: false,
        entryType: 'name',
        label: 'Número da Linha',
        placeholder: 'Número da Linha',
        type: 'text'
      },
      {
        regex: false,
        entryType: 'color',
        label: 'Cor da Linha',
        placeholder: 'Selecione uma cor',
        type: 'text'
      }
    ]
  },
  {
    name: 'point',
    active: false,
    data: [
      {
        regex: false,
        entryType: 'name',
        label: 'Nome do Ponto',
        placeholder: 'Nome do Ponto',
        type: 'text'
      },
      {
        regex: false,
        entryType: 'reference',
        label: 'Referência',
        placeholder: 'Referência do Ponto',
        type: 'text'
      },
      {
        regex: false,
        entryType: 'neighborhood',
        label: 'Bairro',
        placeholder: 'Bairro do Ponto',
        type: 'text'
      },
      {
        regex: false,
        entryType: 'postal_code',
        label: 'CEP',
        placeholder: 'CEP do Ponto',
        type: 'text'
      },
      {
        regex: false,
        entryType: 'city',
        label: 'Cidade',
        placeholder: 'Cidade do Ponto',
        type: 'text'
      },
      {
        regex: false,
        entryType: 'state',
        label: 'Estado',
        placeholder: 'Estado do Ponto',
        type: 'text'
      },
      {
        regex: false,
        entryType: 'hours',
        label: 'Horário(s)',
        placeholder: '00:00',
        type: 'text'
      },
      {
        regex: false,
        entryType: 'map',
        label: 'Selecione o ponto no mapa',
        placeholder: 'Latitude do Ponto',
        type: 'text'
      }
    ]
  },
  {
    name: 'driver',
    active: false,
    data: [
      {
        regex: false,
        entryType: 'name',
        label: 'Nome do Motorista',
        placeholder: 'Nome do Motorista',
        type: 'text'
      },
      {
        regex: true,
        entryType: 'cpf',
        label: 'CPF',
        placeholder: 'CPF do Motorista',
        type: 'text'
      },
      {
        regex: false,
        entryType: 'phone_number',
        label: 'Número de Telefone',
        placeholder: 'Telefone do Motorista',
        type: 'text'
      },
      {
        regex: false,
        entryType: 'email',
        label: 'E-mail',
        placeholder: 'E-mail do Motorista',
        type: 'text'
      }
    ]
  }
])

const entity = ref(entities.value[0])

function changeToggle() {
  toggle.value = !toggle.value
}
function extractName(path: string): string {
  return path.replace('/creation', '').replace('/', '').split('/')[0]
}

async function fetchData(name: string) {
  listing.value = await getAll(user.id, name)
}

function setActiveEntity(entityName: string) {
  entities.value.forEach((entity) => {
    entity.active = entity.name === entityName
  })

  const foundEntity = entities.value.find(
    (entity) => entity.name === entityName
  )

  if (foundEntity) {
    entity.value = foundEntity
  }

  fetchData(entityName)
}

function handleData(data: Bus | Driver | Line | Point) {
  payload = data
}

function handleCreation() {
  if (useValidateFields(payload)) return

  create(user.id, name.value, payload)
    .then((response) => {
      toast.success(response.message, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
    .catch(({ response }: any) => {
      if (typeof response.data.message === 'string') {
        toast.error(response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT
        })
      } else {
        response.data.message.forEach(({ msg }: any) => {
          toast.error(msg, {
            position: toast.POSITION.BOTTOM_RIGHT
          })
        })
      }
    })
}

function handleCancel(): void {
  const lastPath = router.options.history.state?.back
  router.push(typeof lastPath === 'string' ? lastPath : '/')
}

watch(
  () => route.path,
  (newPath) => {
    name.value = extractName(newPath)
    setActiveEntity(name.value)
    fetchData(name.value)
  }
)

setActiveEntity(name.value)
</script>
<style scoped>
.content-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content-timeline {
  padding-left: 60px;
}
.content-actions__entities {
  display: flex;
  gap: 15px;
}
.content-actions__operation {
  display: flex;
  gap: 10px;
}
.content-actions__entities .common__button {
  width: 135px;
}
.content-actions__operation .common__button {
  width: 135px;
}
.content-form-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 590px;
  margin-bottom: 20px;
}
.content-form-top h2 {
  font-size: 18px;
  font-weight: 700;
  color: #222831;
  margin-bottom: 5px;
  text-transform: capitalize;
}
.content-form-top p {
  font-size: 16px;
  font-weight: 400;
  color: #393e46;
}
.btn-action {
  cursor: pointer;
  display: grid;
  place-items: center;
  width: 50px;
  height: 50px;
  border-radius: 10px;
}
.btn--create {
  background-color: #2bb673;
  box-shadow: 0px 10px 15px 0px #2bb67333;
}
.btn--listing {
  background-color: #ea5455;
  box-shadow: 0px 10px 15px 0px #ea545533;
}
.content-listing {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 15px;
  width: 100%;
  max-width: 615px;
}
.not-found {
  display: grid;
  place-items: center;
  min-height: 500px;
}
</style>
<style>
.cancel .common__button__inner {
  background-color: #ea5455;
  color: #ffffff;
  font-weight: bold;
}
.content-actions__operation .common__button > .common__button__inner {
  border-radius: 10px;
  text-transform: capitalize;
}
.content-actions__entities .common__button > .common__button__inner {
  border-radius: 10px;
  text-transform: capitalize;
}
</style>
