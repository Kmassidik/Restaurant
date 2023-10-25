<script>
import { mapActions, mapState } from 'pinia'
import { ActionDataCuisine } from '../stores/store'
import CarouselMenu from '../components/CarouselMenu.vue'
import CardList from '../components/CardList.vue'
import PaginantionButton from '../components/PaginationButton.vue'
import FindMenu from '../components/FindMenu.vue'
export default {
  components: {
    CarouselMenu,
    CardList,
    PaginantionButton,
    FindMenu
  },
  computed: {
    ...mapState(ActionDataCuisine, ['allDataCuisines'])
  },
  methods: {
    ...mapActions(ActionDataCuisine, ['fetchAllData'])
  },
  data() {
    return {
      page: 1
    }
  },
  created() {
    this.fetchAllData()
  }
}
</script>
<template lang="">
  <div class="container mx-auto my-5">
    <div class="my-3">
      <CarouselMenu />
    </div>
    <div class="border"></div>
    <FindMenu />
    <div class="flex flex-wrap justify-evenly">
      <CardList v-for="e in allDataCuisines" :key="e.id" :dataCuisine="e" :disable="true" />
    </div>
    <div class="text-center mt-4">
      <PaginantionButton />
    </div>
  </div>
</template>
<style lang=""></style>
