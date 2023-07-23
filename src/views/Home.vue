<template>
    <div class="Home" :style="{ 'width': width }">
        <!-- 搜索框 -->
        <header><search-box @search="search" ref="keywords"></search-box></header>

        <!-- 切换导航栏 -->
        <nav>
            <var-tabs v-model:active="index">
                <var-tab @click="clickSwitch(0)">推荐</var-tab>
                <var-tab @click="clickSwitch(1)">热门</var-tab>
                <var-tab @click="clickSwitch(2)">关注</var-tab>
            </var-tabs>
        </nav>

        <!-- 内容区域 -->
        <article>
            <var-swipe class="swipe-example" :loop="false" :indicator="false" @change="slideSwitch" ref="swipe">
                <var-swipe-item><article-listing :info="info[Object.keys(info)[0]]" :height="height" id="0"></article-listing></var-swipe-item>
                <var-swipe-item><article-listing :info="info[Object.keys(info)[1]]" :height="height" id="1"></article-listing></var-swipe-item>
                <var-swipe-item><article-listing :info="info[Object.keys(info)[2]]" :height="height" id="2"></article-listing></var-swipe-item>
            </var-swipe>
        </article>
    </div>
</template>

<script>
import { DataStore } from '../store/index.js';
import SearchBox from '../components/forms/SearchBox.vue'

export default {
    name: 'MyHome',
    data() {
        return {
            index: 0,
            store: DataStore(),
            width: window.innerWidth + 'px',
            info: { all: [], hot: [], concern: [], },
            indexInfo: [0, 0, 0],
            height: '',
        }
    },
    created() {
        // 初始化数据
        const initialize = async (type, reception) => {
            const { data: res } = await this.$ajax.get("/api/public", { params: { indexA: 0, indexB: 10, attribute: type } });
            reception.push(...res.message);
        }
        for (let i = 0; i < Object.keys(this.info).length; i++) { initialize(i, this.info[Object.keys(this.info)[i]]) };
    },
    methods: {
        // 滑动切换页面
        slideSwitch(index) { this.index = index },

        // 点击切换页面
        clickSwitch(index) { this.$refs.swipe.to(index, { duration: 0 }) },

        // 跳转到搜索路由
        async search(value) {
            if (!value) { return }
            const { data: search } = await this.$ajax.get('/api/search', { params: { keyword: value, classify: 0 } });
            this.store.searchInfo = [...search.message];
            this.$refs.keywords.keywords('');
            this.$router.push({ name: 'searchpanel' })
        },
    },
    mounted() {
        // 下拉刷新
        this.$watch(() => this.store.refreshNumber, async (newValue, oldValue) => {
            if (newValue != '0' && newValue != '1' && newValue != '2') { return }
            const { data: res } = await this.$ajax.get("/api/public", { params: { indexA: 0, indexB: 10, attribute: newValue } });
            this.info[Object.keys(this.info)[newValue]].unshift(...res.message);
            this.info[Object.keys(this.info)[newValue]] = Array.from(new Set(this.info[Object.keys(this.info)[newValue]].map(obj => obj.releasetime))).map(releasetime => (this.info[Object.keys(this.info)[newValue]].find(obj => obj.releasetime === releasetime)));
        });

        // 滚动到底部自动刷新
        this.$watch(() => this.store.automaticNumber, async (newValue, oldValue) => {
            if (oldValue != '0' && oldValue != '1' && oldValue != '2') { return }
            const { data: res } = await this.$ajax.get("/api/public", { params: { indexA: this.indexInfo[oldValue] += 10, indexB: 10, attribute: oldValue } });
            this.info[Object.keys(this.info)[oldValue]].push(...res.message);
            this.info[Object.keys(this.info)[oldValue]] = Array.from(new Set(this.info[Object.keys(this.info)[oldValue]].map(obj => obj.releasetime))).map(releasetime => (this.info[Object.keys(this.info)[oldValue]].find(obj => obj.releasetime === releasetime)));
        });

        // 初始化高度
        this.height = window.innerHeight - document.querySelector('.Home>header').offsetHeight - document.querySelector('.var-tabs').offsetHeight - this.store.navHeight + 'px';
    },

    components: { SearchBox }
}
</script>

<style scoped>
.Home {
    background-color: white;
    height: 100%;
    position: fixed;
    z-index: 1;
}

.Home>header {
    padding: 1.5rem;
}

.Home>nav {
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