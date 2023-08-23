<template>
       <div class="flex justify-between mb-4 pb-2 items-center">
       <h1 class="text-2xl font-bold border-b border-gray-300">{{ tableName }}</h1>
        <button @click="getMenu" class="px-4 py-2 bg-blue-500 text-white rounded-lg">
          ADD ORDERS
        </button>
        <AddOrder
          :showLists="showLists"
          :lists="lists"
          :selectedTableId="selectedTableId"
          @close="showLists = false"
        />
      </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import AddOrder from './AddOrder.vue'
import { useStore } from 'vuex';

const store = useStore();
const showLists = ref(false);
const tableName = computed(() => store.getters.getTableName)
const selectedTableId = computed(() => store.getters.getSelectedTableId)
const lists = computed(() => store.getters.getOrderList);


const getMenu = async () => {
  try {
    await store.dispatch('getOrder')
    // Preload the first category and its menu items
    if (lists.value.length > 0 && lists.value[0].MenuCategories.length > 0) {
      lists.value[0].showSubCategories = true
      lists.value[0].MenuCategories[0].showMenuItems = true
   }
     showLists.value = true
  } catch (error) {
    console.log(error)
  }
}

</script>

<style scoped>

</style>