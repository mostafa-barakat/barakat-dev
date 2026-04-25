import { createI18n } from 'vue-i18n'

export default defineNuxtPlugin((nuxtApp) => {
    const i18n = createI18n({
        legacy: false,
        locale: 'en', // اللغة الافتراضية
        messages: {
            en: {
                preloader: { slogan: "Crafting Digital Excellence Through Code" },

                nav: {
                    home: 'Home',
                    services: 'Services',
                    portfolio: 'Work',
                    about: 'About',
                    WorkProcess: 'Process',
                    Clients: 'Testimonials',
                    contact: 'Contact'
                },

                hero: {
                    title: 'Full Stack Developer Building Modern Digital Experiences',
                    text: 'I design and develop high-performance web applications using Laravel, Vue.js, and Nuxt 3, focusing on scalability, speed, and user experience.',
                    btn1: 'Start Your Project',
                    btn2: 'View My Work',
                    feature1: 'Completed Projects',
                    feature2: 'Fast Delivery',
                    feature3: 'Clean Architecture',
                    feature4: 'API Integration Expert'
                },

                services: {
                    title: "What I Do Best",
                    subtitle: "End-to-end development solutions tailored for modern businesses"
                },

                portfolio: {
                    title: "Selected Work",
                    subtitle: "Real-world projects built with precision, performance, and clean architecture"
                },

                about: {
                    title: 'Building Scalable Digital Solutions',
                    text: 'Full Stack Developer specializing in Laravel and Vue.js, focused on building scalable, secure, and high-performance web applications for startups and businesses.',
                    years_exp: 'Years of Experience'
                },

                process: {
                    title: "Development Process",
                    subtitle: "A structured workflow that turns ideas into powerful digital products",
                    steps: {
                        0: { title: "Discovery", desc: "Understanding business goals and project requirements." },
                        1: { title: "Planning", desc: "Designing architecture and user experience." },
                        2: { title: "Development", desc: "Building clean, scalable and optimized code." },
                        3: { title: "Launch", desc: "Testing, optimization and successful deployment." }
                    }
                },

                testimonials: {
                    title: "Client Feedback"
                },

                contactSection: {
                    title: "Let’s Build Something Exceptional",
                    subtitle: "Have an idea? Let’s turn it into a high-quality digital product.",
                    btn: "Start Conversation",
                    availability: "Available for new projects"
                }
            },

            ar: {
                preloader: { slogan: "نحو بناء تجارب رقمية استثنائية بالكود" },

                nav: {
                    home: 'الرئيسية',
                    services: 'الخدمات',
                    portfolio: 'الأعمال',
                    about: 'من أنا',
                    WorkProcess: 'آلية العمل',
                    Clients: 'آراء العملاء',
                    contact: 'تواصل معي'
                },

                hero: {
                    title: 'مطور ويب متكامل يصنع تجارب رقمية حديثة',
                    text: 'أقوم بتطوير تطبيقات ويب عالية الأداء باستخدام Laravel و Vue.js و Nuxt 3 مع التركيز على السرعة، القابلية للتوسع، وتجربة المستخدم.',
                    btn1: 'ابدأ مشروعك',
                    btn2: 'استعرض أعمالي',
                    feature1: 'مشاريع منجزة',
                    feature2: 'تنفيذ سريع',
                    feature3: 'بنية برمجية نظيفة',
                    feature4: 'خبير في تكامل الـ API'
                },

                services: {
                    title: "ما أقدمه من خدمات",
                    subtitle: "حلول تطوير متكاملة لبناء منتجات رقمية احترافية"
                },

                portfolio: {
                    title: "أعمال مختارة",
                    subtitle: "مشاريع حقيقية تم تنفيذها بأعلى معايير الجودة والأداء"
                },

                about: {
                    title: "نبني حلول رقمية قابلة للتوسع",
                    text: "مطور Full Stack متخصص في Laravel و Vue.js، أعمل على بناء تطبيقات ويب آمنة وسريعة وقابلة للتوسع للشركات الناشئة والمؤسسات.",
                    years_exp: 'سنوات الخبرة'
                },

                process: {
                    title: "منهجية العمل",
                    subtitle: "خطوات مدروسة لتحويل الأفكار إلى منتجات رقمية ناجحة",
                    steps: {
                        0: { title: "الفهم والتحليل", desc: "فهم أهداف المشروع ومتطلبات العمل بشكل دقيق." },
                        1: { title: "التخطيط", desc: "تصميم هيكل النظام وتجربة المستخدم." },
                        2: { title: "التطوير", desc: "بناء النظام بكود نظيف وقابل للتوسع." },
                        3: { title: "الإطلاق", desc: "اختبار شامل وإطلاق احترافي للمشروع." }
                    }
                },

                testimonials: {
                    title: "آراء العملاء"
                },

                contactSection: {
                    title: "لنصنع شيئًا استثنائيًا معًا",
                    subtitle: "لديك فكرة؟ لنحولها إلى منتج رقمي احترافي عالي الجودة.",
                    btn: "ابدأ المحادثة",
                    availability: "متاح حالياً للمشاريع الجديدة"
                }
            }
        }
    })
    nuxtApp.vueApp.use(i18n)
})