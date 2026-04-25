<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
const { t, locale } = useI18n()

const currentYear = new Date().getFullYear()

onMounted(() => {
    const footerTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: ".footer-wrapper",
            start: "top 85%", // يبدأ الأنميشن عندما يقترب الفوتر من الظهور
        }
    });

    // 1. ظهور أعمدة الفوتر بتتابع
    footerTimeline.from(".footer-brand, .footer-nav, .footer-contact", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out"
    })

        // 2. ظهور الحقوق والخط السفلي في النهاية
        .from(".footer-bottom", {
            opacity: 0,
            duration: 1
        }, "-=0.4")
        .from(".b-line", {
            width: 0,
            duration: 0.8,
            ease: "expo.out"
        }, "-=0.5");

    // 3. حركة طفو مستمرة للأيقونات الاجتماعية
    gsap.to(".social-icon-mini", {
        y: -5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: {
            each: 0.2,
            from: "center"
        }
    });

    // 4. نبض القلب بشكل طبيعي
    gsap.to(".heart", {
        scale: 1.3,
        duration: 0.6,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut"
    });
})
</script>

<template>
    <footer class="footer-wrapper" :dir="locale === 'ar' ? 'rtl' : 'ltr'">
        <div class="container footer-grid">
            <div class="footer-brand">
                <div class="logo-text footer-logo">
                    <a href="/" itemprop="url" aria-label="Barakat Dev - Home">
                        <img src="../assets/image/logo.png" alt="Barakat Dev - Full Stack Web Developer Portfolio"
                            class="logo-img" width="180" height="50" itemprop="logo" />
                    </a>
                </div>
                <p class="brand-description">
                    {{ t('about.text').substring(0, 115) }}...
                </p>
                <div class="footer-social-icons">
                    <a href="https://www.upwork.com/freelancers/~0169e903b73148d678?mp_source=share" target="_blank"
                        class="s-bubble upwork">
                        <i class="fa-brands fa-upwork"></i>

                    </a>
                    <a href="https://mostaql.com/u/mostafadarwish1" target="_blank" class="s-bubble mostaql">
                        <i class="fa-solid fa-bolt"></i>

                    </a>
                    <a href="https://github.com/mostafa-barakat" target="_blank" class="s-bubble github">
                        <i class="fab fa-github"></i>

                    </a>
                    <a href="https://www.linkedin.com/in/mostafa-barakat-258311227/" target="_blank"
                        class="s-bubble linkedin">
                        <i class="fab fa-linkedin-in"></i>

                    </a>
                </div>
            </div>

            <div class="footer-nav">
                <h3 class="footer-title">{{ t('nav.services') }}</h3>
                <ul class="footer-links">
                    <li><a href="#hero-section" class="nav-link">{{ t('nav.home') }}</a></li>
                    <li><a href="#services" class="nav-link">{{ t('nav.services') }}</a></li>
                    <li><a href="#portfolio" class="nav-link">{{ t('nav.portfolio') }}</a></li>
                    <li><a href="#about" class="nav-link">{{ t('nav.about') }}</a></li>
                    <li><a href="#process" class="nav-link">{{ t('nav.WorkProcess') }}</a></li>
                    <li><a href="#testimonials" class="nav-link">{{ t('nav.Clients') }}</a></li>
                </ul>
            </div>

            <div class="footer-contact">
                <h3 class="footer-title">{{ t('nav.contact') }}</h3>
                <div class="contact-box">
                    <div class="contact-item">
                        <div class="c-icon-wrapper">
                            <i class="fa-solid fa-envelope"></i>
                        </div>
                        <div class="c-text">
                            <span class="c-label">Email</span>
                            <a href="mailto:info@barakat.dev">mostafa.d.a.barakat@gmail.com</a>
                        </div>
                    </div>
                    <div class="contact-item">
                        <div class="c-icon-wrapper">
                            <i class="fa-solid fa-phone"></i>
                        </div>
                        <div class="c-text">
                            <span class="c-label">WhatsApp</span>
                            <a href="https://api.whatsapp.com/send/?phone=%2B972594312645&text=Hello%20Mostafa,%20I%20would%20like%20to%20discuss%20a%20new%20project."
                                target="_blank" dir="ltr">+972 594 312 645</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer-bottom">
            <div class="container b-content">
                <div class="copyright-text">
                    © {{ currentYear }} <span class="white-text">Barakat Dev</span>.
                    Crafted with <span class="heart" style="display: inline-block;">❤️</span> and
                    <span class="tech-stack">Laravel & Nuxt</span>
                </div>
                <div class="b-line"></div>
            </div>
        </div>
    </footer>
