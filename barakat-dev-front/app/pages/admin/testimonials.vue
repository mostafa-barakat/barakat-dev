<script setup>
import { useToast } from "vue-toastification";
import { getTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from "~/services/testimonials";

definePageMeta({
    layout: "admin",
    middleware: ["auth"]
});

useSeoMeta({
    title: "Testimonials Management",
    description: "Manage portfolio Testimonials",
    robots: "noindex, nofollow"
})

const toast = useToast();

const form = ref({
    quote_ar: "",
    quote_en: "",
    author_ar: "",
    author_en: "",
    image: null,
});
const isSubmitting = ref(false);

const isEdit = ref(false)
const editingId = ref(null)


const {
    data: testimonials,
    pending: testimonialsPending,
    refresh: refreshTestimonials
} = await useApiData("testimonials", getTestimonials)

const list = computed(() => testimonials.value ?? [])

const { errors, validate } = useValidation()
const schema = {
    author_ar: ["required", "arabic"],
    author_en: ["required", "english"],
    quote_ar: ["required", "arabic"],
    quote_en: ["required", "english"]
}

watch(form, () => {
    errors.value = {}
}, { deep: true })

const submit = async () => {
    const isValid = validate(form.value, schema) 
    if (!isValid) {
        toast.error("يرجى تصحيح الأخطاء ❌")
        return
    }
    if (!isEdit.value && isDuplicate()) {
        toast.error("هذا العميل موجود بالفعل 🚫")
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
            await updateTestimonial(editingId.value, fd)
            toast.success("تم التعديل بنجاح ✏️")
        } else {
            await createTestimonial(fd)
            toast.success("تمت الإضافة بنجاح 🚀")
        }
        resetForm()
        await refresh()
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
    return testimonials.value?.some(t =>
        t.author_ar.trim() === form.value.author_ar.trim() ||
        t.author_en.trim() === form.value.author_en.trim()
    );
};

const handleFile = (e, type) => {
    form.value[type] = e.target.files[0];
};

const edit = (item) => {
    isEdit.value = true
    editingId.value = item.id

    form.value = {
        quote_ar: item.quote_ar || "",
        quote_en: item.quote_en || "",
        author_ar: item.author_ar || "",
        author_en: item.author_en || "",
        image: null, // لا نعبئ الملف
    }

    errors.value = {}
}

const remove = async (id) => {
    if (confirm('هل أنت متأكد من حذف هذا الرأي؟')) {
        try {
            await deleteTestimonial(id);
            toast.success("تم حذف الرأي بنجاح 🗑️");

            await refresh(); // ✅ بدل load

        } catch (e) {
            toast.error("فشل الحذف ❌");
        }
    }
};

const resetForm = () => {
    form.value = {
        quote_ar: "",
        quote_en: "",
        author_ar: "",
        author_en: "",
        image: null,
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
            <div>
                <h1 class="page-title">آراء العملاء</h1>
                <p class="page-subtitle">إدارة الشهادات والآراء التي تزيد من موثوقية موقعك</p>
            </div>

            <div class="stats-badge">
                <span class="num">{{ testimonials.length }}</span>
                رأي
            </div>
        </header>

        <!-- Form -->
        <div class="glass-card form-section">
            <h2 class="section-title">إضافة رأي جديد</h2>

            <form @submit.prevent="submit" class="form-wrapper">

                <!-- Names -->
                <div class="form-grid">
                    <div class="input-group">
                        <label>اسم العميل (EN)</label>
                        <input v-model="form.author_en" placeholder="Author Name"
                            :class="['custom-input', { 'input-error': errors.author_en }]" />
                        <small v-if="errors.author_en" class="error-text">
                            {{ errors.author_en }}
                        </small>
                    </div>

                    <div class="input-group">
                        <label>اسم العميل (AR)</label>
                        <input v-model="form.author_ar" placeholder="اسم الناشر"
                            :class="['custom-input', { 'input-error': errors.author_ar }]" />
                        <small v-if="errors.author_ar" class="error-text">
                            {{ errors.author_ar }}
                        </small>
                    </div>
                </div>

                <!-- Quotes -->
                <div class="form-grid-2 mt-4">
                    <div class="input-group">
                        <label>الرأي (EN)</label>
                        <textarea v-model="form.quote_en" rows="3" placeholder="Client quote..."
                            :class="['custom-input', { 'input-error': errors.quote_en }]"></textarea>

                        <small v-if="errors.quote_en" class="error-text">
                            {{ errors.quote_en }}
                        </small>
                    </div>

                    <div class="input-group">
                        <label>الرأي (AR)</label>
                        <textarea v-model="form.quote_ar" rows="3" dir="rtl" placeholder="نص رأي العميل..."
                            :class="['custom-input text-right', { 'input-error': errors.quote_ar }]"></textarea>

                        <small v-if="errors.quote_ar" class="error-text">
                            {{ errors.quote_ar }}
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
                                {{ isEdit ? 'تحديث الرأي' : 'حفظ رأي العميل' }}
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

        <!-- Testimonials -->
        <div class="testimonials-grid">
            <div v-for="t in testimonials || []" :key="t.id" class="testimonial-card glass-card">
                <div class="card-header">
                    <div class="client-info">
                        <div class="client-img">
                            <img :src="t.image || '/default-avatar.png'" />
                        </div>

                        <div>
                            <h3 class="client-name">{{ t.author_ar }}</h3>
                            <span class="client-lang">{{ t.author_en }}</span>
                        </div>
                    </div>

                    <div class="actions">
                        <button @click="edit(t)" class="action-btn edit" title="تعديل">
                            <i class="fas fa-pen"></i>
                        </button>

                        <button @click="remove(t.id)" class="action-btn delete" title="حذف">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>

                <div class="card-body">
                    <p class="quote-text">"{{ t.quote_ar }}"</p>
                </div>

                <div v-if="t.image" class="card-footer">
                    <img :src="t.image" class="company-image" />
                </div>
            </div>
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

/* Testimonials Grid */
.testimonials-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 1.5rem;
}

.testimonial-card {
    padding: 1.5rem;
    transition: 0.3s;
}

.testimonial-card:hover {
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

.testimonial-card:hover .company-image {
    opacity: 1;
    filter: grayscale(0);
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