<script setup>
import { useToast } from "vue-toastification"
import { getSkills, createSkill, updateSkill, deleteSkill } from "~/services/skills"

definePageMeta({
    layout: "admin",
    middleware: ["auth"]
})

useSeoMeta({
    title: "Skills Management",
    description: "Manage and control all developer skills",
    robots: "noindex, nofollow"
})

const toast = useToast()

const form = ref({
    name: "",
    icon: ""
})
const isSubmitting = ref(false)

const editMode = ref(false)
const editId = ref(null)

const showAll = ref(false)

const {
    data: skills,
    pending: skillsPending,
    refresh: refreshSkills
} = await useApiData("skills", getSkills)

const visibleSkills = computed(() => {
    const list = skills.value ?? []
    if (!Array.isArray(list)) return []
    return showAll.value
        ? list
        : list.slice(0, 6)
})

const { errors, validate } = useValidation()
const schema = {
    name: ["required"],
    icon: ["required", "url"]
}

watch(form, () => {
    errors.value = {}
}, { deep: true })

const submit = async () => {
    const isValid = validate(form.value, schema) // ✅ مهم جدًا
    if (!isValid) {
        toast.warning("يرجى تصحيح الأخطاء ❌")
        return
    }
    isSubmitting.value = true
    try {
        if (editMode.value) {
            await updateSkill(editId.value, form.value)
            toast.success("تم تحديث المهارة بنجاح ✨")
        } else {
            await createSkill(form.value)
            toast.success("تم إضافة المهارة بنجاح 🚀")
        }
        resetForm()
        await refresh()
    } catch (e) {
        const message =
            e?.data?.message ||
            Object.values(e?.data?.errors || {})?.[0]?.[0] ||
            "حدث خطأ غير متوقع"
        toast.error(message)
    } finally {
        isSubmitting.value = false
    }
}


const editSkill = (skill) => {
    form.value = {
        name: skill.name,
        icon: skill.icon
    }

    editMode.value = true
    editId.value = skill.id

    window.scrollTo({ top: 0, behavior: "smooth" })
}


const removeSkill = async (id) => {
    if (!confirm("هل أنت متأكد من الحذف؟")) return

    try {
        await deleteSkill(id)
        toast.success("تم حذف المهارة 🗑️")

        await refresh()
    } catch (e) {
        toast.error("فشل حذف المهارة")
    }
}

const resetForm = () => {
    form.value = {
        name: "",
        icon: ""
    }

    errors.value = {}
    editMode.value = false
    editId.value = null
}
</script>

<template>
    <div class="admin-container">
        <header class="page-header">
            <div>
                <h1 class="page-title">إدارة المهارات</h1>
                <p class="page-subtitle">إدارة التقنيات المستخدمة في المشروع</p>
            </div>

            <div class="skills-count">
                <span class="num">{{ skills?.length || 0 }}</span>
                مهارة
            </div>
        </header>

        <div class="glass-card form-section">

            <h2 class="section-title">
                {{ editMode ? "تعديل مهارة" : "إضافة مهارة جديدة" }}
            </h2>

            <form @submit.prevent="submit" class="form-grid">

                <!-- Name -->
                <div class="input-group">
                    <label>اسم المهارة</label>

                    <input v-model="form.name" type="text" placeholder="Laravel, Vue..."
                        :class="['custom-input', { 'input-error': errors.name }]" />

                    <p v-if="errors.name" class="error-text">
                        {{ errors.name }}
                    </p>
                </div>

                <!-- Icon -->
                <div class="input-group">
                    <label>رابط الأيقونة</label>

                    <input v-model="form.icon" type="text" placeholder="https://..."
                        :class="['custom-input', { 'input-error': errors.icon }]" />

                    <p v-if="errors.icon" class="error-text">
                        {{ errors.icon }}
                    </p>
                </div>

                <!-- Button -->
                <div class="form-actions">
                    <button type="submit" class="btn-submit" :disabled="isSubmitting">

                        <span v-if="!isSubmitting">
                            {{ editMode ? "تحديث" : "إضافة" }}
                        </span>

                        <span v-else>
                            جاري الحفظ...
                        </span>

                    </button>
                </div>

            </form>

        </div>

        <div v-if="loading" class="loading-state">
            جاري تحميل المهارات...
        </div>

        <div v-else class="skills-grid">

            <div v-for="skill in visibleSkills" :key="skill.id" class="skill-card glass-card">
                <div class="skill-info">
                    <div class="icon-box">
                        <img :src="skill.icon" :alt="skill.name" />
                    </div>

                    <span class="skill-name">
                        {{ skill.name }}
                    </span>
                </div>

                <div class="card-actions">
                    <button @click="editSkill(skill)" class="action-btn edit">
                        ✏️
                    </button>

                    <button @click="removeSkill(skill.id)" class="action-btn delete">
                        🗑️
                    </button>
                </div>
            </div>
        </div>

        <div class="show-more">
            <button @click="showAll = !showAll" class="show-btn">
                {{ showAll ? "إخفاء" : "عرض الكل" }}
            </button>
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
    margin-bottom: 0.5rem;
}

