<template>
    <div class="ArticleBody">
        <!-- 导航条 -->
        <header><header-navigation title=""></header-navigation></header>

        <!-- 头部+内容 -->
        <article>
            <span>
                <p>{{ store.essayInfo[0].title }}</p><a>{{ store.essayInfo[0].releasetime }}</a>
            </span>
            <div>
                <p><em></em><a>{{ store.essayInfo[0].author }}</a></p>
                <div @click="concern"><a type="primary">{{ store.judgmentInfo[0].concern === '1' ? '已关注' : '关注' }}</a></div>
            </div>
            <section>
                <pre>{{ store.essayInfo[0].content }}</pre>
            </section>
        </article>

        <!-- 底部栏 -->
        <footer><bookmark-actions ref="functionBar" @comment="$refs.upmenu.pullUp('block', 0)" @like="operate('likes', '/authorization/like')" @collection="operate('collection', '/authorization/collection')" @publish="publish" v-bind="barProps" @onfocus="focus"></bookmark-actions></footer>

        <!-- 评论区 -->
        <popup-menu ref="upmenu" title="全部评论" :count="store.essayInfo[0].comments">
            <ul class="up-menu">
                <li v-for="item in store.appraiseInfo" :key="item.id">
                    <em></em>
                    <div>
                        <p>{{ item.evaluators }}</p><span>{{ item.comments }}</span><a>{{ item.commentstime }}</a>
                    </div>
                </li>
            </ul>
        </popup-menu>

        <!-- 弹窗动画 -->
        <message-alert ref="promptbox"></message-alert>
    </div>
</template>

<script>
import { DataStore } from '../../store/index.js';

export default {
    name: 'ArticleBody',
    data() { return { store: DataStore(), } },
    methods: {
        // 获取评论焦点判断用户是否登录
        focus() { if (localStorage.getItem('token') == null) { return this.$refs.promptbox.animation('暂未登录!') }; },

        // 发布评论
        async publish(value) {
            if (localStorage.getItem('token') == null) { return this.$refs.promptbox.animation('暂未登录!') }
            const headers = { 'Authorization': localStorage.getItem('token') };
            const data = {
                essayID: localStorage.getItem('indexID'),
                evaluators: localStorage.getItem('name'),
                evaluatorsID: localStorage.getItem('id'),
                articleauthorID: this.store.essayInfo[0].authorID,
                comments: value.replace(/\s+/g, '')
            };
            const { data: res } = await this.$ajax.post('/authorization/comments', data, { headers });
            if (res.status !== 200) { return this.$refs.promptbox.animation('评论失败!'); }
            this.store.essayInfo[0].comments = this.store.essayInfo[0].comments * 1 + 1;
            this.barProps = { comments: this.store.essayInfo[0].comments };
            this.$refs.functionBar.empty();
        },

        // 点赞文章和收藏文章
        async operate(operate, postUrl) {
            if (localStorage.getItem('token') == null) { return this.$refs.promptbox.animation('暂未登录!') }
            const headers = { 'Authorization': localStorage.getItem('token') };
            const data = {
                essayID: localStorage.getItem('indexID'),
                evaluatorsID: localStorage.getItem('id'),
                articleauthorID: this.store.essayInfo[0].authorID,
                [operate]: this.store.judgmentInfo[0][operate] === '1' ? '0' : '1'
            };
            const { data: res } = await this.$ajax.post(postUrl, data, { headers });
            if (res.status === 200) { this.store.judgmentInfo[0][operate] = this.store.judgmentInfo[0][operate] === '1' ? '0' : '1'; }
            this.store.essayInfo[0][operate] = this.store.judgmentInfo[0][operate] === '1' ? this.store.essayInfo[0][operate] * 1 + 1 : this.store.essayInfo[0][operate] - 1;
        },

        // 关注作者
        async concern() {
            if (localStorage.getItem('token') == null) { return this.$refs.promptbox.animation('暂未登录!') }
            const headers = { 'Authorization': localStorage.getItem('token') };
            const data = { evaluatorsID: localStorage.getItem('id'), articleauthorID: this.store.essayInfo[0].authorID, concern: this.store.judgmentInfo[0].concern === '1' ? '0' : '1' };
            const { data: res } = await this.$ajax.post('/authorization/concern', data, { headers });
            if (res.status === 200) { return this.store.judgmentInfo[0].concern = this.store.judgmentInfo[0].concern === '1' ? '0' : '1'; }
        },

        // 出场动画
        appear() {
            document.querySelector('.ArticleBody').style.transition = 'transform 0.3s ease-in-out';
            document.querySelector('.ArticleBody').style.transform = 'translateX(0%)';
        },

        // 移出动画
        disappear() {
            document.querySelector('.ArticleBody').style.transition = 'transform 0.3s ease-in-out';
            document.querySelector('.ArticleBody').style.transform = 'translateX(100%)';
            this.$refs.functionBar.empty();
        }
    },

    // 适配屏幕大小
    mounted() { document.querySelector('.ArticleBody>article').style.height = window.innerHeight - document.querySelector('.ArticleBody>header').offsetHeight * 2 + immersed + 'px'; },

    computed: {
        // 功能栏颜色
        barProps() {
            const { essayInfo, judgmentInfo } = this.store;
            return {
                likes: essayInfo[0].likes,
                collections: essayInfo[0].collection,
                comments: essayInfo[0].comments,
                Vflikes: judgmentInfo[0].likes,
                Vfcollections: judgmentInfo[0].collection,
            }
        }
    },
    beforeUpdate() { this.$refs.promptbox.initial(); },
}
</script>

