<script setup>
import { useToast } from "vue-toastification";
import { getProjects, createProject, updateProject, deleteProject } from "~/services/projects"

definePageMeta({
    layout: "admin",
    middleware: ["auth"]
});

useSeoMeta({
    title: "Projects Management",
    description: "Manage portfolio projects",
    robots: "noindex, nofollow"
})

const toast = useToast();

const form = ref({
    title_en: "",
    title_ar: "",
    category_en: "",
    category_ar: "",
    problem_en: "",
    problem_ar: "",   // ✅ جديد
    solution_en: "",
    solution_ar: "",  // ✅ جديد
    result_en: "",
    result_ar: "",    // ✅ جديد
    link: "",
    tags: "",
    image: ""
})
const isSubmitting = ref(false);

const isEdit = ref(false)
const editingId = ref(null)


const {
    data: projects,
    pending: projectsPending,
    refresh: refreshProjects
} = await useApiData("projects", getProjects)



const { errors, validate } = useValidation()
const schema = {
    title_en: ["required"],
    title_ar: ["required"],
    category_en: ["required"],
    category_ar: ["required"],

    problem_en: ["required"],
    problem_ar: ["required"],

    solution_en: ["required"],
    solution_ar: ["required"],

    result_en: ["required"],
    result_ar: ["required"],
    tags: ["required"],
    link: ["required"],

    image: [
        (value) => {
            if (!isEdit.value && !value) return "الصورة مطلوبة"
            return true
        }
    ]
}

watch(form, () => {
    errors.value = {}
}, { deep: true })


const submit = async () => {
    const isValid = validate(form.value, schema)
    console.log(JSON.parse(JSON.stringify(errors.value)))
    if (!isValid) {
        toast.error("يرجى تصحيح الأخطاء ❌")
        return
    }
    if (!isEdit.value && isDuplicate()) {
        toast.error("هذا العمل موجود بالفعل 🚫")
        return
    }
    isSubmitting.value = true
    try {
        const fd = new FormData()
        for (const key in form.value) {
            const value = form.value[key]
            if (!value) continue
            fd.append(key, value)
        }
        if (isEdit.value) {
            await updateProject(editingId.value, fd)
            toast.success("تم التعديل بنجاح ✏️")
        } else {
            await createProject(fd)
            toast.success("تمت الإضافة بنجاح 🚀")
        }
        resetForm()
        await refreshProjects()
    } catch (err) {
        const message =
            err.message ||
            Object.values(err.errors || {})?.[0]?.[0] ||
            "حدث خطأ غير معروف"
        toast.error(message)
    } finally {
        isSubmitting.value = false
    }
}

const isDuplicate = () => {
    return projects.value?.some(t =>
        t.title_ar.trim() === form.value.title_ar.trim() ||
        t.title_en.trim() === form.value.title_en.trim()

    );
};

const handleFile = (e, type) => {
    form.value[type] = e.target.files[0];
};

const startEdit = (p) => {
    isEdit.value = true
    editingId.value = p.id

    form.value = {
        ...p,
        image: null
    }

    window.scrollTo({ top: 0, behavior: "smooth" })
}

const remove = async (id) => {
    if (!confirm("هل أنت متأكد؟")) return

    try {
        await deleteProject(id)
        toast.success("تم الحذف 🗑️")
        await refreshProjects()
    } catch {
        toast.error("فشل الحذف")
    }
}

const resetForm = () => {
    form.value = {
        title_en: "",
        title_ar: "",
        category_en: "",
        category_ar: "",
        link: "",
        tags: "",
        problem_en: "",
        problem_ar: "",
        solution_en: "",
        solution_ar: "",
        result_en: "",
        result_ar: "",
        image: ""
    }

    isEdit.value = false
    editingId.value = null
    errors.value = {}
}
</script>

