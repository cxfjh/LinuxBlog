<template>
    <!-- ConfirmDialog 组件的根元素 -->
    <div class="ConfirmDialog">

        <!-- 遮罩层，当点击遮罩层时触发 quit 方法 -->
        <div class="masks" @click="quit('none', 'none')"></div>

        <!-- 弹窗内容 -->
        <div class="popups">
            <p>提示</p>
            <a>{{ text }}</a>
            <span>
                <a @click="quit('none', 'none')">取消</a>
                <a @click="confirm">确认</a>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ConfirmDialog',
    data() { return { text: '' } },
    emits: ['confirm'],
    methods: {
        // 关闭对话框方法
        quit(hide, display, text) {
            this.text = text;
            document.querySelector('.ConfirmDialog>.masks').style.display = hide;
            document.querySelector('.ConfirmDialog>.popups').style.display = display;
        },
        // 确认按钮方法
        confirm() {
            this.quit('none', 'none')
            this.$emit('confirm');
        }
    }
}
</script>

<style scoped>
.ConfirmDialog>.masks {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: black;
    opacity: 0.5;
    z-index: 2;
    display: none;
}

.ConfirmDialog>.popups {
    width: 25rem;
    height: 13rem;
    padding: 2rem;
    background-color: white;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
    font-size: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: black;
    border-radius: 1rem;
    display: none;
}

.ConfirmDialog>.popups>a {
    color: #141414;
}

.ConfirmDialog>.popups>span {
    display: flex;
    justify-content: flex-end;
    color: #2651e9;
}

.ConfirmDialog>.popups>span a:nth-child(1) {
    margin-right: 2rem;
}
</style>