.page-subtitle {
    color: #94a3b8;
    font-size: 0.9rem;
}

.skills-count {
    background: rgba(6, 182, 212, 0.1);
    border: 1px solid rgba(6, 182, 212, 0.2);
    padding: 10px 20px;
    border-radius: 12px;
    color: #06b6d4;
    font-weight: bold;
}

/* Form Styles */
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

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr auto;
    gap: 1.5rem;
    align-items: flex-end;
}

.input-group label {
    display: block;
    font-size: 0.85rem;
    color: #64748b;
    margin-bottom: 8px;
}

.custom-input {
    width: 100%;
    background: rgba(15, 23, 42, 0.6);
    border: 1px solid rgba(255, 255, 255, 0.1);
    padding: 12px 16px;
    border-radius: 10px;
    color: white;
    transition: 0.3s;
}

.custom-input:focus {
    outline: none;
    border-color: #06b6d4;
    box-shadow: 0 0 15px rgba(6, 182, 212, 0.2);
}

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
}

.error-text {
    color: #ef4444;
    font-size: 0.8rem;
    margin-top: 5px;
}

.custom-input.error {
    border-color: #ef4444;
}

.btn-update {
    background: #eab308;
}

.btn-submit:hover {
    transform: translateY(-2px);
    filter: brightness(1.1);
}

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

/* تحسين شكل الزر عند التعطيل */
button:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}

.custom-toast {
    font-family: 'Cairo', sans-serif;
    border-radius: 12px;
}

/* Skills Cards */
.skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
}

.skill-card {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1.2rem;
    transition: 0.3s;
}

.skill-card:hover {
    border-color: rgba(6, 182, 212, 0.3);
    transform: translateY(-5px);
}

.skill-info {
    display: flex;
    align-items: center;
    gap: 15px;
}

.icon-box {
    width: 45px;
    height: 45px;
    background: rgba(255, 255, 255, 0.03);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 8px;
}

.icon-box img {
    width: 100%;
    object-fit: contain;
}

.skill-name {
    font-weight: 600;
    color: #e2e8f0;
}

.card-actions {
    display: flex;
    gap: 8px;
}

.action-btn {
    width: 35px;
    height: 35px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.2s;
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

.action-btn:hover {
    transform: scale(1.1);
}

.show-more {
    display: flex;
    justify-content: center;
    margin-top: 2rem;
}

.show-btn {
    background: rgba(6, 182, 212, 0.1);
    border: 1px solid rgba(6, 182, 212, 0.3);
    color: #06b6d4;
    padding: 10px 20px;
    border-radius: 10px;
    cursor: pointer;
    transition: 0.3s;
    font-weight: 600;
}

.show-btn:hover {
    background: rgba(6, 182, 212, 0.2);
    transform: translateY(-2px);
}

.skill-card {
    transition: all 0.3s ease;
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
    .form-grid {
        grid-template-columns: 1fr;
    }
}
</style>