<template>
    <!-- 用户注册模块 -->
    <div class="userRegistration">
        <article>
            <span><img src="../../assets/image/b.png" /></span>
            <p>注册</p>
            <div>
                <a></a>
                <span>
                    <em class="iconfont icon-zhanghaozhongxinzhanghaoguanli"></em>
                    <input type="text" placeholder="用户名" :onblur="inspection(0, /^[\u4e00-\u9fa5a-zA-Z0-9@!.#]{2,16}$/, userinfo[0].username)" v-model.lazy="userinfo[0].username" maxlength="16">
                    <a>请输入2-16位中文、字母、数字或@-!.#</a>
                </span>
                <span>
                    <em class="iconfont icon-youxiang"></em>
                    <input type="text" placeholder="账号" :onblur="inspection(1, /^[1-9][0-9]{4,10}$/, userinfo[0].email)" v-model.lazy="userinfo[0].email" maxlength="10">
                    <a>请输入正确的QQ号</a>
                </span>
                <span>
                    <em class="iconfont icon-mima"></em>
                    <input type="password" placeholder="密码" :onblur="inspection(2, /^[a-zA-Z0-9@!.#]{6,20}$/, userinfo[0].password)" v-model.lazy="userinfo[0].password" maxlength="20">
                    <a>请输入6-20个字符字母、数字或@!.#</a>
                </span>
                <span v-if="verify">
                    <em class="iconfont icon-mima"></em>
                    <input type="password" placeholder="确认密码" v-model.lazy="userinfo[0].passwordV" maxlength="20">
                </span>
                <span v-else>
                    <em class="iconfont icon-youxiang"></em>
                    <input type="password" placeholder="验证码" v-model.lazy="userinfo[0].captcha" maxlength="10">
                </span>
                <span>
                    <p @click="captcha" v-if="verify">发送验证码</p>
                    <p @click="userRegistration" v-else>注册/登录</p>
                </span>
            </div>
        </article>
        <message-alert ref="promptbox"></message-alert>
    </div>
</template>

<script>
import { DataStore } from '../store/index.js';

export default {
    name: 'userRegistration',
    data() {
        return {
            verify: true,
            hintText: '',
            times: '',
            store: DataStore(),
            userinfo: [{ username: '', email: '', password: '', passwordV: '', captcha: '' }]
        }
    },
    methods: {
        // 发送验证码
        async captcha() {
            const input = this.userinfo[0];
            if (input.password !== input.passwordV) { return this.$refs.promptbox.animation('两次输入的密码不匹配！'); }
            if (!input.username || !input.email || !input.password) { return this.$refs.promptbox.animation('用户名或账号与密码不能为空！'); }
            try {
                const { data: res } = await this.$ajax.post('/api/captcha', { username: input.username, email: input.email, password: input.password });
                if (res.message === "用户名或账号被占用！") { return this.$refs.promptbox.animation(res.message); }
                document.querySelector('.userRegistration>article>div>a').style.zIndex = 2;
                this.verify = false;
                return this.$refs.promptbox.animation(res.message);
            } catch (error) { return this.$refs.promptbox.animation('格式错误！'); }
        },

        // 注册成功直接登录发送请求函数
        async userRegistration() {
            try {
                // 注册
                const input = this.userinfo[0];
                await this.$ajax.post('/api/reguser', { username: input.username, email: input.email, password: input.password, captcha: input.captcha });
                // 登录
                const { data: loginData } = await this.$ajax.post('/api/login', { email: input.email, password: input.password });
                localStorage.setItem('token', loginData.token);
                localStorage.setItem('name', loginData.id_name[0].username);
                localStorage.setItem('id', loginData.id_name[0].id);
                // 获取个人信息
                const information = [{ 'Authorization': loginData.token }, { id: loginData.id_name[0].id }];
                const { data: user } = await this.$ajax.get('/authorization/information', { headers: information[0], params: information[1] });
                this.store.userInfo = user.message;
                // 跳转组件
                ReturnKey = 'slide-left';
                return this.$router.push({ name: 'user' });
            } catch (error) { return this.$refs.promptbox.animation('验证码错误！'); }
        },

        // 检验数据并提示
        inspection(index, regex, attribute) {
            const userRegistrationInspection = document.querySelectorAll('.userRegistration>article>div>span');
            // 如果没有提供 attribute 参数，则直接返回
            if (!attribute) { return }
            // 判断 attribute 是否符合 regex 规则
            if (!regex.test(attribute)) {
                userRegistrationInspection[index].querySelector('a').style.display = 'block';
                userRegistrationInspection[index].style.boxShadow = '0 0 5px 0 #ef0e0e';
            } else {
                userRegistrationInspection[index].querySelector('a').style.display = 'none';
                userRegistrationInspection[index].style.boxShadow = '2px 2px 5px rgba(0, 0, 0, 0.3)';
                attribute = attribute.replace(/\s/g, '');
            }
        },
    },
}
</script>

<style scoped>
.userRegistration {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background-color: white;
    z-index: 2;
    background-color: rgb(215 231 255);
}

.userRegistration>article {
    display: flex;
    position: relative;
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

.userRegistration>article>span {
    width: 20rem;
    height: 20rem;
    background-color: rgb(186, 152, 244);
    position: absolute;
    top: -25rem;
    transform: rotate(45deg);
    border-radius: 20%;
}


.userRegistration>article>span img {
    height: 140%;
    transform: rotate(-45deg);
}

.userRegistration>article>p {
    font-size: 3rem;
    margin-bottom: 4rem;
    margin-top: 4rem;
}

.userRegistration>article>div {
    font-size: 1.5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.userRegistration>article>div>a {
    display: flex;
    position: absolute;
    width: 100%;
    height: 22rem;
    z-index: -1;
}

.userRegistration>article>div>span {
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
    border-radius: 1.5rem;
    background-color: white;
    margin-bottom: 2rem;
    position: relative;
}

.userRegistration>article>div>span:nth-child(6) {
    margin-top: 3rem;
}

.userRegistration>article>div>span:nth-child(6) p {
    padding: 1.5rem 0;
    font-size: 2rem;
    background-color: #3a7afe;
    color: white;
    border-radius: 1rem;
    width: 30rem;
    text-align: center;
}

.userRegistration>article>div>span a {
    font-size: 1.5rem;
    display: none;
    position: absolute;
    bottom: -1.8rem;
    color: red;
    left: 0;
}

.userRegistration>article>div>span em {
    padding: 0rem 1rem;
    font-size: 2rem;
}

.userRegistration>article>div>span input {
    width: 24rem;
    height: 3.5rem;
    outline: none;
    border: 0;
    font-size: 2rem;
    padding: 1rem;
    border-radius: 1.5rem;
}
</style>