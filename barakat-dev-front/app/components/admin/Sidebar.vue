<template>
    <aside class="sidebar">
        <div class="sidebar-header">
            <div class="logo">
                <img src="@/assets/image/logo.png" alt="">
            </div>
        </div>

        <nav class="nav-links">
            <NuxtLink to="/admin/master" class="nav-item">
                <span class="icon"><i class="fa-solid fa-chart-line"></i></span>
                <span>الرئيسية</span>
            </NuxtLink>

            <div class="nav-label">المحتوى</div>

            <NuxtLink to="/admin/skills" class="nav-item">
                <span class="icon"><i class="fa-solid fa-layer-group"></i></span>
                <span>المهارات</span>
            </NuxtLink>

            <NuxtLink to="/admin/services" class="nav-item">
                <span class="icon"><i class="fa-solid fa-briefcase"></i></span>
                <span>الخدمات</span>
            </NuxtLink>

            <NuxtLink to="/admin/projects" class="nav-item">
                <span class="icon"><i class="fa-solid fa-diagram-project"></i></span>
                <span>الأعمال</span>
            </NuxtLink>

            <NuxtLink to="/admin/testimonials" class="nav-item">
                <span class="icon"><i class="fa-solid fa-comment-dots"></i></span>
                <span>آراء العملاء</span>
            </NuxtLink>

            <div class="nav-label">الإعدادات</div>

            <!-- <NuxtLink to="/admin/settings" class="nav-item">
                <span class="icon"><i class="fa-solid fa-gear"></i></span>
                <span>الإعدادات العامة</span>
            </NuxtLink> -->
        </nav>
    </aside>
</template>

<style scoped>
.nav-item .icon i {
    font-size: 1rem;
    width: 22px;
    text-align: center;
}

.sidebar {
    width: 260px;
    background: #0f172a;
    border-left: 1px solid rgba(255, 255, 255, 0.05);
    /* الحدود أصبحت على اليسار لأنها في اليمين */
    display: flex;
    flex-direction: column;
    height: 100vh;
}

.sidebar-header {
    padding: 30px;
}

.logo {
    font-size: 1.4rem;
    font-weight: 800;
    color: white;
}

.text-cyan {
    color: #06b6d4;
}

.nav-links {
    flex: 1;
    padding: 0 15px;
}

.nav-label {
    font-size: 0.75rem;
    color: #475569;
    margin: 25px 15px 10px;
    font-weight: 700;
}

.nav-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 15px;
    color: #94a3b8;
    text-decoration: none;
    border-radius: 12px;
    transition: 0.3s;
    margin-bottom: 5px;
}

.nav-item:hover,
.router-link-active {
    background: rgba(6, 182, 212, 0.1);
    color: #06b6d4;
}

.router-link-active {
    background: rgba(6, 182, 212, 0.15) !important;
    border-right: 3px solid #06b6d4;
    /* الخط المميز على اليمين */
}

.sidebar-footer {
    padding: 20px;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.version {
    font-size: 0.7rem;
    color: #475569;
    text-align: center;
}
</style>