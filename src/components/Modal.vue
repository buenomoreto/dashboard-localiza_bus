<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"> default header </slot>
          </div>

          <div class="modal-body">
            <slot name="body"> default body </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button
                class="modal-default-button--cancel"
                @click="$emit('cancel')"
              >
                cancelar
              </button>
              <button
                class="modal-default-button--delete"
                @click="$emit('close')"
              >
                OK
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts"></script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.1);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  position: relative;
  max-width: 450px;
  width: 100%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  border-radius: 5px;
  padding-top: 20px;
  text-align: center;
}

.modal-body {
  margin: 20px 0;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.modal-default-button--delete {
  background-color: #ea5455;
  color: #ffffff;
  font-weight: bold;
  box-shadow: 0px 10px 15px 0px #ea545533;
  cursor: pointer;
  display: grid;
  place-items: center;
  height: 40px;
  border-radius: 10px;
  width: 130px;
}
.modal-default-button--cancel {
  height: 40px;
  border-radius: 10px;
  width: 150px;
  cursor: pointer;
  color: #555353;
  font-weight: 600;
}
.modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 40px;
}
</style>
