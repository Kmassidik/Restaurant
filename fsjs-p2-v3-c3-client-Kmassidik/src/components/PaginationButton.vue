<script>
import { mapActions, mapState } from 'pinia'
import { ActionDataCuisine } from '../stores/store'
export default {
  data() {
    return {
      page: 1,
      IsNextPage: true
    }
  },
  computed: {
    ...mapState(ActionDataCuisine, ['allDataCuisines'])
  },
  methods: {
    ...mapActions(ActionDataCuisine, ['fetchAllData']),
    previousPage() {
      this.page -= 1
      this.fetchAllData(this.page)
    },
    nextPage() {
      this.page += 1
      this.fetchAllData(this.page)
    }
  }
}
</script>
<template lang="">
  <div class="join">
    <button v-if="page > 1" @click.prevent="previousPage" class="join-item btn">«</button>
    <button class="join-item btn">Page {{ page }}</button>
    <button v-if="allDataCuisines.length >= 9" @click.prevent="nextPage" class="join-item btn">
      »
    </button>
  </div>
</template>
