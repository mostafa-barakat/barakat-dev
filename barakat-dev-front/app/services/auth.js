import { useApi } from "@/composables/useApi"
import { useCookie } from "#app"

export const register = async (data) => {
    const api = useApi()

    try {
        return await api('/register', {
            method: 'POST',
            body: data
        })
    } catch (err) {
        throw err.data || err
    }
}

export const login = async (data) => {
    const api = useApi()
    const token = useCookie('token')

    try {
        const res = await api('/login', {
            method: 'POST',
            body: data
        })
        token.value = res.token
        return res
    } catch (err) {
        throw err.data || err
    }
}

export const logout = async () => {
    const api = useApi()
    const token = useCookie('token')

    try {
        await api('/logout', {
            method: 'POST'
        })
    } catch (err) {
        // حتى لو فشل، نكمل logout
    } finally {
        token.value = null
        await navigateTo('/auth/login')
    }
}

export const forgotPassword = async (data) => {
    const api = useApi()

    try {
        return await api('/forgot-password', {
            method: 'POST',
            body: data
        })
    } catch (err) {
        throw err.data || err
    }
}

export const resetPassword = async (data) => {
    const api = useApi()

    try {
        return await api('/reset-password', {
            method: 'POST',
            body: data
        })
    } catch (err) {
        throw err.data || err
    }
}