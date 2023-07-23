<template>
    <div class="MessageAlert">
        <div>{{ hintText }}</div>
    </div>
</template>

<script>
export default {
    name: 'MessageAlert',
    data() {
        return {
            hintText: '发送错误！',
            times: null
        }
    },
    methods: {
        // 方法用于触发带有给定文本的动画
        animation(text) {
            this.hintText = text;
            clearTimeout(this.times);
            document.querySelector('.MessageAlert>div').style.transform = 'translate(-50%, 140%)';
            this.times = setTimeout(() => { document.querySelector('.MessageAlert>div').style.transform = 'translate(-50%, -100%)'; }, 1500);
        },

        // 将transform重置，将元素移动回translateY(-100%)
        initial() { document.querySelector('.MessageAlert>div').style.transform = 'translate(-50%, -100%)'; }
    },
}
</script>

<style scoped>
.MessageAlert>div {
    font-size: 1.5rem;
    width: 24rem;
    color: white;
    background-color: #333333;
    position: fixed;
    left: 50%;
    top: 0;
    transform: translate(-50%, -100%);
    will-change: transform;
    padding: 1.2rem;
    border-radius: 1rem;
    z-index: 1;
    transition: 0.5s;
}
</style>