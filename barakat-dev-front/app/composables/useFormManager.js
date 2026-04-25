export const useFormManager = (initialState) => {

    const form = ref({ ...initialState })


    const editMode = ref(false)
    const editId = ref(null)

    const resetForm = () => {
        form.value = { ...initialState }
        errors.value = {}
        editMode.value = false
        editId.value = null
    }

    const setEdit = (data) => {
        form.value = { ...data }
        editMode.value = true
        editId.value = data.id
        errors.value = {}
    }

    return {
        form,
        errors,
        editMode,
        editId,
        resetForm,
        setEdit
    }
}