<template>
    <div class="admin-container">

        <!-- Header -->
        <header class="page-header">

            <div class="stats-badge">
                <span class="num">{{ projects.length }}</span>
                رأي
            </div>
        </header>
        <!-- Form -->
        <div class="glass-card form-section">
            <h2 class="block-title">
                {{ isEdit ? "Edit Project" : "Add Project" }}
            </h2>
            <form @submit.prevent="submit" class="form-wrapper">
                <!-- title -->
                <div class="form-grid">
                    <div class="input-group">
                        <label>Title EN</label>
                        <input v-model="form.title_en" placeholder="Title Name"
                            :class="['custom-input', { 'input-error': errors.title_en }]" />
                        <small v-if="errors.title_en" class="error-text">
                            {{ errors.title_en }}
                        </small>
                    </div>
                    <div class="input-group">
                        <label>العنوان (AR)</label>
                        <input v-model="form.title_ar" placeholder="اسم الموقع"
                            :class="['custom-input', { 'input-error': errors.title_ar }]" />
                        <small v-if="errors.title_ar" class="error-text">
                            {{ errors.title_ar }}
                        </small>
                    </div>
                </div>
                <!-- category -->
                <div class="form-grid-2 mt-4">
                    <div class="input-group">
                        <label>Category (EN)</label>
                        <input v-model="form.category_en" placeholder="Web, Mobile..."
                            :class="['custom-input', { 'input-error': errors.category_en }]" />
                        <small v-if="errors.category_en" class="error-text">
                            {{ errors.category_en }}
                        </small>
                    </div>
                    <div class="input-group">
                        <label>Category (AR)</label>
                        <input v-model="form.category_ar" placeholder="مواقع, .تطبيقات.."
                            :class="['custom-input', { 'input-error': errors.category_ar }]" />
                        <small v-if="errors.category_ar" class="error-text">
                            {{ errors.category_ar }}
                        </small>
                    </div>
                </div>

                <!-- problem -->
                <div class="form-grid-2 mt-4">
                    <div class="input-group">
                        <label>Problem (EN)</label>
                        <input v-model="form.problem_en" placeholder="Problem ...."
                            :class="['custom-input', { 'input-error': errors.problem_en }]" />
                        <small v-if="errors.problem_en" class="error-text">
                            {{ errors.problem_en }}
                        </small>
                    </div>
                    <div class="input-group">
                        <label>Problem (AR)</label>
                        <input v-model="form.problem_ar" placeholder="المشكلة ..."
                            :class="['custom-input', { 'input-error': errors.problem_ar }]" />
                        <small v-if="errors.problem_ar" class="error-text">
                            {{ errors.problem_ar }}
                        </small>
                    </div>
                </div>
                <!-- solution_en -->
                <div class="form-grid-2 mt-4">
                    <div class="input-group">
                        <label>Solution (EN)</label>
                        <input v-model="form.solution_en" placeholder="Solution..."
                            :class="['custom-input', { 'input-error': errors.solution_en }]" />
                        <small v-if="errors.solution_en" class="error-text">
                            {{ errors.solution_en }}
                        </small>
                    </div>
                    <div class="input-group">
                        <label>Solution (AR)</label>
                        <input v-model="form.solution_ar" placeholder="الحل ..."
                            :class="['custom-input', { 'input-error': errors.solution_ar }]" />
                        <small v-if="errors.solution_ar" class="error-text">
                            {{ errors.solution_ar }}
                        </small>
                    </div>
                </div>
                <!-- result_en -->
                <div class="form-grid-2 mt-4">
                    <div class="input-group">
                        <label>Result (EN)</label>
                        <input v-model="form.result_en" placeholder="Result..."
                            :class="['custom-input', { 'input-error': errors.result_en }]" />
                        <small v-if="errors.result_en" class="error-text">
                            {{ errors.result_en }}
                        </small>
                    </div>
                    <div class="input-group">
                        <label>Result (AR)</label>
                        <input v-model="form.result_ar" placeholder="النتيجة..."
                            :class="['custom-input', { 'input-error': errors.result_ar }]" />
                        <small v-if="errors.result_ar" class="error-text">
                            {{ errors.result_ar }}
                        </small>
                    </div>
                </div>
                <!-- Tag $ Linek -->
                <div class="form-grid-2 mt-4">
                    <div class="input-group">
                        <label>Tags</label>
                        <input v-model="form.tags" placeholder="web,system , mobile"
                            :class="['custom-input', { 'input-error': errors.tags }]" />
                        <small v-if="errors.tags" class="error-text">
                            {{ errors.tags }}
                        </small>
                    </div>
                    <div class="input-group">
                        <label>Link</label>
                        <input v-model="form.link" placeholder="https://exampel.com"
                            :class="['custom-input', { 'input-error': errors.link }]" />
                        <small v-if="errors.link" class="error-text">
                            {{ errors.link }}
                        </small>
                    </div>
                </div>
                <!-- Image -->
                <div class="form-grid mt-4">
                    <div class="input-group">
                        <label>شعار الشركة (اختياري)</label>

                        <div class="file-upload" @click="$refs.imageInput.click()">
                            <input type="file" ref="imageInput" @change="handleFile($event, 'image')" accept="image/*"
                                hidden />

                            <div class="upload-content">
                                <i class="fas fa-cloud-upload-alt upload-icon"></i>
                                <p>اضغط لرفع شعار</p>
                                <span v-if="form.image">{{ form.image.name }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- Submit -->
                <div class="form-actions mt-6">
                    <button type="submit" class="btn-submit" :disabled="isSubmitting">

                        <template v-if="!isSubmitting">
                            <i class="fas" :class="isEdit ? 'fa-edit' : 'fa-save'"></i>
                            <span>
                                {{ isEdit ? 'تحديث العمل' : 'حفظ العمل' }}
                            </span>
                        </template>

                        <template v-else>
                            <span class="loader"></span>
                            <span>جاري الحفظ...</span>
                        </template>

                    </button>
                </div>
            </form>
        </div>
        <!-- Projects List -->
        <div class="Projects-grid" v-if="projects?.length">

            <div v-for="p in projects" :key="p.id" class="glass-card Project-card">

                <!-- Header -->
                <div class="card-header">

                    <div>
                        <h3 class="client-name">{{ p.title_en }}</h3>
                        <span class="client-lang">{{ p.category_en }}</span>
                    </div>

                    <div>
                        <button class="action-btn edit" @click="startEdit(p)">
                            <i class="fas fa-edit"></i>
                        </button>

                        <button class="action-btn delete" @click="remove(p.id)">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>

                </div>

                <!-- Image -->
                <div v-if="p.image" class="project-image">
                    <img :src="p.image" alt="project" />
                </div>

                <!-- Content -->
                <p class="quote-text">
                    {{ p.problem_en }}
                </p>

                <p class="quote-text">
                    <strong>Solution:</strong> {{ p.solution_en }}
                </p>

                <p class="quote-text">
                    <strong>Result:</strong> {{ p.result_en }}
                </p>

                <!-- Footer -->
                <div class="card-footer">

                    <div class="tags">
                        <span v-for="tag in p.tags?.split(',')" :key="tag">
                            #{{ tag.trim() }}
                        </span>
                    </div>

                    <a :href="p.link" target="_blank" class="visit-link">
                        Visit Project →
                    </a>

                </div>

            </div>

        </div>

        <div v-else class="empty-state">
            لا يوجد أعمال حالياً 🚀
        </div>
    </div>
</template>

<style scoped>
.file-upload {
    border: 2px dashed rgba(255, 255, 255, 0.2);
    border-radius: 12px;
    padding: 25px;
    text-align: center;
    cursor: pointer;
    transition: 0.3s;
    background: rgba(15, 23, 42, 0.4);
}

.file-upload:hover {
    border-color: #06b6d4;
    background: rgba(6, 182, 212, 0.05);
}

.upload-icon {
    font-size: 28px;
    color: #06b6d4;
    margin-bottom: 10px;
}

.upload-content p {
    color: #94a3b8;
    font-size: 0.9rem;
}

.upload-content span {
    display: block;
    margin-top: 8px;
    color: #22c55e;
    font-size: 0.8rem;
}

.error-text {
    color: #ef4444;
    font-size: 0.75rem;
    margin-top: 5px;
    display: block;
}

.input-error {
    border-color: #ef4444 !important;
    box-shadow: 0 0 10px rgba(239, 68, 68, 0.2);
}

.action-btn.edit {
    background: rgba(59, 130, 246, 0.1);
    color: #3b82f6;
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    cursor: pointer;
    margin-right: 5px;
}

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

/* Form Styles */
.form-section {
    padding: 2rem;
    margin-bottom: 3rem;
}

.form-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
}

