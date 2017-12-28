<template>
    <div id="pay">
        <div>{{cart.total}}</div>
        <div class="alipay" @click="alipay">支付宝</div>
        <div class="wechat" @click="wechat">微信</div>
        <div class="back" @click="back">返回</div>
    </div>
</template>

<script>

// 支付成功后，生成订单详情，包含生成时间
// 在点击已上齐之前再次下单支付，则订单详情中再添加一条记录

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

    .back, .wechat, .alipay{
        background-color: $BASIC_BLUE;
        width: 84px; text-align: center;
        height: 28px; line-height: 28px;
        border-radius: 5px;
        color: white;
        position: absolute;
        right: $TOUCH_RIGHT;

    }
    .back{
        bottom: $TOUCH_BOTTOM;
    }
    .wechat{
        bottom: $TOUCH_BOTTOM + 40px;
    }
    .alipay{
        bottom: $TOUCH_BOTTOM + 80px;
    }
}
</style>
