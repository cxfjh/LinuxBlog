<template>
    <div class="searchPanel" :style="{ 'width': width }">
        <!-- 搜索框 -->
        <header><search-box @search="search" ref="keywords"></search-box></header>

        <!-- 切换导航栏 -->
        <nav>
            <var-tabs v-model:active="index">
                <var-tab @click="clickSwitch(0)">全部</var-tab>
                <var-tab @click="clickSwitch(1)">热门</var-tab>
            </var-tabs>
        </nav>

        <!-- 内容区域 -->
        <article>
            <var-swipe class="swipe-example" :loop="false" :indicator="false" @change="slideSwitch" ref="swipe">
                <var-swipe-item><article-listing :info="info[Object.keys(info)[0]]" :height="height"></article-listing></var-swipe-item>
                <var-swipe-item><article-listing :info="info[Object.keys(info)[1]]" :height="height"></article-listing></var-swipe-item>
            </var-swipe>
        </article>
    </div>
</template>

<script>
import { DataStore } from '../store/index.js';
import SearchBox from '../components/forms/SearchBox.vue'

export default {
    name: 'searchPanel',
    data() {
        return {
            index: 0,
            store: DataStore(),
            width: window.innerWidth + 'px',
            info: { all: [], user: [] },
            height: '',
        }
    },
    methods: {
        // 滑动切换页面
        slideSwitch(index) { this.index = index },

        // 点击切换页面
        clickSwitch(index) { this.$refs.swipe.to(index, { duration: 0 }) },

        // 搜索文章或用户
        async search(value) {
            if (!value) { return }
            const { data: search } = await this.$ajax.get('/api/search', { params: { keyword: value, classify: 0 } });
            this.info[Object.keys(this.info)[0]] = [...search.message];
            this.info[Object.keys(this.info)[1]] = [...search.message].sort((a, b) => b.likes - a.likes);
        }
    },


    mounted() {
        // 初始化高度
        this.height = windowHeight - document.querySelector('.searchPanel>header').offsetHeight - document.querySelector('.var-tabs').offsetHeight + 'px';
        // 初始化数据
        this.info[Object.keys(this.info)[0]] = this.store.searchInfo;
        this.info[Object.keys(this.info)[1]] = [...this.store.searchInfo].sort((a, b) => b.likes - a.likes);
    },
    components: { SearchBox }
}
</script>

<style scoped>
.searchPanel {
    background-color: white;
    height: 100%;
    position: fixed;
    z-index: 2;
}

.searchPanel>header {
    padding: 1.5rem;
}

.searchPanel>nav {
    margin: 0rem 2rem;
    padding-bottom: 1rem;
}

.router-link-active {
    color: #29e2e2;
}

.var-tab {
    font-size: 1.8rem;
}

.var-tabs {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    border: 1px solid white;
    border-radius: 8px;
    padding: 0.5rem 2rem;
    height: 4rem;
}
</style>