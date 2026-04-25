<script setup>
import { useToast } from "vue-toastification"
import { getServices, createService, updateService, deleteService } from "~/services/services"

definePageMeta({
    layout: "admin",
    middleware: ["auth"]
})

useSeoMeta({
    title: "Services Management",
    description: "Manage and control all services in your system",
    robots: "noindex, nofollow"
})

const toast = useToast()

const form = ref({
    icon: "",
    name_en: "",
    name_ar: "",
    desc_en: "",
    desc_ar: ""
})
const isSubmitting = ref(false)

const editMode = ref(false)
const editId = ref(null)

const {
    data: services,
    pending: servicesPending,
    refresh: refreshServices
} = await useApiData("services", getServices)

const { errors, validate } = useValidation()

const schema = {
    icon: ["required"],
    name_en: ["required", "english"],
    name_ar: ["required", "arabic"],
    desc_en: ["required", "english"],
    desc_ar: ["required", "arabic"]
}

watch(form, () => {
    errors.value = {}
}, { deep: true })

const submit = async () => {

    // 1. Validate form
    const isValid = validate(form.value, schema)

    if (!isValid) {
        toast.warning("يرجى تصحيح الأخطاء ❌")
        return
    }

    // 2. Check duplicate (إذا كانت async لازم await)
    if (await isDuplicate()) {
        toast.error("الخدمة موجودة مسبقاً 🚫")
        return
    }

    // 3. Start loading
    isSubmitting.value = true

    try {

        // 4. Update or Create
        if (editMode.value) {

            await updateService(editId.value, form.value)
            toast.success("تم التحديث بنجاح ✨")

        } else {

            await createService(form.value)
            toast.success("تمت الإضافة بنجاح 🚀")

        }

        // 5. Reset + refresh
        resetForm()
        await refresh()

    } catch (e) {

        // 6. Error handling
        const message =
            e?.data?.message ||
            Object.values(e?.data?.errors || {})?.[0]?.[0] ||
            e?.message ||
            "حدث خطأ غير متوقع"

        toast.error(message)

    } finally {
        // 7. Stop loading
        isSubmitting.value = false
    }
}

const isDuplicate = () => {
    if (editMode.value) return false

    return services.value?.some(s =>
        s.name_ar?.trim() === form.value.name_ar.trim() ||
        s.name_en?.trim() === form.value.name_en.trim()
    )
}



const editService = (service) => {
    form.value = { ...service }

    editMode.value = true
    editId.value = service.id

    window.scrollTo({ top: 0, behavior: "smooth" })
}

const removeService = async (id) => {
    if (!confirm("هل أنت متأكد من الحذف؟")) return

    try {
        await deleteService(id)
        toast.success("تم الحذف 🗑️")
        await refresh()
    } catch {
        toast.error("فشل الحذف")
    }
}


const resetForm = () => {
    form.value = {
        icon: "",
        name_en: "",
        name_ar: "",
        desc_en: "",
        desc_ar: ""
    }

    errors.value = {}
    editMode.value = false
    editId.value = null
}
</script>

<template>
    <div class="admin-container">

        <!-- HEADER -->
        <header class="page-header">
            <div>
                <h1 class="page-title">إدارة الخدمات</h1>
                <p class="page-subtitle">تحكم في خدمات موقعك</p>
            </div>

            <div class="stats-badge">
                <span class="num">{{ services?.length || 0 }}</span>
                خدمة
            </div>
        </header>

        <div class="glass-card form-section">

            <h2 class="section-title">
                {{ editMode ? "تعديل خدمة" : "إضافة خدمة" }}
            </h2>
            <form @submit.prevent="submit" class="form-grid services-grid">

                <!-- ROW 1 -->
                <div class="input-group">
                    <label>الأيقونة</label>
                    <input v-model="form.icon" type="text" placeholder="🔥"
                        :class="['custom-input', { 'input-error': errors.icon }]" />
                    <p v-if="errors.icon" class="error-text">{{ errors.icon }}</p>
                </div>

                <div class="input-group">
                    <label>الاسم EN</label>
                    <input v-model="form.name_en" type="text" placeholder="Web Development"
                        :class="['custom-input', { 'input-error': errors.name_en }]" />
                    <p v-if="errors.name_en" class="error-text">{{ errors.name_en }}</p>
                </div>

                <div class="input-group">
                    <label>الاسم AR</label>
                    <input v-model="form.name_ar" type="text" placeholder="تطوير مواقع"
                        :class="['custom-input', { 'input-error': errors.name_ar }]" />
                    <p v-if="errors.name_ar" class="error-text">{{ errors.name_ar }}</p>
                </div>

                <!-- ROW 2 -->
                <div class="input-group full-width">
                    <label>الوصف EN</label>
                    <textarea v-model="form.desc_en" rows="4" placeholder="Service description in English..."
                        :class="['custom-input', { 'input-error': errors.desc_en }]"></textarea>
                    <p v-if="errors.desc_en" class="error-text">{{ errors.desc_en }}</p>
                </div>

                <div class="input-group full-width">
                    <label>الوصف AR</label>
                    <textarea v-model="form.desc_ar" rows="4" placeholder="وصف الخدمة بالعربية..."
                        :class="['custom-input', { 'input-error': errors.desc_ar }]"></textarea>
                    <p v-if="errors.desc_ar" class="error-text">{{ errors.desc_ar }}</p>
                </div>

                <!-- ROW 3 -->
                <div class="form-actions full-width">
                    <button type="submit" class="btn-submit" :disabled="isSubmitting">
                        {{ isSubmitting ? "جاري التنفيذ..." : (editMode ? "تحديث" : "إضافة") }}
                    </button>
                </div>

            </form>

        </div>

        <!-- LIST -->
        <div class="services-grid">
            <div v-for="service in services" :key="service.id" class="service-card">

                <div class="card-header">
                    <span>{{ service.icon }}</span>

                    <div>
                        <button @click="editService(service)">✏️</button>
                        <button @click="removeService(service.id)">🗑️</button>
                    </div>
                </div>

                <h3>{{ service.name_ar }}</h3>
                <p>{{ service.desc_ar }}</p>

            </div>
        </div>

    </div>
