<template>
    <div id="app">
        <!-- 可触摸区域。开发时方便了解范围，正式使用时不需要，应注释 -->
        <div id="touchArea"></div>
        <!-- 点击时的反馈效果。后来发现自带返回效果，因此不需要 -->
        <div id="touchFb" :style="touchFdStyle"></div>
        <router-view></router-view>
        <custom-alert :alert-message="sAlertMsg.trim()"
                @close="closeAlert"></custom-alert>
    </div>
</template>

<script>

import ajax from './js/ajax';
import customAlert from './components/public/customAlert';

export default {
    name: 'app',
    components: {
        'custom-alert': customAlert,
    },
    data () {
        return {
            oClientConfig: [],
            touchFdStyle: {},
            sAlertMsg: '',
        }
    },
    computed: {
        cart(){
            return this.$store.state.oCart;
        },
        total(){
            return this.$store.getters.nCartAmount;
        },
    },
    methods:{
        // 全局的触摸反馈的动效，本来是加载#app上的
        // 后来发现使用触摸屏是浏览器自带动效，所以没有加
        touchFd(ev){
            this.touchFdStyle = {
                left: ev.clientX-5 + 'px',
                top: ev.clientY-5 + 'px',
                animation: 'touchFb .4s',
            };
            setTimeout(()=>{
                this.touchFdStyle = {
                    left: '0px',
                    top: '0px',
                };
            }, 400);
        },

        closeAlert(){
            this.sAlertMsg = '';
        },
    },
    mounted(){
        // 根据网址中的参数确定当前具体的客户端
        let aClientConfig = location.search.slice(1).split('&');
        if(aClientConfig.length !== 3){ // 必须要有三个参数
            this.sAlertMsg = '网址错误';
        }

        // 将三组参数组建为对象
        let oClientConfig = {},
            aPair = [];
        aClientConfig.forEach(query=>{
            aPair = query.split('=');
            if(aPair[1]){
                oClientConfig[aPair[0]] = aPair[1];
            }
            else{
                this.sAlertMsg = '网址错误';
            }
        });
        this.oClientConfig = oClientConfig;

        // 以下为测试时请求本地数据。实际使用时是请求后端数据
        // 测试url http://localhost:8080/?merchant=testMerchant&store=37ac5ae2d57709540b27e1ff7f39e2fec903bba9af21ad241309c966e57fb8e7&table=1#/main_menu
        let url = './server-side/merchants/' + oClientConfig.merchant
                        + '/' + oClientConfig.store + '/items.json';
        ajax.ajax_get(url, res=>{
            let oConfig = JSON.parse(res);
            this.$store.commit('loadStoreData', oConfig);
        }, err=>{
            this.sAlertMsg = '读取店铺配置失败：' + err;
        });
    },
};

</script>

<style lang="scss">
@import "./scss/common.scss";

#app{
    #touchFb{
        background-color: gray;
        border-radius: 100%;
        width: 20px; height: 20px;
        position: absolute;
        opacity: 0;
    }
    @keyframes touchFb{
        0%{opacity: 0; transform: scale3d(0, 0, 0);}
        30%{opacity: 0.3; transform: scale3d(0.5, 0.5, 0.5);}
        100%{opacity: 0; transform: scale3d(1, 1, 1);}
    }
    #touchArea{
        width: $TOUCH_WIDTH;
        height: $TOUCH_HEIGHT;
        position: relative;
        top: $TOUCH_TOP;
        left: $TOUCH_LEFT;
        background: gray;
        opacity: 0.2;
    }
}
</style>
