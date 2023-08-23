<template>
  <table>
    <thead>
      <tr>
        <th class="py-2">S.No</th>
        <th class="py-2">Particular</th>
        <th class="py-2">Quantity</th>
        <th class="py-2">Rate</th>
        <th class="py-2">Amount</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, index) in items" :key="index">
        <td class="py-3">{{ index + 1 }}</td>
        <td class="py-3">{{ item?.item_name }}</td>
        <td class="py-3">{{ item?.quantity }}</td>
        <td class="py-3">{{ item?.rate }}</td>
        <td class="py-3">{{ item?.grand_total }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { useStore } from "vuex"
import { computed } from "vue"

const store = useStore();

const items = computed(() => {
  return store.getters.getTableItems;
})
</script>

<style scoped></style>
