import { useApi } from "@/composables/useApi"

export const getServices = async () => {
    const api = useApi()

    try {
        return await api('/services')
    } catch (err) {
        throw err.data || err
    }
}

export const createService = async (data) => {
    const api = useApi()

    const res = await api('/services', {
        method: 'POST',
        body: data
    })

    return res
}

export const updateService = async (id, data) => {
    const api = useApi()

    try {
        return await api(`/services/${id}`, {
            method: 'PUT',
            body: data
        })
    } catch (err) {
        throw err.data || err
    }
}

export const deleteService = async (id) => {
    const api = useApi()

    try {
        return await api(`/services/${id}`, {
            method: 'DELETE'
        })
    } catch (err) {
        throw err.data || err
    }
}