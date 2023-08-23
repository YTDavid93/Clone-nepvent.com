<template>
  <div class="outer-container">
    <div v-for="(location, index) of locations" :key="index" class="test max-w-md mx-auto mb-8">
      <h1 class="text-2xl font-bold">{{ location.name }}</h1>
      <div class="flex flex-wrap mt-4">
        <div
          v-for="(table, tableIndex) in location.Tables"
          :key="tableIndex"
          class="w-1/4 px-4 py-3 m-3 rounded-lg border border-gray-500"
          :class="[table.occupied ? 'bg-red-400' : 'bg-green-400']"
        >
          <button @click="getTableList(table)" class="text-center font-semibold text-white">
            {{ table.table_name }}
          </button>
        </div>
      </div>
    </div>
    <div v-if="showTableUnoccupied">
      <TableUnoccupied />
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useStore } from 'vuex'
import axios from '../services/mycustomAxios'
import { useSocketIO } from '../Socket/socketStore'
import TableUnoccupied from './TableUnoccupied.vue'

let locations = ref('')
const store = useStore()
const { socket } = useSocketIO()

let showTableUnoccupied = ref(false);
let unoccupiedTableName = ref('');

onMounted(async () => {
  try {
    const response = await axios.get('table?orderSource=TABLE')
    console.log(response)
    locations.value = response.data.message
  } catch (error) {
    console.log(error)
  }
  socket.emit('joinRoom', 'TABLES')

  socket.on('OCCUPIED', (data) => {
    console.log('table OCCUPIED', data)
  })

  socket.on('UNOCCUPIED', (data) => {
    console.log('table UNOCCUPIED', data)
  })
})

const getTableList = async (table) => {
  try {
     if (!table.occupied) {
    store.commit('setTableName', table.table_name); // Store the unoccupied table name
    store.commit('setShowForm', false); // Show the Tablecomponent name
    showTableUnoccupied.value = true; 
  } else {
    unoccupiedTableName.value = ''; // Resey the unoccupied table name
    showTableUnoccupied.value = false; // Hide the Tablecomponent name
    await store.dispatch('getTableData', table.id);
    store.commit('setShowForm', true);
  }
  } catch (error) {
    console.log(error)
  }
}
</script>

<style></style>
