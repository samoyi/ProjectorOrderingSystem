<template>
    <div id="app" @click="touchFd">
        <div id="touchArea">

        </div>
        <div id="touchFb" :style="touchFdStyle"></div>
        <router-view
            :store-data="storeData"
            :cart="oCart"
            :order-state="nOrderState"
            :position="nPosition"
            :order="oOrder"
            @add="add"
            @order="order"
            @paySuccess= "paySuccess"
            @complete="complete">
        </router-view>
    </div>
</template>

<script>

import ajax from './js/ajax';

export default {
    name: 'app',
    data () {
        return {
            oClientConfig: [],
            storeData: {
                primaryCatas: [],
                menu: {},
            },
            oCart: {
                total: 0,
                list: [],
            },
            oOrder: {
                curPaymentMethod: '', //支付时选择的支付方式
                // 一个订单完成后，会把[购买物品、支付方式、支付时间]加入list
                // 一个用户在点击“上齐了”之前的每次支付生成一个订单，汇集到oOrder里
                list: [],
                total: 0, // 总订单价格
            },
            // bPaid: false, // 付款成功时，清空购物车；
            // bComplete: false, // 用户点击已上齐，则点餐结束，清空订单详情
            // 付款成功后，nOrderState变为1，清空购物车，首页可以查看订单详情
            // 用户点击已上齐，则点餐结束，清空订单详情，nOrderState变为0
            nOrderState: 0,
            // 在操作方向有影响的情况下，例如进入购物车。0为当前方向，1为对向
            nPosition: 0,

            touchFdStyle: {},
        }
    },
    methods:{
        // 两款商品可以同名但id肯定不同，如果用户买了两个同名商品，这里用id来区分
        add(sCata, oItem){
            let oFound = this.oCart.list.find(item=>{
                return item.id === oItem.id;
            });
            if(oFound){
                oFound.amount++;
            }
            else{
                this.oCart.list.push({
                    id: oItem.id,
                    amount: 1,
                    price: oItem.price,
                    name: oItem.name,
                });
            }
        },
        order(){
            if(this.oCart.list.length){
                this.oCart.list.forEach(item=>{
                });
            }
        },
        paySuccess(list){
            // 填写订单状态，然后清空购物车
            let date = new Date();
            this.oOrder.list.push({
                items: list,
                total: this.oCart.total,
                paymentMethod: this.oOrder.curPaymentMethod==='wechat'?'微信':'支付宝',
                time: date.getMonth()+1 +'月'+ date.getDate() +'日　'
                        + date.getHours() +'时'+ date.getMinutes() + '分'
                        + date.getSeconds() +'秒',
            });
            // 每一个单独订单的价格汇总到总订单价格
            this.oOrder.total += this.oCart.total;
            this.oCart = {
                total: 0,
                list: [],
            };
        },
        complete(){
            // 清空订单状态
            this.nOrderState = 0;
            this.oOrder = {
                curPaymentMethod: '',
                list: [],
                total: 0,
            };
        },
        touchFd(ev){
            this.touchFdStyle = {
                left: ev.clientX-5 + 'px',
                top: ev.clientY-5 + 'px',
                animation: 'touchFb .4s',
            };
            setTimeout(()=>{
                this.touchFdStyle = {
                    left: '0px',
                    top: '0px',
                };
            }, 400);
        },
    },
    mounted(){
        // 根据网址中的参数确定当前具体的客户端
        let aClientConfig = location.search.slice(1).split('&');
        if(aClientConfig.length !== 3){
            alert('网址错误');
            throw new Error('网址错误');
        }
        let oClientConfig = {},
            aPair = [];
        aClientConfig.forEach(query=>{
            aPair = query.split('=');
            if(aPair[1]){
                oClientConfig[aPair[0]] = aPair[1];
            }
            else{
                alert('网址错误');
                throw new Error('网址错误');
            }
        });
        this.oClientConfig = oClientConfig;

// 测试url http://localhost:8080/?merchant=testMerchant&store=37ac5ae2d57709540b27e1ff7f39e2fec903bba9af21ad241309c966e57fb8e7&table=1#/main_menu
        let url = './server-side/merchants/' + oClientConfig.merchant
                        + '/' + oClientConfig.store + '/items.json';
        ajax.ajax_get(url, res=>{
            let oConfig = JSON.parse(res);
            this.storeData.primaryCatas = oConfig.primaryCatas;
            this.storeData.menu = oConfig.menu;
        }, err=>{
            alert('读取店铺配置失败：' + err);
            throw new Error('读取店铺配置失败：' + err);
        });
    },
}

</script>

<style lang="scss">
@import "./scss/common.scss";

#app{
    #touchFb{
        background-color: gray;
        border-radius: 100%;
        width: 20px; height: 20px;
        position: absolute;
        opacity: 0;
    }
    @keyframes touchFb{
        0%{opacity: 0; transform: scale3d(0, 0, 0);}
        30%{opacity: 0.3; transform: scale3d(0.5, 0.5, 0.5);}
        100%{opacity: 0; transform: scale3d(1, 1, 1);}
    }
    #touchArea{
        width: $TOUCH_WIDTH;
        height: $TOUCH_HEIGHT;
        position: relative;
        top: $TOUCH_TOP;
        left: $TOUCH_LEFT;
        background: gray;
        opacity: 0.2;


    }
}
</style>
