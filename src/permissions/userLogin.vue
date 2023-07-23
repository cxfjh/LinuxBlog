<template>
    <!-- 用户登录模块 -->
    <div class="userLogin">
        <article>
            <!-- 头部图标 -->
            <span>
                <img src="../../assets/image/a.png" />
                <img src="../../assets/image/d.png" />
                <img src="../../assets/image/e.png" />
            </span>

            <!-- 用户名和密码输入框 -->
            <p>登录</p>
            <div>
                <span>
                    <em class="iconfont icon-zhanghaozhongxinzhanghaoguanli"></em>
                    <input type="text" placeholder="账号" maxlength="20" v-model.lazy="userinfo[0].email">
                </span>
                <span>
                    <em class="iconfont icon-mima"></em>
                    <input type="password" placeholder="密码" maxlength="20" v-model.lazy="userinfo[0].password">
                </span>
            </div>

            <!-- 底部注册链接与登录按钮 -->
            <footer>
                <span><a>忘记密码?</a><router-link to="/userregistration">注册</router-link></span>
                <a @click="login"><span>登录</span></a>
            </footer>
        </article>

        <!-- 提示框组件 -->
        <message-alert ref="promptbox"></message-alert>
    </div>
</template>

<script>
import { DataStore } from '../store/index.js';

export default {
    name: 'userLogin',
    data() {
        return {
            hintText: '',
            times: null,
            store: DataStore(),
            userinfo: [{ email: '', password: '' }]
        }
    },
    // 适配不同屏幕大小
    mounted() {
        document.querySelector('.userLogin>article>footer').style.marginBottom = window.innerHeight / 42.2 * 10 + 'px';
        document.querySelector('.userLogin>article>div ').style.marginBottom = window.innerHeight / 168.8 * 10 + 'px';
        document.querySelector('.userLogin>article>p ').style.marginBottom = window.innerHeight / 168.8 * 10 + 'px';
        document.querySelector('.userLogin>article>p ').style.marginTop = window.innerHeight / 168.8 * 10 + 'px';
    },
    methods: {
        // 登录发送请求函数
        async login() {
            const input = this.userinfo[0];
            if (!input.email || !input.password) { return this.$refs.promptbox.animation('账号或密码不能为空！'); }
            try {
                const { data: res } = await this.$ajax.post('/api/login', { email: input.email, password: input.password });
                localStorage.setItem('token', res.token);
                localStorage.setItem('name', res.id_name[0].username);
                localStorage.setItem('id', res.id_name[0].id);
                const loginData = [{ 'Authorization': res.token }, { id: res.id_name[0].id }];
                const { data: user } = await this.$ajax.get('/authorization/information', { headers: loginData[0], params: loginData[1] });
                this.store.userInfo = user.message;
                ReturnKey = 'slide-left';
                return this.$router.push({ name: 'user' });
            } catch (error) { return this.$refs.promptbox.animation('账号或密码错误!'); }
        },
    },
}
</script>

<style scoped>
.userLogin {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: white;
    z-index: 2;
    background-color: rgb(157, 191, 243);
}

.userLogin>article {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    background: radial-gradient(ellipse, #bedbff, #fff);
    position: fixed;
    left: 0;
    bottom: 0;
    border-top-right-radius: 6rem;
    border-top-left-radius: 6rem;
    z-index: -1;
}

.userLogin>article>span {
    height: 0;
    width: 100%;
    position: relative;
}


.userLogin>article>span img:nth-child(1) {
    position: absolute;
    top: -20rem;
    left: 50%;
    width: 22rem;
    transform: translateX(-50%);
}

.userLogin>article>span img:nth-child(2) {
    position: absolute;
    width: 10rem;
    top: -30rem;
    left: 0rem;
}

.userLogin>article>span img:nth-child(3) {
    position: absolute;
    width: 10rem;
    top: -35rem;
    right: 0rem;
    transform: translateX(25%);
}

.userLogin>article>p {
    font-size: 3rem;
    margin-bottom: 5rem;
    margin-top: 5rem;
}

.userLogin>article div {
    font-size: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: white;
}

.userLogin>article div {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    border: 1px solid white;
    border-radius: 2rem;
    width: 32rem;
    margin-bottom: 5rem;
}

.userLogin>article div span {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
}

.userLogin>article div span input {
    width: 24rem;
    height: 3.5rem;
    outline: none;
    border: 0;
    font-size: 2rem;
    padding: 1rem;
}

.userLogin>article div span em {
    font-size: 2.5rem;
    margin-right: 0.5rem;
}

.userLogin>article div span:nth-child(1) input {
    border-bottom: 1px solid #bebebe;
}

.userLogin>article footer {
    display: flex;
    width: 32rem;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20rem;
}

.userLogin>article footer>span {
    display: flex;
    flex-direction: column;
    font-size: 1.5rem;
}

.userLogin>article>footer>a>span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 10rem;
    height: 4rem;
    font-size: 2rem;
    background-color: #3a7afe;
    color: white;
    border: 0px;
    border-radius: 0.5rem;
    text-align: center;
}
</style>