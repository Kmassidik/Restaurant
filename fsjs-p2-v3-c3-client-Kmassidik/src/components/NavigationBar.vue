<script>
import { RouterLink } from 'vue-router'
import { mapActions, mapState } from 'pinia'
import { Authentication } from '../stores/store'

export default {
  components: {
    RouterLink
  },
  computed:{
    ...mapState(Authentication,['isLogin','username'])
  },
  methods:{
    ...mapActions(Authentication,['logout']),
  },
}
</script>
<template>
  <div class="container mx-auto">
    <div class="navbar">
      <div class="flex-1">
        <RouterLink to="/">
          <p class="btn btn-ghost normal-case font-bold text-2xl">Restaurant</p>
        </RouterLink>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li v-if="isLogin">
            <RouterLink to="/favorites">
              <div class="normal-case">Favorites</div>
            </RouterLink>
          </li>
          <li v-if="!isLogin">
            <RouterLink to="/login">
              <div class="normal-case">Sign In</div>
            </RouterLink>
          </li>
          <li v-if="!isLogin">
            <RouterLink to="/register">
              <div class="normal-case">Sign Up</div>
            </RouterLink>
          </li>
          <li v-if="isLogin">
            <RouterLink to="/">
              <div @click.prevent="logout" class="normal-case">Logout</div>
            </RouterLink>
          </li>
          <li v-if="isLogin">
              <div class="normal-case">Heloo, {{username}}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="border"></div>
  </div>
</template>
