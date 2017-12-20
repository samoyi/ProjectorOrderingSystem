<template>
    <div id="main_menu">
        <!-- 分割线独立于图标计算 -->
        <div id="divider-wrapper">
            <div class="divider" id="single-divider" v-if="primaryCatas.length===2">
            </div>
            <div class="divider" id="trible-divider" v-else-if="primaryCatas.length===3">
                <div class="divider"></div>
                <div class="divider"></div>
            </div>
            <div class="divider" id="double-divider" v-else>
                <div class="divider"></div>
            </div>
        </div>
        <div id="icons">
            <!-- icon-wrapper初始位置都在贴下居中，根据需要旋转 -->
            <div class="icon-wrapper" v-for="(cata,index) in primaryCatas"
                     :style="rotateIconWrapper(primaryCatas.length, index)">
                <img :src="'./server-side/public/images/icons/' +cata+ '.png'" @click="enter(cata)" />
            </div>
        </div>
    </div>
</template>

<script>

import ajax from '../../js/ajax';

export default {
    name: 'main_menu',
    data () {
        return {
            primaryCatas:[],
        }
    },
    computed:{

    },
    methods: {
        rotateIconWrapper(count, index){
            if(count<1 || count>4){
                alert('主菜单图标数量至少一个最多四个');
                return;
            }

            let oStyle = {};

            if(count===2){
                if(index){
                    oStyle.transform = 'rotateZ(180deg)';
                }
            }

            if(count===3){
                if(index===1){
                    oStyle.transform = 'rotateZ(120deg)';
                }
                else if(index===2){
                    oStyle.transform = 'rotateZ(240deg)';
                }
            }

            if(count===4){
                if(index===1){
                    oStyle.transform = 'rotateZ(90deg)';
                }
                else if(index===2){
                    oStyle.transform = 'rotateZ(180deg)';
                }
                else if(index===3){
                    oStyle.transform = 'rotateZ(270deg)';
                }
            }
            return oStyle;
        },
        enter(sRoute){
            this.$router.push(sRoute);
        },
    },
    mounted(){
        ajax.ajax_get('./server-side/merchants/testMerchant/testStore/config.json', res=>{
            let oConfig = JSON.parse(res);
            this.primaryCatas = oConfig.primaryCatas;
        }, err=>{
            alert('读取店铺配置失败：' + err);
        });
    }
}
</script>

<style scoped lang="scss">
@import "../../scss/common.scss";

$length: 220px;

#main_menu{
    width: $length; height: $length;
    border: 4px solid #82d1e2; border-radius: 50%;
    @include absCenter;

    #divider-wrapper{
        width: 100%; height: 100%;
        $divider-width: 3px;
        .divider{
            background-color: #82d1e2;
        }
        #single-divider, #double-divider{
            width: 100%; height: $divider-width;
            @include absCenter;
        }
        #double-divider{
            transform: rotateZ(45deg);
        }
        #trible-divider{
            width: $divider-width; height: $length/2;
            @include absHorCenter;
            div{
                width: $divider-width; height: $length/2;
                @include absHorCenter;
                transform-origin: 50% $length/2 - $divider-width + 1px;
            }
            div:first-child{
                transform: rotateZ(120deg);
            }
            div:last-child{
                transform: rotateZ(240deg);
            }
        }
        #double-divider{
            div{
                width: $divider-width; height: $length;
                @include absCenter;
            }
        }
    }
    #icons{
        .icon-wrapper{
            width: 100px; height: $length/2;
            @include absHorCenter; bottom: 0;
            transform-origin: 50% 0;
            img{
                cursor: pointer;
                @include absHorCenter; bottom: 20px;
            }
        }
    }
}
</style>
