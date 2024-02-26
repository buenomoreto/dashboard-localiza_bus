<template>
  <div>
    <div class="listing">
      <div class="listing-image">
        <slot name="image" />

        <div class="listing-action">
          <button @click="showModal = true" class="listing-btn listing-delete">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="16"
              viewBox="0 0 13 16"
              fill="none"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.25 0V1.6H0V3.2H13V1.6H9.75V0H3.25ZM0.8125 4H2.4375V14.0686L2.77405 14.4H10.2259L10.5625 14.0686V4H12.1875V14.7314L10.8991 16H2.10095L0.8125 14.7314V4Z"
                fill="#EA5455"
              />
            </svg>
          </button>
          <router-link
            :to="`${routeName}/creation/${id}`"
            class="listing-btn listing-view"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="21"
              height="16"
              viewBox="0 0 21 16"
              fill="none"
            >
              <path
                d="M13.1214 7.98552C13.1214 8.72657 12.8271 9.43726 12.3031 9.96126C11.7791 10.4853 11.0684 10.7796 10.3273 10.7796C9.58627 10.7796 8.87558 10.4853 8.35158 9.96126C7.82758 9.43726 7.5332 8.72657 7.5332 7.98552C7.5332 7.24448 7.82758 6.53378 8.35158 6.00978C8.87558 5.48579 9.58627 5.19141 10.3273 5.19141C11.0684 5.19141 11.7791 5.48579 12.3031 6.00978C12.8271 6.53378 13.1214 7.24448 13.1214 7.98552Z"
                stroke="#2BB673"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path
                d="M1.04909 7.99379C0.983635 7.80834 0.983635 7.6079 1.04909 7.42245C2.36469 3.69129 6.099 1 10.5001 1C14.8993 1 18.6318 3.68861 19.9502 7.41798C20.0166 7.60306 20.0166 7.80334 19.9502 7.98932C18.6356 11.7205 14.9012 14.4118 10.5001 14.4118C6.1009 14.4118 2.36753 11.7232 1.04909 7.99379Z"
                stroke="#2BB673"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </router-link>
        </div>
      </div>
      <p class="listing-name">
        <slot name="name" />
      </p>
      <p class="listing-sub-name">
        <slot name="sub-name" />
      </p>
      <p class="listing-sub-name">
        <slot name="sub-name-optional" />
      </p>
    </div>
    <Teleport to="body">
      <Modal v-if="showModal" @close="handleDelete" @cancel="showModal = false">
        <template #header>
          <div class="icon-delete">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ea5455" width="50" height="40">
              <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </div>
          <h3>Você está prestes a excluir {{ translates[routeName] }} <strong style="color: #ea5455">{{ item.name }}</strong>.</h3>
        </template>
        <template #body>
          <p>Isso excluirá {{ translates[routeName] }} <strong style="color: #ea5455">{{ item.name }}</strong>, tem certeza?</p>
        </template>
      </Modal>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { toast } from 'vue3-toastify'
import { useRouter } from 'vue-router'
import useDynamicService from '@/composables/useDynamicService'
import Modal from './Modal.vue';
import { translates } from '@/mock/translates';

const router = useRouter()
const { id, routeName, item } = defineProps<{ id: number; routeName: string, item: any }>()
const user = JSON.parse(localStorage.getItem('userLogged') || 'null')
const { destroy } = useDynamicService()
const showModal = ref(false);

function handleDelete() {
  showModal.value = false

  destroy(user.id, id, routeName)
    .then((response) => {
      toast.success(response.message, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }).catch(({ response }: any) => {
      toast.error(response.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }).finally(() => {
      setTimeout(() => {
        router.go(0)
      }, 3500)
    })
}
</script>

<style scoped>
.listing {
  height: 195px;
  min-width: 210px;
  padding: 25px 15px;
  border-radius: 20px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border: 1px solid transparent;
  position: relative;
}
.listing:hover {
  border-color: #2bb673;
}

.listing-btn:not(.listing-view):hover svg > path {
  fill: #fff;
}
.listing-view:hover svg > path {
  stroke: #fff;
}
.listing-edit:hover {
  background-color: #ffc700;
}
.listing-delete:hover {
  background-color: #ea5455;
}
.listing-view:hover {
  background-color: #2bb673;
}
.listing-image {
  height: 40px;
  border-radius: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 25px;
}
.listing-btn {
  width: 35px;
  height: 35px;
  max-height: 35px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  cursor: pointer;
  padding: 0px;
  box-sizing: border-box;
}
.listing-edit {
  right: 93px;
  border: 1px solid #ffc700;
}
.listing-delete {
  right: 50px;
  border: 1px solid #ea5455;
}
.listing-view {
  right: 10px;
  border: 1px solid #2bb673;
}
.listing-action {
  display: flex;
  gap: 5px;
}
.listing-name {
  font-size: 16px;
  font-weight: 700;
  color: #222831;
  margin-bottom: 20px;
}
.listing-sub-name {
  font-size: 14px;
  font-weight: 400;
  color: #393e46;
  margin-bottom: 5px;
}
.icon-delete {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70px;
  height: 70px;
  border: 1px solid #ea5455;
  border-radius: 100%;
  margin: 0 auto;
  margin-bottom: 15px;
}

.modal-header h3 {
  font-size: 18px;
}

</style>
