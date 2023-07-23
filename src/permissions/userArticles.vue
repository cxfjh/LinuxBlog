<template>
    <div class="userArticles">
        <header><header-navigation title="我的文章"></header-navigation></header>
        <article-listing :info="info" :height="height" id="3"></article-listing>
    </div>
</template>

<script>
import { DataStore } from '../store/index.js';

export default {
    name: 'userArticles',
    data() {
        return {
            info: [],
            height: '',
            store: DataStore(),
        }
    },
    async created() {
        // 初始化数据
        const headers = { "Authorization": localStorage.getItem("token") };
        const { data: res } = await this.$ajax.get('/authorization/all', { headers: headers, params: { id: localStorage.getItem('id') } });
        this.info.push(...res.message);
    },
    mounted() {
        // 下拉刷新
        this.$watch(() => this.store.refreshNumber, async (newValue, oldValue) => {
            if (newValue != '3') { return }
            const headers = { "Authorization": localStorage.getItem("token") };
            const { data: res } = await this.$ajax.get('/authorization/all', { headers: headers, params: { id: localStorage.getItem('id') } });
            this.info = [...res.message];
        });

        this.height = window.innerHeight - document.querySelector('.userArticles>header').offsetHeight + 'px';
    }
}
</script>

<style scoped>
.userArticles {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    background-color: white;
    z-index: 2;
}

.userArticles>article {
    overflow-y: auto;
}
</style>