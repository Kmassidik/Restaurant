import { defineStore } from 'pinia'
import axios from 'axios'
import Swal from 'sweetalert2'

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})


export const Authentication = defineStore('Authentication', {
  state: () => ({
    // baseUrl: 'http://localhost:3000/pub',
    baseUrl: 'https://api.devkmassidik.my.id/pub',
    isLogin: localStorage.getItem('access_token') ? true : false,
    username: localStorage.getItem('name') ? localStorage.getItem('name') : false
  }),
  actions: {
    async login(value) {
      try {
        let { email, password } = value
        let responses = await axios({
          url: `${this.baseUrl}/login`,
          method: 'POST',
          data: {
            email: email,
            password: password
          }
        })

        console.log(responses, 'Success')
        localStorage.setItem('access_token', responses.data.token)
        localStorage.setItem('name', responses.data.name)
        this.isLogin = true
        this.username = responses.data.name
        this.router.push(`/`)
      } catch (error) {
        console.log(error.response.data, 'ERORR')
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `${error.response.data}`,
          showConfirmButton: false,
          timer: 1500
        })
      }
    },
    async register(value) {
      let { username, email, password, phoneNumber, address } = value
      try {
        let responses = await axios({
          url: `${this.baseUrl}/register`,
          method: 'POST',
          data: {
            username: username,
            email: email,
            password: password,
            phoneNumber: phoneNumber,
            address: address
          }
        })
        this.router.push(`/login`)
        console.log(responses, 'Success')
      } catch (error) {
        console.log(error, 'ERORR')
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `${error.response.data}`,
          showConfirmButton: false,
          timer: 1500
        })
      }
    },
    logout() {
      localStorage.removeItem('access_token')
      localStorage.removeItem('name')
      this.isLogin = false
      this.router.push(`/`)
    },
    async googleLogin(value) {
      try {
        // console.log(value);
        let responses = await axios({
          url: `${this.baseUrl}/google-login`,
          method: 'POST',
          headers: {
            google_token: value
          }
        })
        console.log(responses.data)
        localStorage.setItem('access_token', responses.data.token)
        localStorage.setItem('name', responses.data.name)
        this.isLogin = true
        this.username = responses.data.name
        this.router.push(`/`)
      } catch (error) {
        console.log(error)
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: `${error.response.data}`,
          showConfirmButton: false,
          timer: 1500
        })
      }
    }
  }
})

export const ActionDataCuisine = defineStore('ActionDataCuisine', {
  state: () => ({
    baseUrl: 'https://api.devkmassidik.my.id/pub',
    allDataCuisines: [],
    dataCuisineById: {},
    allDataFavorite: []
  }),
  actions: {
    async fetchAllData(page, search) {
      try {
        let responses = await axios({
          url: `${this.baseUrl}/cuisines`,
          method: 'GET',
          params: {
            page: page ? page : '',
            filter: search ? search : ''
          }
        })

        this.allDataCuisines = responses.data
      } catch (error) {
        console.log(error)
      }
    },
    async fetchDataById(id) {
      console.log('testttts idnya', id)
      try {
        let responses = await axios({
          url: `${this.baseUrl}/cuisines/${id}`,
          method: 'GET',
          params: {
            url: window.location.href
          }
        })
        // console.log(responses);
        this.dataCuisineById = responses.data
      } catch (error) {
        console.log(error)
      }
    },
    async addFavoriteCuisine(id) {
      try {
        let responses = await axios({
          url: `${this.baseUrl}/favorites`,
          method: 'POST',
          data: { id: id },
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        console.log(responses)
        Toast.fire({
          icon: 'success',
          title: 'Successfully add to your favorite!'
        })
      } catch (error) {
        console.log(error)
        Toast.fire({
          icon: 'error',
          title: 'Data is Invalid'
        })
      }
    },
    async fetchFavoriteCuisine() {
      try {
        let responses = await axios({
          url: `${this.baseUrl}/favorites`,
          method: 'GET',
          headers: {
            access_token: localStorage.getItem('access_token')
          }
        })
        this.allDataFavorite = []
        // console.log(responses.data);
        responses.data.forEach((element) => {
          this.allDataFavorite.push(element.Cuisine)
        })
      } catch (error) {
        console.log(error)
      }
    }
  }
})
