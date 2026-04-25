export const useApi = () => {
    const { $api } = useNuxtApp()

    return async (url, options = {}) => {

        const isFormData = options.body instanceof FormData

        return await $api(url, {
            ...options,

            // 🔥 مهم جدًا: لا نحدد JSON إذا كان FormData
            headers: {
                ...(isFormData ? {} : { "Content-Type": "application/json" }),
                ...options.headers
            },

            // 🔥 لا نحول FormData
            body: isFormData ? options.body : options.body
        })
    }
}