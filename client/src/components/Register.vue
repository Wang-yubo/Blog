<template>
  <div>
      <!-- 用户名 -->
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-form-item label="用户名" prop="user">
        <el-input type="string" v-model="form.user" placeholder="请输入用户名"></el-input>
      </el-form-item>

    <!-- 密码 -->
      <el-form-item label="密码" prop="pwd">
        <el-input type="password" v-model="form.pwd" placeholder="请输入密码" show-password></el-input>
      </el-form-item>

<!-- 确认密码 -->
      <el-form-item label="确认密码" prop="checkPwd">
        <el-input type="password" v-model="form.checkPwd" placeholder="请确认密码" show-password></el-input>
      </el-form-item>

      <!-- 验证码 -->
     <el-form-item label="验证码" class="vcode">
        <el-input v-model="form.vcode" placeholder=""></el-input>
        <div class="svg">svg</div>
        <el-link href="javascript:void(0)">刷新</el-link>
      </el-form-item>
      
      <!-- 提交 -->
      <el-form-item>
        <el-button type="success">注册</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      form: {
        user: "",
        pwd: "",
        checkPwd: ""
      },
      rules: {
        // 用户验证
        user: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          {
            // eslint-disable-next-line no-useless-escape
            pattern: /^[\w\u4e00-\u9fa5\uac00-\ud7ff\u0800-\u4e00\-]{2,8}$/,
            require: true,
            min: 2,
            max: 8,
            message: "长度2-8,数字字母下划线,中日韩文,",
            trigger: "blur"
          }
        ],
        //密码验证
        pwd: {
          type: "string",
          validator: (rule, value, cb) => {
            if (value) {
              //验证密码是否符合规则
              // eslint-disable-next-line no-useless-escape
              if (/^[\w<>,.?|;':"{}!@#$%^&*()\/\-\[\]\\]{6,18}$/.test(value)) {
                cb();
              } else {
                cb(new Error("6-18位，不允许出现奇怪的字符哦~"));
              }
            } else {
              cb(new Error("请输入密码"));
            }

            //在这里还需要触发确认密码的验证
            this.form.checkPwd && this.$refs.form.validateField("checkPwd");
          },
          required: true,
          message: "6-18位，不允许出现奇怪的字符",
          trigger: ["blur", "change"]
        },
        //再次输入密码验证
        checkPwd: {
          validator: (rule, value, cb) => {
            if (value) {
              if (value === this.form.pwd) {
                cb();
              } else {
                cb(new Error("两次密码不一致"));
              }
            } else {
              cb(new Error("请再次输入密码"));
            }
          },
          required: true,
          trigger: ["blur", "change"]
        }
      }
    };
  }
};
</script>

<style lang="less" scoped>
.el-form {
  user-select: none;
  padding-right: 30px;

  .vcode {
    .el-input {
      float: left;
      width: 35%;
    }
    div.svg {
      float: left;
      width: 35%;
      height: 40px;
      /deep/ svg {
        width: 100% !important;
        height: 100% !important;
      }
    }
    .el-link {
      font-size: 12px;
    }
  }
}
</style>

