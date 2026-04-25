<script setup>
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { getProjects } from '~/services/projects'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import { Navigation, Pagination, Autoplay } from 'swiper/modules'
const modules = [Navigation, Pagination, Autoplay]

const swiperOptions = {
    loop: true,              // 🔥 يرجع من البداية
    speed: 800,              // حركة ناعمة
    autoplay: {
        delay: 3500,
        disableOnInteraction: false, // ما يوقف بعد الضغط
        pauseOnMouseEnter: true      // يوقف عند hover
    },
    navigation: {
        nextEl: '.custom-next',
        prevEl: '.custom-prev',
    },
    pagination: {
        el: '.custom-pagination',
        clickable: true
    },
    breakpoints: {
        768: { slidesPerView: 2 },
        1200: { slidesPerView: 3 }
    }
}
gsap.registerPlugin(ScrollTrigger)

const { t, locale } = useI18n()
const portfolioRef = ref(null)
const { data: projects } = await useAsyncData("projects", async () => {
    const res = await getProjects()

    const data = res?.data?.data ?? res?.data ?? res ?? []

    return data.map(project => ({
        ...project,
        tags: project.tags ? project.tags.split(',') : []
    }))
})
watch(projects, async () => {
    if (!projects.value?.length) return

    await nextTick()
    initAnimations()
})

// 🎬 GSAP Animations
const initAnimations = () => {

    if (!portfolioRef.value) return

    gsap.from(".portfolio-header", {
        scrollTrigger: {
            trigger: "#portfolio",
            start: "top 85%",
        },
        y: 40,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    })

    gsap.from(".project-card", {
        scrollTrigger: {
            trigger: ".portfolio-grid",
            start: "top 80%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "expo.out"
    })
}
</script>

<script type="application/ld+json">
{
    "@context"; "https://schema.org",
        "@type"; "ItemList",
            "itemListElement";[
                {
                    "@type": "CreativeWork",
                    "name": "E-commerce Website",
                    "description": "Laravel Vue project"
                }
            ]
}
</script>

<template>
    <section ref="portfolioRef" id="portfolio" class="portfolio-section container"
        :dir="locale === 'ar' ? 'rtl' : 'ltr'">

        <div class="header-area text-center mb-16 portfolio-header">
            <h2 class="section-title">{{ t('portfolio.title') }}</h2>
            <p class="section-subtitle">{{ t('portfolio.subtitle') }}</p>
        </div>

        <div class="portfolio-wrapper">

            <!-- 🔥 Swiper -->
            <Swiper :modules="modules" :slides-per-view="1" :space-between="30" :navigation="true"
                :pagination="{ clickable: true }" :autoplay="{ delay: 4000 }" :breakpoints="{
                    768: { slidesPerView: 2 },
                    1200: { slidesPerView: 3 }
                }" class="portfolio-slider">

                <SwiperSlide v-for="project in projects" :key="project.id">

                    <div class="project-card">
                        <div class="card-inner glass-card">

                            <div class="image-wrapper">
                                <img :src="project.image" :alt="project.title_en" loading="lazy" decoding="async"
                                    class="project-img" />
                                <div class="image-overlay"></div>
                            </div>

                            <div class="project-info">
                                <span class="category-tag">
                                    {{ locale === 'ar' ? project.category_ar : project.category_en }}
                                </span>

                                <h3 class="project-title">
                                    {{ locale === 'ar' ? project.title_ar : project.title_en }}
                                </h3>

                                <div class="case-study-details">

                                    <div class="detail-item">
                                        <span>⚠️</span>
                                        <p>{{ locale === 'ar' ? project.problem_ar : project.problem_en }}</p>
                                    </div>

                                    <div class="detail-item">
                                        <span>💡</span>
                                        <p>{{ locale === 'ar' ? project.solution_ar : project.solution_en }}</p>
                                    </div>

                                    <div class="detail-item result-item">
                                        <span>✅</span>
                                        <p>{{ locale === 'ar' ? project.result_ar : project.result_en }}</p>
                                    </div>
                                    <a v-if="project.link" :href="project.link" target="_blank"
                                        rel="noopener noreferrer" class="visit-btn">
                                        {{ locale === 'ar' ? 'زيارة المشروع' : 'View Project' }}
                                        <span>↗</span>
                                    </a>
                                </div>

                            </div>

                        </div>
                    </div>

                </SwiperSlide>

            </Swiper>

            <!-- 🔥 أزرار التحكم -->
            <div class="slider-controls">

                <button class="custom-prev">
                    ‹
                </button>

                <div class="custom-pagination"></div>

                <button class="custom-next">
                    ›
                </button>

            </div>

        </div>

    </section>
