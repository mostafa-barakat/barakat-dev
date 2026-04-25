<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const isLoaded = ref(false)

onMounted(() => {
    // محاكاة وقت التحميل (مثلاً 2.5 ثانية)
    setTimeout(() => {
        isLoaded.value = true
    }, 2500)
})

</script>

<template>
    <Transition name="fade">
        <div v-if="!isLoaded" class="preloader">
            <div class="loader-content">
                <div class="logo-wrapper" style="width: 100%; display: flex; align-items: center; justify-content: center;">
                    <div class="logo-glow"></div>
                    <div class="logo-area">
                        <img src="../assets/image/logo.png" alt="Barakat Dev" class="logo-img" width="200" />
                    </div>
                </div>

                <p class="slogan">{{ t('preloader.slogan') }}</p>

                <div class="loading-bar">
                    <div class="progress"></div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.preloader {
    position: fixed;
    inset: 0;
    background: #050816;
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.loader-content {
    text-align: center;
}

.logo-wrapper {
    position: relative;
    margin-bottom: 20px;
}

.logo-text {
    font-size: 2.5rem;
    font-weight: 800;
    color: white;
    letter-spacing: -1px;
    animation: pulse-text 2s infinite ease-in-out;
}

.logo-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
    background: var(--secondary);
    filter: blur(40px);
    opacity: 0.2;
    z-index: -1;
}

.slogan {
    color: #64748b;
    font-size: 0.9rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    margin-bottom: 30px;
    animation: fade-in-up 1.5s ease forwards;
}

.loading-bar {
    width: 150px;
    height: 2px;
    background: rgba(255, 255, 255, 0.05);
    margin: 0 auto;
    border-radius: 10px;
    overflow: hidden;
}

.progress {
    width: 0%;
    height: 100%;
    background: var(--gradient-main);
    box-shadow: 0 0 10px var(--secondary);
    animation: load 2.3s ease-in-out forwards;
}

/* Animations */
@keyframes load {
    0% {
        width: 0%;
    }

    50% {
        width: 70%;
    }

    100% {
        width: 100%;
    }
}

@keyframes pulse-text {

    0%,
    100% {
        opacity: 1;
        transform: scale(1);
    }

    50% {
        opacity: 0.7;
        transform: scale(0.98);
    }
}

@keyframes fade-in-up {
    from {
        opacity: 0;
        transform: translateY(10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Transition for the whole preloader */
.fade-leave-active {
    transition: opacity 0.8s ease-out;
}

.fade-leave-to {
    opacity: 0;
}
</style>