<script setup>
import { ref } from "vue"
import { login } from "~/services/auth"

definePageMeta({
    layout: false
})

useSeoMeta({
    title: "Login",
    description: "Sign in to your account"
})

const form = ref({
    email: "",
    password: ""
})

const errors = ref({})
const loading = ref(false)

const validate = () => {
    errors.value = {}

    if (!form.value.email) {
        errors.value.email = "البريد الإلكتروني مطلوب"
    }

    if (!form.value.password) {
        errors.value.password = "كلمة المرور مطلوبة"
    }

    return Object.keys(errors.value).length === 0
}

const submit = async () => {
    if (!validate()) return

    loading.value = true

    try {
        const res = await login(form.value)

        const token = useCookie("token")
        token.value = res.token || res.access_token

        await navigateTo("/admin/master")

    } catch (err) {
        errors.value.general = err.message || "بيانات الدخول غير صحيحة"
    } finally {
        loading.value = false
    }
}
</script>

<template>
    <div class="login-wrapper">
        <div class="bg-glow"></div>

        <div class="login-card">

            <!-- Header -->
            <div class="login-header">
                <h2 class="logo-text">تسجيل الدخول</h2>
                <p class="login-subtitle">أدخل بياناتك للمتابعة</p>
            </div>

            <!-- General Error -->
            <p v-if="errors.general" class="error-msg">
                {{ errors.general }}
            </p>

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

                <!-- Password -->
                <div class="input-group">
                    <label>كلمة المرور</label>

                    <div class="input-wrapper">
                        <span class="icon">🔒</span>

                        <input v-model="form.password" type="password" placeholder="********"
                            :class="{ error: errors.password }" />
                    </div>

                    <p v-if="errors.password" class="error-text">
                        {{ errors.password }}
                    </p>
                </div>

                <!-- Button -->
                <button class="login-btn" :disabled="loading">
                    <span v-if="!loading">دخول</span>
                    <span v-else class="loader"></span>
                </button>

            </form>

            <!-- Footer -->
            <div class="auth-footer">
                <p>
                    <NuxtLink to="/auth/regester" class="link-text">انشاء حساب جديد</NuxtLink>
                </p>
                <NuxtLink to="/" class="back-home">← العودة للموقع الرئيسي</NuxtLink>
            </div>
            <NuxtLink to="/auth/passwords/email" > نسيت كلمة المرور</NuxtLink>
        </div>


    </div>
</template>

<style scoped>
.login-wrapper {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #020617;
    /* لون الخلفية الأساسي للموقع */
    position: relative;
    overflow: hidden;
    font-family: 'Cairo', sans-serif;
}

/* تأثير التوهج في الخلفية */
.bg-glow {
    position: absolute;
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%);
    top: -100px;
    right: -100px;
    z-index: 0;
}

.login-card {
    width: 100%;
    max-width: 420px;
    padding: 40px;
    background: rgba(15, 23, 42, 0.6);
    backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 24px;
    z-index: 1;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

.login-header {
    text-align: center;
    margin-bottom: 40px;
}

.logo-text {
    font-size: 2rem;
    font-weight: 800;
    color: white;
    margin-bottom: 10px;
}

.login-subtitle {
    color: #94a3b8;
    font-size: 0.9rem;
    letter-spacing: 1px;
}

.input-group {
    margin-bottom: 25px;
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
    font-size: 1rem;
    opacity: 0.6;
}

.input-wrapper input {
    width: 100%;
    padding: 14px 45px 14px 15px;
    background: rgba(2, 6, 23, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 12px;
    color: white;
    font-size: 1rem;
    transition: 0.3s;
}

.input-wrapper input:focus {
    outline: none;
    border-color: var(--secondary);
    /* اللون السياني */
    box-shadow: 0 0 15px rgba(6, 182, 212, 0.2);
}

.login-btn {
    width: 100%;
    padding: 15px;
    background: var(--gradient-main);
    /* التدرج المستخدم في الموقع */
    border: none;
    border-radius: 12px;
    color: #000;
    font-weight: 700;
    cursor: pointer;
    transition: 0.3s;
    margin-top: 10px;
}

.login-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(6, 182, 212, 0.3);
}

.login-btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
}

.error-msg {
    color: #ef4444;
    background: rgba(239, 68, 68, 0.1);
    padding: 10px;
    border-radius: 8px;
    font-size: 0.85rem;
    text-align: center;
    margin-top: 20px;
}

.login-footer {
    margin-top: 30px;
    text-align: center;
}

.back-home {
    color: #64748b;
    text-decoration: none;
    font-size: 0.85rem;
    transition: 0.3s;
}

.back-home:hover {
    color: white;
}

/* Loader Animation */
.loader {
    width: 20px;
    height: 20px;
    border: 3px solid rgba(0, 0, 0, 0.1);
    border-top: 3px solid #000;
    border-radius: 50%;
    display: inline-block;
    animation: spin 1s linear infinite;
}

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
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>