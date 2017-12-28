<!-- 通用的原型拨盘，支持最少一个最多四个选项 -->

<!-- props
* items属性     数组    数组项为所有选项的名称，该选项图标被点击后emit的事件会带上响应
                         的名称作为参数。同时该名称也会和iconDir属性结合起来作为选项
                         图标的路径，所以图标图片也必须是以对应名称命名的。如果名称为
                         空字符串，仍会保留空位，但不会显示图标。
* diameter属性  整数    接收圆盘的直径，像素值的整数部分
* iconDir属性   字符串  接受图标图片所在目录，结尾要有“/”
* iconType属性  字符串  接受图标图片的扩展名
-->

<!-- 动画逻辑
* 圆盘可以拖动旋转，方便查看
* 但并没有旋转到指定位置视为选中某个图标的逻辑。比如只有两个不同的图标，旋转后也不知道是
  要选哪一个
* 点击图标圆盘不转动，因为不知道是谁点的，所以不知道要转到哪个方向
-->
<template>
    <div id="dial" :style="dialStyle" :class="{transition: bTransition}">
        <!-- 分割线独立于图标计算 -->
        <div id="divider-wrapper">
            <div class="divider" id="single-divider"
                    v-if="items.length===2"
                    :style="{height: dividerWidth()+'px'}">
            </div>
            <div class="divider" id="trible-divider"
                    v-else-if="items.length===3"
                    :style="tribleStyle">
                <div class="divider" :style="tribleInnerStyle"></div>
                <div class="divider" :style="tribleInnerStyle"></div>
            </div>
            <div class="divider" id="double-divider"
                    v-if="items.length===4"
                    :style="{height: dividerWidth()+'px'}">
                <div class="divider" :style="doubleInnerStyle"></div>
            </div>
        </div>
        <div id="icons">
            <!-- icon-wrapper初始位置都在贴下居中，根据需要旋转 -->
            <div class="icon-wrapper" v-for="(cata,index) in items"
                     :style="iconWrapperStyle(items.length, index)">
                <img v-if="cata" :src="iconDir + cata + '.' + iconType"
                        :style="{bottom: 2000/110+'%'}" @click="enter(cata)" />
            </div>
        </div>
    </div>
</template>

<script>
import DialRotation from '../../js/DialRotation';
import styleConfig from '../../js/styleConfig';

export default {
    props: {
        'items': Array,
        'diameter': Number,
        'iconDir': String,
        'iconType': String,
    },
    data () {
        return {
            bTransition: true,
        }
    },
    computed:{
        dialStyle(){
            return {
                width: this.diameter + 'px',
                height: this.diameter + 'px',
                borderWidth: this.dividerWidth() + 1 + 'px',
            };
        },
        tribleStyle(){
            return {
                width: this.dividerWidth() + 'px',
                height: this.diameter/2 + 'px',
            };
        },
        tribleInnerStyle(){
            return {
                width: Math.ceil(this.diameter/100) + 'px',
                height: this.diameter/2 + 'px',
                transformOrigin: '50% ' + (this.diameter/2
                                   - this.dividerWidth() + 1) + 'px',
            };
        },
        doubleInnerStyle(){
            return {
                width: this.dividerWidth() +'px',
                height: this.diameter + 'px',
            };
        },

    },
    methods: {
        dividerWidth(){
            return Math.ceil(this.diameter/100);
        },
        iconWrapperStyle(count, index){
            if(count<1 || count>4){
                alert('主菜单图标数量至少一个最多四个');
                return;
            }

            let oStyle = {
                width: this.diameter*(100/220) + 'px',
                height: this.diameter/2 + 'px',
            };

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
        enter(sCata){
            this.$emit('dial-enter', sCata);
        },
    },
    mounted(){
        let oDial = document.querySelector('#dial'),
            nEndAngle = 0,
            nNewAngle = null;
        const dialRotation = new DialRotation.Rotation(styleConfig.SCREEN_WIDTH/2,
                                    styleConfig.SCREEN_HEIGHT/2, this.diameter/2);

        oDial.addEventListener('touchstart', (ev)=>{
            this.bTransition = false;
            dialRotation.start(ev.touches[0].clientX,
                            ev.touches[0].clientY, nNewAngle);
        });

        dialRotation.throttling = false;
        oDial.addEventListener('touchmove', (ev)=>{

            if(!dialRotation.throttling){
                dialRotation.throttling = true;
                setTimeout(function(){
                    dialRotation.throttling = false;
                }, 50);
                nEndAngle = dialRotation.curDeg(ev.changedTouches[0].clientX,
                            ev.changedTouches[0].clientY);
                oDial.style.transform = 'rotateZ('
                    +nEndAngle+ 'deg)';
            }
        });

        window.addEventListener('touchend', ()=>{
            this.bTransition = true;
            // transition到正的位置
            let nIconAmount = this.items.length;
            let n = dialRotation.adjust(nEndAngle, nIconAmount);
            oDial.style.transform = 'rotateZ(' +n+ 'deg)';
            nNewAngle = n;
        });
    },
}
</script>

<style scoped lang="scss">
@import "../../scss/common.scss";


#dial{
    border: solid #82d1e2; border-radius: 50%;
    @include absCenter;

    #divider-wrapper{
        width: 100%; height: 100%;
        .divider{
            background-color: $BASIC_BLUE;
        }
        #single-divider, #double-divider{
            width: 100%;
            @include absCenter;
        }
        #double-divider{
            transform: rotateZ(45deg);
        }
        #trible-divider{
            @include absHorCenter;
            div{
                @include absHorCenter;
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
                @include absCenter;
            }
        }
    }
    #icons{
        .icon-wrapper{
            @include absHorCenter; bottom: 0;
            transform-origin: 50% 0;
            img{
                cursor: pointer;
                @include absHorCenter;
            }
        }
    }
}
.transition{
    transition: transform .5s;
}
</style>
