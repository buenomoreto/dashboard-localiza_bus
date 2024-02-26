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
          <div class="content-listing" v-if="toggle && listing?.data.length > 0 && entity.name != 'bus'">
            <Listing
              v-for="item in listing.data"
              :key="item.id"
              :id="item.id"
              :routeName="name"
              :item="item"
            >
              <template #image>
                <div v-if="entity.name == 'driver'" class="icon-point">
                  <img width="20" height="20"  src="@/assets/images/icons/driver-listing.svg" alt="">
                </div>
                <div v-if="entity.name == 'line' && item.color" class="icon-line" :style="{background: item.color+26}" >
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0.554686 0.0391235C0.382811 0.0899048 0.183593 0.261778 0.0859372 0.441465L0 0.605528V10V19.3945L0.0859372 19.5586C0.183593 19.7422 0.36328 19.8867 0.562498 19.957C0.636717 19.9805 0.941403 20 1.2539 20H1.8164V10V6.10352e-05L1.24218 0.00396729C0.921872 0.00396729 0.613279 0.0234985 0.554686 0.0391235Z" 
                      :fill="item.color" />
                    <path d="M3.06641 10V20H7.79295H12.5195V10V6.10352e-05H7.79295H3.06641V10ZM8.06639 1.73052C8.14061 1.7774 8.23436 1.87896 8.27733 1.95318C8.35545 2.08209 8.35936 2.1524 8.35936 3.14458C8.35936 4.13677 8.35545 4.20708 8.27733 4.33599C8.02733 4.76567 7.39842 4.75395 7.19139 4.32036C7.1328 4.19536 7.12499 4.04692 7.13671 3.09771C7.14843 2.04693 7.15233 2.00787 7.23436 1.89068C7.41405 1.63677 7.8203 1.55865 8.06639 1.73052ZM7.91795 6.17192C8.11717 6.23051 8.32811 6.4727 8.35936 6.68754C8.37498 6.78129 8.37889 7.27738 8.37108 7.79301C8.35936 8.59378 8.34764 8.75003 8.29295 8.8555C8.12889 9.15238 7.70311 9.27347 7.44139 9.09378C7.36717 9.043 7.26561 8.94144 7.21483 8.86722C7.12499 8.73441 7.12499 8.7266 7.13671 7.63285C7.14843 6.37895 7.14843 6.39067 7.48046 6.21879C7.67577 6.12114 7.71483 6.11723 7.91795 6.17192ZM8.02342 10.7422C8.10936 10.7852 8.21873 10.8828 8.26561 10.9649C8.35545 11.1094 8.35936 11.1446 8.37108 12.0508C8.3867 13.1914 8.37498 13.2813 8.1992 13.4766C7.96092 13.7383 7.64061 13.7735 7.37108 13.5703C7.13671 13.3867 7.12889 13.3555 7.12889 12.1875C7.12889 11.0586 7.13671 11.0157 7.33202 10.8321C7.52342 10.6524 7.78514 10.6172 8.02342 10.7422ZM8.06639 15.2852C8.14061 15.332 8.23436 15.4336 8.27733 15.5078C8.35545 15.6367 8.35936 15.707 8.35936 16.6992C8.35936 17.6914 8.35545 17.7617 8.27733 17.8906C8.02733 18.3203 7.39842 18.3086 7.19139 17.875C7.1328 17.75 7.12499 17.6016 7.13671 16.6524C7.14843 15.6016 7.15233 15.5625 7.23436 15.4453C7.41405 15.1914 7.8203 15.1133 8.06639 15.2852Z" 
                      :fill="item.color" />
                    <path d="M13.7695 10V20H14.332C14.6445 20 14.9492 19.9805 15.0234 19.957C15.2227 19.8867 15.4023 19.7422 15.5 19.5586L15.5859 19.3945V10V0.605528L15.5 0.441465C15.4023 0.257872 15.2227 0.113342 15.0234 0.0430298C14.9492 0.0195923 14.6445 6.10352e-05 14.332 6.10352e-05H13.7695V10Z" 
                      :fill="item.color" />
                  </svg>
                </div>
                <div v-if="entity.name == 'point'" class="icon-point">
                  <img width="25" height="25"  src="@/assets/images/icons/point-listing.svg" alt="">
                </div>
              </template>
              <template #name>
                {{ item.name }}
              </template>
              <template #sub-name>
                <div v-if="entity.name == 'line'" >
                  <span :style="{ background: item.color}" class="before-line" />
                  {{ 'Linha ' + item.name }}
                </div>
                <div v-if="entity.name == 'point'">
                 {{ `${item.neighborhood} ${item.city}` }}
                </div>
                <div v-if="entity.name == 'bus'">
                  {{ item.license_plate }}
                 </div>
                 <div v-if="entity.name == 'driver'">
                  {{ item.cpf  }}
                 </div>
              </template>
              <template #sub-name-optional>
                <div v-if="entity.name == 'driver'">
                  {{ item.phone_number }}
                </div>
              </template>
            </Listing>
          </div>
          <div
            class="not-found"
            v-else-if="toggle && entity.name != 'bus'"
          >
            Você ainda não cadastrou nenhum 
            {{ translates[entity.name] }},
            clique no “+” para começar.
          </div>
        </div>
      </div>
    </template>
  </LayoutDashboard>
</template>
<script setup lang="ts">
import { ref, watch, reactive } from 'vue'
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

const id_bus = ref()
const listing = ref()
const toggle = ref(true)
const name = ref(extractName(route.path))
const user = JSON.parse(localStorage.getItem('userLogged') || 'null')

let payload = reactive({} as Bus | Driver | Line | Point)

const entities = reactive([
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
        regex: true,
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
        placeholder: 'Estado ex: SP',
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
        regex: true,
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

let entity = reactive(entities[0])

function changeToggle() {
  toggle.value = !toggle.value
}

function extractName(path: string): string {
  return path.replace('/creation', '').replace('/', '').split('/')[0]
}

async function fetchData(name: string) {
  if(name != 'bus') {
    listing.value = await getAll(user.id, name)
  }
}

function setActiveEntity(entityName: string) {
  name.value = entityName;
  
  entities.forEach((entity) => entity.active = entity.name === entityName)
  const foundEntity = entities.find((entity) => entity.name === entityName)

  if (foundEntity) {
    entity = foundEntity
  }

  fetchData(entityName)
}

function handleData(data: Bus | Driver | Line | Point) {
  payload.value = data
}


if (route.params.id && route.params.id.length) {
  id_bus.value = route.params.id
}

function handleCreation() {
  if (useValidateFields(payload.value, "bottom-right")) return

  create(user.id, 'bus', payload.value, id_bus.value, name.value)
    .then((response) => {
      if(name.value == 'bus') {
        id_bus.value = response.data.id 
      }
      toast.success(response.message, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }).catch(({ response }: any) => {
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

watch(() => route.path, (_) => {fetchData(name.value)}, { deep: true })

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
.icon-point {
  width: 40px;
  height: 40px;
  display: grid;
  place-items: center;
  border-radius: 10px;
  background-color: rgba(43, 182, 115, 10%);
}
.icon-line {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
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
