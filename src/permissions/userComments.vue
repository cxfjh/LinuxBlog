<template>
    <div class="userComments">
        <header><header-navigation title="我的评论"></header-navigation></header>
        <article-listing :info="info" :height="height" id="6"></article-listing>
    </div>
</template>

<script>
import { DataStore } from '../store/index.js';

export default {
    name: 'userComments',
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
        const { data: res } = await this.$ajax.get('/authorization/individual', { headers: headers, params: { id: localStorage.getItem('id'), attribute: 2 } });
        this.info.push(...res.message);
    },
    mounted() {
        // 下拉刷新
        this.$watch(() => this.store.refreshNumber, async (newValue, oldValue) => {
            if (newValue != '6') { return }
            const headers = { "Authorization": localStorage.getItem("token") };
            const { data: res } = await this.$ajax.get('/authorization/individual', { headers: headers, params: { id: localStorage.getItem('id'), attribute: 2 } });
            this.info = [...res.message];
        });

        this.height = window.innerHeight - document.querySelector('.userComments>header').offsetHeight + 'px';
    }
}
</script>

<style scoped>
.userComments {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    right: 0;
    background-color: white;
    z-index: 2;
}

.userComments>article {
    overflow-y: auto;
}
</style>