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
    count: 0,
    showForm: false,
    tableName: '',
    items: '',
    finalAmount: '',
    lists: [],
    selectedTableId: null,
    orderedItems: [],
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
    },
    setShowForm(state, value) {
      state.showForm = value
    },
    setTableName(state, tableName) {
      state.tableName = tableName
    },
    setItems(state, items) {
      state.items = items
    },
    setFinalAmount(state, finalAmount) {
      state.finalAmount = finalAmount
    },
    setLists(state, lists) {
      state.lists = lists
    },
    setSelectedTableId(state, tableId) {
      state.selectedTableId = tableId
    },
    setShowLists(state, value) {
      state.showLists = value
    },
    toggleSubCategories(state, listIndex) {
      state.lists.forEach((list, index) => {
        list.showSubCategories = index === listIndex

        if (index === listIndex && list.MenuCategories.length > 0) {
          list.MenuCategories[0].showMenuItems = true
        } else {
          // Hide other categories' menu items when a different list is clicked
          list.MenuCategories.forEach((category) => {
            category.showMenuItems = false
          })
        }
      })
    },
    toggleMenuItems(state, { listIndex, categoryIndex }) {
      state.lists.forEach((list, index) => {
        list.MenuCategories.forEach((category, catIndex) => {
          category.showMenuItems = index === listIndex && catIndex === categoryIndex
        })
      })
    },
    setOrderedItems(state, items) {
      state.orderedItems = items
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
    },

    toggleForm({ commit }, value) {
      commit('setShowForm', value)
    },

    async getTableData({ commit }, id) {
      try {
        const response = await axios.get(`invoice/print/estimate/${id}`)
        console.log(response)
        const items = response.data.message?.data.orderDetails
        const tableName = response.data.message?.data.table
        const finalAmount = response.data.message.data.billInformation.final_amount

        commit('setItems', items)
        commit('setTableName', tableName)
        commit('setFinalAmount', finalAmount)
        commit('setSelectedTableId', id)
      } catch (error) {
        console.log(error)
      }
    },

    async getOrder({ commit }) {
      try {
        const response = await axios.get('menu-primary-category/menu')
        const lists = response.data.message

        commit('setLists', lists)
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
    },
    isFormShown(state) {
      return state.showForm
    },
    getTableName(state) {
      return state.tableName
    },
    getTableItems(state) {
      return state.items
    },
    getFinalAmount(state) {
      return state.finalAmount
    },
    getOrderList(state) {
      return state.lists
    },
    getSelectedTableId(state) {
      return state.selectedTableId
    },
    getOrderedItems(state) {
      return state.orderedItems
    }
  },
  modules: {
    order
  }
})

export default store
