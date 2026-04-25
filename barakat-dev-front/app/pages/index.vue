<script setup>
useSeoMeta({
    title: 'Barakat Dev | Full Stack Web Developer',
    description: 'Professional Full Stack Web Developer specializing in Laravel, Nuxt 3, Vue.js, and modern web applications. Building high-performance, scalable, and SEO optimized websites.',

    ogTitle: 'Barakat Dev | Full Stack Developer Portfolio',
    ogDescription: 'Explore modern web projects built with Laravel, Nuxt 3, Vue.js and advanced UI/UX design.',
    ogImage: '/og-image.png',
    ogType: 'website',

    twitterCard: 'summary_large_image',
    twitterTitle: 'Barakat Dev | Full Stack Developer',
    twitterDescription: 'Laravel, Nuxt, Vue.js Developer building modern web apps',
    twitterImage: '/og-image.png',

    keywords: 'full stack developer, laravel developer, nuxt developer, vue developer, web development palestine, portfolio developer',

    robots: 'index, follow',
})
useHead({
    link: [
        {
            rel: 'canonical',
            href: 'https://your-domain.com/'
        }
    ],
    script: [
        {
            type: 'application/ld+json',
            children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Person",
                "name": "Barakat Dev",
                "jobTitle": "Full Stack Web Developer",
                "url": "https://your-domain.com",
                "sameAs": [
                    "https://github.com/your-profile",
                    "https://www.linkedin.com/in/your-profile"
                ]
            })
        }
    ],
})
</script>

<template>
    <div>
        <Hero />
        <Services />
        <Portfolio />
        <About />
        <Process />
        <Testimonials />
        <ContactTalk />
    </div>
</template>