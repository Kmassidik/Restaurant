<script>
import { mapActions } from 'pinia'
import { Authentication } from '../stores/store'
import BtnSuccess from '../components/ButtonSuccess.vue';
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
      phoneNumber: '',
      address: ''
    }
  },
  methods: {
    ...mapActions(Authentication, ['register']),
    submitRegister() {
      this.register({
        username: this.username,
        email: this.email,
        password: this.password,
        phoneNumber: this.phoneNumber,
        address: this.address
      })
    }
  },
  components:{
    BtnSuccess
  }
}
</script>
<template lang="">
  <div>
    <form @submit.prevent="submitRegister()" data-theme="autumn">
      <div class="hero min-h-screen">
        <div class="card flex-shrink-0 w-full max-w-md shadow-2xl bg-base-100">
          <div class="card-body">
            <p class="text-5xl font-bold mb-5 text-neutral">Register</p>
            <div class="border-b-2 border-neutral-200 border-b-neutral-200"></div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="Username"
                class="input input-bordered"
                v-model="username"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="Email"
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
                placeholder="Password"
                class="input input-bordered"
                v-model="password"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">Phone Number</span>
              </label>
              <input
                type="number"
                placeholder="Phone Number"
                class="input input-bordered"
                v-model="phoneNumber"
              />
            </div>
            <div class="form-control">
              <label class="label">
                <span class="label-text">address</span>
              </label>
              <input
                type="text"
                placeholder="Address"
                class="input input-bordered"
                v-model="address"
              />
            </div>
            <div class="form-control mt-6">
              <BtnSuccess title="Register" />
            </div>
            <div class="form-control mt-6">
              <p class="text-neutral">
                already have account?
                <button class="font-bold text-accent" @click.prevent="redirect('login')">
                  Log in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<style lang=""></style>
