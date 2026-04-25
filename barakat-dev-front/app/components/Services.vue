<script setup>
import { useI18n } from 'vue-i18n'
import { getServices } from '~/services/services'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const { locale, t } = useI18n()

const colors = [
    '#6366f1',
    '#06b6d4',
    '#a855f7',
    '#10b981',
    '#f59e0b',
    '#ec4899'
]

const { data: services } = await useAsyncData(
    "services",
    async () => {
        const res = await getServices()

        const colors = [
            '#6366f1',
            '#06b6d4',
            '#a855f7',
            '#10b981',
            '#f59e0b',
            '#ec4899'
        ]

        return (res.data || []).map((item, index) => ({
            ...item,
            color: colors[index % colors.length]
        }))
    }
)

onMounted(async () => {
    await nextTick()

    if (!services.value?.length) return

    initAnimations()

    // مهم جداً في Nuxt / dynamic content
    ScrollTrigger.refresh()
})
const initAnimations = () => {

    if (!document.querySelector("#services")) return;

    gsap.from(".services-header", {
        scrollTrigger: {
            trigger: "#services",
            start: "top 85%",
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out"
    });

    gsap.from(".service-card", {
        scrollTrigger: {
            trigger: ".services-grid",
            start: "top 90%",
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power1.out",
        clearProps: "all"
    });
}


// 🧠 Hover animation
const onCardEnter = (el, color) => {
    const icon = el.querySelector('.service-icon')
    gsap.to(icon, {
        scale: 1.2,
        rotate: 10,
        duration: 0.4,
        ease: "back.out(2)",
        textShadow: `0 0 15px ${color}`
    })
}

const onCardLeave = (el) => {
    const icon = el.querySelector('.service-icon')
    gsap.to(icon, {
        scale: 1,
        rotate: 0,
        duration: 0.4,
        textShadow: "none"
    })
}
</script>

<script type="application/ld+json">
{
    "@context"; "https://schema.org",
        "@type"; "ItemList",
            "itemListElement";[
                {
                    "@type": "Service",
                    "name": "Web Development",
                    "description": "Building modern websites"
                }
            ]
}
</script>
<template>
    <section id="services" class="services-section container">

        <div class="text-center mb-16 services-header">
            <h2 class="section-title">{{ t('services.title') }}</h2>
            <p class="section-subtitle">{{ t('services.subtitle') }}</p>
        </div>

        <div class="services-grid">

            <div v-for="service in services" :key="service.id" class="service-card glass-card"
                @mouseenter="onCardEnter($event.currentTarget, service.color)"
                @mouseleave="onCardLeave($event.currentTarget)">

                <!-- 🔥 icon من DB -->
                <div class="icon-wrapper" :style="{ backgroundColor: service.color + '15', color: service.color }">

                    <span class="service-icon">
                        {{ service.icon }}
                    </span>
                </div>

                <!-- 🔥 name حسب اللغة -->
                <h3 class="service-name">
                    {{ locale === 'ar' ? service.name_ar : service.name_en }}
                </h3>

                <!-- 🔥 description حسب اللغة -->
                <p class="service-desc">
                    {{ locale === 'ar' ? service.desc_ar : service.desc_en }}
                </p>

                <div class="card-footer">
                    <div class="glow-line" :style="{ background: service.color }"></div>
                </div>

            </div>

        </div>
    </section>
</template>

<style scoped>
.services-section {
    padding: 100px 0;
}

.section-title {
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 800;
    margin-bottom: 1rem;
    background: linear-gradient(to right, #fff, #94a3b8);

    background-clip: text;
    /* standard */
    -webkit-background-clip: text;
    /* for Chrome & Safari */

    -webkit-text-fill-color: transparent;
}

.section-subtitle {
    color: #94a3b8;
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
}

.service-card {
    padding: 3rem 2rem;
    text-align: center;
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid var(--glass-border);
    position: relative;
}

.icon-wrapper {
    width: 80px;
    height: 80px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    transition: 0.4s;
}

.service-name {
    font-size: 1.4rem;
    font-weight: 700;
    color: #fff;
    margin-bottom: 1rem;
}

.service-desc {
    color: #94a3b8;
    font-size: 0.95rem;
    line-height: 1.6;
}

.card-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3px;
    overflow: hidden;
    border-radius: 0 0 1rem 1rem;
}

.glow-line {
    width: 0%;
    height: 100%;
    margin: 0 auto;
    transition: 0.4s ease;
    box-shadow: 0 0 15px currentColor;
}

/* Hover Effects */
.service-card:hover {
    transform: translateY(-12px);
    border-color: rgba(255, 255, 255, 0.2);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
}

.service-card:hover .glow-line {
    width: 100%;
}

.service-card:hover .icon-wrapper {
    transform: scale(1.1) rotate(5deg);
}

@media (max-width: 640px) {
    .services-grid {
        grid-template-columns: 1fr;
    }
}
</style>