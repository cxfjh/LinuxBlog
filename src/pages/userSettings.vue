<template>
    <div class="userSettings">

        <!-- 头部 -->
        <header><header-navigation title="设置"></header-navigation></header>

        <!-- 功能选项 -->
        <nav>
            <ul>
                <li>
                    <p><span class="iconfont icon-gongnengdingyi"></span><a>自定义功能</a></p>
                    <span class="iconfont icon-31fanhui1" @click="$refs.upmenu.pullUp('block', 0)"></span>
                </li>
                <li>
                    <p><span class="iconfont icon-a-zujiantianchong_huaban1fuben7"></span><a>动画效果</a></p>
                    <div @click="module(0, 'animation', '.userSettings>nav>ul>li>div em', '.userSettings>nav>ul>li div'), animation()"><em></em></div>
                </li>
                <li>
                    <p><span class="iconfont icon-qingchu"></span><a>清除数据</a></p>
                    <a @click="$refs.confirmationbox.quit('block', 'flex', '您确定要清除所有数据？')">清除</a>
                </li>
            </ul>
        </nav>

        <!-- 自定义功能 -->
        <popup-menu ref="upmenu" title="全部功能" count="11">
            <ul class="upmenu">
                <li v-for="item in customization" :key="item.id">
                    <p><span :class='item.class'></span><a>{{ item.text }}</a></p>
                    <div @click="module(item.id, 'moduleId', '.userSettings .upmenu>li>div>em', '.userSettings .upmenu>li>div')"><em></em></div>
                </li>
            </ul>
        </popup-menu>

        <!-- 弹窗对话框 -->
        <confirm-dialog ref="confirmationbox" @confirm="confirm"></confirm-dialog>

    </div>
</template>

<script>
export default {
    name: 'userSettings',
    data() {
        return {
            text: '',
            customization: [
                { id: 0, class: 'iconfont icon-ic_description_file24px', text: '我的文章' },
                { id: 1, class: 'iconfont icon-shoucang', text: '我的收藏' },
                { id: 2, class: 'iconfont icon-dianzan', text: '我的点赞' },
                { id: 3, class: 'iconfont icon-pinglun1', text: '我的评论' },
                { id: 4, class: 'iconfont icon-denglu', text: '登录' },
                { id: 5, class: 'iconfont icon-bianjiwenzhang_huaban', text: '发布文章' },
                { id: 6, class: 'iconfont icon-bianjixinxihei', text: '编辑信息' },
                { id: 7, class: 'iconfont icon-rizhi', text: '更新日志' },
                { id: 8, class: 'iconfont icon-gonggao', text: '更新公告' },
                { id: 9, class: 'iconfont icon-88', text: '联系作者' },
                { id: 10, class: 'iconfont icon-fengjin', text: '封禁账号' },
            ]
        }
    },
    methods: {
        // 点击开关按钮
        module(index, module, distance, color) {
            if (localStorage.getItem(`${module}${index}`) == null) {
                document.querySelectorAll(distance)[index].style.right = '2rem';
                document.querySelectorAll(distance)[index].style.backgroundColor = '#fff';
                document.querySelectorAll(color)[index].style.backgroundColor = '#999999';
                localStorage.setItem(`${module}${index}`, true);
            } else {
                document.querySelectorAll(distance)[index].style.right = '0px';
                document.querySelectorAll(distance)[index].style.backgroundColor = '#3a7afe';
                document.querySelectorAll(color)[index].style.backgroundColor = '#89affe';
                localStorage.removeItem(`${module}${index}`);
            }
        },

        // 动画效果开关
        animation() {
            if (localStorage.getItem('animation0') == null) { return }
            localStorage.setItem('animation0', 'animation0');
        },

        // 清除数据
        confirm() {
            localStorage.clear();
            this.$router.push({ name: 'home' });
            setTimeout(() => { location.reload() }, 100);
        },
    },
    mounted() {
        // 渲染上次记录
        for (let i = 0; i < 12; i++) {
            if (localStorage.getItem(`moduleId${i}`)) {
                localStorage.removeItem(`moduleId${i}`);
                this.module(i, 'moduleId', '.userSettings .upmenu>li>div>em', '.userSettings .upmenu>li>div');
            }
        }
        if (localStorage.getItem('animation0')) {
            localStorage.removeItem('animation0');
            this.module(0, 'animation', '.userSettings>nav>ul>li>div em', '.userSettings>nav>ul>li div');
        }
    }
}
</script>

<style scoped>
.userSettings {
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 2;
}

.userSettings>nav>ul {
    padding: 2rem;
}

.userSettings>nav>ul>li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 2rem;
    border-bottom: 1px solid #d8d8d8;
    padding: 1.5rem;
}

.userSettings>nav>ul>li>p {
    display: flex;
    align-items: center;
}

.userSettings>nav>ul>li>p>span {
    font-size: 2.5rem;
    margin-right: 1rem;
}

.userSettings>nav>ul>li>span {
    transform: rotate(180deg);
    font-size: 2rem;
}

.userSettings>nav>ul>li>div {
    display: flex;
    width: 3.5rem;
    height: 1.5rem;
    background-color: #89affe;
    border-radius: 20rem;
    position: relative;

}

.userSettings>nav>ul>li>div>em {
    width: 2rem;
    height: 2rem;
    background-color: #3a7afe;
    border-radius: 100%;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.3s ease;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.userSettings>nav>ul>li>a {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5rem;
    height: 3rem;
    background-color: #3a7afe;
    border-radius: 1rem;
    color: white;
}

.userSettings .upmenu {
    padding: 0rem 2rem;
    overflow-y: auto;
    height: 100%;
}

.userSettings .upmenu>li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 2rem;
    border-bottom: 1px solid #d8d8d8;
    padding: 1.5rem;
}

.userSettings .upmenu>li:nth-child(1) {
    padding-top: 0px;
}

.userSettings .upmenu>li>p {
    display: flex;
    align-items: center;
}

.userSettings .upmenu>li>p>span {
    font-size: 2.5rem;
    margin-right: 2rem;
}

.userSettings .upmenu>li>div {
    display: flex;
    width: 3.5rem;
    height: 1.5rem;
    background-color: #89affe;
    border-radius: 20rem;
    position: relative;
}

.userSettings .upmenu>li>div>em {
    width: 2rem;
    height: 2rem;
    background-color: #3a7afe;
    border-radius: 100%;
    position: absolute;
    right: 0px;
    top: 50%;
    transform: translateY(-50%);
    transition: all 0.3s ease;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
}

.userSettings>.masks {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: black;
    opacity: 0.5;
    z-index: 1;
    display: none;
}
</style>