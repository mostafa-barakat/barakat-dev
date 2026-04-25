<script setup>
import { register } from "~/services/auth"

definePageMeta({
    layout: false
})

useSeoMeta({
    title: "Create Account | Barakat",
    description: "Join our platform"
})

const form = ref({
    name: "",
    email: "",
    password: "",
    password_confirmation: ""
})

const errors = ref({})
const loading = ref(false)

const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

const validate = () => {
    errors.value = {}

    if (!form.value.name) {
        errors.value.name = "الاسم مطلوب"
    }

    if (!form.value.email) {
        errors.value.email = "البريد الإلكتروني مطلوب"
    } else if (!isEmailValid(form.value.email)) {
        errors.value.email = "صيغة البريد غير صحيحة"
    }

    if (!form.value.password) {
        errors.value.password = "كلمة المرور مطلوبة"
    } else if (form.value.password.length < 6) {
        errors.value.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل"
    }

    if (!form.value.password_confirmation) {
        errors.value.password_confirmation = "تأكيد كلمة المرور مطلوب"
    } else if (form.value.password_confirmation !== form.value.password) {
        errors.value.password_confirmation = "كلمات المرور غير متطابقة"
    }

    return Object.keys(errors.value).length === 0
}

const submit = async () => {
    if (!validate()) return

    loading.value = true

    try {
        await register(form.value)
        await navigateTo("/auth/login")
    } catch (err) {
        errors.value.general = err.message || "حدث خطأ أثناء التسجيل"
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="auth-wrapper">
        <div class="auth-card">

            <h2 class="auth-title">إنشاء حساب جديد</h2>
            <p v-if="errors.general" class="error-msg">
                {{ errors.general }}
            </p>

            <form @submit.prevent="submit" class="auth-form">

                <!-- Name -->
                <div class="input-group">
                    <input v-model="form.name" type="text" placeholder="الاسم الكامل" :class="{ error: errors.name }" />
                    <p v-if="errors.name" class="error-text">{{ errors.name }}</p>
                </div>

                <!-- Email -->
                <div class="input-group">
                    <input v-model="form.email" type="email" placeholder="البريد الإلكتروني"
                        :class="{ error: errors.email }" />
                    <p v-if="errors.email" class="error-text">{{ errors.email }}</p>
                </div>

                <!-- Password -->
                <div class="input-group">
                    <input v-model="form.password" type="password" placeholder="كلمة المرور"
                        :class="{ error: errors.password }" />
                    <p v-if="errors.password" class="error-text">{{ errors.password }}</p>
                </div>

                <!-- Confirm Password -->
                <div class="input-group">
                    <input v-model="form.password_confirmation" type="password" placeholder="تأكيد كلمة المرور"
                        :class="{ error: errors.password_confirmation }" />
                    <p v-if="errors.password_confirmation" class="error-text">
                        {{ errors.password_confirmation }}
                    </p>
                </div>

                <!-- Submit -->
                <button type="submit" :disabled="loading" class="btn">
                    <span v-if="!loading">تسجيل</span>
                    <span v-else>جاري التسجيل...</span>
                </button>

            </form>
            <div class="auth-footer">
                <p> لديك حساب بالفعل؟ <NuxtLink to="/auth/login" class="link-text">تسجيل دخول</NuxtLink>
                </p>
                <NuxtLink to="/" class="back-home">← العودة للموقع الرئيسي</NuxtLink>
            </div>
        </div>
    </div>
</template>

<style scoped>
.auth-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #020617;
    position: relative;
    overflow: hidden;
    font-family: 'Cairo', sans-serif;
    padding: 20px;
}

/* تأثير التوهج */
.bg-glow {
    position: absolute;
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%);
    top: -100px;
    right: -100px;
    z-index: 0;
}

/* الكرت الزجاجي Glassmorphism */
.auth-card {
    width: 100%;
    max-width: 450px;
    padding: 40px;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 24px;
    z-index: 1;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    animation: fadeIn 0.6s ease;
}

.auth-header {
    text-align: center;
    margin-bottom: 25px;
}

.logo-text {
    font-size: 1.8rem;
    font-weight: 800;
    color: white;
    margin-bottom: 10px;
}

.text-secondary {
    color: #06b6d4;
    /* السيان المعتمد لموقعك */
}

.auth-title {
    color: white;
    text-align: center;
    margin-bottom: 20px;
}

.auth-subtitle {
    color: #94a3b8;
    font-size: 0.85rem;
    margin-top: 5px;
}

/* تنسيق الحقول */
.input-group {
    margin-bottom: 15px;
    text-align: right;
}

/* تنسيق الحقول */
.input-group {
    margin-bottom: 15px;
    text-align: right;
}

.input-group label {
    display: block;
    color: #cbd5e1;
    font-size: 0.8rem;
    margin-bottom: 8px;
    margin-right: 5px;
}

.input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
}

.input-wrapper .icon {
    position: absolute;
    right: 15px;
    font-size: 1rem;
    opacity: 0.6;
}

.input-wrapper input {
    width: 100%;
    padding: 12px 45px 12px 15px;
    background: rgba(2, 6, 23, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: white;
    transition: 0.3s;
    font-size: 0.9rem;
}

.input-wrapper input:focus {
    outline: none;
    border-color: #06b6d4;
    box-shadow: 0 0 15px rgba(6, 182, 212, 0.2);
}

.input-error {
    border-color: #ef4444 !important;
}

/* رسائل الخطأ */
.error-msg {
    color: #ef4444;
    font-size: 0.75rem;
    margin-top: 5px;
    margin-right: 5px;
    animation: shake 0.3s;
}

/* زر التسجيل */
.auth-btn {
    width: 100%;
    padding: 14px;
    background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
    border: none;
    border-radius: 12px;
    color: #020617;
    font-weight: 700;
    cursor: pointer;
    transition: 0.3s;
    margin-top: 20px;
}

.auth-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(6, 182, 212, 0.3);
}

.auth-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    filter: grayscale(1);
}

/* التذييل والروابط */
.auth-footer {
    margin-top: 25px;
    text-align: center;
    color: #64748b;
    font-size: 0.9rem;
}

.link-text {
    color: #06b6d4;
    text-decoration: none;
    font-weight: 600;
    transition: 0.3s;
}

.link-text:hover {
    text-decoration: underline;
}

.back-home {
    display: block;
    margin-top: 15px;
    color: #475569;
    text-decoration: none;
    font-size: 0.8rem;
    transition: 0.3s;
}

.back-home:hover {
    color: white;
}

/* تأثيرات */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes shake {

    0%,
    100% {
        transform: translateX(0);
    }

    25% {
        transform: translateX(-4px);
    }

    75% {
        transform: translateX(4px);
    }
}

input {
    width: 100%;
    padding: 12px;
    border: 1px solid #334155;
    border-radius: 8px;
    background: #0f172a;
    color: white;
}

input.error {
    border-color: red;
}

.error-text {
    color: red;
    font-size: 12px;
    margin-top: 5px;
}

.btn {
    width: 100%;
    padding: 12px;
    background: #06b6d4;
    border: none;
    border-radius: 8px;
    color: black;
    font-weight: bold;
    cursor: pointer;
}

.btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
}
</style>