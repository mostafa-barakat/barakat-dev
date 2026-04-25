<script setup>
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'

const { t, locale } = useI18n()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
    isScrolled.value = window.scrollY > 20
}

const closeMobileMenu = () => {
    isMobileMenuOpen.value = false
}

const toggleMobileMenu = () => {
    isMobileMenuOpen.value = !isMobileMenuOpen.value

    if (window.innerWidth <= 992 && isMobileMenuOpen.value) {
        gsap.fromTo(
            ".nav-links",
            { opacity: 0, y: -12 },
            {
                opacity: 1,
                y: 0,
                duration: 0.35,
                ease: "power2.out"
            }
        )
    }
}

const handleResize = () => {
    if (window.innerWidth > 992) {
        isMobileMenuOpen.value = false
    }
}

onMounted(() => {
    let ticking = false

    const onScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                isScrolled.value = window.scrollY > 20
                ticking = false
            })
            ticking = true
        }
    }

    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', handleResize)

    const tl = gsap.timeline()

    tl.from(".navbar-wrapper", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power4.out"
    })
        .from(".logo-area, .nav-actions", {
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            ease: "back.out(1.7)"
        }, "-=0.5")
        .from(".nav-link", {
            y: -20,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        }, "-=0.4")
})

onUnmounted(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('resize', handleResize)
})

const onLogoEnter = () => {
    gsap.to(".logo-img", {
        scale: 1.08,
        rotate: 2,
        duration: 0.4,
        ease: "power2.out"
    })
}

const onLogoLeave = () => {
    gsap.to(".logo-img", {
        scale: 1,
        rotate: 0,
        duration: 0.4,
        ease: "power2.in"
    })
}

const onLangEnter = () => {
    gsap.to(".lang-switch-btn .icon", {
        rotation: 360,
        duration: 0.8,
        ease: "back.out"
    })
}

const onLangLeave = () => {
    gsap.to(".lang-switch-btn .icon", {
        rotation: 0,
        duration: 0.6
    })
}

watch(locale, (newLang) => {
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr'
    document.documentElement.lang = newLang
})
const toggleLang = () => {
    locale.value = locale.value === 'en' ? 'ar' : 'en'
}
</script>

<template>
    <header class="navbar-wrapper" :class="{ 'scrolled': isScrolled }" role="banner">
        <div class="container nav-container">
            <div class="logo-area" @mouseenter="onLogoEnter" @mouseleave="onLogoLeave" itemscope
                itemtype="https://schema.org/Organization">
                <a href="/" itemprop="url" aria-label="Barakat Dev - Home">
                    <img src="../assets/image/logo.png" alt="Barakat Dev logo - Full Stack Web Developer"
                        class="logo-img" width="180" height="50" itemprop="logo" />
                </a>
            </div>

            <button class="menu-toggle" type="button" @click="toggleMobileMenu" :aria-expanded="isMobileMenuOpen"
                aria-controls="main-navigation" :aria-label="isMobileMenuOpen ? 'Close menu' : 'Open menu'">
                <span></span>
                <span></span>
                <span></span>
            </button>

            <nav id="main-navigation" class="nav-links" :class="{ open: isMobileMenuOpen }" role="navigation">
                <a href="#hero-section" class="nav-link" @click="closeMobileMenu">{{ t('nav.home') }}</a>
                <a href="#services" aria-label="View our services section" class="nav-link" @click="closeMobileMenu">{{
                    t('nav.services') }}</a>
                <a href="#portfolio" class="nav-link" @click="closeMobileMenu">{{ t('nav.portfolio') }}</a>
                <a href="#about" class="nav-link" @click="closeMobileMenu">{{ t('nav.about') }}</a>
                <a href="#process" class="nav-link" @click="closeMobileMenu">{{ t('nav.WorkProcess') }}</a>
                <a href="#testimonials" class="nav-link" @click="closeMobileMenu">{{ t('nav.Clients') }}</a>
                <a href="#contact" class="nav-link btn-contact-nav" @click="closeMobileMenu">
                    {{ t('nav.contact') }}
                </a>
            </nav>

            <div class="nav-actions">
                <button @click="toggleLang" @mouseenter="onLangEnter" @mouseleave="onLangLeave" class="lang-switch-btn"
                    :aria-label="locale === 'en' ? 'Switch to Arabic' : 'التبديل للعربية'">
                    <span class="icon" aria-hidden="true">🌐</span>
                    <span class="lang-text">{{ locale === 'en' ? 'AR' : 'EN' }}</span>
                </button>
            </div>
        </div>
    </header>
</template>

<style scoped>
.navbar-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    padding: 1.5rem 0;
    background: transparent;
    border-bottom: 1px solid transparent;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    will-change: padding, background-color;
}

.navbar-wrapper.scrolled {
    padding: 0.7rem 0;
    background: rgba(15, 23, 42, 0.85);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
}

.nav-container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    position: relative;
}

.logo-img {
    height: auto;
    max-width: 100%;
    aspect-ratio: auto 180 / 50;
    display: block;
}

.nav-links {
    display: flex;
    align-items: center;
    gap: 1.8rem;
}

.nav-link {
    font-size: 0.95rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.8);
    transition: color 0.3s ease;
    text-decoration: none;
    position: relative;
}

.nav-link:hover {
    color: var(--secondary, #06b6d4);
}

.nav-link::after {
    content: '';
    position: absolute;
    bottom: -5px;
    left: 0;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, #4f46e5, #06b6d4);
    transition: width 0.3s ease;
}

.nav-link:hover::after {
    width: 100%;
}

.btn-contact-nav {
    background: rgba(255, 255, 255, 0.05);
    padding: 0.6rem 1.4rem;
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.12);
}

.btn-contact-nav:hover {
    background: var(--primary, #4f46e5);
    border-color: var(--secondary, #06b6d4);
    color: white !important;
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(79, 70, 229, 0.3);
}

.lang-switch-btn {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;
    padding: 0.5rem 1.2rem;
    border-radius: 50px;
    cursor: pointer;
}

.lang-switch-btn .icon {
    display: inline-block;
}

.lang-text {
    font-size: 0.85rem;
    font-weight: 800;
}

.menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 46px;
    height: 46px;
    border: 1px solid rgba(255, 255, 255, 0.14);
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.05);
    cursor: pointer;
    padding: 0 10px;
}

.menu-toggle span {
    width: 100%;
    height: 2px;
    background: #fff;
    border-radius: 999px;
    transition: 0.3s ease;
}

.nav-link:focus-visible,
.lang-switch-btn:focus-visible,
.menu-toggle:focus-visible {
    outline: 2px solid var(--secondary, #06b6d4);
    outline-offset: 5px;
}

@media (max-width: 992px) {
    .menu-toggle {
        display: inline-flex;
        order: 3;
    }

    .nav-actions {
        order: 2;
        margin-inline-start: auto;
    }

    .nav-links {
        position: absolute;
        top: calc(100% + 14px);
        left: 0;
        right: 0;
        display: none;
        flex-direction: column;
        align-items: stretch;
        gap: 0.4rem;
        padding: 1rem;
        border-radius: 20px;
        background: rgba(15, 23, 42, 0.96);
        border: 1px solid rgba(255, 255, 255, 0.08);
        box-shadow: 0 18px 50px rgba(0, 0, 0, 0.35);
    }

    .nav-links.open {
        display: flex;
    }

    .nav-link {
        padding: 0.85rem 1rem;
        border-radius: 12px;
        background: rgba(255, 255, 255, 0.03);
    }

    .nav-link::after {
        display: none;
    }

    .btn-contact-nav {
        text-align: center;
    }
}
</style>