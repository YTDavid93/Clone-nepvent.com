<template>
   <div>
     <table>
        <thead>
           <tr>
             <th>S.no</th>
             <th>Item</th>
             <th>Qty</th>
           </tr>
        </thead>
     <tbody>
        <tr v-for="(order, index) in orders" in orders :key="index">
          <td>{{ index+1 }}</td>
          <td>{{ order.menuItem.name }}</td>
          <td>{{ order.quantity }}</td>
        </tr>
     </tbody>
   </table>
  </div>
</template>

<script setup>

//Define the prop to recive the orders data from the parent component
const { orders } = defineProps(['orders']);


</script>

<style>
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