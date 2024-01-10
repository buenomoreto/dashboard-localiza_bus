<template>
  <div>
    <div class="listing">
      <div class="listing-image">
        <slot name="image" />

        <div class="listing-action">
          <router-link
            :to="`${routeName}/editing/${id}`"
            class="listing-btn listing-edit"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M0 14.2505V18H3.74948L14.8079 6.94154L11.0585 3.19206L0 14.2505ZM17.7075 4.04194C18.0975 3.65199 18.0975 3.02208 17.7075 2.63213L15.3679 0.292459C14.9779 -0.0974865 14.348 -0.0974865 13.9581 0.292459L12.1283 2.12221L15.8778 5.87168L17.7075 4.04194Z"
                fill="#FFC700"
              />
            </svg>
          </router-link>
          <button @click="handleDelete" class="listing-btn listing-delete">
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
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

import { toast } from 'vue3-toastify'
import useDynamicService from '@/composables/useDynamicService'

const router = useRouter()
const { id, routeName } = defineProps<{ id: number; routeName: string }>()
const { destroy } = useDynamicService()
const user = JSON.parse(localStorage.getItem('userLogged') || 'null')

function handleDelete() {
  // modal de confirmação
  // if (useValidateFields(payload)) {
  //   return
  // }
  destroy(user.id, id, routeName)
    .then((response) => {
      toast.success(response.message, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
    .catch(({ response }: any) => {
      toast.error(response.data.message, {
        position: toast.POSITION.BOTTOM_RIGHT
      })
    })
    .finally(() => {
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
</style>
