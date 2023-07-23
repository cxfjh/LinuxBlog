<template>
    <!-- 搜索框 -->
    <div class="SearchBox" ref="SearchBox">
        <header>
            <input type="text" ref="keywords" placeholder="请输入您要搜索的内容" @keyup.enter="search" v-on:focus="onfocus" v-on:blur="onblur">
            <button @click="search"><span class="iconfont icon-sousuo"></span></button>
        </header>
    </div>
</template>

<script>
export default {
    name: 'SearchBox',
    emits: ['search', 'onfocus', 'onblur'],
    methods: {
        search() { this.$emit('search', this.$refs.keywords.value); }, // 搜索方法
        onfocus() { this.$emit('onfocus', this.$refs.keywords); }, // 输入框获得焦点时触发 onfocus 事件
        onblur() { this.$emit('onblur') }, // 输入框失去焦点时触发 onblur 事件
        keywords(text) { this.$refs.keywords.value = text }, // 修改输入框的值为指定的文本
    },
    // 设置搜索框容器的上边距，使其适应不同屏幕高度
    mounted() { this.$refs.SearchBox.style.marginTop = immersed + 'px'; }
}
</script>

<style scoped>
.SearchBox>header {
    border: 1px solid white;
    border-radius: 1.5rem;
    display: flex;
    align-items: center;
    height: 4rem;
    padding: 0.5rem;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.SearchBox>header>input {
    border: 0px;
    outline: none;
    flex: 1;
    font-size: 1.8rem;
    padding-left: 1rem;
}

.SearchBox>header>button {
    border: 0px;
    background-color: white;
    outline: none;
}

.SearchBox>header>button>span {
    font-size: 3rem;
}
</style>