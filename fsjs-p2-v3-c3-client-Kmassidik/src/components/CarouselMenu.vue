<template>
  <div class="carousel w-full h-96 rounded">
    <div
      v-for="(slide, index) in slides"
      :key="index"
      :id="'slide' + (index + 1)"
      class="carousel-item relative w-full"
      v-show="index === currentSlide"
    >
      <img :src="slide" class="w-full" />
      <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
        <a @click="prevSlide"></a>
        <a @click="nextSlide"></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentSlide: 0,
      slides: [
        "https://static-cdn-ph.pizzahut.co.id/uploads/temp/pizza-hut-delivery-l1mo-cruncheeze-6-topping-sliding-banner-718x308-1680274022358.jpg",
        "https://static-cdn-ph.pizzahut.co.id/uploads/temp/fa-genshin-desktop-2600x400pxl-1695002869333.jpg",
        "https://waroengsteakandshake.com/uploads/2023/04/04/chicken-bbq-grill-banner.jpg",
        "https://files.kfcku.com/uploads/media/dummy/slider/banner-slider/tbag_promo_web_h_713x423.jpg"
      ],
    };
  },
  methods: {
    nextSlide() {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    },
    prevSlide() {
      this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
    },
  },
  mounted() {
    setInterval(this.nextSlide, 3000); // Change slide every 3 seconds
  },
};
</script>

<style scoped>
/* Add your CSS styles for "btn" and "btn-circle" classes here */
</style>
