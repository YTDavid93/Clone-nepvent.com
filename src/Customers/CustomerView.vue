<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <div class="bg-gray-200 p-6 rounded-lg shadow-lg">
      <div class="flex justify-between items-center mb-4">
        <h1 class="text-2xl font-bold">Customers</h1>
        <button class="px-4 py-2 bg-blue-500 text-white rounded-lg">
          <router-link to="/customer-form">New Customer</router-link>
        </button>
      </div>
      <table class="w-full">
        <thead>
          <tr>
            <th class="py-2">S.No</th>
            <th class="py-2">Name</th>
            <th class="py-2">PAN/VAT</th>
            <th class="py-2">Contact No</th>
            <th class="py-2">Email</th>
            <th class="py-2">Address</th>
            <th class="py-2">Credit Period</th>
            <th class="py-2">Credit limit</th>
            <th class="py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(customer, index) in customers" :key="index">
            <td class="py-2">{{ index + 1 }}</td>
            <td class="py-3">
              {{ customer.first_name }} {{ customer.middle_name }} {{ customer.last_name }}
            </td>
            <td class="py-2">{{ customer.pan }}</td>
            <td class="py-2">{{ customer.phone }}</td>
            <td class="py-2">{{ customer.email }}</td>
            <td class="py-2">{{ customer.address }}</td>
            <td class="py-2">{{ customer.creditPeriod }}</td>
            <td class="py-2">{{ customer.creditLimit }}</td>
            <td class="p-3">
              <a class="text-gray-400 hover:text-gray-100 mx-2">
                <router-link
                  :to="{ name: 'customerEdit', params: { id: customer.id } }"
                  class="material-icons-outlined text-base"
                >
                  edit
                </router-link>
              </a>
              <span class="text-gray-400 hover:text-gray-100 ml-2">
                <button @click="deleteCustomer(customer.id)" class="material-icons-round text-base">
                  delete_outline
                </button>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="flex items-center justify-center p-2">
        <vue-awesome-paginate
          :items-per-page="perPage"
          :total-items="Number(count)"
          v-model="currentPage"
          @click="onClickHandler($event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useStore } from 'vuex'


const store = useStore()

const currentPage = ref(1)
const perPage = 10

const customers = computed(() => {
  return store.getters.getCustomerState
})

const count = computed(() => {
  return store.getters.getCountState
})

const deleteCustomer = (id) => {
  store.dispatch('deleteCustomer', id)
}

const onClickHandler = (page) => {
  currentPage.value = page // Update the current page
  store.dispatch('getCustomerList', page) // Dispatch the action with the selected page number
}

onMounted(() => {
  store.dispatch('getCustomerList', currentPage.value)
})

</script>

<style>
.pagination-container {
  display: flex;
  column-gap: 10px;
}
.paginate-buttons {
  height: 40px;
  width: 40px;
  border-radius: 20px;
  cursor: pointer;
  background-color: rgb(242, 242, 242);
  border: 1px solid rgb(217, 217, 217);
  color: black;
}
.paginate-buttons:hover {
  background-color: #d8d8d8;
}
.active-page {
  background-color: #3498db;
  border: 1px solid #3498db;
  color: white;
}
.active-page:hover {
  background-color: #2988c8;
}
</style>
