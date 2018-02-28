<template>
    <div id="games">
        <!-- 用iframe引入游戏，根据画面情况可能要对iframe进行缩小或扩大 -->
        <iframe src="http://localhost/Funca/FuncaProjects/2017/desktop/wuziqi/single.html"></iframe>
        <div class="back" v-btnTouchAni @click="back">返回</div>
        <div class="back backTop" v-btnTouchAni @click="back">返回</div>
    </div>
</template>

<script>

export default {
    data () {
        return {
        }
    },
    methods: {
        back(){
            this.$router.go(-1);
        },
    },
}
</script>

<style lang="scss">
@import '../../scss/common.scss';

#games{
    width: 100%; height: 100%; overflow: hidden;
    position: absolute; top: 0; left: 0;
    iframe{
        width: 100%; height: 100%;
        transform: scale3d(0.65, 0.65, 0.65); 
    }
    .back{
        background-color: $BASIC_BLUE;
        width: 84px; text-align: center;
        height: 28px; line-height: 28px;
        border-radius: 5px;
        color: white;
        position: absolute;
        bottom: $TOUCH_BOTTOM;
        left: $TOUCH_LEFT;
    }
    .backTop{
        right: $TOUCH_RIGHT; left: auto;
        top: $TOUCH_TOP;
        transform: rotateZ(180deg);
    }
}

</style>
