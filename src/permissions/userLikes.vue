<template>
    <div class="userLikes">
        <header><header-navigation title="我的点赞"></header-navigation></header>
        <article-listing :info="info" :height="height" id="5"></article-listing>
    </div>
</template>

<script>
import { DataStore } from '../store/index.js';

export default {
    name: 'userLikes',
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
        const { data: res } = await this.$ajax.get('/authorization/individual', { headers: headers, params: { id: localStorage.getItem('id'), attribute: 0 } });
        this.info.push(...res.message);
    },
    mounted() {
        // 下拉刷新
        this.$watch(() => this.store.refreshNumber, async (newValue, oldValue) => {
            if (newValue != '5') { return }
            const headers = { "Authorization": localStorage.getItem("token") };
            const { data: res } = await this.$ajax.get('/authorization/individual', { headers: headers, params: { id: localStorage.getItem('id'), attribute: 0 } });
            this.info = [...res.message];
        });

        this.height = window.innerHeight - document.querySelector('.userLikes>header').offsetHeight + 'px';
    }
}
</script>

<style scoped>
.userLikes {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    background-color: white;
    z-index: 2;
}

.userLikes>article {
    overflow-y: auto;
}
</style>