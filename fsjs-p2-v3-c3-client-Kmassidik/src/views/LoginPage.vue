<script>
import { mapActions } from 'pinia'
import { Authentication } from '../stores/store'
import BtnSuccess from '../components/ButtonSuccess.vue'
export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    ...mapActions(Authentication, ['login','googleLogin']),
    submitLogin() {
      this.login({ email: this.email, password: this.password })
    },
    callback(responses){
      // console.log(responses.credential);
      this.googleLogin(responses.credential)
    }
  },
  components: {
    BtnSuccess
  }
}
</script>
<template lang="">
  <div data-theme="autumn">
    <div class="hero min-h-screen">
      <div class="card flex-shrink-0 w-full max-w-md shadow-2xl">
        <form @submit.prevent="submitLogin()" methods="post" id="login">
          <div class="card-body">
            <p class="text-5xl font-bold mb-5 text-neutral">Log in</p>
            <div class="border-b-2"></div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                class="input input-bordered"
                v-model="email"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                class="input input-bordered"
                v-model="password"
              />
              <label class="label">
                <p class="label-text-alt link link-hover">Forgot password?</p>
              </label>
            </div>
            <div class="form-control mt-6">
              <BtnSuccess title="Login" />
              <div class="mt-5 text-center">
                <GoogleLogin :callback="callback" />
              </div>
            </div>
            <div class="form-control mt-2">
              <p>
                Don't have an account?
                <button class="font-bold text-accent" @click.prevent="redirect('register')">
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </form>
        <!-- google login -->
      </div>
    </div>
  </div>
</template>
