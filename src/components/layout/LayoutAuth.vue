<template>
  <main class="container">  
    <img src="@/assets/images/new-logo.svg" alt="Localiza Bus" width="200" class="container-logo">
    <section class="container__form">
      <slot name="contentForm" />
    </section>
    <section class="container__register">
      <template v-if="isRegister">
        <h1>Novo por aqui?</h1>
        <p>Crie uma conta e cadastre sua frota <br> de veículos agora mesmo!</p>
        <router-link :to="formClass">Criar conta</router-link>
      </template>
      <template v-else>
        <h1>Bem-vindo!</h1>
        <p>Entre na sua conta, gerencie e<br> monitore sua frota de veículos!</p>
        <router-link :to="formClass">Criar conta</router-link>
      </template>
    </section>
  </main>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
const route = useRoute();

const formClass = computed(() => {
  return route.path === '/signIn' ? '/register' : '/signIn';
});
const isRegister = computed(() => {
  return route.path === '/register' ? false : true;
});
</script>
<style scoped>
@media (max-width: 1024px) {
  .container__register {
    display: none;
  }
  .container__form {
    padding: 0 15px;
  }
}
.container-logo {
  position: absolute;
  top: 50px;
  left: 50px;
  z-index: 1;
}
.container__register {
  background: linear-gradient(114.33deg, #2BB673 0%, rgba(43, 182, 115, 0.7) 207.54%);
  width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.container__register h1, p {
  color: #fff;
  text-align: center;
}
.container__register h1 {
  font-size: 36px;
  margin-bottom: 15px;
  text-transform: initial;
}
.container__register p {
  font-size: 16px;
  margin-bottom: 30px;
}
.container__register a {
  border-radius: 100px;
  border: 1px solid #FFF;
  box-shadow: 0px 10px 15px 0px rgba(43, 182, 115, 0.20);
  width: 250px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  color: #FFF;
  font-size: 14px;
  font-weight: 700;
}
</style>
