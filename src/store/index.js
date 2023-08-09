import { createStore } from 'vuex'
import axios from '../services/mycustomAxios'
import router from '../router'
import order from './modules/order'

const store = createStore({
  state: {
    loginState: false,
    message: '',
    triesRemaining: 0,
    customers: [],
    count: 0
  },
  mutations: {
    logUserIn(state) {
      state.loginState = true
    },
    setLoginError(state, { message, triesRemaining }) {
      state.message = message
      state.triesRemaining = triesRemaining
    },
    setCustomers(state, customers) {
      state.customers = customers
    },
    setCount(state, count) {
      state.count = count
    },
    removeCustomer(state, customerId) {
      state.customers = state.customers.filter((customer) => customer.id !== customerId)
      state.count -= 1 // Decrease the total count after deletion
    }
  },

  actions: {
    async login({ commit }, payload) {
      try {
        const response = await axios.post('auth/login', payload)
        console.log(response)
        if (response.data.message.token) {
          localStorage.setItem('token', response.data.message.token)
          localStorage.setItem('tenant', response.data.message.tenant)
          commit('logUserIn') // Stores token in local storages
          router.push({ name: 'customerpage' })
        }
      } catch (error) {
        console.log(error.response)
        const message = error.response.data.message
        const triesRemaining = error.response.data.triesRemaining
        commit('setLoginError', { message, triesRemaining })
      }
    },
    async getCustomerList({ commit }, page) {
      try {
        const response = await axios.get(`customer/paginated?page=${page}`)
        const data = response.data.message.rows
        const countData = response.data.message.count
        commit('setCustomers', data)
        commit('setCount', countData)
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    },
    async createCustomer({ commit }, form) {
      try {
        const response = await axios.post('customer/', form)
        console.log(response)
        if (response.data.success) {
          window.alert('customer creation successful')
        }
      } catch (error) {
        console.log(error)
      }
    },

    async deleteCustomer({ commit }, customerId) {
      try {
        const response = await axios.delete(`customer/${customerId}`)
        console.log(response.data)
        if (response.data.success) {
          commit('removeCustomer', customerId)
        }
      } catch (error) {
        console.log(error)
      }
    }
  },
  getters: {
    getLoginState(state) {
      return state.loginState
    },
    getCustomerState(state) {
      return state.customers
    },
    getCountState(state) {
      return state.count
    }
  },
  modules: {
    order
  }
})

export default store
