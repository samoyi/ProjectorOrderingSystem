<template>
    <div>
        <ul id="list" v-if="selectedCata">
            <li v-for="(item,index) in displayedList"
                    :style="itemStyle(displayedList.length, index)"
                    @click="itemDetail(item, index)">
                <p>{{item.name}}</p>
                <p>{{item.flavor}}</p>
                <p>{{item.material}}</p>
                <p>{{item.recommendation}}</p>
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
            上一页
        </div>
        <div class="next" v-show="pageSwitcher.oDisplayPageTip[selectedCata]
                    && (pageSwitcher.oPageIndex[selectedCata]
                        !==pageSwitcher.oPageAmount[selectedCata]-1)"
                @click="nextPage">
            下一页
        </div>
    </div>
</template>

<script>

import dial from './dial';
import styleConfig from '../../js/styleConfig';
import MyUtil from '../../js/MyUtil';
import DialRotation from '../../js/DialRotation';


export default {
    props: ["storeData"],
    data () {
        return {
            dialDiameter: styleConfig.ORDERING_DIAL_DIAMETER,
            selectedCata: '',
            pageSwitcher: {
                oDisplayPageTip: {}, // 每个分类是否显示上下页按钮
                oItemAmount: {}, // 所有分类的商品数量
                oPageIndex: {}, // 所有分类的当前页码
                oPageAmount: {}, // 所有分类的总页码
            },
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
        itemStyle(nDisplayed, index){
            const nListRadius = styleConfig.ORDERING_LIST_DIAMETER/2,
                  nItemRadius = styleConfig.ORDERING_ITEM_DIAMETER/2;
            let aCoordinate = MyUtil.coordinatesOnRing(nListRadius, nDisplayed
                                                      , -Math.PI/2);
            return {
                left: aCoordinate[index][0] + nListRadius - nItemRadius + 'px',
                top: aCoordinate[index][1] + nListRadius - nItemRadius + 'px',
            };
        },
        itemDetail(item, index){
            console.log(item.name);
            console.log(item.flavor);
            console.log(item.material);
            console.log(item.recommendation);
            console.log(this.selectedCata, index);
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
                            styleConfig.SCREEN_WIDTH/2, styleConfig.SCREEN_HEIGHT/2,
                             nListRadius+styleConfig.ORDERING_ITEM_DIAMETER/2);
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
#list{
    width: 300px; height: 300px;
    @include absCenter;
    li{
        position: absolute;
        background: white;
        width:80px; height: 80px; border-radius: 50%;
    }
}
#dial{
    width: 142px; height: 142px;
}
.prev, .next{
    position: absolute;
    top: $TOUCH_TOP + $TOUCH_HEIGHT/2;
}
.prev{
    left: $TOUCH_LEFT;
}
.next{
    right: $TOUCH_RIGHT;
}

</style>
