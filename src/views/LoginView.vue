<template>
  <div class="flex items-center justify-center h-screen">
    <div class="w-full max-w-md bg-white shadow-md rounded px-8 py-6">
      <form @submit.prevent="Login" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div v-if="message" class="text-red-500 mb-4">
          {{ message }}
        </div>
        <div v-if="triesRemaining > 0" class="text-gray-500 mb-4">
           Tries remaining: {{ triesRemaining }} 
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="resturantId">
            Restaurant Id
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            v-model="credentials.slug"
            placeholder="Restaurant Id"
            id="resturantId"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            User Name
          </label>
          <input
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Enter UserName"
            id="username"
            v-model="credentials.user_name"
          />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
          </label>
          <input
            class="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Enter Password"
            id="password"
            v-model="credentials.password"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
           >
            Login
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import {  computed,reactive } from 'vue'
import { useStore } from 'vuex';

const store = useStore();
const credentials = reactive({
  user_name: '',
  password: '',
  slug: '',
})

const Login = () => {
    store.dispatch('login', credentials)
};

const message = computed(() => store.state.message);
const triesRemaining = computed(() => store.state.triesRemaining);
</script>

<style>
body {
  background: linear-gradient(90deg, #46dcf8, #2250e4);
}
</style>