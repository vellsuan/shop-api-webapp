<template>
  <div class="sidebar">
    <drawer
      :show.sync="drawerVisibility"
      :show-mode="showModeValue"
      :placement="showPlacementValue"
      :drawer-style="{'background-color':'#2d2d2d', 'box-shadow' : '1px 0 2px 0 rgba(0,0,0,0.10)', width: '4.4rem'}">
      <!-- drawer content -->
      <div slot="drawer">
          <div class="ms_logo">
              <img src="../pages/home/assets/xijuntaiwxlogo.svg"  alt="" />
          </div>
          <div class="ms_menu">
              <div class="member-card">
                  <img src="../pages/home/assets/tb_hyk1.png" alt="" />
                  <span @click="goIndexList(1)">会员卡</span>
              </div>
              <div class="one-price-enjoy">
                  <img src="../pages/home/assets/tb_yjjx2.png" alt="" />
                  <span @click="goIndexList(2)">房间预订</span>
              </div>
              <!-- <div class="tourism-project">
                  <img src="../pages/index/assets/tb_lyxm3.png" alt="" />
                  <span>旅游项目</span>
              </div> -->
              <div class="order-center">
                  <img src="../pages/home/assets/tb_ddzx4.png" alt="" />
                  <span @click="goToUsercenter">会员中心</span>
              </div>
          </div>
      </div>
      <view-box ref="viewBox">
        <!-- 引入首页index页面头部   -->
        <x-header slot="header" @on-click-more="onClickMore">
            <img slot="overwrite-title" src="../assets/header_logo_new.png" />
            <div slot="overwrite-left" size="35">
                <img src="../pages/home/assets/tb_cbl.png" @click="showDrawerVisibility"  />
            </div>
            <img slot="right" src="../assets/contact_us.png" @click="goToContactUs" />
        </x-header>
        <!-- 引入首页index页面 -->
        <sidebar ref="IndexList"></sidebar>
      </view-box>
    </drawer>
  </div>
