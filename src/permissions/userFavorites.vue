<template>
    <div class="userFavorites">
        <header><header-navigation title="我的收藏"></header-navigation></header>
        <article-listing :info="info" :height="height" id="4"></article-listing>
    </div>
</template>

<script>
import { DataStore } from '../store/index.js';

export default {
    name: 'userFavorites',
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
        const { data: res } = await this.$ajax.get('/authorization/individual', { headers: headers, params: { id: localStorage.getItem('id'), attribute: 1 } });
        this.info.push(...res.message);
    },
    mounted() {
        // 下拉刷新
        this.$watch(() => this.store.refreshNumber, async (newValue, oldValue) => {
            if (newValue != '4') { return }
            const headers = { "Authorization": localStorage.getItem("token") };
            const { data: res } = await this.$ajax.get('/authorization/individual', { headers: headers, params: { id: localStorage.getItem('id'), attribute: 1 } });
            this.info = [...res.message];
        });

        this.height = window.innerHeight - document.querySelector('.userFavorites>header').offsetHeight + 'px';
    }
}
</script>

<style scoped>
.userFavorites {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    background-color: white;
    z-index: 2;
}

.userFavorites>article {
    overflow-y: auto;
}
</style>