</template>

<style scoped>
.admin-container {
    animation: fadeIn 0.5s ease-out;
}

.page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.page-title {
    font-size: 1.8rem;
    font-weight: 800;
    color: #fff;
}

.page-subtitle {
    color: #94a3b8;
    font-size: 0.9rem;
}

.stats-badge {
    background: rgba(6, 182, 212, 0.1);
    border: 1px solid rgba(6, 182, 212, 0.2);
    padding: 10px 20px;
    border-radius: 12px;
    color: #06b6d4;
    font-weight: bold;
}

.form-section {
    padding: 2rem;
    margin-bottom: 3rem;
}

.section-title {
    font-size: 1.1rem;
    font-weight: 700;
    color: #06b6d4;
    margin-bottom: 1.5rem;
}

/* GRID - flexible (important upgrade) */
.form-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
}

/* لما يكون فيه زر */
.form-grid.with-actions {
    grid-template-columns: repeat(2, 1fr) auto;
    align-items: end;
}

.input-group label {
    display: block;
    font-size: 0.85rem;
    color: #64748b;
    margin-bottom: 8px;
}

/* =========================
📌 INPUT STYLE (Unified)
========================= */
.custom-input {
    width: 100%;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 12px 16px;
    border-radius: 10px;
    color: white;
    transition: 0.3s;
}

/* focus effect */
.custom-input:focus {
    outline: none;
    border-color: #06b6d4;
    box-shadow: 0 0 15px rgba(6, 182, 212, 0.2);
}

/* error state (important fix) */
.custom-input.input-error {
    border-color: #ef4444;
}

/* =========================
📌 BUTTONS (Unified)
========================= */
.btn-submit {
    background: #06b6d4;
    color: #000;
    font-weight: 700;
    padding: 12px 25px;
    border-radius: 10px;
    transition: 0.3s;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
}

.btn-submit:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
}

/* optional update button */
.btn-update {
    background: #eab308;
}

/* =========================
📌 ERROR TEXT
========================= */
.error-text {
    color: #ef4444;
    font-size: 0.8rem;
    margin-top: 5px;
}

/* =========================
📌 LOADER
========================= */
.loader {
    width: 18px;
    height: 18px;
    border: 2px solid #000;
    border-top: 2px solid transparent;
    border-radius: 50%;
    animation: spin 0.6s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.btn-cancel {
    background: transparent;
    color: #94a3b8;
    padding: 12px 20px;
    border: none;
    cursor: pointer;
}

/* Services Grid */
.services-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
}

/* Full width rows */
.full-width {
    grid-column: 1 / -1;
}

.service-card {
    padding: 1.5rem;
    transition: 0.3s;
}

.service-card:hover {
    transform: translateY(-5px);
    border-color: rgba(6, 182, 212, 0.4);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

.service-emoji {
    font-size: 2.2rem;
}

.action-btn {
    width: 35px;
    height: 35px;
    border-radius: 8px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
}

.action-btn.edit {
    background: rgba(234, 179, 8, 0.1);
    color: #eab308;
}

.action-btn.delete {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
}

.service-name {
    font-size: 1.1rem;
    font-weight: 700;
    color: #fff;
}

.service-desc {
    color: #94a3b8;
    font-size: 0.9rem;
    line-height: 1.6;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    line-clamp: 3;
    overflow: hidden;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {

    .form-grid-top,
    .form-grid-bottom {
        grid-template-columns: 1fr;
    }
}
</style>