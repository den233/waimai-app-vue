<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item border-1px" :class="{'menu-item-active' : index === currentIndex}" @click="selectMenu(index, $event)">
          <div class="menu-content">
            <icon v-if="item.type > 0" :type="item.type"></icon>{{ item.name }}
          </div>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <li @click="selectFood(food)" v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon" alt="" width="57" height="57">
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="sale">月售{{ food.sellCount }}份</span><span>好评率{{ food.rating }}%</span>
                </div>
                <div class="price">
                  <span class="nowPrice"><i>¥</i>{{ food.price }}</span><span v-if="food.oldPrice" class="oldPrice">¥{{ food.oldPrice }}</span>
                </div>
                <add-subtract :food="food" @on-add="whichAdd"></add-subtract>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <shop-cart :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice" :selectFood="selectFoods" ref="shopCart"></shop-cart>
    <goods-detail :food="selectedFood" @on-add="whichAdd" ref="goodsDetails"></goods-detail>
  </div>
</template>

<script type="es6">
  import BetterScroll from 'better-scroll'
  import icon from '../icon/icon'
  import ShopCart from '../shopCart/shopCart'
  import addSubtract from '../addSubtract/addSubtract'
  import goodsDetail from '../goodsDetail/detail'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      icon,
      ShopCart,
      addSubtract,
      goodsDetail
    },
    data (){
      return {
        goods: [],
        heightList: [],
        foodList: [],
        scrollY: 0,
        selectedFood: {}
      }
    },
    computed: {
      currentIndex (){
        for(let i=0; i<this.heightList.length; i++){
          let currentHeight = this.heightList[i];
          let nextHeight = this.heightList[i+1];
          if(!nextHeight || (currentHeight <= this.scrollY && nextHeight > this.scrollY)){
            //console.log(i);
            return i;
          }
        }
      },
      selectFoods (){
        let foods = [];
        this.goods.forEach((good,k) => {
          good.foods.forEach((food,k) => {
            if(food.count){
              foods.push(food)
            }
          })
        });
        return foods;
      }
    },
    mounted (){
      this.$http.get('/api/goods').then(
        (res) => {
          if(res.data.errno === 0){
            this.goods = res.data.data;
            this.$nextTick(() => {
              this._initScroll();
              this._calculateHeight()
            })
          }
        },
        (error) => {
          console.log(error)
        }
      );
    },
    methods: {
      _initScroll (){
        this.menuScroll = new BetterScroll(this.$refs.menu, {
          click: true
        });
        this.foodScroll = new BetterScroll(this.$refs.foods, {
          probeType: 3,
          click: true
        });
        //console.log(this.foodScroll);
        this.foodScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.ceil(pos.y))+10;
          //console.log(this.scrollY)
        });
      },
      _calculateHeight (){
        this.foodList = this.$refs.foods.getElementsByClassName("food-list-hook");
        let height = 0;
        this.heightList.push(height);
        for(let i=0; i<this.foodList.length; i++){
          height += this.foodList[i].clientHeight;
          this.heightList.push(height);
        }
      },
      selectMenu (index, event){
        if(!event._constructed){
          return
        }
        //console.log(index);
        let el = this.foodList[index];
        this.foodScroll.scrollToElement(el, 200)
      },
      //子组件addSubtract 传出的 自定义事件处理
      whichAdd (target){
        //利用 $refs 访问 子组件shopCart drop方法 并将参数传过去
        this.$refs.shopCart.drop(target);
      },
      selectFood (food){
        this.selectedFood = food;
        this.$refs.goodsDetails.show();
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.stylus"
  .goods
    display flex
    position absolute
    top 174px
    bottom 48px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      background #f3f5f7
      .menu-item-active
        background #fff
        font-weight 700
      .menu-item
        display table
        text-align center
        width 54px
        height 54px
        padding 0 13px
        font-size 12px
        line-height 14px
        color rgb(7, 17, 27)
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
        .menu-content
          height 100%
          display table-cell
          vertical-align middle
          .icon
            width 12px
            height 12px
            vertical-align top
            background-size 12px 12px
    .foods-wrapper
      flex 1
      .food-list
        .title
          font-size 12px
          color rgb(147, 153, 159)
          height 26px
          line-height 26px
          background #f3f5f7
          border-left 2px solid #d9dde1
          padding-left 14px
        .food-item
          display flex
          font-size 0
          margin 0 18px
          padding 18px 0
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
          .icon
            vertical-align top
          .content
            flex 1
            margin-left 10px
            position relative
            .name
              font-size 14px
              line-height 14px
              color rgb(7, 17, 27)
              margin-top 2px
              margin-bottom 8px
            .desc
              font-size 10px
              line-height 12px
              color rgb(147, 153, 159)
            .extra
              font-size 10px
              line-height 10px
              color rgb(147, 153, 159)
              margin-top 8px
              .sale
                margin-right 12px
            .price
              .nowPrice
                font-size 14px
                color rgb(240, 20, 20)
                line-height 24px
                font-weight 700
                margin-right 8px
                &>i
                  font-size 10px
                  font-style normal
                  font-weight normal
              .oldPrice
                font-size 10px
                color rgb(147, 153, 159)
                line-height 24px
                font-weight 700
                text-decoration line-through
</style>
