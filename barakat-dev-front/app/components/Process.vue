<script setup>
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const { t, locale } = useI18n()

const steps = [
    { icon: "🔍", style: { color: "#6366f1" } }, // الاكتشاف
    { icon: "📐", style: { color: "#06b6d4" } }, // التخطيط
    { icon: "💻", style: { color: "#a855f7" } }, // التطوير
    { icon: "🚀", style: { color: "#10b981" } }  // الإطلاق
]

onMounted(() => {
    gsap.to(".line-progress", {
        scrollTrigger: {
            trigger: ".process-container",
            start: "top 70%",
            end: "bottom 70%",
            scrub: 1,
        },
        [locale.value === 'ar' ? 'right' : 'left']: "0%",
        width: "100%",
        ease: "none"
    });

    gsap.from(".process-item", {
        scrollTrigger: {
            trigger: ".process-container",
            start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out"
    });
})
</script>
<script type="application/ld+json">
{
    "@context"; "https://schema.org",
        "@type"; "HowTo",
            "name"; "Website Development Process",
                "step"; [
                    { "@type": "HowToStep", "name": "Discovery" },
                    { "@type": "HowToStep", "name": "Planning" },
                    { "@type": "HowToStep", "name": "Development" },
                    { "@type": "HowToStep", "name": "Launch" }
                ]
}
</script>

<template>
    <section id="process" class="process-section container" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
        <div class="header-area text-center mb-16 process-header">
            <h2 class="section-title">{{ t('process.title') }}</h2>
            <p class="section-subtitle">{{ t('process.subtitle') }}</p>
        </div>

        <div class="process-container">
            <div class="process-line-bg">
                <div class="line-progress"></div>
            </div>

            <div v-for="(step, i) in steps" :key="i" class="process-item">
                <div class="card-inner glass-card">
                    <span class="step-number-bg">0{{ i + 1 }}</span>

                    <div class="card-header">
                        <span class="step-number">0{{ i + 1 }}</span>
                        <div class="icon-box" :style="{ borderColor: step.style.color, color: step.style.color }">
                            <span class="icon-emoji">{{ step.icon }}</span>
                        </div>
                    </div>

                    <div class="step-content">
                        <h3 class="step-title">{{ t(`process.steps.${i}.title`) }}</h3>
                        <p class="step-desc">{{ t(`process.steps.${i}.desc`) }}</p>
                    </div>

                    <div class="card-glow" :style="{ background: step.style.color }"></div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.process-section {
    padding: 100px 0;
}

.section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    margin-bottom: 1rem;
    background: linear-gradient(to right, #fff, #94a3b8);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.section-subtitle {
    color: #94a3b8;
    font-size: 1.1rem;
    max-width: 500px;
    margin: 0 auto;
}

.process-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    position: relative;
    padding: 40px 0;
}

/* الخط الواصل المطور */
.process-line-bg {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 2px;
    background: rgba(255, 255, 255, 0.05);
    z-index: 0;
    transform: translateY(-50%);
}

.line-progress {
    position: absolute;
    top: 0;
    height: 100%;
    width: 0;
    /* يبدأ من الصفر */
    background: linear-gradient(to right, #6366f1, #10b981);
    box-shadow: 0 0 15px rgba(99, 102, 241, 0.5);
}

/* في حالة العربية يبدأ الخط من اليمين */
[dir="rtl"] .line-progress {
    right: 0;
    left: auto;
    background: linear-gradient(to left, #6366f1, #10b981);
}

.process-item {
    position: relative;
    z-index: 1;
}

.card-inner {
    padding: 3rem 2rem;
    height: 100%;
    border-radius: 28px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1);
}

.step-number-bg {
    position: absolute;
    top: -10px;
    right: 10px;
    font-size: 6rem;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.03);
    z-index: 0;
}

.card-header {
    margin-bottom: 2rem;
    position: relative;
    z-index: 1;
}

.step-number {
    display: block;
    font-size: 1rem;
    font-weight: 800;
    color: #6366f1;
    margin-bottom: 1rem;
    letter-spacing: 2px;
}

.icon-box {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 24px;
    font-size: 2.2rem;
    border: 2px solid;
    background: rgba(255, 255, 255, 0.03);
    transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.step-title {
    font-size: 1.4rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
}

.step-desc {
    color: #94a3b8;
    font-size: 0.95rem;
    line-height: 1.7;
}

.card-glow {
    position: absolute;
    bottom: -40px;
    width: 60%;
    height: 40px;
    filter: blur(30px);
    opacity: 0;
    transition: 0.5s;
}

/* Hover Effects */
.process-item:hover .card-inner {
    transform: translateY(-15px);
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.15);
}

.process-item:hover .icon-box {
    transform: scale(1.1) rotate(8deg);
    background: currentColor;
}

.process-item:hover .icon-emoji {
    filter: brightness(0) invert(1);
    /* جعل الرمز أبيض عند تلون الخلفية */
}

.process-item:hover .card-glow {
    opacity: 0.2;
}

@media (max-width: 992px) {
    .process-line-bg {
        display: none;
    }

    .process-container {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
}
</style>