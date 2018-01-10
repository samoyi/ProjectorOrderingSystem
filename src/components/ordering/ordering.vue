<template>
    <div id="ordering">
        <ul id="list" v-if="selectedCata">
            <li v-for="(item,index) in displayedList"
                    :style="itemStyle(displayedList.length, index)"
                    :class="{selected:index===selectedIndex}"
                    @click="itemDetail(item, index)" >
                <img :src="item.img"
                        :style="itemImageStyle(displayedList.length, index)" />
            </li>
        </ul>
        <dial-component id="dial"
            :items="Object.keys(storeData.menu)"
            :diameter="dialDiameter"
            :icon-dir="'./server-side/public/images/icons/ordering/'"
            :icon-type="'png'"
            @dial-enter="selectCata">
        </dial-component>
        <div class="prev" v-show="pageSwitcher.oDisplayPageTip[selectedCata]
                    && (pageSwitcher.oPageIndex[selectedCata]!==0)"
                @click="prevPage">
            ◀
        </div>
        <div class="next" v-show="pageSwitcher.oDisplayPageTip[selectedCata]
                    && (pageSwitcher.oPageIndex[selectedCata]
                        !==pageSwitcher.oPageAmount[selectedCata]-1)"
                @click="nextPage">
            ▶
        </div>

        <div v-show="cart.list.length" class="order" v-btnTouchAni
                @click="order(0)">查看/下单</div>
        <div v-show="selectedItem" class="add" v-btnTouchAni
                @click="add(selectedCata, selectedItem)">加入清单</div>
        <div class="back" v-btnTouchAni
                @click="back">返回</div>
        <div v-show="cart.list.length" class="order orderTop" v-btnTouchAni
                @click="order(1)">查看/下单</div>
        <div v-show="selectedItem" class="add addTop" v-btnTouchAni
                @click="add(selectedCata, selectedItem)">加入清单</div>
        <div class="back backTop" v-btnTouchAni
                @click="back">返回</div>

        <div v-if="selectedItem" class="itemDetail">
            <div class="info">
                <p>
                    <span>商品名：</span>
                    <span>{{selectedItem.name}}</span>
                </p>
                <p>
                    <span>主口味：</span>
                    <span>{{selectedItem.flavor}}</span>
                </p>
                <p>
                    <span>主要原料：</span>
                    <span>{{selectedItem.material}}</span>
                </p>
                <p>
                    <span>推荐度：</span>
                    <span>{{selectedItem.recommendation}}</span>
                </p>
            </div>
            <div class="imgFrame">
                <img :src="selectedItem.img" />
                <div class="imgCover"></div>
            </div>
        </div>
        <div v-if="selectedItem" class="itemDetail itemDetailTop">
            <div class="info">
                <p>
                    <span>商品名：</span>
                    <span>{{selectedItem.name}}</span>
                </p>
                <p>
                    <span>主口味：</span>
                    <span>{{selectedItem.flavor}}</span>
                </p>
                <p>
                    <span>主要原料：</span>
                    <span>{{selectedItem.material}}</span>
                </p>
                <p>
                    <span>推荐度：</span>
                    <span>{{selectedItem.recommendation}}</span>
                </p>
            </div>
            <div class="imgFrame">
                <img :src="selectedItem.img" />
                <div class="imgCover"></div>
            </div>
        </div>
        <transition name="fade">
            <div id="tip" v-show="tipIn">
                <p>已添加：{{selectedItem.name}}</p>
                <p>已添加：{{selectedItem.name}}</p>
            </div>
        </transition>
    </div>
</template>

<script>

import dial from './dial';
import styleConfig from '../../js/styleConfig';
import MyUtil from '../../js/MyUtil';
import DialRotation from '../../js/DialRotation';


