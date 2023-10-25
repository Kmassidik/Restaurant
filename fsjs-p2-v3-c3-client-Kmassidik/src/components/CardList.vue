<script>
import { mapActions } from 'pinia'
import { ActionDataCuisine } from '../stores/store'
export default {
  props: ['dataCuisine', 'disable'],
  methods: {
    ...mapActions(ActionDataCuisine, ['addFavoriteCuisine']),
    convertToRp(value) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(value)
    },
    goToDetailPage() {
      // console.log(this.dataCuisine.id);
      this.$router.push(`/details/${this.dataCuisine.id}`)
    }
  }
}
</script>
<template lang="">
  <div class="card w-96 h-96 bg-base-100 shadow-xl mx-2 my-3">
    <figure class="relative group">
      <img
        @click.prevent="goToDetailPage"
        :src="dataCuisine.imgUrl"
        class="w-full h-60 transition-transform transform group-hover:scale-105"
        alt="Shoes"
      />
    </figure>
    <div class="card-body">
      <h2 class="card-title uppercase font-bold">{{ dataCuisine.name }}</h2>
      <p v-if="disable" class="font-bold">{{ convertToRp(dataCuisine.price) }}</p>
      <div v-if="disable" class="card-actions justify-end">
        <button
          @click.prevent="addFavoriteCuisine(dataCuisine.id)"
          class="btn btn-neutral font-bold"
        >
          Add To Favorite
        </button>
      </div>
    </div>
  </div>
</template>
<style lang=""></style>
