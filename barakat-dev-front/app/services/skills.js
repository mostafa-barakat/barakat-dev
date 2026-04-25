import { useApi } from "@/composables/useApi"


export const getSkills = async () => {
    const api = useApi()

    try {
        return await api('/skills')
    } catch (err) {
        throw err.data || err
    }
}


export const createSkill = async (data) => {
    const api = useApi()

    try {
        return await api('/skills', {
            method: 'POST',
            body: data
        })
    } catch (err) {
        throw err.data || err
    }
}

export const updateSkill = async (id, data) => {
    const api = useApi()

    try {
        return await api(`/skills/${id}`, {
            method: 'PUT',
            body: data
        })
    } catch (err) {
        throw err.data || err
    }
}


export const deleteSkill = async (id) => {
    const api = useApi()

    try {
        return await api(`/skills/${id}`, {
            method: 'DELETE'
        })
    } catch (err) {
        throw err.data || err
    }
}