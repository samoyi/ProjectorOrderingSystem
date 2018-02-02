<template>
    <div v-show="alertMessage.trim()" id="customAlert">
        <p>{{alertMessage.trim()}}</p>
        <p class="topMsg">{{alertMessage.trim()}}</p>
        <div class="bottom" v-btnTouchAni @click="close">确定</div>
        <div class="top" v-btnTouchAni @click="close">确定</div>
    </div>
</template>

<script>

export default {
    props: {
        alertMessage: String,
        default: '',
    },
    data () {
        return {
        }
    },
    methods: {
        close(){
            // this.$palertMessage = '';
            this.$emit('close');
        },
    },
}
</script>

<style lang="scss">
@import '../../scss/common.scss';

#customAlert{
    width: $TOUCH_WIDTH;
    height: $TOUCH_HEIGHT;
    @include absCenter;
    z-index: $ALERT_INDEX;
    background-color: #333;
    p{
        width: 100%; height: 1em; text-align: center;
        color: white;
        position: absolute; bottom: 20%;
    }
    .topMsg{
        top: 20%; transform: rotateZ(180deg);
    }
    .bottom, .top{
        background-color: $BASIC_BLUE; color: white;
        width: 84px; text-align: center;
        height: 28px; line-height: 28px;
        border-radius: 5px;
        position: absolute; right: 0; bottom: 0;
    }
    .top{
        left: 0; top: 0;
        transform: rotateZ(180deg);
    }
}

</style>
