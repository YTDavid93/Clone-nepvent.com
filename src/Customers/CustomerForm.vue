<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <div class="bg-gray-200 p-6 rounded-lg shadow-lg">
      <div class="flex justify-between items-center mb-4">
        <form @submit.prevent="saveCustomer">
          <div class="mb-4">
            <div class="flex space-x-4">
              <div class="w-1/3">
                <label class="block mb-1" for="first-name">First Name</label>
                <input
                  class="w-full border border-gray-300 px-2 py-1 rounded"
                  type="text"
                  id="first-name"
                  v-model="form.first_name"
                  placeholder="Enter cutomer's first name.."
                />
              </div>
              <div class="w-1/3">
                <label class="block mb-1" for="middle-name">Middle Name</label>
                <input
                  class="w-full border border-gray-300 px-2 py-1 rounded"
                  type="text"
                  id="middle-name"
                  v-model="form.middle_name"
                  placeholder="Enter cutomer's middle name.."
                />
              </div>
              <div class="w-1/3">
                <label class="block mb-1" for="last-name">Last Name</label>
                <input
                  class="w-full border border-gray-300 px-2 py-1 rounded"
                  type="text"
                  id="last-name"
                  v-model="form.last_name"
                  placeholder="Enter cutomer's last name.."
                />
              </div>
            </div>
          </div>
          <div class="mb-4">
            <div class="flex space-x-4">
              <div class="w-1/2">
                <label class="block mb-1" for="pan-vat">PAN/VAT No</label>
                <input
                  class="w-full border border-gray-300 px-2 py-1 rounded"
                  type="text"
                  id="pan-vat"
                  v-model="form.pan"
                  placeholder="Enter customer's pan.."
                />
              </div>
              <div class="w-1/2">
                <label class="block mb-1" for="contact-no">Contact No</label>
                <input
                  class="w-full border border-gray-300 px-2 py-1 rounded"
                  type="text"
                  id="contact-no"
                  v-model="form.phone"
                  placeholder="Enter customer's contact no.."
                />
              </div>
            </div>
          </div>
          <div class="mb-4">
            <div class="flex space-x-4">
              <div class="w-1/2">
                <label class="block mb-1" for="address">Address:</label>
                <input
                  type="text"
                  class="w-full border border-gray-300 px-2 py-1 rounded"
                  id="address"
                  rows="3"
                  v-model="form.address"
                  placeholder="Enter customer's address.."
                />
              </div>
              <div class="w-1/2">
                <label class="block mb-1" for="email">Email</label>
                <input
                  class="w-full border border-gray-300 px-2 py-1 rounded"
                  type="email"
                  id="email"
                  v-model="form.email"
                  placeholder="Enter customer's email.."
                />
              </div>
            </div>
          </div>
          <div class="mb-4">
            <div class="flex space-x-4">
              <div class="w-1/2">
                <label class="block mb-1" for="max-discount">Max Discount Percent</label>
                <input
                  class="w-full border border-gray-300 px-2 py-1 rounded"
                  type="number"
                  id="max-discount"
                  v-model="form.discount_percent"
                  min="1"
                  placeholder="Enter customer's discount percent.."
                />
              </div>
              <div class="w-1/2">
                <label class="block mb-1" for="credit-period">Credit Period</label>
                <input
                  class="w-full border border-gray-300 px-2 py-1 rounded"
                  type="number"
                  id="credit-period"
                  v-model="form.creditPeriod"
                  placeholder="Enter cutomer's credit period"
                  min="1"
                />
              </div>
            </div>
          </div>
          <div class="mb-4">
            <label class="block mb-1" for="credit-limit">Credit Limit</label>
            <input
              class="w-full border border-gray-300 px-2 py-1 rounded"
              type="number"
              id="credit-limit"
              v-model="form.creditLimit"
              placeholder="Enter credit amount limit for customer"
              min="1"
            />
          </div>
          <div class="flex justify-end">
            <button class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router';
import { useStore } from 'vuex'
import router from '../router';
import axios from '../services/mycustomAxios';

const route = useRoute();

const store = useStore();

const form = ref({
  first_name: '',
  middle_name: '',
  last_name: '',
  pan: '',
  phone: '',
  address: '',
  email: '',
  discount_percent: '',
  creditPeriod: '',
  creditLimit: ''
})

onMounted(async() => {
try {
 const id = route.params.id;
 console.log(id);

 if(id) {
  const response = await axios.get(`customer/${id}`)
  console.log(response.data.message)

  const responseData = response.data.message
  form.value.first_name = responseData.first_name;
  form.value.middle_name = responseData.middle_name;
  form.value.last_name = responseData.last_name;
  form.value.pan = responseData.pan;
  form.value.phone = responseData.phone;
  form.value.address = responseData.address;
  form.value.email = responseData.email;
  form.value.discount_percent = responseData.discount_percent;
  form.value.creditPeriod = responseData.creditPeriod;
  form.value.creditLimit = responseData.creditLimit;
}

} catch (error) {
  console.log(error)
}
})

// Handel form submission

const saveCustomer = async() => {
  try {
     const id = route.params.id;
     if (id) {
       const response = await axios.put(`customer/${id}`, form.value)
       console.log(response)
     }
     else {
      store.dispatch('createCustomer', form.value);
    }
    router.push({ name: 'customerpage'})
  } catch(error) {
    console.log(error)
  }
}

</script>

<style>
</style>
