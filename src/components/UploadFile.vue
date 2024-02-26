<template>
  <div class="user-photo">
    <img v-if="photoURL" :src="photoURL" width="82" height="82" />
    <img
      v-else
      src="@/assets/images/default-profile.png"
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
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['file'])
const props = defineProps<{ photo?: string; owner?: string }>()
const fileInput = ref<HTMLInputElement | null>(null)
const photoURL = ref<any>(props.photo)

const handleFileUpload = () => {
  if (
    fileInput.value &&
    fileInput.value.files &&
    fileInput.value.files.length > 0
  ) {
    const file = fileInput.value.files[0]
    photoURL.value = window.URL.createObjectURL(file)
    const formData = new FormData()
    formData.append('user_photo', file)
    emit('file', formData)
  }
}
</script>

<style scoped>
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
</style>
