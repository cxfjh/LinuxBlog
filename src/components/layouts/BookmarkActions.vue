<template>
    <!-- 评论点赞收藏操作组件 -->
    <div class="BookmarkActions">
        <footer>
            <!-- 发布评论 -->
            <span @click="onfocus">
                <input type="text" placeholder="请分享您的想法" ref="publish" @keyup.enter="publish">
                <a class="iconfont icon-daohang" @click="publish"></a>
            </span>

            <!-- 操作按钮 -->
            <div>
                <!-- 点赞按钮 -->
                <span @click="like">
                    <em class="iconfont icon-dianzan1" :style="{ color: Vflikes === '1' ? 'red' : '#bfbfbf' }"></em>
                    <a>{{ likes }}</a>
                </span>
                <!-- 收藏按钮 -->
                <span @click="collection">
                    <em class="iconfont icon-shoucang1" :style="{ color: Vfcollections === '1' ? 'red' : '#bfbfbf' }"></em>
                    <a>{{ collections }}</a>
                </span>
                <!-- 评论按钮 -->
                <span @click="comment">
                    <em class="iconfont icon-pinglun1"></em>
                    <a>{{ comments }}</a>
                </span>
            </div>
        </footer>
    </div>
</template>

<script>
export default {
    name: "BookmarkActions",
    props: ['likes', 'collections', 'comments', 'Vflikes', 'Vfcollections', 'Vfcollections'],
    emits: ['publish', 'like', 'collection', 'comment', 'onfocus'],
    methods: {
        publish() { this.$emit('publish', this.$refs.publish.value); },// 发布方法
        like() { this.$emit('like') },// 点赞方法
        collection() { this.$emit('collection') },// 点赞方法
        comment() { this.$emit('comment') },// 点赞方法
        empty() { this.$refs.publish.value = ''; },// 清空发布输入框的内容
        onfocus() { this.$emit('onfocus') }// 焦点事件
    }
}
</script>

<style scoped>
.BookmarkActions>footer {
    position: fixed;
    width: 100%;
    bottom: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #EBEBEB;
    background-color: white;
}

.BookmarkActions>footer>span {
    padding: 0.5rem 1rem;
    background-color: white;
    margin: 0.5rem 1rem;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.BookmarkActions>footer>span input {
    border: 0px;
    outline: none;
    width: 15rem;
    height: 3rem;
    font-size: 1.5rem;
}

.BookmarkActions>footer>span a {
    font-size: 2rem;
    padding-right: 0.5rem;
}

.BookmarkActions>footer>div {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
}

.BookmarkActions>footer>div span {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 1.5rem;
    font-size: 1.8rem;
}

.BookmarkActions>footer>div span em {
    font-size: 2.5rem;
    color: rgb(191, 191, 191);
}

.BookmarkActions>footer>div span:nth-child(3) em {
    color: black;
}
</style>