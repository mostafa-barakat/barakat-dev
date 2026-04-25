<script setup>
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const { t, locale } = useI18n()

onMounted(() => {
    gsap.from(".cta-card", {
        scrollTrigger: {
            trigger: "#contact",
            start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1.2,
        ease: "expo.out"
    });

    gsap.to(".bg-glow", {
        scale: 1.2,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
    });
})
</script>

<template>
    <section id="contact" class="contact-talk container" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
        <div class="cta-card glass-card">
            <div class="bg-glow"></div>
            <div class="grid-pattern"></div>

            <div class="content">
                <div class="availability-badge">
                    <span class="dot-wrapper">
                        <span class="dot"></span>
                        <span class="dot-pulse"></span>
                    </span>
                    {{ t('contactSection.availability') }}
                </div>

                <h2 class="title">{{ t('contactSection.title') }}</h2>
                <p class="description">{{ t('contactSection.subtitle') }}</p>

                <a href="https://api.whatsapp.com/send/?phone=%2B972594312645&text=Hello%20Mostafa,%20I%20would%20like%20to%20discuss%20a%20new%20project."
                    target="_blank" rel="noopener noreferrer" class="btn-whatsapp-premium">
                    <span class="btn-content">
                        <svg class="whatsapp-icon" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.634 1.437h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                        </svg>
                        <span>{{ t('contactSection.btn') }}</span>
                    </span>
                    <div class="btn-shine"></div>
                </a>
            </div>
        </div>
    </section>
</template>

<style scoped>
.contact-talk {
    padding: 100px 0;
}

.cta-card {
    position: relative;
    padding: 6rem 2rem;
    border-radius: 3.5rem;
    text-align: center;
    overflow: hidden;
    background: linear-gradient(135deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.8) 100%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(20px);
}

/* طبقة المربعات التقنية للخلفية */
.grid-pattern {
    position: absolute;
    inset: 0;
    background-image: radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px);
    background-size: 30px 30px;
    opacity: 0.5;
    z-index: 0;
}

.bg-glow {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 80%;
    background: radial-gradient(circle, rgba(34, 211, 238, 0.15) 0%, transparent 70%);
    filter: blur(60px);
    z-index: 0;
}

.content {
    position: relative;
    z-index: 2;
}

/* Badge Styling */
.availability-badge {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    background: rgba(16, 185, 129, 0.1);
    color: #10b981;
    padding: 8px 20px;
    border-radius: 50px;
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 2.5rem;
    border: 1px solid rgba(16, 185, 129, 0.2);
}

.dot-wrapper {
    position: relative;
    width: 10px;
    height: 10px;
}

.dot {
    display: block;
    width: 10px;
    height: 10px;
    background: #10b981;
    border-radius: 50%;
}

.dot-pulse {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #10b981;
    border-radius: 50%;
    animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes ping {

    75%,
    100% {
        transform: scale(3);
        opacity: 0;
    }
}

.title {
    font-size: clamp(2.2rem, 6vw, 4rem);
    font-weight: 900;
    margin-bottom: 1.5rem;
    color: #fff;
    line-height: 1.1;
    letter-spacing: -1px;
}

.description {
    font-size: 1.25rem;
    color: #94a3b8;
    max-width: 650px;
    margin: 0 auto 3.5rem;
    line-height: 1.7;
}

/* Premium WhatsApp Button */
.btn-whatsapp-premium {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #25D366;
    color: #fff;
    padding: 1.3rem 3rem;
    border-radius: 20px;
    font-size: 1.2rem;
    font-weight: 800;
    text-decoration: none;
    overflow: hidden;
    transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
    box-shadow: 0 15px 35px rgba(37, 211, 102, 0.25);
}

.btn-content {
    display: flex;
    align-items: center;
    gap: 15px;
    z-index: 2;
}

.whatsapp-icon {
    width: 28px;
    height: 28px;
}

.btn-shine {
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(120deg,
            transparent,
            rgba(255, 255, 255, 0.3),
            transparent);
    transition: 0.6s;
}

.btn-whatsapp-premium:hover {
    transform: translateY(-8px) scale(1.03);
    box-shadow: 0 20px 45px rgba(37, 211, 102, 0.4);
}

.btn-whatsapp-premium:hover .btn-shine {
    left: 100%;
}

@media (max-width: 768px) {
    .cta-card {
        padding: 4rem 1.5rem;
        border-radius: 2.5rem;
    }

    .title {
        font-size: 2.5rem;
    }
}
</style>