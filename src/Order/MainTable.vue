<template>
     <div class="outer-container">
    <div v-for="(location, index) of locations" :key="index" class="test max-w-md mx-auto mb-8">
      <h1 class="text-2xl font-bold">{{ location.name }}</h1>
      <div class="flex flex-wrap mt-4">
        <div
          v-for="(table, tableIndex) in location.Tables"
          :key="tableIndex"
          class="w-1/4 px-4 py-3 m-3 rounded-lg border border-gray-500"
          :class="[table.occupied ? 'bg-red-400' : 'bg-green-400']"
        >
          <button @click="placeorder(table.id)" class="text-center font-semibold text-white">
            {{ table.table_name }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

const { locations } = defineProps(['locations'])

</script>

<style lang="scss" scoped>

</style>