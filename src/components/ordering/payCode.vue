<template>
    <div id="payment">
        <div id="pay" :style="{transform: 'rotateZ(' + position*180 + 'deg)'}"
                v-if="!paySuccess">
            <div id="payCode">
                <header>需要支付：{{cart.total}}元</header>
                <div id="code">
                    <p v-show="!sCodeURL">正在生成支付二维码……</p>
                    <img v-show="sCodeURL" :src="sCodeURL" />
                </div>
                <p id="payTip">
                    请使用{{order.curPaymentMethod==='wechat'?'微信':'支付宝'}}<br />
                    扫二维码完成支付
                </p>
            </div>
            <div id="back" @click="back" v-btnTouchAni>返回</div>
        </div>
        <div id="paySuccess" :style="{transform: 'rotateZ(' + position*180 + 'deg)'}"
                v-if="paySuccess">
            <div id="successTip">
                <p>
                    下单成功！<br />
                    您的餐品正在准备中，请稍候
                </p>
            </div>
            <div id="backToMain" @click="backToMain" v-btnTouchAni>返回桌面</div>
        </div>
    </div>
</template>

<script>

// 支付成功后，生成订单详情，包含生成时间、支付方式
// 在点击已上齐之前再次下单支付，则订单详情中再添加一条记录

import ajax from '../../js/ajax';

let timer = null; // 轮询用

export default {
    props: ["cart", "position", "order"],
    components: {
    },
    data () {
        return {
            sCodeURL: '',
            paySuccess: false,
        }
    },
    methods: {
        back(){
            this.$router.go(-1);
        },
        backToMain(){
            this.$router.push('main_menu');
        },
        wechatPay(){
            // 请求支付二维码并轮询是否支付成功

            let getPayResult = (payID)=>{
                let url = 'http://huaigao.net/touchpad/wxpay/orderStatus.php?'
                            + 'out_trade_no=' + payID;
                ajax.ajax_get(url, res=>{
                    if(res.trim()==='true'){
                        clearInterval(timer);
                        this.sCodeURL = '';
                        this.wechatSuccess();
                    }
                }, err=>{
                    alert('支付失败，请重试：' + err);
                    throw new Error('支付失败：' + err);
                });
            }

            let url = 'http://huaigao.net/touchpad/wxpay/wxpay.php',
                data = 'total=' + this.cart.total*100/5000 +
                        '&brand=' + this.$parent.oClientConfig.merchant +
                        '&store=' + this.$parent.oClientConfig.store +
                        '&machine=' + this.$parent.oClientConfig.table +
                        '&goodsList=' + JSON.stringify(this.$parent.oCart.list);
            ajax.ajax_post(url, data, res=>{
                let aRes = res.trim().split('+');
                this.sCodeURL = aRes[1];
                timer = setInterval(()=>{
                    getPayResult(aRes[0].trim());
                }, 1000);
            }, err=>{
                alert('获取微信支付二维码失败，请返回重试' + err);
                throw new Error('获取微信支付二维码失败：' + err);
            });
        },
        alipaySuccess(){
            this.paySuccess = true;
            this.$parent.nOrderState = 1;
            this.$emit('paySuccess', this.cart.list);
        },
        wechatSuccess(){
            this.paySuccess = true;
            this.$parent.nOrderState = 1;
            this.$emit('paySuccess', this.cart.list);
        },
    },
    computed: {
    },
    mounted(){
        this.wechatPay();
    },
    beforeDestroy(){
        clearInterval(timer);
        this.sCodeURL = '';
    },
}



</script>

<style scoped lang="scss">
@import '../../scss/common.scss';

#payment, #pay, #paySuccess{
    width: 100%; height: 100%;
    position: absolute; top: 0;
}
#payment{
    #pay{
        #payCode{
            width: 303px; height: 360px;
            border: 5px solid $BASIC_BLUE;
            box-sizing: border-box;
            color: $BASIC_BLUE;
            @include absHorCenter;
            top: 435px;
        }
        #payCode{
            header{
                font-size: 26px;
                text-align: center; font-weight: bold;
                position: relative; top: 20px;
            }
            #code{
                position: absolute;
                width: 195px; left: 50%; margin-left: -97px;
                top: 70px; height: 195px;
                background:  #d2eef5;
                p{
                    color: white; font-weight: bold;
                    text-align: center;
                    width: 100%; height: 1em;
                    @include absVerCenter;
                }
                img{
                    width: 100%;
                    height: 100%;
                }
            }
            #payTip{
                position: absolute; top: 280px;
                width: 100%; text-align: center;
                line-height: 26px;
            }
        }

        #back{
            background-color: $BASIC_BLUE;
            width: 84px; text-align: center;
            height: 28px; line-height: 28px;
            border-radius: 5px;
            color: white;
            position: absolute;
            right: $TOUCH_RIGHT;
            bottom: $TOUCH_BOTTOM;
        }
    }
    #paySuccess{
        #successTip{
            width: 303px;
            height: 195px;
            border: 5px solid $BASIC_BLUE;
            box-sizing: border-box;
            color: $BASIC_BLUE;
            @include absHorCenter;
            top: 512px;
            p{
                @include absCenter;
                line-height: 2; height: 4em;
                text-align: center;
            }
        }
        #backToMain{
            background-color: $BASIC_BLUE;
            width: 84px; text-align: center;
            height: 28px; line-height: 28px;
            border-radius: 5px;
            color: white;
            position: absolute;
            right: $TOUCH_RIGHT;
            bottom: $TOUCH_BOTTOM;
        }
    }
}
</style>
