<template>
    <div class="User" :style="{ 'height': height }">
        <var-pull-refresh v-model="refreshing" @refresh="refresh">
            <var-list>
                <!-- 信息栏 -->
                <header>
                    <em></em>
                    <span v-if="store.userInfo[0].username.length <= 2"><router-link to="/userlogin">未登录</router-link></span>
                    <span v-else>{{ store.userInfo[0].username }}</span>
                </header>

                <!-- 展示栏 -->
                <article>
                    <span><a>{{ store.userInfo[0].fan }}</a><a>粉丝</a></span>
                    <span><a>{{ store.userInfo[0].concern }}</a><a>关注</a></span>
                    <span><a>{{ store.userInfo[0].beliked }}</a><a>点赞</a></span>
                </article>

                <!-- 我的服务栏 -->
                <nav class="nav-a nav-c" v-if="navhide()">
                    <p>我的服务</p>
                    <ul>
                        <template v-for="item in serveInfo" :key="item.id">
                            <li v-if="hide(item.if)">
                                <router-link :to="item.to"><em :class="item.class"></em><a>{{ item.text }}</a></router-link>
                            </li>
                        </template>
                    </ul>
                </nav>

                <!-- 我的工具栏 -->
                <nav class="nav-a nav-b">
                    <p>我的工具</p>
                    <ul>
                        <template v-for="items in toolInfo" :key="items.id">
                            <li v-if="items.if" @click="items.click">
                                <router-link :to="items.to"><em :class="items.class"></em><a>{{ items.text }}</a></router-link>
                            </li>
                        </template>
                    </ul>
                </nav>

            </var-list>
        </var-pull-refresh>

        <!-- 弹窗提醒 -->
        <confirm-dialog ref="confirmationbox" @confirm="confirm"></confirm-dialog>
    </div>
</template>

<script>
import { ref } from 'vue';
import { DataStore } from '../store/index.js';

export default {
    name: 'User',
    data() {
        return {
            refreshing: ref(false),
            store: DataStore(),
            height: window.innerHeight + 'px',
            serveInfo: [
                { id: 0, if: 'moduleId0', to: '/userarticles', class: 'iconfont icon-ic_description_file24px', text: '我的文章' },
                { id: 1, if: 'moduleId1', to: '/userfavorites', class: 'iconfont icon-shoucang', text: '我的收藏' },
                { id: 2, if: 'moduleId2', to: '/userlikes', class: 'iconfont icon-dianzan', text: '我的点赞' },
                { id: 3, if: 'moduleId3', to: '/usercomments', class: 'iconfont icon-pinglun1', text: '我的评论' },
            ],
            toolInfo: [
                { id: 0, if: this.hide('moduleId'), to: '/usersettings', class: 'iconfont icon-shezhi', text: '设置' },
                { id: 1, if: this.hide('moduleId4') ? this.hide('loginV') : false, to: '/userlogin', class: 'iconfont icon-denglu', text: '登录' },
                { id: 2, if: this.hide('moduleId4') ? !this.hide('loginV') : false, to: 'user', class: 'iconfont icon-denglu', text: '退出登录', click: () => this.$refs.confirmationbox.quit('block', 'flex', '您确定要退出登录？') },
                { id: 3, if: this.hide('moduleId5'), to: '/publish', class: 'iconfont icon-bianjiwenzhang_huaban', text: '发布文章' },
                { id: 4, if: this.hide('moduleId6'), to: 'user', class: 'iconfont icon-bianjixinxihei', text: '编辑信息' },
                { id: 5, if: this.hide('moduleId7'), to: 'user', class: 'iconfont icon-rizhi', text: '更新日志' },
                { id: 6, if: this.hide('moduleId8'), to: 'user', class: 'iconfont icon-gonggao', text: '更新公告' },
                { id: 7, if: this.hide('moduleId9'), to: 'user', class: 'iconfont icon-88', text: '联系作者', click: () => this.contact() },
                { id: 8, if: this.hide('moduleId10'), to: 'user', class: 'iconfont icon-fengjin', text: '封禁账号' }
            ]
        }
    },
    methods: {
        // 退出登录
        confirm() {
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            localStorage.removeItem('loginV');
            this.store.userInfo = [{ username: '', fan: 0, concern: 0, beliked: 0 }];
        },

        // 联系作者
        contact() { location.href = 'mqqwpa://im/chat?chat_type=wpa&uin=2449579731&version=1&src_type=web&web_src=http:://wpa.b.qq.com' },

        // 下拉刷新
        refresh() { setTimeout(() => { this.refreshing = false; location.reload(); }, 700); },

        // 隐藏功能模块
        hide(TabnName) { return localStorage.getItem(TabnName) == null ? true : false },

        // 整个模块功能隐藏
        navhide() { return localStorage.getItem('moduleId0') && localStorage.getItem('moduleId1') && localStorage.getItem('moduleId2') && localStorage.getItem('moduleId3') ? false : true; }
    },
}
</script>
<script setup>

</script>
<style scoped>
.User {
    background-color: white;
    overflow-y: auto;
}

.custom-alert-title {
    font-size: 20px;
    font-weight: bold;
    color: #333;
}

.User>div>div>header {
    display: flex;
    align-items: center;
    margin: 10rem 3rem 3rem 3rem;
}

.User>div>div>header em {
    width: 10rem;
    height: 10rem;
    border-radius: 100%;
    background: url('../../assets/image/logo.png');
    background-size: 100%;
    color: black;
}

.User>div>div>header span {
    font-size: 2rem;
    margin-left: 1rem;
}

.User>div>div>header span a {
    text-decoration: none;
    color: black;
}

.User>div>div>article {
    display: flex;
    justify-content: space-around;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    border: 1px solid white;
    border-radius: 1rem;
    padding: 1rem;
    margin: 2rem;
}

.User>div>div>article span {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 1.8rem;
}

.User>div>div>article span a {
    margin-top: 0.5rem;
}

.User>div>div>nav {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    border: 1px solid white;
    border-radius: 1rem;
    padding: 1rem;
    margin: 2rem;
}

.User>div>div>nav p {
    font-size: 1.8rem;
    padding: 1rem;
}

.User>div>div>nav ul {
    display: flex;
    list-style: none;
    flex-wrap: wrap;
    margin-top: 0.5rem;
}

.User>div>div>nav ul li {
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1.5rem;
    width: 25%;
}

.User>div>div>nav ul li a {
    text-decoration: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: black;
}

.User>div>div>nav ul li em {
    font-size: 4rem;
    margin-bottom: 0.5rem;
    color: black;
}

.User>div>div>.nav-b {
    margin-bottom: 9rem;
}

.User>div>div>.nav-b ul {
    margin: auto;
}

.User>div>div>.nav-b ul li {
    padding-top: 1rem;
}
</style>