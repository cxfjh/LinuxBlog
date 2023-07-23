<template>
    <div class="Publish" :style="{ 'width': width }">
        <!-- 头部 -->
        <header><header-navigation title="文章编辑"></header-navigation></header>

        <!-- 内容输入区 -->
        <article>
            <input type="text" placeholder="请输入标题...(5到100左右字符)" v-model.value="title">
            <textarea maxlength="10000" placeholder="请输入正文...(10到1000左右字符)" v-model.value="content"></textarea>
        </article>

        <!-- 底部内容 -->
        <footer>
            <span><input type="text" readonly unselectable="on" :value="content.length + '/10000'"></span>
            <div><button @click="handoff">{{ hintText }}</button><button @click="publish">发布</button></div>
        </footer>

        <!-- 弹窗提醒 -->
        <div><message-alert ref="promptbox"></message-alert></div>
    </div>
</template>

<script>
export default {
    name: 'Publish',
    data() {
        return {
            content: '',
            title: '',
            privacy: 0,
            hintText: '全部人可见',
            width: window.innerWidth + 'px'
        }
    },
    methods: {
        // 发布文章
        async publish() {
            try {
                const data = {
                    author: localStorage.getItem('name'),
                    title: this.title,
                    content: this.content,
                    authorID: localStorage.getItem('id'),
                    privacy: this.privacy
                };
                await this.$ajax.post('/authorization/publish', data, { headers: { 'Authorization': localStorage.getItem('token') } });
                this.content = this.title = '';
                return setTimeout(() => { this.$refs.promptbox.animation('发布成功!'); }, 10);
            } catch (error) { return this.$refs.promptbox.animation('发布失败!'); }
        },

        // 切换可见人
        handoff() {
            this.privacy = this.privacy == 0 ? 1 : 0;
            this.hintText = this.privacy == 0 ? '全部人可见' : '仅自己可见';
        }
    },

    // 更新前消除弹窗
    beforeUpdate() { this.$refs.promptbox.initial(); }
}
</script>

<style scoped>
.Publish {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    z-index: 2;
}

.Publish>article {
    display: flex;
    flex-direction: column;
    flex: 1;
    padding: 1.5rem 2rem;
}

.Publish>article input {
    height: 5rem;
    font-size: 2rem;
    border: 0px;
    border-bottom: 1px solid #c4b1b1;
    outline: none;
    margin-bottom: 1.5rem;
}

.Publish>article textarea {
    font-size: 1.8rem;
    border: 0px;
    outline: none;
    background-color: white;
    flex: 1;
}

.Publish>footer {
    display: flex;
    flex-direction: column;
    width: 100%;
    font-size: 1.5rem;
    background-color: white;
}

.Publish>footer>span {
    display: flex;
    justify-content: flex-end;
    margin-right: 3rem;
}

.Publish>footer>span input {
    width: 15rem;
    text-align: center;
    border: 0px;
    border-bottom: 1px solid gray;
    font-size: 2rem;
    outline: none;
}

.Publish>footer>div {
    display: flex;
    justify-content: space-between;
}

.Publish>footer>div>button {
    font-size: 2rem;
    background-color: rgb(58, 141, 255);
    color: white;
    border: 0px;
    outline: none;
    width: 15rem;
    height: 4rem;
    line-height: 4rem;
    border-radius: 0.5rem;
    margin: 1.5rem 3rem;
}
</style>