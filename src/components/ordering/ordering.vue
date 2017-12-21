<template>
    <dial-component
            :items="orderingCatas"
            :diameter="142"
            :icon-dir="'./server-side/public/images/icons/ordering/'"
            :icon-type="'png'">
    </dial-component>
</template>

<script>

import dial from './dial';

export default {
    data () {
        return {
            catas: [

            ],
        }
    },
    components: {
        'dial-component': dial,
    },
    data () {
        return {
            orderingCatas:['cake', 'drink', 'cake', 'drink'],
        }
    },
}
</script>

<style lang="scss">

</style>
