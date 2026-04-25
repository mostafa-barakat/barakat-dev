<template>
    <header class="navbar">
        <div class="page-title">
            <span class="status-dot"></span>
            لوحة التحكم
        </div>

        <div class="actions">
            <div class="user-info">
                <div class="avatar">MB</div>
                <span class="user-name">مصطفى بركات</span>
            </div>

            <button @click="logout" class="logout-btn">
                <span>خروج</span>
                <span class="icon"><i class="fa-solid fa-arrow-right-from-bracket" style="transform: rotateY(180deg);"></i></span>
            </button>
        </div>
    </header>
</template>

<script setup>
const logout = () => {
    useCookie("token").value = null;
    navigateTo("/auth/login");
};
</script>

<style scoped>
.navbar {
    height: 70px;
    background: rgba(15, 23, 42, 0.8);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;
}

.page-title {
    font-weight: 700;
    font-size: 1.1rem;
    display: flex;
    align-items: center;
    gap: 10px;
}

.status-dot {
    width: 8px;
    height: 8px;
    background: #06b6d4;
    border-radius: 50%;
    box-shadow: 0 0 10px #06b6d4;
}

.actions {
    display: flex;
    align-items: center;
    gap: 20px;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 12px;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    /* تحويل الخط لليمين */
    padding-right: 20px;
}

.user-name {
    font-size: 0.9rem;
    color: #94a3b8;
}

.avatar {
    width: 35px;
    height: 35px;
    background: linear-gradient(135deg, #06b6d4, #3b82f6);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: #000;
}

.logout-btn {
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.2);
    padding: 8px 16px;
    color: #f87171;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
    display: flex;
    align-items: center;
    gap: 8px;
}

.logout-btn:hover {
    background: #ef4444;
    color: white;
}
</style>