<template>
  <form @submit.prevent="handleSubmit" class="common__search">
    <input 
      type="text" 
      class="common__search__input" 
      placeholder="Procure por ônibus ou motoristas." 
      v-model="searchTerm"
    />
    <button type="submit" class="common__search__icon-btn">
      <img src="@/assets/images/icons/search.svg" class="common__search__icon" alt="Search" />
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const searchTerm = ref('');

function handleSubmit() {
  console.log(searchTerm.value); 
}
</script>

<style scoped>
.common__search {
  width: 515px;
  height: 40px;
  border-radius: 20px;
  background-color:  #F9F9F9;
  display: flex;
  align-items: center;
  padding: 0 15px;
  text-indent: 15px;
  border: 1px solid transparent;
  transition: border 0.3s ease; 
}

.common__search:hover,
.common__search:focus-within {
  border: 1px solid #2BB673;
}

.common__search__input {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 400;
  line-height: 16px;
  outline: none;
}

.common__search__icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin: 0;
}

.common__search__icon {
  height: 16px; 
  width: 16px; 
}
</style>
