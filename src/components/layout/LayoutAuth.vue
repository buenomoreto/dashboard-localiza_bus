<template>
  <main class="container">
    <section class="container__form">
      <slot name="contentForm" />
    </section>
    <section class="container__image">
      <slot name="contentImage" />
    </section>
  </main>
</template>

<script setup lang="ts">

</script>
<style scoped>
@media (max-width: 1024px) {
  .container__image {
    display: none;
  }
  .container__form {
    padding: 0 15px;
  }
}
</style>