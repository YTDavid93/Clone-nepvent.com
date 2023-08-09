<template>
  <div class="relative py-10 sm:max-w-xl sm:mx-auto h-screen flex items-center justify-center">
    <div class="login relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10 w-full max-w-md">
      <div class="max-w-md mx-auto">
        <form @submit.prevent="Login">
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
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const credentials = reactive({
  user_name: '',
  password: '',
  slug: ''
})

const Login = () => {
  store.dispatch('login', credentials)
}

const message = computed(() => store.state.message)
const triesRemaining = computed(() => store.state.triesRemaining)
</script>

<style>
.login {
  background: linear-gradient(90deg, #46dcf8, #2250e4);
}
</style>
