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
          <button @click="placeorder(table.id)" class="text-center font-semibold text-white">
            {{ table.table_name }}
          </button>
        </div>
      </div>
    </div>
  </div>
<!-- chhutaidi halne -->

  <div v-if="showForm" class="mt-4">
    <div class="bg-white p-6 rounded shadow">
      <div class="flex justify-between mb-4 pb-2 items-center">
        <h1 class="text-2xl font-bold border-b border-gray-300">{{ tableName }}</h1>
       <button @click="addOrder" class="px-4 py-2 bg-blue-500 text-white rounded-lg">
          ADD ORDERS
        </button> 
        <AddOrder
          :showLists="showLists"
          :lists="lists"
          :selectedTableId="selectedTableId"
          @close="showLists = false"
        />
       </div>

     <h1 class="text-1xl font-bold border-gray-300">Customer Information</h1>
      <button
        @click="toggleModal"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        ADD
      </button>
      <ShowForm :form="form" :showModal="showModal" @modalClose="showModal = false" />
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
      <h1 class="text-1xl font-bold mb-4 pb-2 border-b border-gray-300 text-right flex-grow">
        Grand Total:{{ finalAmount }}
      </h1>
    </div>
  </div> 
</template>

<script setup>
import { onMounted, ref } from 'vue'
import axios from '../services/mycustomAxios'
import ShowForm from './ShowForm.vue'
import AddOrder from './AddOrder.vue'

let locations = ref([])
const items = ref([])
const lists = ref([])

const showLists = ref(false)
const showForm = ref(false)
const tableName = ref(null)
const showModal = ref(false)
const finalAmount = ref(null)
const selectedTableId = ref(null)

const form = ref({
  first_name: '',
  middle_name: '',
  last_name: '',
  pan: '',
  phone: '',
  address: '',
  email: ''
})


onMounted(async () => {
  // const response = await axios.get('table?orderSource=TABLE')
  // console.log(response)
  // locations.value = response.data.message

  // socket.emit('joinRoom', 'TABLES');

  //  socket.join('OCCUPIED', (data) => {
  //     console.log('table occupied', data)
  //   })

  //  socket.join('UNOCCUPIED', (data) => {
  //    console.log('table un occupied', data)
  // })

  const response = await axios.get('menu-primary-category/menu')
  console.log(response)
  lists.value = response.data.message
  console.log(response.data.message)

  try {
    const response = await axios.get('table?orderSource=TABLE')
    console.log(response)
    locations.value = response.data.message
  } catch (error) {
    console.log(error)
  }
})

const placeorder = async (id) => {
  try {
    const response = await axios.get(`invoice/print/estimate/${id}`)
    console.log(response)
    items.value = response.data.message?.data.orderDetails
    tableName.value = response.data.message?.data.table
    finalAmount.value = response.data.message.data.billInformation.final_amount
    console.log(response.data.message?.data.orderDetails)
    console.log(response.data.message?.data.table)
    console.log(response.data.message.data.billInformation.final_amount)

    selectedTableId.value = id

    showForm.value = true
  } catch (error) {
    console.log(error)
  }
}

const toggleModal = () => {
  showModal.value = !showModal.value
}

const addOrder = async () => {
  try {
    // const response = await axios.get('menu-primary-category/menu')
    // console.log(response)
    // lists.value = response.data.message
    // console.log(response.data.message)

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
.container {
  max-width: 1200px;
}
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
ul {
  margin: 0;
  padding: 0;
  list-style: none;
}
li {
  margin-bottom: 4px;
}
</style>