</template>

<style scoped>
.visit-btn {
    margin-top: 1.5rem;
    display: inline-flex;
    align-items: center;
    gap: 10px;
    padding: 0.7rem 1.4rem;
    border-radius: 12px;
    background: rgba(6, 182, 212, 0.12);
    border: 1px solid rgba(6, 182, 212, 0.3);
    color: #06b6d4;
    font-weight: 600;
    text-decoration: none;
    transition: all 0.3s ease;
}

.visit-btn:hover {
    background: #06b6d4;
    color: #000;
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(6, 182, 212, 0.3);
}

.portfolio-section {
    padding: 100px 0;
}

.section-title {
    font-size: clamp(2.2rem, 5vw, 3rem);
    font-weight: 800;
    background: linear-gradient(to right, #fff, #64748b);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    margin-bottom: 1rem;
}

.portfolio-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2.5rem;
}

.project-card {
    height: 580px;
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    cursor: pointer;
}

.portfolio-slider {
    padding-bottom: 50px;
}

.swiper-button-next,
.swiper-button-prev {
    color: #06b6d4;
}

.swiper-pagination-bullet {
    background: #64748b;
}

.swiper-pagination-bullet-active {
    background: #06b6d4;
}

.slider-controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 25px;
}

/* زرار */
.custom-prev,
.custom-next {
    width: 45px;
    height: 45px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.15);
    background: rgba(15, 23, 42, 0.7);
    color: #06b6d4;
    font-size: 20px;
    cursor: pointer;
    transition: 0.3s ease;
    backdrop-filter: blur(10px);
}

/* hover */
.custom-prev:hover,
.custom-next:hover {
    background: #06b6d4;
    color: #000;
    transform: scale(1.1);
    box-shadow: 0 0 15px rgba(6, 182, 212, 0.4);
}

/* pagination */
.custom-pagination {
    display: flex;
    gap: 6px;
}

.custom-pagination .swiper-pagination-bullet {
    width: 8px;
    height: 8px;
    background: #475569;
    opacity: 1;
    transition: 0.3s;
}

.custom-pagination .swiper-pagination-bullet-active {
    background: #06b6d4;
    transform: scale(1.3);
}

.card-inner {
    height: 100%;
    width: 100%;
    position: relative;
    border: 1px solid rgba(255, 255, 255, 0.08);
}

.image-wrapper {
    position: absolute;
    inset: 0;
    z-index: 0;
}

.project-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.8s scale;
}

.image-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to bottom, rgba(15, 23, 42, 0.2), rgba(15, 23, 42, 0.95));
    transition: background 0.5s ease;
}

.project-info {
    position: relative;
    z-index: 2;
    padding: 2rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    transform: translateY(180px);
    /* المسافة التي سيصعدها الكرت عند الحوم */
    transition: transform 0.6s cubic-bezier(0.23, 1, 0.32, 1);
}

.category-tag {
    color: var(--secondary, #06b6d4);
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 0.5rem;
}

.project-title {
    font-size: 1.8rem;
    font-weight: 800;
    color: #fff;
    margin-bottom: 1.5rem;
}

.case-study-details {
    opacity: 0;
    transition: opacity 0.4s ease;
    margin-bottom: 2rem;
}

.detail-item {
    margin-bottom: 1rem;
}

.detail-label {
    display: block;
    font-size: 0.75rem;
    font-weight: 700;
    color: #94a3b8;
    margin-bottom: 0.2rem;
}

.detail-text {
    font-size: 0.92rem;
    color: #cbd5e1;
    line-height: 1.6;
}

.result-item {
    background: rgba(16, 185, 129, 0.1);
    padding: 10px;
    border-radius: 12px;
    border-inline-start: 3px solid #10b981;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 1.2rem;
}

.tag {
    font-size: 0.75rem;
    background: rgba(255, 255, 255, 0.05);
    padding: 4px 10px;
    border-radius: 6px;
    margin-inline-end: 5px;
    color: #94a3b8;
}

.view-link {
    color: #fff;
    text-decoration: none;
    font-weight: 600;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.arrow.rotate-180 {
    transform: rotate(180deg);
}

/* Hover States */
.project-card:hover .project-info {
    transform: translateY(0);
}

.project-card:hover .case-study-details {
    opacity: 1;
}

.project-card:hover .project-img {
    transform: scale(1.1);
}

.project-card:hover .image-overlay {
    background: linear-gradient(to bottom, rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 1));
}

@media (max-width: 768px) {
    .project-info {
        transform: translateY(0);
    }

    .case-study-details {
        opacity: 1;
    }

    .project-card {
        height: auto;
        min-height: 550px;
    }
}
</style>