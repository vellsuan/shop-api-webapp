<template>
    <div class="membercard">
        <div v-for="(item,i) in membersCardList" :key="i">
            <div class="membercard-content" @click="memberCardDetail(membersCardList[i].id)">
                <img :src="imgURL + membersCardList[i].img" alt="" />
            </div>
        </div>
        <load-more v-show="showdata" :show-loading="false"  tip="没有更多了"></load-more>
        <!-- <load-more v-show="show"  tip="正在加载"></load-more> -->
            <!-- <div class="membercard-content">
                <img src="../assets/zwka_2.png" alt="" />
            </div>
            <div class="membercard-content">
                <img src="../assets/zwka_3.png" alt="" />
            </div> -->
    </div>
</template>
<script>
import { LoadMore,} from 'vux'
export default {
    components: {
        LoadMore
    },
    props: ['tabIndex'],
    data () {
        return {
            membersCardList:{},
            imgURL : '',
            show:false,
            showdata:false,
        }
    },
    mounted(){
        this.getMembersCardList();
        this.show = true;
    },
    methods:{
        //获取会员卡列表
        getMembersCardList(){
            const params = {
                url : '/membersCardList',
                data :{
                    langId : 'CN',
                    stat : '1'
                }
            }
            this.api.post(params, res=> {
                this.imgURL = JSON.parse(window.localStorage.getItem("config")).ServerImgURL;
                this.membersCardList = res && res.page.datas;
                this.showdata = true;
                this.show = false;
            });
        },
        //跳转到会员卡详情
        memberCardDetail(id){
            if (process.env.NODE_ENV === 'production') {
                // koa page-router配置跳转地址 不带#号
                window.location.href = "/homestay/membersright#/?id="+id;
            }
            if (process.env.NODE_ENV === 'development') {
                // vue哈希路有。 带#号
                window.location.href = "/membersright.html#/?id="+id;
            }
        }
    }
}
</script>
<style lang="less">
    .membercard{
        padding: 0 30px;
        background: #fff;
        .membercard-content{
            width: 100%;
            height: 400px;
            margin-bottom: 20px;
            img{
                width: 100%;
                height: 400px;
                border-radius: 8px;
                box-shadow: 0 4px 10px 0 rgba(0,0,0,0.3);
            }
        }
    }
</style>
