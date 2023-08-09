<script setup>
import { onMounted } from 'vue'
import { useSocketIO } from './Socket/socketStore'

const { socket } = useSocketIO()

onMounted(() => {
  socket.emit('joinRoom', 'TABLES')

  socket.on('OCCUPIED', (data) => {
    console.log('table un OCCUPIED', data)
  })
})
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
