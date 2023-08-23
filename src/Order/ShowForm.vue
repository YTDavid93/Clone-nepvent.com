<template>
  <div
    v-if="showModal"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <div class="w-screen h-screen flex items-center justify-center">
      <div class="bg-gray-200 p-6 rounded-lg shadow-lg">
        <div class="flex justify-between items-center mb-4">
          <form @submit.prevent="saveCustomer">
            <div class="mb-4">
              <div class="flex space-x-4">
                <div class="w-1/3">
                  <label class="block mb-1" for="first-name">First Name</label>
                  <input
                    class="w-full border border-gray-300 px-3 py-1 rounded"
                    type="text"
                    id="first-name"
                    v-model="form.first_name"
                    placeholder="Customer's first name.."
                  />
                </div>
                <div class="w-1/3">
                  <label class="block mb-1" for="middle-name">Middle Name</label>
                  <input
                    class="w-full border border-gray-300 px-2 py-1 rounded"
                    type="text"
                    id="middle-name"
                    v-model="form.middle_name"
                    placeholder="Customer's middle name.."
                  />
                </div>
                <div class="w-1/3">
                  <label class="block mb-1" for="last-name">Last Name</label>
                  <input
                    class="w-full border border-gray-300 px-2 py-1 rounded"
                    type="text"
                    id="last-name"
                    v-model="form.last_name"
                    placeholder="Customer's last name.."
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
                    placeholder="Customer's pan.."
                  />
                </div>
                <div class="w-1/2">
                  <label class="block mb-1" for="contact-no">Contact No</label>
                  <input
                    class="w-full border border-gray-300 px-2 py-1 rounded"
                    type="text"
                    id="contact-no"
                    v-model="form.phone"
                    placeholder="Customer's contact no.."
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
                    placeholder="Customer's address.."
                  />
                </div>
                <div class="w-1/2">
                  <label class="block mb-1" for="email">Email</label>
                  <input
                    class="w-full border border-gray-300 px-2 py-1 rounded"
                    type="email"
                    id="email"
                    v-model="form.email"
                    placeholder="Customer's email.."
                  />
                </div>
              </div>
            </div>
            <div class="flex justify-end">
              <button class="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
            </div>
            <div>
              <button @click="emits('modalClose')" class="px-4 py-2 bg-red-500 text-white rounded">
                Close
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const  { showModal, form} = defineProps(['form', 'showModal']);
const emits = defineEmits(['modalClose']);

</script>

<style></style>