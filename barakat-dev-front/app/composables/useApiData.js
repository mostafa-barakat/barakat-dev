export const useApiData = async (
    key,
    apiCall,
    {
        immediate = true,
        server = true,
        lazy = false,
        defaultValue = [],
        transform = null
    } = {}
) => {

    const normalize = (res) => {
        return res?.data?.data
            ?? res?.data
            ?? res
            ?? defaultValue
    }

    const {
        data,
        pending,
        error,
        refresh
    } = await useAsyncData(
        key,
        async () => {
            try {
                const res = await apiCall()
                const result = normalize(res)
                return transform ? transform(result) : result
            } catch (err) {
                console.error(`❌ API Error [${key}]`, err)
                return defaultValue
            }
        },
        {
            default: () => defaultValue,
            immediate,
            server,
            lazy
        }
    )

    return {
        data,
        pending,
        error,
        refresh
    }
}