<template>
    <div class="ArticleListing">
        <var-pull-refresh v-model="refreshing" @refresh="refresh">
            <var-list>
                <nav>
                    <ul ref="myDiv" :style="{ 'height': height }">
                        <li v-for="item in info" :key="item.id" @click="key(item.id)">
                            <div>
                                <em></em>
                                <p><span>{{ item.author }}</span><a>{{ item.releasetime }}</a></p>
                            </div>
                            <p>{{ item.title }}</p>
                            <article><em><img :src="item.image" alt="" /></em></article>
                            <footer>
                                <p><span class="iconfont icon-dianzan"><a>{{ item.likes }}</a></span></p>
                                <p><span class="iconfont icon-shoucang"><a>{{ item.collection }}</a></span></p>
                                <p><span class="iconfont icon-pinglun1"><a>{{ item.comments }}</a></span></p>
                            </footer>
                        </li>
                        <span>已经到底了...</span>
                    </ul>
                </nav>
            </var-list>
        </var-pull-refresh>
    </div>
</template>

<script>
import { DataStore } from '../../store/index.js';
import { ref } from 'vue';

export default {
    name: 'ArticleListing',
    data() {
        return {
            store: DataStore(),
            refreshing: ref(false),
        }
    },
    props: ['info', 'height', 'publicinfo', 'id'],
    methods: {
        // 点击单个文章获取文章的全部信息
        async key(id) {
            localStorage.setItem('indexID', id);
            // 获取单个公共文章
            const { data: content } = await this.$ajax.get("/api/public", { params: { essayID: id, indexA: 0, indexB: 1, attribute: 0 } });
            this.store.essayInfo = content.message;
            // 获取公共文章详细评论
            const { data: comments } = await this.$ajax.get("/api/detailed", { params: { essayID: id } });
            this.store.appraiseInfo = comments.message;
            // 移入组件展示文章
            this.store.fullinformation = 1;
            // 判断用户是否登录展示点赞收藏效果
            if (localStorage.getItem("token") == null) { return };
            const headers = { "Authorization": localStorage.getItem("token") };
            const data = { essayID: id, evaluatorsID: localStorage.getItem('id'), authorID: content.message[0].authorID, };
            const { data: res } = await this.$ajax.get("/authorization/judgment", { headers: headers, params: data });
            this.store.judgmentInfo = res.message;
        },

        // 下拉刷新
        refresh() {
            setTimeout(async () => {
                this.refreshing = false;
                this.store.refreshNumber = new Date().getTime();
            }, 500);
            this.store.refreshNumber = this.id;
        }
    },

    mounted() {
        // 滚动到底部自动刷新
        const myDiv = this.$refs.myDiv;
        let timer = null;
        myDiv.addEventListener("scroll", async () => {
            if (!timer) {
                timer = setTimeout(async () => {
                    if (myDiv.scrollTop + myDiv.clientHeight <= myDiv.scrollHeight - 250) { return timer = null; }
                    this.store.automaticNumber = this.id;
                    // const { data: res } = await this.$ajax.get("/api/public", { params: { indexA: this.index += 10, indexB: 10, attribute: this.type } });
                    // this.articleinfo.push(...res.message);
                    timer = null;
                }, 500);
                this.store.automaticNumber = new Date().getTime();
            }
        });
    }
}
</script>

<style scoped>
.ArticleListing nav>ul {
    overflow-y: auto;
}

.ArticleListing nav>ul>li {
    display: flex;
    flex-direction: column;
    margin: 1rem 2rem;
    padding: 1rem;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    border-radius: 2rem;
    position: relative;
}

.ArticleListing nav>ul li>a {
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
}

.ArticleListing nav>ul>li>div {
    display: flex;
    align-items: center;
    margin: 1rem 1rem 0;
}

.ArticleListing nav>ul>li>div em {
    width: 5rem;
    height: 5rem;
    border-radius: 100%;
    background: url('../../../assets/image/logo.png') no-repeat;
    background-size: 100%;
}

.ArticleListing nav>ul>li>div p {
    display: flex;
    flex-direction: column;
    margin: 1rem;
}

.ArticleListing nav>ul>li>div p span {
    font-size: 1.5rem;
}

.ArticleListing nav>ul>li>p {
    font-size: 1.8rem;
    margin: 1rem 1rem 0;
    word-wrap: break-word;
    word-break: break-all;
    overflow-wrap: break-word;
}

.ArticleListing nav>ul>li>article {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 1rem 1rem 0;
}

.ArticleListing nav>ul>li>article em {
    max-height: 13rem;
    width: 100%;
    display: flex;
    justify-content: center;
}

.ArticleListing nav>ul>li>article em img {
    max-height: 100%;
}

.ArticleListing nav>ul>li>footer {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 1rem;
}

.ArticleListing nav>ul>li>footer span {
    font-size: 2.2rem;
}

.ArticleListing nav>ul>span {
    width: 100%;
    display: flex;
    margin: 2rem 0;
    justify-content: center;
    font-size: 2rem;
}
</style>