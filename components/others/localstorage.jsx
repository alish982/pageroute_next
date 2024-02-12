// import React from 'react'

// export const access_token = localStorage.getItem("token_ho_yo")


import axios from 'axios'

export const instanceOfAxios = axios.create({
    baseURL : "https://nitvcrmapi.truestreamz.com/api/v1/",
})

instanceOfAxios.interceptors.request.use((config) => {
    const access_token = localStorage.getItem("token_ho_yo");

    if (access_token) {
        if (config.headers) config.headers.Authorization = `Bearer ` + access_token
      }
      return config;
    }
  )

