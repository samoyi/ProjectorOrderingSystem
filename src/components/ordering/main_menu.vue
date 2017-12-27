<template>
    <dial-component id="dial"
            :items="storeData.primaryCatas"
            :diameter="dialDiameter"
            :icon-dir="'./server-side/public/images/icons/main_menu/'"
            :icon-type="'png'"
            @dial-enter="routes">
    </dial-component>
</template>

<script>


import dial from './dial';
import styleConfig from '../../js/styleConfig';

export default {
    name: 'main_menu',
    props: ["storeData"],
    components: {
        'dial-component': dial,
    },
    data () {
        return {
            dialDiameter: styleConfig.MAIN_DIAL_DIAMETER,
            primaryCatas:[],
        }
    },
    methods: {
        routes(sCata){
            this.$router.push(sCata);
        }
    },
    mounted(){
    }
}



</script>

<style scoped lang="scss">
#dial{

}
</style>
