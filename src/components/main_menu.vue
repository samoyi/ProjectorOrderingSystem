<!-- 打开页面之后的主菜单 -->
<template>
    <div id="main">
        <dial-component id="dial"
             v-show="!bDisplayOrder"
            :items="storeData.primaryCatas"
            :diameter="dialDiameter"
            :icon-dir="'./server-side/public/images/icons/main_menu/'"
            :icon-type="'png'"
            @dial-enter="routes">
        </dial-component>
        <div class="order top-order" v-if="orderState" v-show="!bDisplayOrder"
                @click="showOrder(1)" v-btnTouchAni>查看订单</div>
        <div class="order bottom-order" v-if="orderState" v-show="!bDisplayOrder"
                @click="showOrder(0)" v-btnTouchAni>查看订单</div>
        <div id="order-list" v-show="bDisplayOrder"
                :style="{transform: 'rotateZ(' + position*180 + 'deg)'}">
            <div id="list">
                <header>消费明细</header>
                <div id="tableWrapper">
                    <div id="allOrders">
                        <div class="orderWrapper" v-for="order in order.list">
                            <div class="total">
                                <span>支付金额：¥{{order.total}}　</span>
                                <span>支付方式：{{order.paymentMethod}}</span>
                                <br />
                                <span>支付时间：{{order.time}}</span>
                            </div>
                            <table class="table">
                                <tr class="tr" v-for="(item,index) in order.items">
                                    <td class="td">{{item.name}}</td>
                                    <td class="td">
                                        {{item.amount}}
                                    </td>
                                    <td class="td">{{item.price/100}}</td>
                                </tr>
                            </table>
                        </div>
                    </div>
                </div>
                <div id="total">总计消费：¥{{order.total}}</div>
            </div>
            <div class="complete" @click="complete">已上齐</div>
            <div class="closeOrder" @click="closeOrder">关闭</div>
        </div>
        <!-- <custom-alert></custom-alert> -->
    </div>
</template>

<script>
import dial from './ordering/dial';
// import customAlert from './public/customAlert';
import styleConfig from '../js/styleConfig';

export default {
    name: 'main_menu',
    props: ["storeData", "orderState", "order"],
    components: {
        'dial-component': dial,
        // 'custom-alert': customAlert,
    },
    data () {
        return {
            dialDiameter: styleConfig.MAIN_DIAL_DIAMETER,
            primaryCatas:[],
            bDisplayOrder: false,
        }
    },
    methods: {

        // 接受拨盘组件的路由通知，并路由到指定组件
        routes(sCata){
            this.$router.push(sCata);
        },

        // 主界面点击查看订单，显示订单
        showOrder(nPosition){
            // this.$parent.nPosition = nPosition;
            this.$store.commit('changePosition', nPosition);
            this.bDisplayOrder = true;
        },

        // 关闭订单
        closeOrder(){
            this.bDisplayOrder = false;
        },

        // 点击“已上齐”，通知App.vue
        complete(){
            this.$emit('complete');
            this.$parent.nOrderState = 0;
            this.bDisplayOrder = false;
        },
    },
    computed: {
        position(){
            return this.$store.state.nPosition;
        },
    },
    mounted(){
    }
}
</script>

<style scoped lang="scss">
@import '../scss/common.scss';
#main{
    width: 100%; height: 100%; position: absolute; top: 0;
    .order{
        background-color: $BASIC_BLUE;
        width: 84px; text-align: center;
        height: 28px; line-height: 28px;
        border-radius: 5px;
        color: white;
        position: absolute;
        right: $TOUCH_RIGHT;
        bottom: $TOUCH_BOTTOM;
    }
    .top-order{
        left: $TOUCH_LEFT;
        top: $TOUCH_TOP;
        transform: rotateZ(180deg);
    }

    #order-list{
        width: 100%; height: 100%;
        position: absolute; top: 0;
        #list{
            width: 303px; height: 440px;
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
                top: 70px;  overflow-y: scroll;
                height: 300px;
                width: 99%; left: 0; margin-left: 0;
                #allOrders{
                    .orderWrapper{
                        margin-bottom: 36px;
                        .total{
                            width: 100%;
                            line-height: 20px;
                            font-size: 12px;
                            text-align: left;
                            padding-left: 12px;
                            box-sizing: border-box;
                        }
                        .table{
                            table-layout: fixed; width: 100%;
                            border-top: 1px solid $BASIC_BLUE;
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
                            .tr:last-child{
                                border-bottom: 1px solid $BASIC_BLUE;
                            }
                        }
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
                top: 400px;
            }
        }

        .complete, .closeOrder{
            background-color: $BASIC_BLUE;
            width: 84px; text-align: center;
            height: 28px; line-height: 28px;
            border-radius: 5px;
            color: white;
            position: absolute;
            right: $TOUCH_RIGHT;
            bottom: $TOUCH_TOP;
        }
        .complete{
            bottom: $TOUCH_TOP + 40px;
        }
    }
}
</style>
