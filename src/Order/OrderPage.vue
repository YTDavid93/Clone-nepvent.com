<template>
  <MainTable />

  <div v-if="showForm">
    <div class="bg-white p-6 rounded shadow">
      <order-header />
      <h1 class="text-1xl font-bold border-gray-300">Customer Information</h1>
      <button
        @click="toggleModal"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        ADD
      </button>
      <ShowForm :form="form" :showModal="showModal" @modalClose="showModal = false" />

      <order-info-table />
      <h1 class="text-1xl font-bold mb-4 pb-2 border-b border-gray-300 text-right flex-grow">
        Grand Total:{{ finalAmount }}
      </h1>
    </div>
  </div>
</template>

<script setup>
import { ref, computed} from 'vue'
import ShowForm from './ShowForm.vue'
// import AddOrder from './AddOrder.vue'
// import { useSocketIO } from '../Socket/socketStore'
import MainTable from './MainTable.vue'
import { useStore } from 'vuex'
import OrderHeader from './OrderHeader.vue'
import OrderInfoTable from './OrderInfoTable.vue'

const store = useStore();
const showForm = computed(() => {
 return store.getters.isFormShown;
})

const finalAmount = computed(() => {
  return store.getters.getFinalAmount;
})

//  const lists = computed(() => store.getters.getOrderList);
//  const selectedTableId = computed(() => store.getters.getSelectedTableId);

const showModal = ref(false)
// const showLists = ref(false)

// const { socket } = useSocketIO();

const form = ref({
  first_name: '',
  middle_name: '',
  last_name: '',
  pan: '',
  phone: '',
  address: '',
  email: ''
})

const toggleModal = () => {
  showModal.value = !showModal.value
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


