<template>
    <div class="home">
        <swiper :list="membersCardList" auto loop dots-class="custom-bottom" dots-position="center"></swiper>
        <tab>
            <tab-item :selected="member" class="tabafter" @on-item-click="onItemClick">{{membersCard}}</tab-item>
            <tab-item :selected="enjoy"  class="tabafterTwo" @on-item-click="onItemClick">{{enjoyPrice}}</tab-item>
            <!-- <tab-item @on-item-click="onItemClick">{{tourismProject}}</tab-item> -->
        </tab>

        <div class="tabList">
            <div class="tabListMember" v-if="tabIndex == 0">
                <member-card :tabIndex=0 ref="memberCard"></member-card>
            </div>
            <div class="tabListMember" v-else>
                <one-price-enjoy :tabIndex=1 ref="onePriceEnjoy"></one-price-enjoy>
            </div>
            <!-- <div v-else>
                <tourism-project></tourism-project>
            </div> -->
        </div>
        <!-- <order-button></order-button> -->
    </div>
</template>
<script>
import { XHeader, Actionsheet, ButtonTab, Swiper, SwiperItem, Tab, TabItem } from 'vux'
import MemberCard from './membercard';
import OnePriceEnjoy from './onepriceenjoy';
import TourismProject from './tourismproject';
import OrderButton from '@/components/orderbutton';
import wxmsBanner from '../assets/wxms_banner.png';

export default {
    components: {
        XHeader,
        Actionsheet,
        ButtonTab,
        Swiper,
        SwiperItem,
        Tab,
        TabItem,
        'member-card' : MemberCard,
        'one-price-enjoy' : OnePriceEnjoy,
        'tourism-project' : TourismProject,
        // 'order-button' : OrderButton
    },
    props:['Index'],
    created () {
         this.getServerConfig();
    },
    mounted(){
        this.getIndexBanner();
    },
    data () {
        return {
            membersCard : "会员卡",
            enjoyPrice : "房间预订",
            tourismProject : "旅游项目",
            tabIndex : 0,
            membersImgList:[],
            member: true,
            enjoy : false,
            index : 0
        }
    },
    methods:{
        onItemClick (index) {
            let userInfo = JSON.parse(localStorage.getItem("userInfo"));
            if(index == this.index){
               this.member = true;
               this.enjoy = false;
               //this.$refs.memberCard.getMembersCardList();
            }else{
                this.member = false;
                this.enjoy = true;
                //this.$refs.onePriceEnjoy.getSystemTime(userInfo.cardNo);
            }
            this.tabIndex = index;
            //this.membersImgList = [];
            //this.getIndexBanner();
        },
        getServerConfig(){
//          window.localStorage.clear();
            const params = {
                url : '/getServStatic'
            }
            this.api.post(params, res=> {
                let obj = JSON.stringify(res);
                window.localStorage.setItem("config",obj);
                let objUser = JSON.stringify(res.user);
                if(res&&res.user&&res.user.phone){
                		window.localStorage.setItem("userInfo",objUser);
                }
                
                let config = JSON.parse(localStorage.getItem("config"));
            });
        },
        getIndexBanner(){
            let placeSign = 'ENJOY_PRICE_WX';
            // if(this.tabIndex == 0){
            //     placeSign = 'USERCARD_WX'
            // }else{
            //     placeSign = 'ENJOY_PRICE_WX'
            // }
            const params = {
                url : '/getListBanner',
                data :{
                    placeSign : placeSign,
                    status : '2'
                }
            }
            this.api.post(params, res=> {
                let bannerList = res && res.entity && res.entity.adverList || ""
                let config = JSON.parse(window.localStorage.getItem("config"));
                let imgURL = config.ServerImgURL;
                if(bannerList){
                    for(let i = 0;i<bannerList.length;i++){
                        this.membersImgList.push(imgURL + bannerList[i].imgSrc)
                    }
                }else{
                    this.membersImgList.push(wxmsBanner)
                }    
            },false);
        }
    },
    computed:{
        membersCardList(){
            return this.membersImgList.map((one, index) => ({
                url: 'javascript:',
                img: one
            }))
        },
    }
}
</script>
<style lang="less">
#app{
    .home{
        height: 100%;
        background: #fff;
        overflow: auto; /* winphone8和android4+ */
        -webkit-overflow-scrolling: touch;
        .vux-slider{
            width:100%;
            height: 460px;
            margin:0 auto;
            .vux-swiper{
                height: 460px !important;
            }
            .custom-bottom{
                a{
                    i{
                        opacity:0.5;
                        background:#ffffff;
                        border-radius:100px;
                        width:18px;
                        height:4px;
                    }
                    .vux-icon-dot.active{
                        opacity:1;
                        background-color: #2d2d2d;
                    }
                }
            }
        }
        .vux-tab{
            margin: 30px 168px;
            height: 40px;
            .vux-tab-item{
                height: 100%;
                background:none;
                font-size:28px;/*px*/
                color:#989898;
                line-height: 40px;
            }
            .tabafter{
                text-align: right;
            }
            .tabafterTwo{
                text-align: left;
                padding-left: 20px;
            }
            .tabafter:after{
                content: '/';
                color:#efefef;
                margin-left: 20px;
            }
            .vux-tab-item.vux-tab-selected{
                color:#2d2d2d;
                border-bottom:0;
            }
            .vux-tab-ink-bar{
                background-color:#fff;
            }
        }
        .tabList{
           .tabListMember{
               background: #fff;
               .onepriceenjoy{
                   background: #fff;
               }
           }
        }
    }
    .order-button{
        display: block;
    }
}    
</style>
