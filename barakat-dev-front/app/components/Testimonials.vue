<script setup>
import { useI18n } from 'vue-i18n'
import { getTestimonials } from '~/services/testimonials'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const { t, locale } = useI18n()

const colors = ['#06b6d4', '#a855f7', '#10b981', '#f59e0b']
const currentIndex = ref(0)
let interval = null

const { data: testimonials, pending } = await useAsyncData(
    'testimonials',
    async () => {
        const res = await getTestimonials()
        const data = res?.data ?? res ?? []

        return data.map((item, index) => ({
            ...item,
            color: colors[index % colors.length]
        }))
    }
)

const initAnimations = () => {
    if (!process.client) return

    gsap.from('.testimonial-header', {
        scrollTrigger: {
            trigger: '.testimonials-section',
            start: 'top 85%'
        },
        y: 40,
        opacity: 0,
        duration: 0.8
    })

    gsap.from('.testimonial-shell', {
        scrollTrigger: {
            trigger: '.testimonial-shell',
            start: 'top 85%'
        },
        y: 60,
        opacity: 0,
        duration: 1
    })
}


const animateActiveCard = () => {
    if (!process.client) return

    gsap.fromTo(
        '.testimonial-card',
        { y: 20, opacity: 0, scale: 0.97 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5 }
    )
}

const next = () => {
    if (!testimonials.value?.length) return
    currentIndex.value =
        (currentIndex.value + 1) % testimonials.value.length
}

const prev = () => {
    if (!testimonials.value?.length) return
    currentIndex.value =
        (currentIndex.value - 1 + testimonials.value.length) %
        testimonials.value.length
}

onMounted(() => {
    initAnimations()

    interval = setInterval(() => {
        next()
    }, 5000)
})

onUnmounted(() => {
    if (interval) clearInterval(interval)
})
watch(currentIndex, () => {
    animateActiveCard()
})
</script>

<template>
    <section id="testimonials" class="testimonials-section container" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
        <div class="testimonial-header text-center">
            <span class="section-badge">{{ t('testimonials.title') }}</span>
            <h2 class="section-title">{{ t('testimonials.title') }}</h2>
        </div>

        <div class="testimonial-shell" v-if="testimonials.length">
            <button class="nav-btn prev-btn" @click="prev" aria-label="Previous testimonial">‹</button>

            <div class="testimonial-card glass-card" :style="{
                '--accent': testimonials[currentIndex].color
            }">
                <div class="card-top-line"></div>

                <div class="quote-mark">“</div>

                <div class="logo-wrapper" v-if="testimonials[currentIndex].image">
                    <img :src="testimonials[currentIndex].image" :alt="locale === 'ar'
                        ? testimonials[currentIndex].author_ar
                        : testimonials[currentIndex].author_en" />
                </div>

                <p class="quote">
                    {{
                        locale === 'ar'
                            ? testimonials[currentIndex].quote_ar
                            : testimonials[currentIndex].quote_en
                    }}
                </p>

                <h4 class="author">
                    {{
                        locale === 'ar'
                            ? testimonials[currentIndex].author_ar
                            : testimonials[currentIndex].author_en
                    }}
                </h4>

                <div class="glow-circle glow-one"></div>
                <div class="glow-circle glow-two"></div>
            </div>

            <button class="nav-btn next-btn" @click="next" aria-label="Next testimonial">›</button>
        </div>

        <div class="dots" v-if="testimonials.length">
            <span v-for="(item, i) in testimonials" :key="i" :class="{ active: i === currentIndex }"
                :style="{ '--dot-color': item.color }" @click="currentIndex = i"></span>
        </div>
    </section>
</template>

<style scoped>
.testimonials-section {
    padding: 120px 0;
    text-align: center;
    position: relative;
}

.testimonial-header {
    margin-bottom: 2.5rem;
}

.section-badge {
    display: inline-block;
    padding: 0.45rem 1rem;
    border-radius: 999px;
    background: rgba(6, 182, 212, 0.12);
    border: 1px solid rgba(6, 182, 212, 0.2);
    color: #67e8f9;
    font-size: 0.9rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

.section-title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 800;
    color: white;
    line-height: 1.2;
}

.testimonial-shell {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
    margin-top: 2.5rem;
}

.testimonial-card {
    --accent: #06b6d4;
    width: 100%;
    max-width: 760px;
    min-height: 360px;
    padding: 3rem 2.4rem;
    border-radius: 32px;
    position: relative;
    overflow: hidden;
    isolation: isolate;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background:
        radial-gradient(circle at top left, rgba(255, 255, 255, 0.08), transparent 32%),
        linear-gradient(180deg, rgba(15, 23, 42, 0.92), rgba(2, 6, 23, 0.96));
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
}

.card-top-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, transparent, var(--accent), transparent);
}

.quote-mark {
    font-size: 5rem;
    line-height: 1;
    color: var(--accent);
    opacity: 0.18;
    position: absolute;
    top: 18px;
    inset-inline-start: 22px;
    font-family: serif;
}

.logo-wrapper {
    margin: 0 auto 1.5rem;
    border-radius: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
}

.logo-wrapper img {
    width: 68%;
    height: 68%;
    object-fit: contain;
    display: block;
}

.quote {
    max-width: 620px;
    margin: 0 auto 1.4rem;
    font-size: 1.15rem;
    line-height: 2;
    color: #dbe7f3;
    position: relative;
    z-index: 2;
}

.author {
    font-size: 1rem;
    font-weight: 800;
    color: white;
    position: relative;
    z-index: 2;
}

.glow-circle {
    position: absolute;
    border-radius: 50%;
    filter: blur(70px);
    opacity: 0.18;
    z-index: 1;
    background: var(--accent);
}

.glow-one {
    width: 180px;
    height: 180px;
    top: -40px;
    inset-inline-end: -20px;
}

.glow-two {
    width: 150px;
    height: 150px;
    bottom: -30px;
    inset-inline-start: -10px;
}

.nav-btn {
    width: 56px;
    height: 56px;
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.06);
    color: white;
    font-size: 2rem;
    cursor: pointer;
    transition: 0.3s ease;
    backdrop-filter: blur(10px);
    flex-shrink: 0;
}

.nav-btn:hover {
    background: var(--secondary, #06b6d4);
    color: #08111f;
    transform: translateY(-2px);
}

.dots {
    margin-top: 1.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.65rem;
}

.dots span {
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: #475569;
    cursor: pointer;
    transition: 0.3s ease;
}

.dots span.active {
    width: 30px;
    border-radius: 999px;
    background: var(--dot-color);
    box-shadow: 0 0 16px var(--dot-color);
}

@media (max-width: 992px) {
    .testimonial-shell {
        gap: 0.8rem;
    }

    .testimonial-card {
        min-height: 320px;
        padding: 2.4rem 1.4rem;
        border-radius: 24px;
    }

    .quote {
        font-size: 1rem;
        line-height: 1.9;
    }

    .logo-wrapper {
        width: 92px;
        height: 92px;
    }
}

@media (max-width: 768px) {
    .testimonials-section {
        padding: 90px 0;
    }

    .testimonial-shell {
        flex-direction: column;
    }

    .nav-btn {
        width: 48px;
        height: 48px;
        font-size: 1.7rem;
    }

    .testimonial-card {
        min-height: auto;
    }
}
</style>
