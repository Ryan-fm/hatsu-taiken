
<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
function handleRouter (){
  router.push({
        name: 'rabbit',
      })
}
</script>

<template>
  <div>
    <div @click="handleRouter">兔子</div> 
  </div>
</template>

<style scoped>

</style>
