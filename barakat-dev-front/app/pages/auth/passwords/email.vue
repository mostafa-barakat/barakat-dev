<script setup>
import { forgotPassword } from "~/services/auth"

definePageMeta({
    layout: false
})

useSeoMeta({
    title: "Forgot Password",
    description: "Reset your account password"
})


const form = ref({
    email: ""
})

const errors = ref({})
const message = ref("")
const statusType = ref("")
const loading = ref(false)

const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}


const validate = () => {
    errors.value = {}

    if (!form.value.email) {
        errors.value.email = "البريد الإلكتروني مطلوب"
    } else if (!isEmailValid(form.value.email)) {
        errors.value.email = "صيغة البريد الإلكتروني غير صحيحة"
    }

    return Object.keys(errors.value).length === 0
}

const submit = async () => {
    message.value = ""
    statusType.value = ""

    if (!validate()) return
    loading.value = true

    try {
        await forgotPassword(form.value)
        message.value = "📩 تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك"
        statusType.value = "success"

    } catch (e) {
        message.value =
            e?.data?.message ||
            "حدث خطأ أثناء إرسال الرابط"
        statusType.value = "error"
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="auth-wrapper">
        <div class="bg-glow"></div>

        <div class="auth-card">

            <!-- Header -->
            <div class="auth-header">
                <h2 class="auth-title">استعادة كلمة المرور</h2>
                <p class="auth-subtitle">
                    أدخل بريدك الإلكتروني وسنرسل لك رابط إعادة تعيين كلمة المرور
                </p>
            </div>

            <form @submit.prevent="submit">

                <!-- Email -->
                <div class="input-group">
                    <label>البريد الإلكتروني</label>

                    <div class="input-wrapper">
                        <span class="icon">📧</span>

                        <input v-model="form.email" type="email" placeholder="example@email.com"
                            :class="{ error: errors.email }" />
                    </div>

                    <p v-if="errors.email" class="error-text">
                        {{ errors.email }}
                    </p>
                </div>

                <!-- Button -->
                <button class="auth-btn" :disabled="loading">
                    <span v-if="!loading">إرسال الرابط</span>
                    <span v-else class="loader"></span>
                </button>

                <!-- Message -->
                <p v-if="message" :class="['status-msg', statusType]">
                    {{ message }}
                </p>

            </form>

            <!-- Footer -->
            <div class="auth-footer">
                <NuxtLink to="/auth/login" class="back-link">
                    العودة لتسجيل الدخول
                </NuxtLink>
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

.bg-glow {
    position: absolute;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%);
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 0;
}

.auth-card {
    width: 100%;
    max-width: 420px;
    padding: 40px;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(15px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 24px;
    z-index: 1;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    text-align: center;
}

.auth-header {
    margin-bottom: 30px;
}

.logo-text {
    font-size: 1.8rem;
    font-weight: 800;
    color: white;
    margin-bottom: 15px;
}

.auth-title {
    color: white;
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 10px;
}

.auth-subtitle {
    color: #94a3b8;
    font-size: 0.9rem;
    line-height: 1.5;
}

.input-group {
    margin-bottom: 25px;
    text-align: right;
}

.input-group label {
    display: block;
    color: #cbd5e1;
    font-size: 0.85rem;
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
    opacity: 0.6;
}

.input-wrapper input {
    width: 100%;
    padding: 14px 45px 14px 15px;
    background: rgba(2, 6, 23, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: white;
    transition: 0.3s;
}

.input-wrapper input:focus {
    outline: none;
    border-color: #06b6d4;
    box-shadow: 0 0 15px rgba(6, 182, 212, 0.2);
}

.auth-btn {
    width: 100%;
    padding: 15px;
    background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
    border: none;
    border-radius: 12px;
    color: #000;
    font-weight: 700;
    cursor: pointer;
    transition: 0.3s;
}

.auth-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(6, 182, 212, 0.3);
}

.status-msg {
    margin-top: 20px;
    padding: 12px;
    border-radius: 10px;
    font-size: 0.85rem;
}

.status-msg.success {
    background: rgba(34, 197, 94, 0.1);
    color: #4ade80;
    border: 1px solid rgba(34, 197, 94, 0.2);
}

.status-msg.error {
    background: rgba(239, 68, 68, 0.1);
    color: #f87171;
    border: 1px solid rgba(239, 68, 68, 0.2);
}

.auth-footer {
    margin-top: 25px;
}

.back-link {
    color: #64748b;
    text-decoration: none;
    font-size: 0.9rem;
    transition: 0.3s;
}

.back-link:hover {
    color: white;
}

.loader {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-top: 2px solid #000;
    border-radius: 50%;
    display: inline-block;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    100% {
        transform: rotate(360deg);
    }
}
</style>