.form-grid-2 {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
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
    border-color: #06b6d4;
    outline: none;
    box-shadow: 0 0 15px rgba(6, 182, 212, 0.2);
}

.file-input {
    padding: 8px;
    font-size: 0.8rem;
}

.btn-submit {
    background: #06b6d4;
    color: #000;
    font-weight: 700;
    padding: 12px 25px;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 10px;
    border: none;
}

.btn-submit:disabled {
    opacity: 0.6;
    cursor: not-allowed;
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

/* Projects Grid */
.Projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
}

.Project-card {
    padding: 1.5rem;
    transition: 0.3s;
}

.Project-card:hover {
    transform: translateY(-5px);
    border-color: rgba(6, 182, 212, 0.4);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 1rem;
}

.client-info {
    display: flex;
    gap: 12px;
    align-items: center;
}

.client-img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #06b6d4;
}

.client-img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.client-name {
    font-size: 1rem;
    color: #fff;
    font-weight: 700;
    margin-bottom: 2px;
}

.client-lang {
    font-size: 0.75rem;
    color: #64748b;
}

.action-btn.delete {
    background: rgba(239, 68, 68, 0.1);
    color: #ef4444;
    border: none;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    cursor: pointer;
}

.quote-text {
    color: #94a3b8;
    font-size: 0.9rem;
    line-height: 1.6;
    font-style: italic;
    margin-top: 10px;
}

.card-footer {
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.company-image {
    height: 25px;
    opacity: 0.6;
    filter: grayscale(1);
    transition: 0.3s;
}

.Project-card:hover .company-image {
    opacity: 1;
    filter: grayscale(0);
}

.project-image {
    margin: 10px 0;
    border-radius: 10px;
    overflow: hidden;
}

.project-image img {
    width: 100%;
    height: 180px;
    object-fit: cover;
}

.tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 10px;
}

.tags span {
    background: rgba(6, 182, 212, 0.1);
    color: #06b6d4;
    padding: 4px 8px;
    border-radius: 6px;
    font-size: 0.7rem;
}

.visit-link {
    color: #22c55e;
    font-size: 0.8rem;
    text-decoration: none;
    font-weight: bold;
}

.visit-link:hover {
    text-decoration: underline;
}

.empty-state {
    text-align: center;
    color: #94a3b8;
    margin-top: 2rem;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
    }
}

@media (max-width: 768px) {

    .form-grid,
    .form-grid-2 {
        grid-template-columns: 1fr;
    }
}
</style>
