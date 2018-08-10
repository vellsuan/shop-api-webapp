<template>
    <div class="integral-exchange">
        <x-header :left-options="{backText: ''}">
            <span>积分商城</span>
        </x-header>
        <!-- <div class="integral-content wrapper" ref="wrapper"> -->
        <div class="integral-content" v-if="showIntegral">
            <Scroll ref="scroll"
                  :data='integralList'
                  :pullUpLoad="pullUpLoad"
                  :listenScrollEnd="true"
                  @pullingUp="getList">
                <div class="content" v-if="showIntegral">
                    <swiper :list="demo03_list" auto loop dots-class="custom-bottom" dots-position="center"></swiper>
                    <div class="tabList">
                        <redeem-list ref="redeemList" @echoShow="echoShow">

                        </redeem-list>
                    </div>
                    <!-- <load-more v-show="showdata" :show-loading="false"  tip="暂无可兑换商品"></load-more> -->
                </div>
            </Scroll>    
        </div>
        <div class="integral-content" v-else>
            <div class="content">
                <swiper :list="demo03_list" auto loop dots-class="custom-bottom" dots-position="center"></swiper>
                <div class="tabList">
                    <blank-data-page>
                        <img slot="img" src="../assets/zanwujifen_kong@2x.png" alt="" />
                        <span slot="tips">还没有商品哦</span>
                    </blank-data-page>
                </div>
                <!-- <load-more v-show="showdata" :show-loading="false"  tip="暂无可兑换商品"></load-more> -->
            </div>
        </div>
        <!-- <load-more v-show="show"  tip="正在加载"></load-more> -->
    </div>
</template>
<script>
import { XHeader,Swiper, SwiperItem, LoadMore,} from 'vux'
import BScroll from 'better-scroll';
import RedeemList from './redeemlist';
import wxmsBanner from '../assets/wxms_banner.png';
import Scroll from '@/components/scroll';
import blankDataPage from '@/components/blankdatapage';

export default {
    components: {
        XHeader,
        Swiper,
        SwiperItem,
        LoadMore,
        Scroll,
        'redeem-list' : RedeemList,
        'blank-data-page' : blankDataPage,
    },
    data () {
        return {
            imgList:[],
            show:false,
            showdata:false,
            currentPageNum:1,
            integralList : [],
            pullUpLoad: {
                threshold: 50,
                txt: {more: '', noMore: '没有更多了'}
            },
            showIntegral:true
        }
    },
    created(){
        this.integralListBanner();
    },
    mounted(){
        this.getList()
        // this.$nextTick(() => {
        //     if (!this.scroll) {
        //         this.scroll = new BScroll(this.$refs.wrapper, {click:true,listenScrollEnd:true})
        //         this.scroll.on('touchEnd', (pos) => {
        //             // 下拉动作
        //             if (pos.y < this.scroll.maxScrollY-50) {
        //                 this.show = true
        //                 this.$refs.redeemList.getintegralList(this.currentPageNum++)
        //             }
        //         })
        //     } else {
        //         this.scroll.refresh()
        //     }
        // })
    },
    methods:{
        integralListBanner(){
            const params = {
                url : '/getListBanner',
                data :{
                    placeSign : 'POINTS_WX',
                    status : '2'
                }
            }
            this.api.post(params, res=> {
                let integralBanner = res && res.entity && res.entity.adverList
                let config = JSON.parse(window.localStorage.getItem("config"));
                let imgURL = config.ServerImgURL;
                if(integralBanner){
                    for(let i = 0;i<integralBanner.length;i++){
                        this.imgList.push(imgURL + integralBanner[i].imgSrc)
                    }
                }else{
                    this.imgList.push(wxmsBanner)
                } 
            });

        },
        getList(){
             this.$refs.redeemList.getintegralList(this.currentPageNum++);
        },
        echoShow(num,integralList){
            this.integralList = integralList;
            if(num == 1){
                this.showIntegral = true;
            }else if(num == 3){
                this.showIntegral = false
            }else if(num == 2){
                this.$refs.scroll.forceUpdate()
                this.showIntegral = true
            }

        },
        echoShowData(){

        }
    },
    computed:{
        demo03_list(){
            return this.imgList.map((one, index) => ({
                url: 'javascript:',
                img: one
            }))
        },
    }
}
</script>
<style lang="less">
    .integral-exchange{
        display: flex;
        flex-direction: column;
        height: 100%;
        overflow: hidden;
    .vux-header{
        background:#2d2d2d;
        height:47PX;
        .vux-header-title{
            height:44PX;
            line-height:44PX;
            font-size: 32px;/*px*/
            font-weight:400;
        }
        .vux-header-left{
            .left-arrow{
                
            }
            .left-arrow:before{
                width:10PX;
                height:10PX;
                border-width: 2PX 0 0 2PX;
                top: 0;
                bottom:0;
                margin:auto;
            }
        }
    }
        .integral-content{
            flex: 1;
            overflow-y: auto;
            div{
                .vux-slider{
                    width:100%;
                    height: 460px;
                    margin:0 auto;
                    .vux-swiper{
                        height: 100% !important;
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
                .tabList{
                    margin-top: 20px;
                    height: calc(~"100% - 460px");
                    .black-data-page{
                        .black-page-btn{
                            display: none;
                        }
                    }
                }
            }
        }
    }
</style>