<style scoped>
.ArticleBody {
    width: 100%;
    height: 100%;
    position: fixed;
    transform: translateX(100%);
    will-change: transform;
    top: 0;
    z-index: 3;
    background-color: white;
}

.ArticleBody>article {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.ArticleBody>article>span {
    display: flex;
    flex-direction: column;
    padding: 1rem 2rem;
    font-size: 2.2rem;
}

.ArticleBody>article>span a {
    font-size: 1.3rem;
    margin-top: 0.5rem;
    margin-left: 0.3rem;
}

.ArticleBody>article>span p {
    word-wrap: break-word;
    word-break: break-all;
    overflow-wrap: break-word;
}

.ArticleBody>article>div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
}

.ArticleBody>article>div>p {
    display: flex;
    align-items: center;
    font-size: 2rem;
    word-wrap: break-word;
    word-break: break-all;
    overflow-wrap: break-word;
}

.ArticleBody>article>div>p em {
    width: 5rem;
    height: 5rem;
    border-radius: 100%;
    margin-right: 1rem;
    background-image: url('../../../assets/image/logo.png');
    background-size: 100%;
}

.ArticleBody>article>div>div>a {
    display: flex;
    width: 8rem;
    height: 3.5rem;
    font-size: 2rem;
    color: white;
    align-items: center;
    justify-content: center;
    border-radius: 0.5rem;
    background-color: #3a8dff;
}

.ArticleBody>article>section {
    overflow: auto;
}

.ArticleBody>article>section>pre {
    font-size: 1.8rem;
    padding: 1rem 2rem;
    white-space: pre-wrap;
    word-wrap: break-word;

}

.up-menu {
    list-style: none;
    overflow-y: auto;
    height: 95%;
}

.up-menu li {
    display: flex;
    align-items: center;
    margin-bottom: 2rem;
    margin-left: 2rem;
}

.up-menu>li>em {
    display: flex;
    min-width: 4rem;
    height: 4rem;
    background-image: url('../../../assets/image/logo.png');
    background-size: 100%;
    border-radius: 100%;
}

.up-menu li p {
    font-size: 1.5rem;
    color: #7b7b7b;
}

.up-menu li div {
    margin-left: 1rem;
    display: flex;
    flex-direction: column;
    font-size: 2rem;
    word-wrap: break-word;
    word-break: break-all;
    overflow-wrap: break-word;
}

.up-menu li div a {
    font-size: 1.2rem;
    color: #7b7b7b;
}
</style>