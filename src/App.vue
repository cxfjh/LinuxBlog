<template>
  <div class="Apps">
    <!-- 路由组件 -->
    <router-view v-slot="{ Component }"> <!-- 路由视图 -->
      <transition :name="transitionName"> <!-- 过渡效果 -->
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>

    <!-- 导航栏 -->
    <footer><bottom-navigation></bottom-navigation></footer>

    <!-- 详细内容 -->
    <article-body ref="information"></article-body>
  </div>
</template>

<script>
import BottomNavigation from './components/layouts/BottomNavigation.vue';
import ArticleBody from './components/article/ArticleBody.vue';
import { DataStore } from './store/index';

export default {
  name: 'MyApp',
  data() { return { store: DataStore(), transitionName: 'slide-right', } },
  async created() {
    // 移动客户端返回手势
    document.addEventListener('plusready', () => {
      var first = null;
      plus.key.addEventListener('backbutton', () => {
        if (this.store.fullinformation == 1) {
          this.$refs.information.disappear();
          return this.store.fullinformation = 0;
        }
        if (!first) {
          first = new Date().getTime();
          var urls = location.hash.split('/')[1];
          if (urls == "NewD" || urls == "StartScan") {
            plus.runtime.quit();
          } else {
            ReturnKey = 'slide-left';
            window.history.back();
          }
          setTimeout(function () { first = null; }, 1000);
        } else { if (new Date().getTime() - first < 500) { plus.runtime.quit(); } }
      });
    });

    // 初始化用户数据
    this.store.windowHeight = window.innerHeight + 'px';
    if (localStorage.getItem('token') != null) {
      const loginData = [{ 'Authorization': localStorage.getItem('token') }, { id: localStorage.getItem('id') }];
      const { data: userinfo } = await this.$ajax.get('/authorization/information', { headers: loginData[0], params: loginData[1] });
      if (userinfo.status !== 200) {
        localStorage.removeItem('id');
        localStorage.removeItem('name');
        localStorage.removeItem('loginV')
        return localStorage.removeItem('token');
      }
      this.store.userInfo = userinfo.message;
      localStorage.setItem('loginV', false);
    }
  },

  // 侦听内容详细页面
  watch: {
    'store.fullinformation'(newQuestion, oldQuestion) {
      if (newQuestion != 0) { return this.$refs.information.appear(); };
      this.$refs.information.disappear();
    }
  },

  mounted() {
    this.$router.beforeEach((to, from, next) => {
      // 判断存在，将过渡动画名称设为空，即没有过渡动画效果
      if (localStorage.getItem('animation0')) {
        this.transitionName = '';
        return next();
      }
      // 判断 ReturnKey 的值为 'slide-left'，将过渡动画名称设为 'slide-left'，表示从左侧滑入
      if (ReturnKey == 'slide-left') {
        this.transitionName = 'slide-left';
        ReturnKey = 'slide-right';
        return next();
      }
      // 将 ReturnKey 的值设为 'slide-right'，用于下一次的导航判断
      this.transitionName = 'slide-right';
      next()
    })

    document.querySelector('.BottomNavigation>footer').style.top = window.innerHeight + 'px';
    this.store.navHeight = document.querySelector('.Apps>footer>div>footer').offsetHeight;
  },

  components: {
    BottomNavigation,
    ArticleBody
  }
}
</script>

<style scoped>
body {
  overflow-x: hidden;
}

.slide-left-enter-active,
.slide-right-enter-active,
.slide-left-leave-active,
.slide-right-leave-active {
  will-change: transform;
  transition: transform 0.3s ease-in-out;
  height: 100%;
  width: 100%;
  top: 0;
  position: absolute;
  backface-visibility: hidden;
  perspective: 1000;
}

.slide-right-enter-from,
.slide-left-leave-to {
  transform: translateX(100%);
}

.slide-right-leave-to,
.slide-left-enter-from {
  transform: translateX(-100%);
}

.slide-right-enter-from,
.slide-left-leave-to {
  transform: translateX(100%);
}

.slide-left-enter-from,
.slide-right-leave-to {
  transform: translateX(-100%);
}
</style>