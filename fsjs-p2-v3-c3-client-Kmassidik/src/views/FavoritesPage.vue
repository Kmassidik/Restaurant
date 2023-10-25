<script>
import { mapActions, mapState } from 'pinia'
import { ActionDataCuisine } from '../stores/store'
import CardList from '../components/CardList.vue'
export default {
  components: {
    CardList
  },
  computed: {
    ...mapState(ActionDataCuisine, ['allDataFavorite'])
  },
  methods: {
    ...mapActions(ActionDataCuisine, ['fetchFavoriteCuisine'])
  },
  created() {
    this.fetchFavoriteCuisine()
  }
}
</script>
<template lang="">
  <div class="container min-h-screen mx-auto">
    <div class="flex flex-wrap justify-center py-4">
      <CardList
        v-for="dataCuisine in allDataFavorite"
        :key="dataCuisine.id"
        :dataCuisine="dataCuisine"
        :disable="false"
      />
    </div>
  </div>
</template>
