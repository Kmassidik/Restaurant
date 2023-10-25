<script>
import { mapActions, mapState } from 'pinia'
import { ActionDataCuisine } from '../stores/store'
import { RouterLink } from 'vue-router'
export default {
  components: {
    RouterLink
  },
  data() {
    return {
      preLoader: false
    }
  },
  computed: {
    getParamsId() {
      return this.$route.params.id
    },
    ...mapState(ActionDataCuisine, ['dataCuisineById'])
  },
  methods: {
    ...mapActions(ActionDataCuisine, ['fetchDataById', 'addFavoriteCuisine']),
    convertToRp(value) {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
      }).format(value)
    }
  },
  async created() {
    this.preLoader = true
    await this.fetchDataById(this.getParamsId)
    setTimeout(() => {
      this.preLoader = false
    }, 500)
  }
}
</script>
<template>
  <div v-if="preLoader" class="flex items-center justify-center w-full h-screen">
    <span style="width: 200px; height: 200px" class="loading loading-spinner text-neutral"></span>
  </div>
  <div v-if="!preLoader">
    <div
      class="hero min-h-screen"
      id="animation"
      :style="{ backgroundImage: `url(${dataCuisineById.responses.imgUrl})` }"
    >
      <div class="hero-overlay bg-opacity-60"></div>
      <div class="flex justify-evenly w-full h-auto">
        <div class="hero-content text-neutral-content">
          <div class="max-w-md">
            <h1 class="mb-5 text-5xl font-bold">{{ dataCuisineById.responses.name }}</h1>
            <h1 class="mb-5 text-3xl">{{ convertToRp(dataCuisineById.responses.price) }}</h1>
            <p class="mb-5">
              {{ dataCuisineById.responses.description }}
            </p>
            <button
              @click.prevent="addFavoriteCuisine(this.$route.params.id)"
              class="btn btn-light font-bold"
            >
              Add to your favorite
            </button>
          </div>
        </div>
        <div class="hero-content">
          <div class="h-auto w-52">
            <div v-html="dataCuisineById.qiris"></div>
          </div>
        </div>
      </div>

      <div class="fixed bottom-4 right-4">
        <RouterLink to="/">
          <div class="btn normal-case font-bold">
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style>
@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

#animation {
  animation: fadeIn 1s ease-in-out; 
}
</style>