<template>
    <!-- 头部导航栏组件 -->
    <div class="HeaderNavigation">
        <header>
            <!-- 返回按钮 -->
            <span class="iconfont icon-31fanhui1" @click="OneLevelup"></span>
            <!-- 标题 -->
            <span>{{ title }}</span>
            <!-- 更多按钮 -->
            <span class="iconfont icon-gengduo"></span>
        </header>
    </div>
</template>

<script>
import { DataStore } from '../../store/index.js';

export default {
    name: 'HeaderNavigation',
    props: ['title'],
    data() { return { store: DataStore(), } },
    methods: {
        // 返回上一级页面方法（回退一级）
        OneLevelup() {
            if (this.title == '') { return this.store.fullinformation = 0; }
            ReturnKey = 'slide-left';
            window.history.back();
        }
    },
    // 设置顶部导航栏的顶部边距
    mounted() { document.querySelector('.HeaderNavigation').style.paddingTop = immersed + 'px'; }
}
</script>

<style scoped>
.HeaderNavigation>header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.HeaderNavigation>header span:nth-child(2) {
    font-size: 2rem;
}

.HeaderNavigation>header span {
    font-size: 3.5rem;
    padding: 1.5rem 2rem;
}
</style>