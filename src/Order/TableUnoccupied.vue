<template>
  <div class="bg-gray-200 p-6 rounded-lg shadow-lg absolute top-8 right-72">
    <order-header />
    <div class="bg-[rgb(255,170,0)] rounded shadow p-3 mt-4">
      <p class="text-2xl font-serif">Table is Unoccupied</p>
    </div>
  </div>
</template>

<script setup>
import OrderHeader from './OrderHeader.vue'
</script>

<style scoped></style>