export default {
    props: ["storeData", "cart"],
    data () {
        return {
            dialDiameter: styleConfig.ORDERING_DIAL_DIAMETER,
            selectedCata: '',
            selectedItem: '',
            selectedIndex: null,
            tipIn: false, // 添加提醒是否出现
            pageSwitcher: {
                oDisplayPageTip: {}, // 每个分类是否显示上下页按钮
                oItemAmount: {}, // 所有分类的商品数量
                oPageIndex: {}, // 所有分类的当前页码
                oPageAmount: {}, // 所有分类的总页码
            },
            nMenuAngle: 0, // 菜单转盘的角度。用来确定那些项目要上下颠倒
        }
    },
    components: {
        'dial-component': dial,
    },
    methods: {
        selectCata(sCata){
            this.selectedCata = sCata;
        },
        prevPage(){
            this.pageSwitcher.oPageIndex[this.selectedCata]--;
        },
        nextPage(){
            this.pageSwitcher.oPageIndex[this.selectedCata]++;
        },
        itemStyle(nDisplayed, index){ // 图标随着转动保持竖直，如过山车
            const nListRadius = styleConfig.ORDERING_LIST_DIAMETER/2,
                  nItemRadius = styleConfig.ORDERING_ITEM_DIAMETER/2;
            let aCoordinate = MyUtil.coordinatesOnRing(nListRadius, nDisplayed
                                                      , -Math.PI/2);
            let aAngle = MyUtil.radiansOnRing(nListRadius, nDisplayed
                                , -Math.PI/2).map(radian=>radian*180/Math.PI);

            let nRotate = (aCoordinate[index][1]<0?180:0) - this.nMenuAngle;
            return {
                left: aCoordinate[index][0] + nListRadius - nItemRadius + 'px',
                top: aCoordinate[index][1] + nListRadius - nItemRadius + 'px',
                transform: 'rotateZ(' +nRotate+ 'deg)',
            };
        },
        itemImageStyle(nDisplayed, index){ // 图片根据X轴上下颠倒
            const nListRadius = styleConfig.ORDERING_LIST_DIAMETER/2;
            let aAngle = MyUtil.radiansOnRing(nListRadius, nDisplayed
                                , -Math.PI/2).map(radian=>radian*180/Math.PI);

            function ifReverse(nInitAngle, nCurMenuAngle){
                let nMenuAngle = nCurMenuAngle;
                if(nInitAngle<=180){
                    return (nMenuAngle>nInitAngle && nMenuAngle<nInitAngle+180)
                    || (nMenuAngle>nInitAngle-360 && nMenuAngle<nInitAngle-180);
                }
                else{
                    return (nMenuAngle>nInitAngle-180 && nMenuAngle<nInitAngle)
                    || (nMenuAngle>nInitAngle-540 && nMenuAngle<nInitAngle-360);
                }
            }

            let bReverse = ifReverse(aAngle[index], this.nMenuAngle),
                nRotate = bReverse?-180:0;
            return {
                transform: 'rotateZ(' +nRotate+ 'deg)',
            };
        },
        itemDetail(item, index){
            this.selectedItem = item;
            this.selectedIndex = index;
        },

        add(sCata, oItem){
            this.$emit('add', sCata, oItem);
            this.tipIn = true;
            setTimeout(()=>{
                this.tipIn = false;
            }, 500);

        },
        order(nPosition){
            // this.$emit('order');
            this.$router.push('cart');
            this.$parent.nPosition = nPosition;
        },
        back(){
            this.$router.go(-1);
        },
    },
    watch:{
        selectedCata(){
            // 大菜单转动
            this.$nextTick(()=>{
                let oList = document.querySelector('#list'),
                    nEndAngle = 0;

                const nListRadius = styleConfig.ORDERING_LIST_DIAMETER/2;
                const dialRotation = new DialRotation.Rotation(
                            styleConfig.SCREEN_WIDTH/2
                            ,styleConfig.SCREEN_HEIGHT/2
                            ,nListRadius+styleConfig.ORDERING_ITEM_DIAMETER/2
                            ,this.nMenuAngle);
                // 因为不同类别的餐品使用的统一转盘
                // 不要每次切换类别都初始化一个转动对象
                oList.addEventListener('touchstart', (ev)=>{

                    this.bTransition = false;
                    dialRotation.start(ev.touches[0].clientX,
                        ev.touches[0].clientY);
                });

                dialRotation.throttling = false;
                oList.addEventListener('touchmove', (ev)=>{

                    if(!dialRotation.throttling){
                        dialRotation.throttling = true;
                        setTimeout(function(){
                            dialRotation.throttling = false;
                        }, 50);
                        nEndAngle = dialRotation.curDeg(
                                        ev.changedTouches[0].clientX,
                                        ev.changedTouches[0].clientY);
                        oList.style.transform = 'rotateZ('
                            +nEndAngle+ 'deg)';
                        this.nMenuAngle = nEndAngle;
                    }
                });
            });

        }
    },
    computed: {
        displayedList(){
            let items = this.storeData.menu[this.selectedCata],
                nCurPageIndex = this.pageSwitcher.oPageIndex[this.selectedCata];
            return items.slice(nCurPageIndex*10, (nCurPageIndex+1)*10);
        },
    },
    mounted(){
        // 初始化pageSwitcher
        let oMenu = this.storeData.menu;
        for(let cata in oMenu){
            // 当前类是否数量超过十个，超过就允许显示上下页按钮。
            // 但实际是否会某一个，还要再判断页码是否符合
            this.$set(this.pageSwitcher.oDisplayPageTip, cata, oMenu[cata].length>10);

            this.$set(this.pageSwitcher.oItemAmount, cata, oMenu[cata].length);
            this.$set(this.pageSwitcher.oPageAmount, cata, Math.ceil(oMenu[cata].length / 10));
            this.$set(this.pageSwitcher.oPageIndex, cata, 0);
        }
    },
}
</script>

<style lang="scss">
@import '../../scss/common.scss';

