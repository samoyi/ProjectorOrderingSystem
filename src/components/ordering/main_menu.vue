<template>
    <dial-component id="dial" :class="{transition: bTransition}"
            :items="primaryCatas"
            :diameter="220"
            :icon-dir="'./server-side/public/images/icons/main_menu/'"
            :icon-type="'png'"
            @dial-enter="routes">
    </dial-component>
</template>

<script>

import ajax from '../../js/ajax';
import MyUtil from '../../js/MyUtil';
import dial from './dial';

export default {
    name: 'main_menu',
    components: {
        'dial-component': dial,
    },
    data () {
        return {
            primaryCatas:[],
            bTransition: true,
        }
    },
    methods: {
        routes(sCata){
            this.$router.push(sCata);
        }
    },
    mounted(){
        ajax.ajax_get('./server-side/merchants/testMerchant/testStore/config.json', res=>{
            let oConfig = JSON.parse(res);
            this.primaryCatas = oConfig.primaryCatas;
        }, err=>{
            alert('读取店铺配置失败：' + err);
        });

        { // dial rotation
            let oDial = document.querySelector('#dial'),
                nEndAngle = 0,
                nNewAngle = null;
            const dialAngle = new MyUtil.DialAngle(384, 512, 110);

            oDial.addEventListener('touchstart', (ev)=>{
                this.bTransition = false;
                dialAngle.start(ev.touches[0].clientX,
                                ev.touches[0].clientY, nNewAngle);
            });

            dialAngle.throttling = false;
            window.addEventListener('touchmove', (ev)=>{
                if(!dialAngle.throttling){
                    dialAngle.throttling = true;
                    setTimeout(function(){
                        dialAngle.throttling = false;
                    }, 50);
                    nEndAngle = dialAngle.curDeg(ev.changedTouches[0].clientX,
                                ev.changedTouches[0].clientY);
                    oDial.style.transform = 'rotateZ('
                        +nEndAngle+ 'deg)';
                }
            });

            window.addEventListener('touchend', ()=>{
                this.bTransition = true;
                // transition到正的位置
                let nIconAmount = this.primaryCatas.length;
                if(nIconAmount===4){

                }
                else if(nIconAmount===3){
                    // if(nEndAngle>=-60 && nEndAngle<60 || ){
                    //
                    // }
                    // else if(nEndAngle>=60 && nEndAngle<180){
                    //
                    // }
                    // else if(nEndAngle>=180 && nEndAngle<300){
                    //
                    // }
                    // else{
                    //
                    // }
                }
                else if(nIconAmount===2){
                    const agl2rad = Math.PI/180;
                    let n = Math.cos(nEndAngle*agl2rad)>0 ?
                            0 : Math.sign(nEndAngle*agl2rad)*180;
                    oDial.style.transform = 'rotateZ(' +n+ 'deg)';
                    nNewAngle = n;
                }
            });
        }
    }
}



</script>

<style scoped lang="scss">
#dial{
    // transform: rotateZ(90deg);
}
.transition{
    transition: transform .5s;
}
</style>
