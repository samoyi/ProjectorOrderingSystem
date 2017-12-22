<template>
    <dial-component
            :items="orderingCatas"
            :diameter="142"
            :icon-dir="'./server-side/public/images/icons/ordering/'"
            :icon-type="'png'"
            @dial-enter="selectCata">
    </dial-component>
</template>

<script>

import dial from './dial';

export default {
    data () {
        return {
            orderingCatas:['cake', 'drink'],
        }
    },
    components: {
        'dial-component': dial,
    },

    methods: {
        selectCata(sCata){
            console.log(sCata);
        }
    },
}
</script>

<style lang="scss">

</style>