#ordering{
    width: 100%; height: 100%;
    position: absolute; top: 0; left: 0;
    #list{
        width: 300px; height: 300px;
        @include absCenter;
        li{
            position: absolute;
            background: white;
            width:80px; height: 80px; border-radius: 50%;
            box-sizing: border-box;
            img{
                display: block;
                @include absCenter;
                max-width: 60px; max-height: 60px;
            }
        }
        .selected{
            border: 5px solid rgba(130, 209, 226, 0);
            animation: select 0.4s forwards;
        }
        @keyframes select{
            0%{
                border-color: rgba(130, 209, 226, 0);
            }
            100%{
                border-color: rgba(130, 209, 226, 1);
            }
        }
    }
    #dial{
        width: 142px; height: 142px;
    }

    .prev, .next{
        position: absolute;
        top: $TOUCH_TOP + $TOUCH_HEIGHT/2;
        background-color: $BASIC_BLUE;
        width: 22px; text-align: center;
        height: 22px; line-height: 24px;
        border-radius: 3px; font-size: 22px;
        color: white;
    }
    .prev{
        left: $TOUCH_LEFT;
    }
    .next{
        right: $TOUCH_RIGHT;
    }

    .order, .add, .back{
        background-color: $BASIC_BLUE;
        width: 84px; text-align: center;
        height: 28px; line-height: 28px;
        border-radius: 5px;
        color: white;
        position: absolute;
        right: $TOUCH_RIGHT;
    }
    .order{
        bottom: $TOUCH_BOTTOM + 40px;
    }
    .add{
        bottom: $TOUCH_BOTTOM;
    }
    .back{
        bottom: $TOUCH_BOTTOM;
        left: $TOUCH_LEFT;
    }
    .orderTop, .addTop{
        left: $TOUCH_LEFT;
        transform: rotateZ(180deg);
    }
    .backTop{
        right: $TOUCH_RIGHT; left: auto;
        top: $TOUCH_TOP;
        transform: rotateZ(180deg);
    }
    .orderTop{
        top: $TOUCH_TOP + 40px;
    }
    .addTop{
        top: $TOUCH_TOP;
    }

    $imgMax: 300px;
    .itemDetail{
        width: 100%; height: $imgMax;
        position: absolute; left: 0; bottom: 0;
        .info{
            height: 100%;
            position: absolute;
            width: $SCREEN_WIDTH - $TOUCH_LEFT - $imgMax;
            right: $imgMax; top: 0;
            p{
                font-size: 14px;
                margin-bottom: 16px;
                line-height: 22px;
                text-align: left;
                span:first-child{
                    color: $BASIC_BLUE;
                }
                span:last-child{
                    color: #a3a3a3;
                }
            }
            p:nth-child(1){
                padding-left: 4em;
                span:first-child{
                    margin-left: -4em;
                }
            }
            p:nth-child(2){
                padding-left: 4em;
                span:first-child{
                    margin-left: -4em;
                }
            }
            p:nth-child(3){
                padding-left: 5em;
                span:first-child{
                    margin-left: -5em;
                }
            }
            p:nth-child(4){
                padding-left: 4em;
                span:first-child{
                    margin-left: -4em;
                }
            }
            .textAniL{
                animation: textSlideInL 0.8s;
            }
            .textAniR{
                animation: textSlideInR 0.8s;
            }
            @keyframes textSlideInL{
                0%{
                    transform: translateX(-40px);
                    opacity: 0;
                }
                100%{
                    transform: translateX(0px);
                    opacity: 1;
                }
            }
            @keyframes textSlideInR{
                0%{
                    transform: translateX(40px);
                    opacity: 0;
                }
                100%{
                    transform: translateX(0px);
                    opacity: 1;
                }
            }
        }
        .imgFrame{
            width: $imgMax;
            height: 100%;
            position: absolute;
            bottom: 0; right: 0;
            img{
                max-width: $imgMax;
                max-height: $imgMax;
                display: block;
                @include absCenter;
            }
            .imgCover{
                position: absolute; top: 0;
                width: 100%; height: 100%;
                background-image: radial-gradient(260px circle,
                    rgba(255,255,255,0), rgba(255,255,255,1));
            }
        }
    }
    .itemDetailTop{
        transform: rotateZ(180deg); top: 0;
    }
}

#tip{
    color: $BASIC_BLUE; background-color: rgba(0, 0, 0, 0.5);
    @include absCenter;
    width: 100%; height: 100%; text-align: center;
    font-size: 18px;
    p{
        position: absolute;
        width: 100%;
    }
    p:first-child{
        top: $SCREEN_HEIGHT - $TOUCH_BOTTOM + 8px;
    }
    p:last-child{
        bottom: $SCREEN_HEIGHT - $TOUCH_TOP + 8px;
        transform: rotateZ(180deg);
    }
}
.fade-leave-active {
  transition: opacity .4s
}
.fade-leave-to{
  opacity: 0
}
















</style>
