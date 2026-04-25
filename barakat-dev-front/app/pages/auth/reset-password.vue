<script setup>
import { resetPassword } from "~/services/auth";


definePageMeta({
    layout: false
});


const email = ref("");
const password = ref("");
const password_confirmation = ref("");
const message = ref("");
const statusType = ref("");
const isLoading = ref(false);

const token = route.query.token;

const submit = async () => {
    if (!email.value || !password.value) return;
    isLoading.value = true;
    message.value = "";

    try {
        await resetPassword({
            email: email.value,
            password: password.value,
            password_confirmation: password_confirmation.value,
            token
        });

        message.value = "تم تحديث كلمة المرور بنجاح ✅";
        statusType.value = "success";

        // تحويل المستخدم لصفحة تسجيل الدخول بعد 2 ثانية
        setTimeout(() => {
            router.push("/auth/login");
        }, 2000);
    } catch (e) {
        message.value = "حدث خطأ أثناء التحديث، يرجى المحاولة لاحقاً";
        statusType.value = "error";
    } finally {
        isLoading.value = false;
    }
};
</script>

<template>
    <div class="auth-wrapper">
        <div class="bg-glow"></div>

        <div class="auth-card">
            <div class="auth-header">
                <div class="logo-text">
                    Barakat<span class="text-secondary">.Dev</span>
                </div>
                <h2 class="auth-title">تعيين كلمة المرور</h2>
                <p class="auth-subtitle">قم بإدخال كلمة المرور الجديدة الخاصة بك</p>
            </div>

            <form @submit.prevent="submit" class="auth-form">
                <div class="input-group">
                    <label>البريد الإلكتروني</label>
                    <div class="input-wrapper">
                        <span class="icon">📧</span>
                        <input v-model="email" type="email" placeholder="admin@barakat.dev" required />
                    </div>
                </div>

                <div class="input-group">
                    <label>كلمة المرور الجديدة</label>
                    <div class="input-wrapper">
                        <span class="icon">🔒</span>
                        <input v-model="password" type="password" placeholder="••••••••" required />
                    </div>
                </div>

                <div class="input-group">
                    <label>تأكيد كلمة المرور</label>
                    <div class="input-wrapper">
                        <span class="icon">✅</span>
                        <input v-model="password_confirmation" type="password" placeholder="••••••••" required />
                    </div>
                </div>

                <button type="submit" class="auth-btn" :disabled="isLoading">
                    <span v-if="!isLoading">تحديث كلمة المرور</span>
                    <span v-else class="loader"></span>
                </button>

                <Transition name="fade">
                    <p v-if="message" :class="['status-msg', statusType]">
                        {{ message }}
                    </p>
                </Transition>
            </form>
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
    width: 600px;
    height: 600px;
    background: radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%);
    top: -100px;
    left: -100px;
    z-index: 0;
}

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
}

.auth-header {
    text-align: center;
    margin-bottom: 30px;
}

.logo-text {
    font-size: 1.8rem;
    font-weight: 800;
    color: white;
    margin-bottom: 10px;
}

.auth-title {
    color: white;
    font-size: 1.3rem;
    margin-bottom: 8px;
}

.auth-subtitle {
    color: #94a3b8;
    font-size: 0.85rem;
}

.input-group {
    margin-bottom: 20px;
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
    padding: 12px 45px 12px 15px;
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
    padding: 14px;
    background: linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%);
    border: none;
    border-radius: 12px;
    color: #000;
    font-weight: 700;
    cursor: pointer;
    transition: 0.3s;
    margin-top: 10px;
}

.auth-btn:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(6, 182, 212, 0.3);
}

.status-msg {
    margin-top: 20px;
    padding: 10px;
    border-radius: 8px;
    font-size: 0.85rem;
    text-align: center;
}

.status-msg.success {
    background: rgba(34, 197, 94, 0.1);
    color: #4ade80;
}

.status-msg.error {
    background: rgba(239, 68, 68, 0.1);
    color: #f87171;
}

.loader {
    width: 18px;
    height: 18px;
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