</template>

<style scoped>
/* التنسيقات الأصلية التي طلبت الحفاظ عليها مع تحسينات طفيفة للأنيميشن */
.footer-wrapper {
    background: #020617;
    border-top: 1px solid rgba(255, 255, 255, 0.03);
    padding: 100px 0 40px;
    position: relative;
    overflow: hidden;
}

.footer-wrapper::before {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 1px;
    background: linear-gradient(90deg, transparent, var(--secondary), transparent);
}

.footer-grid {
    display: grid;
    grid-template-columns: 1.5fr 0.8fr 1.2fr;
    gap: 5rem;
    margin-bottom: 60px;
}

.footer-logo {
    font-size: 2rem;
    font-weight: 800;
    margin-bottom: 1.5rem;
    display: block;
}

.brand-description {
    color: #94a3b8;
    line-height: 1.8;
    font-size: 0.95rem;
    max-width: 350px;
    margin-bottom: 2rem;
}

.footer-social-icons {
    display: flex;
    gap: 1rem;
}

.social-icon-mini {
    width: 40px;
    height: 40px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    color: #94a3b8;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.3s, color 0.3s, border-color 0.3s;
    text-decoration: none;
}

.social-icon-mini:hover {
    background: var(--secondary);
    color: #000;
    border-color: var(--secondary);
}

.footer-title {
    color: white;
    font-size: 1.2rem;
    font-weight: 700;
    margin-bottom: 2rem;
}

.footer-links {
    list-style: none;
    padding: 0;
}

.footer-links li {
    margin-bottom: 1rem;
}

.f-link {
    color: #64748b;
    text-decoration: none;
    transition: 0.3s;
    font-size: 1rem;
    display: inline-block;
}

.f-link:hover {
    color: var(--secondary);
    padding-inline-start: 8px;
}

.contact-box {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 15px;
}

.c-icon-wrapper {
    width: 45px;
    height: 45px;
    border-radius: 14px;
    background: rgba(6, 182, 212, 0.05);
    border: 1px solid rgba(6, 182, 212, 0.1);
    color: var(--secondary);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
}

.c-text {
    display: flex;
    flex-direction: column;
}

.c-label {
    font-size: 0.75rem;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.c-text a {
    color: #cbd5e1;
    text-decoration: none;
    font-size: 1rem;
    font-weight: 600;
    transition: 0.3s;
}

.c-text a:hover {
    color: white;
}

.footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.03);
    padding-top: 40px;
}

.b-content {
    color: #475569;
    text-align: center;
}

.white-text {
    color: #94a3b8;
    font-weight: 600;
}

.heart {
    display: inline-block;
}

.tech-stack {
    color: var(--secondary);
    font-weight: 700;
}

.b-line {
    width: 60px;
    height: 3px;
    background: var(--gradient-main);
    margin: 20px auto 0;
    border-radius: 10px;
    opacity: 0.3;
}

@media (max-width: 992px) {
    .footer-grid {
        grid-template-columns: 1fr;
        gap: 4rem;
        text-align: center;
    }

    .brand-description {
        margin: 0 auto 2rem;
    }

    .footer-social-icons,
    .contact-item {
        justify-content: center;
    }
}
</style>