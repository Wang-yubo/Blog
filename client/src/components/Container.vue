<template>
  <div id="Container">
    <el-container>
      <!-- 主体部分 -->
      <el-main>
        <ArticleShow></ArticleShow>
      </el-main>
      <!-- 侧边栏部分 -->
      <el-aside>
        <!-- 搜索框 -->
        <div :class="['search',{'fixed':ifSerchFixed}]">
          <div class="search-main">
            <input type="text" v-model="searchInput" placeholder="大爷,搜索在这" />
            <i class="el-icon-search"></i>
          </div>
          <div class="search-article">
            <ul @mouseleave="handleMouseleave">
              <li
                @mouseenter="handleMouseenter(index)"
                v-for="(item,index) in getArticleTags"
                :key="index"
              ><router-link :to="/blog/+index"> {{item}} </router-link></li>
            </ul>
            <!-- 动态改变cover的top值 -->
            <div class="cover" :style="{top:coverIndex*40+'px'}"></div>
          </div>
        </div>
        <!-- 热门文章 -->
        <div class="hot">
          <h3>热门文章</h3>
          <ul>
            <li v-for="(item,index) in articleHot" :key="index">
							<i>{{index+1}}</i>
							<router-link :to="'/Article/'+item._id">{{item.title}}</router-link>
            </li>
          </ul>
        </div>
        <!-- 置顶 -->
        <div class="recommend"> 
					<h3>推荐文章</h3> 
					<ul>
						<li v-if="!!getArticleRecommend.title">
							<i>{{1}}</i>
							<router-link :to="getArticleRecommend._id">{{getArticleRecommend.title}}</router-link>
						</li>
					</ul>
				</div>
        <!-- 访客 -->
        <div class="visitor">
					<h3>最近访客</h3>
					<ul>
						<li :style="{backgroundImage:'url('+item.photo+')'}" v-for="(item,index) in visitor" :key="index">
							<p>{{item.user}}</p>
						</li>
					</ul>
				</div>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import ArticleShow from "./ArticleShow";
// 这里解构会和webpack冲突
import request from "../api/index";
let getArticleInfo = request.getArticleInfo;
let getArticleHot  = request.getArticleHot
export default {
  name: "Container",
  components:{
    ArticleShow,
  },
  data() {
    return {
      //* 搜索框存储数据
			searchInput: "",
			
      //* 控制search的class名字
      ifSerchFixed:false,

      //* 存放文章标签
			articleTags: [],

			//* 存放热门文章列表
      articleHot:[],
      
      //* cover的位置
		coverIndex:this.$route.params.id*1,
			
			//* 模拟最近访客的数据
			visitor:[
				{user:"王雨波",photo:"http://localhost:3000/img/defaultPhoto.gif"},
				{user:"王雨波",photo:"http://localhost:3000/img/defaultPhoto.gif"},
				{user:"王雨波",photo:"http://localhost:3000/img/defaultPhoto.gif"},
				{user:"王雨波",photo:"http://localhost:3000/img/defaultPhoto.gif"},
				{user:"王雨波",photo:"http://localhost:3000/img/defaultPhoto.gif"},
				{user:"王雨波",photo:"http://localhost:3000/img/defaultPhoto.gif"},
				{user:"王雨波",photo:"http://localhost:3000/img/defaultPhoto.gif"},
				{user:"王雨波",photo:"http://localhost:3000/img/defaultPhoto.gif"},
				{user:"王雨波",photo:"http://localhost:3000/img/defaultPhoto.gif"},
				{user:"王雨波",photo:"http://localhost:3000/img/defaultPhoto.gif"},
				{user:"王雨波",photo:"http://localhost:3000/img/defaultPhoto.gif"},
				{user:"王雨波",photo:"http://localhost:3000/img/defaultPhoto.gif"},
			],
    };
  },
  methods: {
    //* 鼠标移入获取事件源距离定位父级的top值,并且设置给coverIndex,
    handleMouseenter(index) {
      this.coverIndex = index;
    },
    //* 鼠标离开,cover恢复到当前的id
    handleMouseleave() {
      this.$route.params.id*1
    },
    //* 监听滚轮事件的处理函数
    handleWindowScroll(){
      //* 通过滚动高度来控制ifSerchFixed
      this.ifSerchFixed = document.documentElement.scrollTop>=900
    }
  },
  computed: {
    //* 少了一个全部文章的标题,这里给他加上
    getArticleTags() {
      return ["全部文章", ...this.articleTags];
		},
		getArticleRecommend(){
			return  this.articleHot[0]|| {}
    },
	
  },
  // 创建组件的时候请求数据
  created() {
    getArticleInfo().then(data => {
      this.articleTags = data.data.data.tags;
		});
		getArticleHot().then(
			data=>{		
			this.articleHot = data.data.data;
				
			}
		)
  },
  mounted() {
    //* 监听window的滚动事件,这已经是vue操作DOM的极限了
    window.addEventListener("scroll",this.handleWindowScroll)
  },
    //* 离开时清除监听事件
  destroyed() {
    window.removeEventListener("scroll",this.handleWindowScroll)
    
  },
};
</script>

