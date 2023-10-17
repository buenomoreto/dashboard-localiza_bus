<template>
  <div class="listing-bus" v-for="bus in buses" :key="bus.id">
    <div
      class="listing-bus__icon"
      v-if="bus.line"
      :style="{ background: bus.line.line_color + opacity }"
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          :fill="bus.line.line_color"
          d="M3.33337 11.25V15.75C3.33337 17.1666 4.49171 18.3333 5.91671 18.3333H14.0834C15.5 18.3333 16.6667 17.175 16.6667 15.75V11.25C16.6667 11.0166 16.4834 10.8333 16.25 10.8333H3.75004C3.51671 10.8333 3.33337 11.0166 3.33337 11.25ZM7.40004 15.3166C7.20837 15.5166 6.94171 15.625 6.66671 15.625C6.60004 15.625 6.53337 15.6166 6.46671 15.6083C6.40004 15.5916 6.33337 15.575 6.26671 15.5416C6.20837 15.5166 6.14171 15.4833 6.09171 15.45C6.03337 15.4083 5.97504 15.3666 5.93337 15.3166C5.73337 15.125 5.62504 14.8583 5.62504 14.5833C5.62504 14.3083 5.73337 14.0416 5.93337 13.85C5.97504 13.8 6.03337 13.7583 6.09171 13.7166C6.14171 13.6833 6.20837 13.65 6.26671 13.625C6.33337 13.5916 6.40004 13.575 6.46671 13.5583C6.80004 13.4916 7.15837 13.6083 7.40004 13.85C7.60004 14.0416 7.70837 14.3083 7.70837 14.5833C7.70837 14.8583 7.60004 15.125 7.40004 15.3166ZM14.0667 15.3166C14.025 15.3666 13.9667 15.4083 13.9084 15.45C13.8584 15.4833 13.7917 15.5166 13.7334 15.5416C13.6667 15.575 13.6 15.5916 13.5417 15.6083C13.4667 15.6166 13.4 15.625 13.3334 15.625C13.2667 15.625 13.2 15.6166 13.1334 15.6083C13.0667 15.5916 13 15.575 12.9334 15.5416C12.875 15.5166 12.8084 15.4833 12.7584 15.45C12.7 15.4083 12.6417 15.3666 12.6 15.3166C12.4 15.125 12.2917 14.8583 12.2917 14.5833C12.2917 14.3083 12.4 14.0416 12.6 13.85C12.6417 13.8 12.7 13.7583 12.7584 13.7166C12.8084 13.6833 12.875 13.65 12.9334 13.625C13 13.5916 13.0667 13.575 13.1334 13.5583C13.2667 13.5333 13.4 13.5333 13.5417 13.5583C13.6 13.575 13.6667 13.5916 13.7334 13.625C13.7917 13.65 13.8584 13.6833 13.9084 13.7166C13.9667 13.7583 14.025 13.8 14.0667 13.85C14.2667 14.0416 14.375 14.3083 14.375 14.5833C14.375 14.8583 14.2667 15.125 14.0667 15.3166Z"
        />
        <path
          :fill="bus.line.line_color"
          d="M14.0834 1.66669H5.91671C4.49171 1.66669 3.33337 2.82502 3.33337 4.25002V6.25002C3.33337 6.48335 3.51671 6.66669 3.75004 6.66669H16.25C16.4834 6.66669 16.6667 6.48335 16.6667 6.25002V4.25002C16.6667 2.82502 15.5084 1.66669 14.0834 1.66669ZM12.0834 4.79169H7.91671C7.57504 4.79169 7.29171 4.50835 7.29171 4.16669C7.29171 3.82502 7.57504 3.54169 7.91671 3.54169H12.0834C12.425 3.54169 12.7084 3.82502 12.7084 4.16669C12.7084 4.50835 12.425 4.79169 12.0834 4.79169Z"
        />
        <path
          :fill="bus.line.line_color"
          d="M16.25 10H3.75004C3.51671 10 3.33337 9.81667 3.33337 9.58333V7.91667C3.33337 7.68333 3.51671 7.5 3.75004 7.5H16.25C16.4834 7.5 16.6667 7.68333 16.6667 7.91667V9.58333C16.6667 9.81667 16.4834 10 16.25 10Z"
        />
      </svg>
    </div>
    <p class="listing-bus__text" v-if="bus.point && bus.point.length">
      {{ bus.point[0].name }}
    </p>
    <p class="listing-bus__license-plate">{{ bus.license_plate }}</p>
    <p class="listing-bus__line" v-if="bus.line">
      <span class="line-color" :style="{ background: bus.line.color }" />
      Linha {{ bus.line.name }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { Bus } from '@/ts/interfaces/bus'

const opacity = 60
const { buses } = defineProps<{
  buses: Bus
}>()
</script>

<style scoped>
.listing-bus {
  height: 195px;
  max-width: 195px;
  width: 100%;
  padding: 25px;
  border-radius: 20px;
  background: #ffffff;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.listing-bus__icon {
  width: 40px;
  height: 40px;
  border-radius: 10px;
  display: grid;
  place-items: center;
  margin-bottom: 25px;
}

.listing-bus__text {
  font-size: 16px;
  font-weight: 700;
  color: #222831;
  margin-bottom: 3px;
}
.listing-bus__license-plate {
  font-size: 14px;
  font-weight: 400;
  color: #393e46;
  margin-bottom: 3px;
}
.listing-bus__line {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 14px;
  font-weight: 400;
  color: #393e46;
}
.line-color {
  width: 10px;
  height: 10px;
  border-radius: 100%;
}
</style>
