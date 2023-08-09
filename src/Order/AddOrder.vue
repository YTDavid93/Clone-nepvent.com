<template>
  <div
    v-if="showLists"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
  >
    <button
      @click="emits('close')"
      class="grid place-content-center absolute top-[125px] right-[175px] rounded-full bg-red-500 text-white hover:bg-red-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-4 w-4"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M12.293 10l4.146-4.147a1 1 0 0 0-1.414-1.414L10.88 8.586 6.734 4.44a1 1 0 0 0-1.414 1.414L9.466 10l-4.146 4.146a1 1 0 1 0 1.414 1.414L10.88 11.414l4.146 4.146a1 1 0 0 0 1.414-1.414L12.293 10z"
        />
      </svg>
    </button>
    <div class="w-screen h-screen flex items-center justify-center">
      <div class="bg-gray-200 p-6 rounded-lg shadow-lg flex flex-col items-center">
        <div class="flex overflow-x-auto mt-4" style="max-height: 90vh">
          <div
            v-if="!itemsAdded && orders.length === 0"
            class="bg-white text-2xl flex justify-start rounded-lg mr-2 max-h-[10vh]"
          >
            <span>No Items Added</span>
          </div>
          <div v-else-if="itemsAdded">
            <order-table :orders="orders" class="mr-4" />
            <button
              v-if="showButton"
              class="rounded-lg bg-zinc-500 px-4 py-2 text-2xl mt-7 hover:bg-violet-600"
              @click="placeOrder(selectedTableId)"
            >
              Place Order
            </button>
            <!-- <p v-if="orderSuccessful">Order successful!</p> -->
          </div>

          <div v-for="(list, listIndex) in lists" :key="listIndex" style="max-height: 400px">
            <table>
              <thead>
                <th class="pr-8 font-bold text-2xl" @click="toggleSubCategories(listIndex)">
                  {{ list.name }}
                </th>
              </thead>
              <tbody v-if="list.showSubCategories">
                <tr v-for="(category, categoryIndex) in list.MenuCategories" :key="categoryIndex">
                  <td>
                    <span @click="toggleMenuItems(listIndex, categoryIndex)">
                      {{ category.name }}
                    </span>
                  </td>
                  <td>
                    <ul v-if="category.showMenuItems">
                      <li v-for="(menuItem, itemIndex) in category.Menus" :key="itemIndex">
                        <div class="mr-2">
                          <span> {{ menuItem.name }} Rs.{{ menuItem.price }}</span>
                          <div class="mr-auto">
                            <button
                              @click="itemDecrement(menuItem)"
                              class="px-2 py-1 bg-blue-500 text-white rounded-lg"
                            >
                              -
                            </button>
                            <input
                              class="w-12 px-2 py-1 text-center border border-gray-300 rounded-lg mx-2"
                              placeholder="0"
                              v-model="quantity"
                            />
                            <button
                              @click="itemIncrementMenu(menuItem)"
                              class="px-2 py-1 bg-blue-500 text-white rounded-lg"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from '../services/mycustomAxios'
import { ref, onMounted } from 'vue'
import OrderTable from './OrderTable.vue'
import { useSocketIO } from '../Socket/socketStore'

const quantity = ref(0)
const itemsAdded = ref(false)
const showButton = ref(false)

const orders = ref([])
const emits = defineEmits(['close'])

// Access the socketId from the state object
const { socket } = useSocketIO()

const { showLists, lists, selectedTableId } = defineProps(['showLists', 'lists', 'selectedTableId'])

onMounted(() => {
  socket.on('connect', (socket) => {
    console.log(socket, 'sockettttttt')
    // socket.emit('joinRoom', 'TABLES')
  })
  socket.emit('joinRoom', 'ORDERS')
  // socket.on('OCCUPIED', (data) => {
  //   console.log('occupied table', data)
  // })
  socket.on('ORDERS_success', (data) => {
    console.log('ORDER_success', data)
  })
  // socket.on('ORDERS_error', (data) => {
  //   console.log('order error', data)
  // })

  // console.log('socketid', socket.id)
})


const toggleSubCategories = (listIndex) => {
  //Iterate through each list in lists array
  lists.forEach((list, index) => {
    list.showSubCategories = index === listIndex

    // Preload the first category and its menu items when a list is shown
    if (index === listIndex && list.MenuCategories.length > 0) {
      list.MenuCategories[0].showMenuItems = true
    } else {
      // Hide other categories' menu items when a different list is clicked
      list.MenuCategories.forEach((category) => {
        category.showMenuItems = false
      })
    }
  })
}

const toggleMenuItems = (listIndex, categoryIndex) => {
  lists.forEach((list, index) => {
    list.MenuCategories.forEach((category, catIndex) => {
      category.showMenuItems = index === listIndex && catIndex === categoryIndex
    })
  })
}

//Function ho handel itemDecrement
const itemDecrement = (menuItem) => {
  const existingOrder = orders.value.find((order) => order.menuItem.id === menuItem.id)
  if (existingOrder.quantity > 0) {
    existingOrder.quantity--
  }

  // If the item's quantity becomes 0, remove it from the orders array
  if (existingOrder.quantity === 0) {
    const indexToRemove = orders.value.indexOf(existingOrder)
    orders.value.splice(indexToRemove, 1)
  }

  // Check if there any items left in the orders array
  itemsAdded.value = orders.value.length > 0
  showButton.value = orders.value.length > 0
}

//Function ho handel itemIncrement
const itemIncrementMenu = (menuItem) => {
  // Update the orders array with the new ordered item
  const existingOrder = orders.value.find((order) => order.menuItem.id === menuItem.id)
  if (existingOrder) {
    // If the item is already ordered, increment its quantity
    existingOrder.quantity++
  } else {
    // If the item is not ordered yet, add it to the orders array
    orders.value.push({
      menuItem,
      quantity: 1
    })
  }

  console.log('Incrementing quantity for:', menuItem.name)
  itemsAdded.value = true
  showButton.value = true
}

const placeOrder = async (id) => {
  try {
    const filteredOrders = orders.value.map(order => {
      return {
        menu_id: order.menuItem.id,
        quantity: order.quantity,
        complimentary: false,
        remarks: "less Chilly",
        options: null
      };
    });

    const response = await axios.post(`table/${id}/order`, {
      orders: filteredOrders,
      socketId: socket.id
    });

    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

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
