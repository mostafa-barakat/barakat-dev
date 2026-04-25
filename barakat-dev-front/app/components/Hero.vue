<script setup>
import { useI18n } from 'vue-i18n'
import { getSkills } from '~/services/skills'
import gsap from 'gsap'

const { t } = useI18n()

const isReady = ref(false)
let animated = false

const { data: skills, pending, error } = await useAsyncData(
    "skills",
    async () => {
        const res = await getSkills()
        return res.data || []
    }
)

/* =========================
📌 Hero Animation
========================= */
onMounted(() => {
    gsap.timeline()
        .from(".hero-title", {
            x: -50,
            opacity: 0,
            duration: 1,
            ease: "power4.out"
        })
        .from(".hero-subtitle", {
            y: 20,
            opacity: 0,
            duration: 0.8
        }, "-=0.6")
        .from(".hero-cta .btn", {
            scale: 0.8,
            duration: 0.5,
            stagger: 0.2,
            ease: "back.out(1.7)"
        }, "-=0.4")
        .from(".skills-cluster", {
            opacity: 0,
            scale: 0.9,
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.5")
})


watch(skills, async (newSkills) => {
    if (!newSkills?.length || animated) return

    await nextTick()
    animated = true

    gsap.from(".bubble", {
        opacity: 0,
        scale: 0,
        y: 30,
        duration: 0.6,
        stagger: {
            amount: 0.8,
            from: "random"
        },
        ease: "back.out(1.6)",
        onComplete: () => {
            document.querySelectorAll(".bubble")
                .forEach(el => el.classList.add("floating"))
        }
    })
})

/* =========================
📌 Hover Effects
========================= */
const onBubbleEnter = (el) => {
    gsap.to(el, {
        scale: 1.15,
        duration: 0.25,
        ease: "power2.out"
    })
}

const onBubbleLeave = (el) => {
    gsap.to(el, {
        scale: 1,
        duration: 0.25,
        ease: "power2.inOut"
    })
}
</script>
<script type="application/ld+json">
{
    "@context";"https://schema.org",
        "@type"; "Person",
            "name"; "Mostafa Barakat",
                "jobTitle"; "Full Stack Developer",
                    "url"; "https://yourdomain.com",
                        "sameAs"; [
                            "https://linkedin.com",
                            "https://github.com"
                        ]
}
</script>
<template>
    <section id="hero-section" class="hero-section" role="region" :aria-label="t('hero.title')">

        <div class="container hero-container">

            <!-- TEXT -->
            <div class="hero-content">
                <h1 class="hero-title">
                    {{ t('hero.title') }}
                </h1>

                <p class="hero-subtitle">
                    {{ t('hero.text') }}
                </p>

                <div class="hero-cta">
                    <a href="https://api.whatsapp.com/send?phone=972594870100&text=Hello%20I%20want%20a%20website"
                        target="_blank" aria-label="Contact me on WhatsApp to build your website" class="btn btn-primary">
                        {{ t('hero.btn1') }}
                    </a>

                    <a href="#portfolio" aria-label="View my portfolio projects" class="btn btn-outline">
                        {{ t('hero.btn2') }}
                    </a>
                </div>
            </div>

            <!-- SKILLS -->
            <div class="hero-image-wrapper">
                <div class="blob-bg"></div>

                <div class="skills-cluster">

                    <div v-for="(skill, index) in skills" :key="skill.id || index" class="bubble"
                        :class="['small', 'medium', 'large'][index % 3]" :data-name="skill.name"
                        @mouseenter="onBubbleEnter($event.currentTarget)"
                        @mouseleave="onBubbleLeave($event.currentTarget)">
                        <div class="bubble-content glass-card">
                            <img :src="skill.icon" alt="'Laravel development skill'" class="skill-icon" loading="lazy"
                                decoding="async" />
                        </div>
                    </div>

                </div>
            </div>

        </div>

        <!-- FEATURES -->
        <div class="container mt-12" style="padding-top: 40px;">

            <div class="features-bar glass-card">

                <div class="feature-item">
                    <span class="feature-icon">💻</span>
                    <div class="feature-info">
                        <p class="feature-label">
                            <span class="feature-num">25+</span>
                            {{ t('hero.feature1') }}
                        </p>
                    </div>
                </div>

                <div class="feature-divider"></div>

                <div class="feature-item">
                    <span class="feature-icon">🚀</span>
                    <p class="feature-label">{{ t('hero.feature2') }}</p>
                </div>

                <div class="feature-divider"></div>

                <div class="feature-item">
                    <span class="feature-icon">🛡️</span>
                    <p class="feature-label">{{ t('hero.feature3') }}</p>
                </div>

                <div class="feature-divider"></div>

                <div class="feature-item">
                    <span class="feature-icon">⚙️</span>
                    <p class="feature-label">{{ t('hero.feature4') }}</p>
                </div>

            </div>

        </div>

    </section>
</template>

<style scoped>
/* نفس CSS عندك بدون تغيير */
.hero-section {
    padding: 160px 0 80px 0;
    position: relative;
    overflow: hidden;
    background-color: #0f172a;
    background-image: linear-gradient(rgba(15, 23, 42, 0.85), rgba(5, 5, 5, 0.9)),
        url('../assets/image/HeroImage.png');
    background-size: cover;
    background-position: center;
}

@media (max-width: 768px) {
    .hero-section {
        background-attachment: scroll;
    }
}

.hero-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 4rem;
}

.hero-content {
    flex: 1.2;
    z-index: 10;
}

.hero-title {
    font-size: clamp(2.5rem, 5vw, 3.8rem);
    font-weight: 800;
    line-height: 1.1;
    margin-bottom: 1.5rem;
    background: linear-gradient(to right, #ffffff, #94a3b8);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.hero-subtitle {
    font-size: 1.2rem;
    color: #cbd5e1;
    margin-bottom: 2.5rem;
    line-height: 1.6;
}

.hero-cta {
    display: flex;
}

.btn {
    padding: 0.9rem 2.2rem;
    border-radius: 50px;
    font-weight: 700;
    text-decoration: none;
    transition: 0.3s;
    display: inline-flex;
    align-items: center;
}

.btn-primary {
    background: linear-gradient(135deg, #4f46e5, #06b6d4);
    color: white;
    box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3);
}

.btn-outline {
    border: 1px solid rgba(255, 255, 255, 0.2);
    color: white;
    backdrop-filter: blur(5px);
}

.btn-outline:hover {
    color: #0F172A;
}

.hero-image-wrapper {
    flex: 1;
    display: flex;
    justify-content: center;
}

.skills-cluster {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    max-width: 500px;
}

.bubble {
    position: relative;
}

.small {
    width: 60px;
    height: 60px;
}

.medium {
    width: 85px;
    height: 85px;
}

.large {
    width: 110px;
    height: 110px;
}

.bubble-content {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.skill-icon {
    width: 50%;
}

.bubble.floating {
    animation: float 6s ease-in-out infinite;
}

/* --- Features Bar Mordenized --- */
.features-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 1.2rem;
    flex-wrap: wrap;
    gap: 1.5rem;
    border-radius: 20px;
}

.feature-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    transition: 0.3s;
}

.feature-icon {
    font-size: 1.6rem;
    filter: drop-shadow(0 0 10px rgba(6, 182, 212, 0.5));
}

.feature-info {
    display: flex;
    flex-direction: column;
}

.feature-num {
    font-weight: 800;
    font-size: 1.2rem;
    color: #06b6d4;
    /* الثانوية */
}

.feature-label {
    font-size: 0.95rem;
    font-weight: 500;
    color: #cbd5e1;
}

.feature-divider {
    width: 1px;
    height: 40px;
    background: rgba(255, 255, 255, 0.1);
}

.feature-item:hover {
    transform: translateY(-5px);
}

@keyframes float {

    0%,
    100% {
        transform: translateY(0);
    }

    50% {
        transform: translateY(-15px);
    }
}
</style>