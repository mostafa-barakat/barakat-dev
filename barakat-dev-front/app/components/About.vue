<script setup>
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const { t, locale } = useI18n()

onMounted(() => {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".about-card",
            start: "top 80%",
        }
    });

    tl.from(".about-image-area", {
        scale: 0.8,
        opacity: 0,
        duration: 1,
        ease: "back.out(1.7)"
    })
        .from(".about-text-content > *", {
            x: locale.value === 'ar' ? 50 : -50,
            opacity: 0,
            duration: 0.6,
            stagger: 0.2,
            ease: "power2.out"
        }, "-=0.5");
})
</script>

<script type="application/ld+json">
{
    "@context"; "https://schema.org",
        "@type"; "Person",
            "name"; "Mostafa Barakat",
                "jobTitle"; "Full Stack Developer",
                    "url"; "https://your-site.com",
                        "sameAs";[
                            "https://github.com/...",
                            "https://linkedin.com/..."
                        ]
}
</script>

<template>
    <section id="about" class="about-section container" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
        <div class="about-card glass-card">
            <div class="about-image-area">
                <div class="glow-ring"></div>
                <img src="../assets/image/AboutMy.png" alt="Mostafa Barakat - Full Stack Web Developer" loading="lazy"
                    decoding="async" class="profile-img" />
                <div class="experience-badge">
                    <span class="exp-num">5+</span>
                    <span class="exp-text">{{ t('about.years_exp') }}</span>
                </div>
            </div>

            <div class="about-text-content">
                <h2 class="about-title">
                    {{ t('about.title') }}
                </h2>
                <div class="title-underline"></div>
                <p class="about-description">
                    {{ t('about.text') }}
                </p>

                <div class="about-stats">
                    <span class="stat-tag">#Laravel_Expert</span>
                    <span class="stat-tag">#Nuxt_Architect</span>
                    <span class="stat-tag">#UI_UX_Mindset</span>
                    <span class="stat-tag">#DevOps_Beginner</span>
                    <span class="stat-tag">+50 Completed Projects</span>
                    <span class="stat-tag">Freelancer Verified</span>
                    <span class="stat-tag">5★ Client Rating</span>
                </div>

                <div class="action-groups">
                    <div class="social-bubbles">
                        <a href="https://www.upwork.com/freelancers/~0169e903b73148d678?mp_source=share"
                            rel="me noopener noreferrer" target="_blank" class="s-bubble upwork">
                            <i class="fa-brands fa-upwork"></i>
                            Upwork
                        </a>
                        <a href="https://mostaql.com/u/mostafadarwish1" rel="me noopener noreferrer" target="_blank"
                            class="s-bubble mostaql">
                            <i class="fa-solid fa-bolt"></i>
                            مستقل
                        </a>
                        <a href="https://github.com/mostafa-barakat" rel="me noopener noreferrer" target="_blank"
                            class="s-bubble github">
                            <i class="fab fa-github"></i>
                            GitHub
                        </a>
                        <a href="https://www.linkedin.com/in/mostafa-barakat-258311227/" rel="me noopener noreferrer"
                            target="_blank" class="s-bubble linkedin">
                            <i class="fab fa-linkedin-in"></i>
                            LinkedIn
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.about-section {
    padding: 100px 0;
}

.about-card {
    display: flex;
    align-items: center;
    gap: 5rem;
    padding: 4rem;
    border-radius: 2.5rem;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    position: relative;
}

/* المنطقة البصرية والبدج */
.about-image-area {
    position: relative;
    flex-shrink: 0;
}

.profile-img {
    width: 280px;
    height: 280px;
    border-radius: 50%;
    border: 2px solid rgba(255, 255, 255, 0.1);
    position: relative;
    z-index: 2;
    transition: 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.profile-img:hover {
    border-radius: 50%;
    transform: rotate(3deg) scale(1.02);
}

.experience-badge {
    position: absolute;
    bottom: 10px;
    right: -10px;
    background: var(--gradient-main, linear-gradient(135deg, #4f46e5, #06b6d4));
    padding: 1rem;
    border-radius: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 3;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.exp-num {
    font-weight: 900;
    font-size: 1.4rem;
    color: #fff;
    line-height: 1;
}

.exp-text {
    font-size: 0.7rem;
    color: #fff;
    text-transform: uppercase;
}

.glow-ring {
    position: absolute;
    inset: -15px;
    border-radius: 40%;
    background: radial-gradient(circle, rgba(79, 70, 229, 0.3) 0%, transparent 70%);
    filter: blur(20px);
    z-index: 1;
    animation: rotate-glow 10s linear infinite;
}

@keyframes rotate-glow {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

/* النصوص */
.about-title {
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 800;
    margin-bottom: 0.5rem;
    background: linear-gradient(to right, #fff, #94a3b8);
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

.title-underline {
    width: 80px;
    height: 5px;
    background: linear-gradient(90deg, #4f46e5, transparent);
    border-radius: 10px;
    margin-bottom: 2rem;
}

.about-description {
    font-size: 1.15rem;
    line-height: 1.8;
    color: #94a3b8;
    margin-bottom: 2.5rem;
}

/* الوسوم */
.about-stats {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    margin-bottom: 3rem;
}

.stat-tag {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 0.5rem 1.2rem;
    border-radius: 50px;
    font-size: 0.85rem;
    color: #6366f1;
    font-weight: 600;
}

/* أزرار التواصل */
.social-bubbles {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}

.s-bubble {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0.8rem 1.5rem;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    color: #cbd5e1;
    text-decoration: none;
    font-weight: 600;
    transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.s-bubble:hover {
    transform: translateY(-5px);
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.2);
    color: #fff;
}

/* ألوان المنصات */
.upwork:hover {
    border-color: #14a800;
    color: #14a800;
}

.freelancer:hover {
    border-color: #29abe2;
    color: #29abe2;
}

.mostaql:hover {
    border-color: #2baadf;
    color: #2baadf;
}

.linkedin:hover {
    border-color: #0a66c2;
    color: #0a66c2;
}

@media (max-width: 992px) {
    .about-card {
        flex-direction: column;
        text-align: center;
        padding: 3rem 1.5rem;
        gap: 3rem;
    }

    .title-underline {
        margin: 0 auto 2rem;
    }

    .about-stats,
    .social-bubbles {
        justify-content: center;
    }

    .profile-img {
        width: 200px;
        height: 200px;
    }
}
</style>