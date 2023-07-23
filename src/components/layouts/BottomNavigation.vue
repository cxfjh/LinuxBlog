<template>
    <!-- 底部导航栏组件 -->
    <div class="BottomNavigation">
        <footer :style="{ 'width': width }">
            <router-link to="/home"><span class="iconfont icon-shouye"></span><a>首页</a></router-link>
            <router-link to="/publish"><span class="iconfont icon-fabu"></span></router-link>
            <router-link to="/user"><span class="iconfont icon-daohang"></span><a>我的</a></router-link>
        </footer>
    </div>
</template>

<script>
export default {
    name: 'BottomNavigation',
    data() { return { width: window.innerWidth + 'px', } }
}
</script>

<style scoped>
.BottomNavigation>footer {
    width: 100%;
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
    font-size: 1.5rem;
    border-top: 1px solid #EBEBEB;
    background-color: white;
    transform: translateY(-100%);
    z-index: 1;
}

.router-link-exact-active {
    color: #29e2e2 !important;
}

.BottomNavigation>footer>a {
    flex: 1;
    text-decoration: none;
    text-align: center;
    color: black;
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.BottomNavigation>footer>a span {
    margin-bottom: 0.5rem;
    font-size: 2.5rem;
}

.BottomNavigation>footer>a .icon-fabu {
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    background-color: rgb(58, 141, 255);
    border-radius: 100px;
    color: white;
    margin: 0;
}
</style>