<style lang="less" scoped>
#Container {
  padding-top: 80px;
  width: 100%;
  user-select: none;
  > .el-container {
    box-sizing: border-box;
    width: 100%;
    max-width: 1360px;
    margin: 0 auto;
    padding: 0 50px;
    > .el-main {
      padding-top: 0;
      padding-left: 0;
    }
    > .el-aside {
      width: 300px;
      /*background-color: aqua;*/
      > .search {
        width: 100%;
        background-color: #fff;
        padding-bottom: 20px;
        &.fixed {
          position: fixed;
          z-index: 3;
          width: 300px;
          animation: searchMove 0.5s 1 ease-in-out;
          animation-fill-mode: forwards;
        }
        @keyframes searchMove {
          0% {
            top: -500px;
          }
          40% {
            top: 81px;
          }
          65% {
            top: 70px;
          }
          100% {
            top: 81px;
          }
        }
        .search-main {
          position: relative;
          z-index: 2;
          box-sizing: border-box;
          width: 100%;
          height: 80px;
          padding: 20px;
          background-color: grey;

          input {
            position: relative;
            z-index: 3;
            width: 100%;
            height: 40px;
            border-radius: 20px;
            border: 0;
            outline: 0;
            text-indent: 2em;
            font-size: 14px;
          }
          i {
            position: absolute;
            z-index: 4;
            right: 35px;
            top: 29px;
            width: 22px;
            height: 22px;
            font-size: 18px;
            line-height: 22px;
            text-align: right;
            font-weight: bolder;
            color: rgb(120, 121, 119);
            cursor: pointer;
          }
          ul {
            position: absolute;
            width: 260px;
            background-color: #fff;
            top: 44px;
            padding-top: 23px;
            border-radius: 0 0 10px 10px;
            box-shadow: 0 0 2px #999;
            li {
              overflow: hidden;
              box-sizing: border-box;
              width: 100%;
              height: 40px;
              line-height: 30px;
              padding: 5px;
              a {
                display: block;
                width: 100%;
                height: 100%;
                &:hover {
                  background-color: #ddd;
                }
              }
            }
          }
        }
        .search-article {
          position: relative;
          width: 100%;
          margin-top: 20px;
          ul {
            width: 100%;
            li {
              position: relative;
              box-sizing: border-box;
              z-index: 1;
              width: 100%;
              height: 40px;
              line-height: 40px;
              padding: 0 30px;
              a {
                display: block;
                width: 100%;
                height: 100%;
                color: #787977;
                border-bottom: 1px dotted #eee;
              }
            }
          }
          .cover {
            box-sizing: border-box;
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 40px;
            border-right: 5px solid #000;
            background-color: rgba(0, 0, 0, 0.05);
            transition: top 0.3s;
          }
        }
      }
      > .hot,
      .recommend {
        box-sizing: border-box;
        width: 100%;
        margin-top: 20px;
        background-color: #fff;
        padding: 15px 20px 20px;
        h3 {
          padding: 0 5px 10px;
          line-height: 30px;
          font-weight: 400;
          border-bottom: 1px solid #e8e9e7;
          color: #383937;
          position: relative;
          font-size: 18px;
        }
        ul {
          margin-top: 15px;
          li {
            overflow: hidden;
            height: 30px;
            line-height: 30px;
            margin: 7px 0;
            a {
              color: #787977;
              font-size: 14px;
              text-decoration: none;
              &:hover {
                color: #6bc30d;
                text-decoration: underline;
              }
            }
            i {
              display: inline-block;
              width: 22px;
              height: 22px;
              margin-right: 10px;
              font-style: normal;
              font-size: 12px;
              color: #666;
              line-height: 22px;
              text-align: center;
              border-radius: 100%;
              background-color: #edefee;
              text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
            }
            &:nth-child(1) i {
              background-color: #e24d46;
              color: #fff;
            }
            &:nth-child(2) i {
              background-color: #2ea7e0;
              color: #fff;
            }
            &:nth-child(3) i {
              background-color: #6bc30d;
              color: #fff;
            }
          }
        }
      }
      > .visitor {
        box-sizing: border-box;
        width: 100%;
        margin-top: 20px;
        background-color: #fff;
        padding: 15px 20px 20px;
        h3 {
          padding: 0 5px 10px;
          line-height: 30px;
          font-weight: 400;
          border-bottom: 1px solid #e8e9e7;
          color: #383937;
          position: relative;
          font-size: 18px;
        }
        ul {
          margin-top: 10px;
          li {
            position: relative;
            float: left;
            width: 23%;
            height: 60px;
            margin: 1%;

            background-position: center top;
            background-size: cover;
            background-repeat: no-repeat;

            p {
              overflow: hidden;
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 20px;
              line-height: 20px;
              text-align: center;
              background-color: rgba(0, 0, 0, 0.3);
              color: #fff;
              font-size: 12px;
            }
          }
          &::after {
            display: block;
            content: "";
            width: 0;
            height: 0;
            clear: both;
          }
        }
      }
    }
  }
}
</style>