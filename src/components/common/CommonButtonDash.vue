<template>
  <div class="common__button">
    <router-link to="bus/creation" type="button" class="common__button__inner">
      <slot name="label"></slot>
    </router-link>
  </div>
</template>
<script setup lang="ts"></script>

<style scoped>
.common__button {
  display: grid;
  place-items: center;
}
.common__button__inner {
  display: grid;
  place-items: center;
  color: #ffffff;
  background: #2bb673;
  box-shadow: 0px 10px 15px 0px #2bb67333;
  font-size: 14px;
  font-weight: 700;
  min-height: 40px;
  border-radius: 25px;
  font-weight: bold;
  width: 100%;
  text-align: center;
  cursor: pointer;
  text-align: center;
}
.common__button__inner:disabled {
  opacity: 0.5;
  pointer-events: none;
}
</style>
