<template>
    <div class="PopupMenu">
        <div class="customization">
            <p>{{ title }}:{{ count }}</p>
            <div>
                <slot></slot>
            </div>
        </div>
        <div class="masks" @click="pullUp('none', 105)"></div>
    </div>
</template>

<script>
export default {
    name: 'PopupMenu',
    props: ['title', 'count'],
    methods: {
        // 设置遮罩层的显示状态
        pullUp(hideDisplay, YiAxis) {
            document.querySelector('.PopupMenu>.masks').style.display = hideDisplay;
            document.querySelector('.PopupMenu>.customization').style.transform = `translateY(${YiAxis}%)`;
        },
    },
    // 根据窗口高度设置菜单高度的方法
    mounted() { document.querySelector('.PopupMenu>.customization>div').style.height = window.innerHeight / 2 + 'px'; }
}
</script>

<style scoped>
.PopupMenu>.masks {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background-color: black;
    opacity: 0.5;
    z-index: 1;
    display: none;
}

.PopupMenu>.customization {
    width: 100%;
    background-color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    transform: translateY(105%);
    will-change: transform;
    transition: 0.5s;
    z-index: 2;
}

.PopupMenu>.customization>p {
    display: flex;
    align-items: center;
    font-size: 2rem;
    padding: 2rem 1rem;
    word-break: break-all;
    overflow-wrap: break-word;
}

.PopupMenu>.customization>div {
    width: 100%;
    overflow: scroll;
}
</style>