<template>
  <div id="nav">
    <div class="nav-main">
      <div class="n-m-logo">Mr.wyb</div>
      <div class="n-m-login">
        <el-button type="primary" size="mini">登录</el-button>
        <el-button type="success" size="mini">注册</el-button>
      </div>
      <div class="n-m-nav">
        <ul :class="'list'+ whichActive">
          <li>
            <router-link to="/">首页</router-link>
          </li>
          <li>
            <router-link to="/blog/0">博客</router-link>
          </li>
          <li>
            <router-link to="/message">留言</router-link>
          </li>
          <li>
            <router-link to="/diary">日记</router-link>
          </li>
          <li>
            <router-link to="/links">友链</router-link>
          </li>
          <li>
            <router-link to="/about">关于</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Nav",
  components: {},
  data() {
    return {
      /*路由列表*/
      routerList: ["Home", "Blog", "Message", "Diary", "Links", "About"]
    };
  },
  computed: {
    whichActive() {
      let index = this.routerList.indexOf(this.$route.name);
      return index + 1;
    }
  }
};
</script>

<style lang="less">
#nav {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #e8e9e7;
  > .nav-main {
    box-sizing: border-box;
    width: 100%;
    max-width: 1360px;
    height: 60px;
    margin: 0 auto;
    padding: 0 50px;
    .n-m-logo {
      float: left;
      width: 100px;
      height: 60px;
      line-height: 60px;
      text-align: left;
      color: #777;
      font-size: 40px;
      font-family: BarbaraHand;
    }
    .n-m-login {
      float: right;
      height: 60px;
      line-height: 60px;
      // .el-button{
      //   padding: 9px 13px;
      // }
    }
  }
  .n-m-nav {
    float: right;
    width: 576px;
    height: 60px;
    ul {
      display: flex;
      width: 100%;
      height: 100%;
      li {
        flex: 1;
        a {
          position: relative;
          display: block;
          width: 100%;
          height: 100%;
          text-align: center;
          line-height: 60px;
          color: #212220;
          font-weight: 400;
          font-size: 15px;
          transition: color 0.5s;
          &::after {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            margin: 0 auto;
            content: "";
            width: 0;
            height: 2px;
            background-color: #6bc30d;
            transition: width 0.5s;
          }
          &:hover {
            color: #6bc30d;
            &::after {
              width: 100%;
            }
          }
        }
      }
      &.list1 li:nth-child(1),
      &.list2 li:nth-child(2),
      &.list3 li:nth-child(3),
      &.list4 li:nth-child(4),
      &.list5 li:nth-child(5),
      &.list6 li:nth-child(6) {
        a {
          color: #6bc30d;
          &::after {
            width: 100%;
          }
        }
      }
    }
  }
}
</style>>

