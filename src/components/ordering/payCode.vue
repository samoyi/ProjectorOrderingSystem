<template>
    <div id="payment">
        <div id="pay" :style="{transform: 'rotateZ(' + position*180 + 'deg)'}"
                v-if="!paySuccess">
            <div id="payCode">
                <header>需要支付：{{cart.total}}元</header>
                <div id="code" @click="alipay">

                </div>
                <p id="payTip" @click="wechat">
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

export default {
    props: ["cart", "position", "order"],
    components: {
    },
    data () {
        return {
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
        alipay(){
            this.paySuccess = true;
            this.$parent.nOrderState = 1;
            this.$emit('paySuccess', this.cart.list);
        },
        wechat(){
            this.paySuccess = true;
            this.$parent.nOrderState = 1;
            this.$emit('paySuccess', this.cart.list);
        },
    },
    computed: {
    },
    mounted(){
    }
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
