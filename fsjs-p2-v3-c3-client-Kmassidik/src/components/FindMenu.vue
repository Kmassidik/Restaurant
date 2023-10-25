<script>
import { mapActions } from 'pinia'
import { ActionDataCuisine } from '../stores/store'
export default {
  data() {
    return {
      search: ''
    }
  },
  methods: {
    ...mapActions(ActionDataCuisine, ['fetchAllData']),
    getSearchData() {
      this.fetchAllData("",this.search)
    }
  }
}
</script>
<template lang="">
  <form @submit.prevent="getSearchData" class="flex w-full justify-center mt-4">
    <div class="form-control">
      <input type="text" placeholder="Search" class="input input-bordered w-80" v-model="search" />
    </div>
    <button class="btn btn-ghost btn-circle">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    </button>
  </form>
</template>
<style lang=""></style>
