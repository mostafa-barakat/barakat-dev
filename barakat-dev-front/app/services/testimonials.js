import { useApi } from "@/composables/useApi"

// GET
export const getTestimonials = () => {
    const api = useApi()
    return api('/testimonials')
}

// CREATE
export const createTestimonial = (data) => {
    const api = useApi()

    return api('/testimonials', {
        method: 'POST',
        body: data
    })
}
// UPDATE
export const updateTestimonial = (id, data) => {
    const api = useApi()

    return api(`/testimonials/${id}`, {
        method: 'POST', // أو PUT حسب Laravel
        body: data
    })
}

// DELETE
export const deleteTestimonial = (id) => {
    const api = useApi()

    return api(`/testimonials/${id}`, {
        method: 'DELETE'
    })
}