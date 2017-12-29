<template>
    <div id="main">
        <dial-component id="dial"
            :items="storeData.primaryCatas"
            :diameter="dialDiameter"
            :icon-dir="'./server-side/public/images/icons/main_menu/'"
            :icon-type="'png'"
            @dial-enter="routes">
        </dial-component>
        <div class="order top-order" v-if="orderState"  @click="showOrder(1)">查看订单</div>
        <div class="order bottom-order" v-if="orderState"  @click="showOrder(0)">查看订单</div>
        <div id="order-list" v-show="bDisplayOrder"
                 :style="{transform: 'rotateZ(' + position*180 + 'deg)'}">
            <div @click="complete">已上齐</div>
            <div @click="closeOrder">关闭</div>
        </div>
    </div>
</template>

<script>


import dial from './dial';
import styleConfig from '../../js/styleConfig';

export default {
    name: 'main_menu',
    props: ["storeData", "orderState", "position"],
    components: {
        'dial-component': dial,
    },
    data () {
        return {
            dialDiameter: styleConfig.MAIN_DIAL_DIAMETER,
            primaryCatas:[],
            bDisplayOrder: false,
        }
    },
    methods: {
        routes(sCata){
            this.$router.push(sCata);
        },
        showOrder(nPosition){
            this.$parent.nPosition = nPosition;
            this.bDisplayOrder = true;
        },
        closeOrder(){
            this.bDisplayOrder = false;
        },
        complete(){
            this.$emit('complete');
            this.bDisplayOrder = false;
        },
    },
    mounted(){
    }
}



</script>

<style scoped lang="scss">
@import '../../scss/common.scss';
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
    .bottom-order{
        left: $TOUCH_LEFT;
        top: $TOUCH_TOP;
        transform: rotateZ(180deg);
    }
}
</style>
