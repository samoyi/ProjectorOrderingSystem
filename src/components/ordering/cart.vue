<template>
    <div id="cart">
        <div id="list">
            <header>已选择餐品</header>
            <div id="tableWrapper">
                <table id="table">
                    <tr class="tr">
                        <td class="td">名称</td>
                        <td class="td">数量</td>
                        <td class="td">价格</td>
                    </tr>
                    <tr class="tr" v-for="item in aCart">
                        <td class="td">{{item.name}}</td>
                        <td class="td">
                            <span>-</span>
                            {{item.amount}}
                            <span>+</span>
                        </td>
                        <td class="td">{{item.price*item.amount/100}}</td>
                    </tr>
                </table>
            </div>
            <div id="total">总计：¥{{total}}</div>
        </div>
        <div class="back" @click="back">返回</div>
        <div class="order" @click="order">下单</div>
    </div>
</template>

<script>


export default {
    props: ["cart"],
    components: {
    },
    data () {
        return {
            aCart: this.cart,
        }
    },
    methods: {
        back(){
            this.$router.go(-1);
        },
        order(){

        },
    },
    computed: {
        total(){
            let nTotal = 0;
            this.aCart.forEach(item=>{
                nTotal += item.price*item.amount/100;
            });
            console.log(nTotal);
            return nTotal;
        }
    },
    mounted(){
    }
}



</script>

<style scoped lang="scss">
@import '../../scss/common.scss';

#cart{
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
            width: 100%; left: 0; margin-left: 0;
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
                        span{
                            display: inline-block; width: 16px; height: 16px;
                            border-radius: 50%;
                            background-color: $BASIC_BLUE;
                            color: white;
                        }
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
        #total{
            position: absolute;
            right: 20px;
            top: 280px;
        }
    }

    .back, .order{
        background-color: $BASIC_BLUE;
        width: 84px; text-align: center;
        height: 28px; line-height: 28px;
        border-radius: 5px;
        color: white;
        position: absolute;
        right: $TOUCH_RIGHT;

    }
    .order{
        bottom: $TOUCH_BOTTOM;
    }
    .back{
        bottom: $TOUCH_BOTTOM + 40px;
    }
}
</style>
