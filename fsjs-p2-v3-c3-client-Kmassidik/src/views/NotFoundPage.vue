<script>
import { RouterLink } from 'vue-router'
export default {
  components: {
    RouterLink
  }
}
</script>
<template lang="">
  <div class="bg-gray-100 h-screen flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-6xl font-bold text-red-500">404</h1>
      <p class="text-2xl text-gray-800 mt-4">Page not found</p>
      <RouterLink to="/">
          <p class="text-blue-500 hover:underline mt-4 block">Go back to the homepage</p>
      </RouterLink>
    </div>
  </div>
</template>
