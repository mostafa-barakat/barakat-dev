<template>
    <div class="admin-layout">
        <div class="bg-glow"></div>

        <AdminSidebar />

        <div class="main-area">
            <AdminNavbar />

            <main class="content">
                <div class="page-container">
                    <slot />
                </div>
            </main>
        </div>
    </div>
</template>

<style scoped>
.admin-layout {
    display: flex;
    min-height: 100vh;
    background: #020617;
    /* لون الموقع الأساسي */
    color: #e2e8f0;
    font-family: 'Cairo', sans-serif;
    position: relative;
    overflow: hidden;
    direction: rtl; /* تأكيد الاتجاه */
}

.bg-glow {
    position: absolute;
    top: 0;
    left: 0; /* عكس مكان التوهج */
    width: 500px;
    height: 500px;
    background: radial-gradient(circle, rgba(6, 182, 212, 0.05) 0%, transparent 70%);
    z-index: 0;
    pointer-events: none;
}

.main-area {
    flex: 1;
    display: flex;
    flex-direction: column;
    z-index: 1;
    /* لإعطاء مساحة كافية عند التمرير في الموبايل */
    overflow-x: hidden;
}

.content {
    padding: 30px;
    flex: 1;
    overflow-y: auto;
}

.page-container {
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
}

/* Scrollbar Style */
::-webkit-scrollbar {
    width: 6px;
}

::-webkit-scrollbar-track {
    background: transparent;
}

::-webkit-scrollbar-thumb {
    background: #1e293b;
    border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
    background: #06b6d4;
}
</style>