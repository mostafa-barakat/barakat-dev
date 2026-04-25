export const useValidation = () => {

    const errors = ref({})

    const rules = {
        required: (value) => !!value || "الحقل مطلوب",

        required_en: (value) =>
            !!value || "This field is required",

        url: (value) =>
            !value || /^https?:\/\/.+/.test(value) || "رابط غير صحيح",

        arabic: (value) =>
            !value || /^[\u0600-\u06FF\s.,،!?؟"'-]+$/.test(value)
            || "يجب إدخال نص عربي صحيح",

        english: (value) =>
            !value || /^[A-Za-z\s.,!?'"-]+$/.test(value)
            || "Only valid English text allowed",

        imageRequired: (value, form, editMode) =>
            (value || editMode) || "الصورة مطلوبة"
    }

    const validate = (form, schema, extra = {}) => {
        errors.value = {}

        for (const field in schema) {
            const fieldRules = schema[field]

            for (const rule of fieldRules) {
                let result

                if (typeof rule === "function") {
                    result = rule(form[field], form, extra)
                } else {
                    result = rules[rule](form[field], form, extra?.editMode)
                }

                if (result !== true) {
                    errors.value[field] = result
                    break
                }
            }
        }

        return Object.keys(errors.value).length === 0
    }

    return {
        errors,
        validate,
        rules
    }
}