</template>
<script>
import {  Cell, Drawer, XHeader,  ViewBox, Loading } from 'vux'
import Sidebar from '../pages/home/views/index'
import { querystring } from 'vux'
// import BScroll from "better-scroll";
export default {
    components: {
        Cell,
        Drawer,
        XHeader,
        Loading,
        'sidebar' : Sidebar,
        ViewBox,
    },
    data () {
        return {
            showMenu: false,
            drawerVisibility: false,
            showMode: 'push',
            showModeValue: 'push',
            showPlacement: 'left',
            showPlacementValue: 'left',
            num : '' //订单页面参数
        }
    },
    mounted () {
        this.num = this.getParams().num;
        if(this.num == 0){
            this.$refs.IndexList.onItemClick(0)
        }else if(this.num == 1){
            this.$refs.IndexList.onItemClick(1)
        }else{
            this.$refs.IndexList.onItemClick(0)
        }
        //首页，个人中心页面侧滑，进入页面背景颜色整改，（让侧滑不出现空白间隙）
          this.$nextTick(()=>{
              document.body.style.background ="rgb(45,45,45)"
        })
    },
    methods: {
        //获取URL地址栏传过来的值
        getParams() {
            var search = "?" + window.location.href.split("?")[1]; //获取location的search属性，保存在search中
            var params = {}; //创建空对象params
            if (search != "") {
                //如果search不是空字符串
                search
                    .slice(1)
                    .split("&")
                    .forEach(
                        //?username=zhangdong&pwd=123456;//search去开头?，按&切割为数组，forEach
                        function(val) {
                            var arr = val.split("="); //将当前元素值按=切割，保存在arr中
                            params[arr[0]] = arr[1]; //向params中添加一个元素,属性名为arr[0],值为arr[1]
                        }
                    );
            }
            return params;
        },
        onClickMore () {
            this.showMenu = true
        },
        //验证用户是否绑定手机号
        goToUsercenter(){
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            if(userInfo&&userInfo.phone){
                if (process.env.NODE_ENV === 'production') {
                    // koa page-router配置跳转地址 不带#号
                    window.location.href = "/homestay/usercenter"
                }
                if (process.env.NODE_ENV === 'development') {
                    // vue哈希路有。 带#号
                     window.location.href = "/usercenter.html#/"
                }
            }else{
                let recording = true;
                window.localStorage.setItem("recording",recording);
                if (process.env.NODE_ENV === 'production') {
                    // koa page-router配置跳转地址 不带#号
                    window.location.href = "/homestay/home#/bindphone"
                }
                if (process.env.NODE_ENV === 'development') {
                    // vue哈希路有。 带#号
                    window.location.href = "/home.html#/bindphone"
                }
            }
        },
        //跳转到首页选择指定列表
        goIndexList(num){
            if(num == 1){
                this.$refs.IndexList.onItemClick(0)
                this.drawerVisibility = false
            }else{
                this.$refs.IndexList.onItemClick(1)
                this.drawerVisibility = false
            }
        },
        //控制侧滑栏显示隐藏
        onDrawerVisibility(){
            this.drawerVisibility = !this.drawerVisibility
            this.$emit('displayOrderOne')
        },
        showDrawerVisibility(){
            this.drawerVisibility = !this.drawerVisibility;
            //console.log(this.$data)
        },
        //跳转联系我们页面
        goToContactUs(){
            if (process.env.NODE_ENV === 'production') {
                // koa page-router配置跳转地址 不带#号
                window.location.href = "/homestay/usercenter#/contactus"
            }
            if (process.env.NODE_ENV === 'development') {
                // vue哈希路有。 带#号
                window.location.href = "/usercenter.html#/contactus"
            }
        }
    }
}
</script>
<style lang="less" scoped>
  .sidebar{
      height: 100%;
      .vux-drawer{
          height: 100%;
          .vux-drawer-content{
              div{
                display: flex;
                flex-direction: column;
                .ms_logo{
                  height: 250px;
                  width: 100%;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                    img{
                        height: 158px;
                        width: 158px;
                    }
                  span{
                    font-size:28px;/*px*/
                    color:#ffffff;
                    text-align:center;
                  }
                }
                .ms_menu{
                  height: 100%;
                  width: 100%;
                  padding-left: 40px;
                  .member-card,.one-price-enjoy,.order-center{
                    width: 100%;
                    height: 40px;
                    margin-bottom: 80px;
                    display: block;
                    img{
                        float: left;
                      width: 36px;
                      height: 36px;
                      margin-right: 40px;
                    }
                    span{
                        line-height: 36px;
                        width: 60%;
                        float: left;
                        font-size:32px;/*px*/
                        color:#ffffff;
                    }
                  }
                }
              }
          }
          .vux-drawer-body{
            .weui-tab{
                height: 100%;
              .vux-header{
                .vux-header-left{
                    left: 30px;
                    top: 30px;
                    div{
                      margin-top: 3px;
                        img{
                            width: 40px;
                            height: 34px;
                        }
                    }
                }
                .vux-header-title{
                    height:44PX;
                    line-height:44PX;
                    font-size: 32px;/*px*/
                }
              }
            }
          }
      }
  }
</style>
<style lang="less">
.sidebar{
    .vux-header{
        background:#2d2d2d;
        height:47PX;
        padding:6PX 0;
        .vux-header-title{
            height:44PX;
            line-height:44PX;
            font-size: 32px;/*px*/
        }
        .vux-header-title-area{
            text-align: center;
            img{
                // width: 44PX;
                height:36PX;
            }
        }
        .vux-header-right{
            img{
                width: 20PX;
                height: 20PX;
            }
        }    
    }
    .weui-tab__panel{
        height: calc(~"100% - 94px");
    }
}
</style>
