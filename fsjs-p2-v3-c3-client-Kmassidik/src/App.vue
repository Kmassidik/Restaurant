<script>
import { RouterView } from 'vue-router'
import FooterMenu from './components/FooterMenu.vue'
import NavBar from './components/NavigationBar.vue'

export default {
  components: {
    RouterView,
    FooterMenu,
    NavBar
  }
}
</script>

<template>
  <NavBar v-if="this.$route.name == 'home' || this.$route.name == 'favorites'" />
  <RouterView />
  <FooterMenu v-if="this.$route.name == 'home' || this.$route.name == 'favorites'"/>
</template>
