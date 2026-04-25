import { useApi } from "@/composables/useApi"


export const getProjects = async () => {
    const api = useApi()

    try {
        return await api('/project')
    } catch (err) {
        throw err.data || err
    }
}

export const createProject = async (data) => {
    const api = useApi()

    try {
        return await api('/project', {
            method: 'POST',
            body: data
        })
    } catch (err) {
        throw err.data || err
    }
}

export const updateProject = async (id, data) => {
    const api = useApi()

    try {
        return await api(`/project/${id}`, {
            method: 'PUT', // ✅ بدل _method hack
            body: data
        })
    } catch (err) {
        throw err.data || err
    }
}

export const deleteProject = async (id) => {
    const api = useApi()

    try {
        return await api(`/project/${id}`, {
            method: 'DELETE'
        })
    } catch (err) {
        throw err.data || err
    }
} 