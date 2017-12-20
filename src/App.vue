<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    name: 'app',
    data () {
        return {

        }
    }
}
</script>

<style lang="scss">
@import "./scss/common.scss";

#app{
    background-color: pink;
}
</style>
