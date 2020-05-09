<template>
  <div>
    <!-- 整个表单 -->
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <!-- 用户名 -->
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
      <el-form-item label="验证码" prop="svgCode" class="vcode" >
        <el-input v-model="form.svgCode"></el-input>
        <div class="svg" v-html="register.svgText"></div>
        <el-link type="primary" @click="getVCode" :disabled="register.disabled">{{register.refreshText}}</el-link>
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
import request from '../api/index';

const  getRegisterVCode =request.getRegisterVCode;
 const getRegisterCheckVcode =  request.getRegisterCheckVcode
export default {
  name: "Register",
  data() {
    return {
      //* 表单数据
     form :{
          user : "",
          pwd : "",
          checkPwd : "",
          svgCode : ""
        },
      //* 表单验证
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
        },
         //验证码
             svgCode : {
            validator : (rule,value,cb)=>{
              if (!value){
                cb(new Error("请输入验证码！"));
              }else{
                getRegisterCheckVcode(value)
                .then(res=>{
                  if (res.data.code === 0){
                    cb();
                  }else{
                    cb(new Error("验证码错误"));
                  }
                })
                // eslint-disable-next-line no-unused-vars
                .catch(e=>{
                  cb(new Error("未知错误…"));
                });
              }
            },
            required: true,
            trigger: 'blur'
          }
      },
    //* 注册相关的数据
        register : {
          svgText : "loading...",
          refreshText : "刷新",
          disabled : true,
          timer : null,
          submitDisabled : false
        }
    };
  },
  methods: {
     getVCode(){
        getRegisterVCode().then(res=>{
          clearTimeout(this.register.timer);
          let t = 0;
          let fn = ()=>{
            t+=1000;
            if (t > res.data.time){
              clearTimeout(this.register.timer);
              this.register.disabled = false;
              this.register.refreshText = "刷新";
            }else{
              this.register.disabled = true;
              this.register.refreshText = (((res.data.time - t)/1000)|0) + "s后可以刷新";
            }
          };
          this.register.timer = setInterval(fn,1000);
          fn();

          //更新图片
          this.register.svgText = res.data.data;
        });
      },
      /*注册的点击*/
      // handleClick(){
      //   this.register.submitDisabled = true;
      //   this.$refs["form"].validate((valid) => {
      //     if (valid) {
      //       //验证都通过
      //       postRegister(this.form).then(res=>{
      //         this.getVCode();
      //         if (res.data.code){
      //           this.$message({
      //             message: res.data.msg,
      //             type: 'error',
      //             duration : 2000
      //           });
      //           this.register.submitDisabled = false;
      //         }else{
      //           //注册成功
      //           this.$message({
      //             message: '注册成功！',
      //             type: 'success',
      //             duration : 2000
      //           });
      //           setTimeout(()=>{
      //             this.register.submitDisabled = false;
      //             this.$emit("handleClose",true);
      //           },1800);
      //         }
      //       }).catch(e=>{
      //         this.register.submitDisabled = false;
      //         this.getVCode();
      //         this.$message({
      //           message: "注册失败请稍后再试~",
      //           type: 'error',
      //           duration : 2000
      //         });
      //       });
      //     } else {
      //       this.register.submitDisabled = false;
      //       //验证没通过
      //       return false;
      //     }
      //   });
      // },
 
      /*关闭的回调*/
      // beforeClose(done){
      //   this.$confirm('确认关闭？')
      //     .then(()=> {
      //       this.$emit("handleClose",false);
      //     })
      //     .catch(()=> {});
      // }
 
 
 
 
 },
 mounted() {
    // 组件挂载的时候加载验证码
     this.getVCode()
  },
    destroyed() {
      clearTimeout(this.register.timer);
    }
}

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

