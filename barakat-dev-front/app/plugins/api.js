export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig() //output public: {
    // apiBase: "http://127.0.0.1:8000/api",
    //   },
    const api = $fetch.create({
        baseURL: config.public.apiBase, // output http://127.0.0.1:8000/api

        onRequest({ options }) {
            const token = useCookie('token').value
            // console.log(token)
            if (token) {
                options.headers = {
                    ...options.headers,
                    Authorization: `Bearer ${token}`
                }
            }
        },
        // onResponse({ response }) {
        //     console.log(response)
        // },
        onResponseError({ response }) {
            if (response.status === 401) {
                navigateTo('/login')
            }
        }
    })

    return {
        provide: {
            api
        }
    }
})