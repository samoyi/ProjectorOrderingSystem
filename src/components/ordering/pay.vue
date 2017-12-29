<template>
    <div id="pay" :style="{transform: 'rotateZ(' + position*180 + 'deg)'}">
        <div id="list">
            <header>订单明细</header>
            <div id="tableWrapper">
                <table id="table">
                    <tr class="tr">
                        <td class="td">名称</td>
                        <td class="td">数量</td>
                        <td class="td">单价</td>
                    </tr>
                    <tr class="tr" v-for="(item,index) in cart.list">
                        <td class="td">{{item.name}}</td>
                        <td class="td">
                            {{item.amount}}
                        </td>
                        <td class="td">{{item.price/100}}</td>
                    </tr>
                </table>
            </div>
            <div id="total">总计：¥{{cart.total}}</div>
        </div>
        <div id="alipay" @click="alipay">支付宝</div>
        <div id="wechat" @click="wechat">微信</div>
        <div id="back" @click="back">返回</div>
    </div>
</template>

<script>


export default {
    props: ["cart", "position", "order"],
    components: {
    },
    data () {
        return {
            // aCart: this.cart,
        }
    },
    methods: {
        back(){
            this.$router.go(-1);
        },
        alipay(){
            this.$router.push('payCode');
            this.$parent.oOrder.curPaymentMethod = 'alipay';
        },
        wechat(){
            this.$router.push('payCode');
            this.$parent.oOrder.curPaymentMethod = 'wechat';
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

#pay{
    width: 100%; height: 100%;
    position: absolute; top: 0;
    #list{
        width: 303px; height: 360px;
        border: 5px solid $BASIC_BLUE;
        box-sizing: border-box;
        color: $BASIC_BLUE;
        @include absHorCenter;
        top: 435px;
        header{
            font-size: 16px;
            text-align: center; font-weight: bold;
            position: relative; top: 20px;
        }
        #tableWrapper{
            position: absolute;
            width: 244px; left: 50%; margin-left: -122px;
            top: 70px; height: 195px; overflow-y: scroll;
            width: 99%; left: 0; margin-left: 0;
            #table{
                table-layout: fixed; width: 100%;
                .tr{
                    width: 100%; height: 40px; box-sizing: border-box;
                    .td{
                        line-height: 18px;
                        text-align: center;
                        vertical-align: middle;
                        height: 40px; line-height: 40px;
                        word-wrap: break-word;
                        word-break: break-all;
                    }
                    .td:first-child{
                        width: 120px;
                        box-sizing: border-box;
                        padding: 5px;
                        line-height: 18px;
                    }
                }
                .tr:first-child, .tr:last-child{
                    border-bottom: 1px solid $BASIC_BLUE;
                }
            }
        }
        #tableWrapper::-webkit-scrollbar {
          width: 5px;
          height: 8px;
          background-color: #d2eef5;
        }
        #tableWrapper::-webkit-scrollbar-thumb {
            background: $BASIC_BLUE;
        }
        #total{
            position: absolute;
            right: 20px;
            top: 280px;
        }
    }

    #back, #wechat, #alipay{
        background-color: $BASIC_BLUE;
        width: 84px; text-align: center;
        height: 28px; line-height: 28px;
        border-radius: 5px;
        color: white;
        position: absolute;
        right: $TOUCH_RIGHT;

    }
    #back{
        bottom: $TOUCH_BOTTOM;
    }
    #wechat{
        bottom: $TOUCH_BOTTOM + 40px;
    }
    #alipay{
        bottom: $TOUCH_BOTTOM + 80px;
    }
}
</style>
