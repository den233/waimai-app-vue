<template>
  <div>
    <div class="shopCart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{ highlight : totalCount>0 }">
              <span class="icon-shopping_cart" :class="{ highlight : totalCount>0 }"></span>
            </div>
            <div class="number" v-if="totalCount>0">
              {{totalCount}}
            </div>
          </div>
          <div class="price" :class="{ highlight : totalCount>0 }">¥{{totalPrice}}</div>
          <div class="desc">配送费¥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right" @click.stop="pay">
          <div class="pay" :class="[isEnough ?'enough':'not-enough']">{{payDesc}}</div>
        </div>
      </div>
      <div class="ball-container">
        <transition-group @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" name="drop">
          <div class="ball" v-for="(ball,index) in balls" v-show="ball.show" :key="index">
            <div class="inner inner-hook"></div>
          </div>
        </transition-group>
      </div>
      <transition name="cartList">
        <div class="shopCart-list" v-show="listShow">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty" @click="empty">清空</span>
          </div>
          <div class="list-content" ref="shopCartList">
            <ul>
              <li class="food" v-for="food in selectFood">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  ¥<span class="priceNumber">{{food.price*food.count}}</span>
                </div>
                <add-subtract :food="food" @on-add="whichOneAdd"></add-subtract>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="listMask">
      <div class="list-mask" v-show="listShow" @click="closeShopCartList"></div>
    </transition>
  </div>

</template>

<script type="es6">
  import addSubtract from '../addSubtract/addSubtract'
  import BetterScroll from 'better-scroll'

  export default {
    components: {
      addSubtract
    },
    props: {
      selectFood: {
        type: Array,
        default (){
          return [
            {
              price: 10,
              count: 100
            }
          ]
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data (){
      return {
        balls: [
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          },
          {
            show: false
          }
        ],
        dropBalls: [],
        fold: true
      }
    },
    methods: {
      drop (target){
        for(let i=0; i<this.balls.length; i++){
          let ball = this.balls[i];
          if(!ball.show){
            ball.show = true;
            ball.el = target;
            this.dropBalls.push(ball);
            return;
          }
        }
      },
      beforeEnter (el){
        let count = this.balls.length;
        while (count--) {
          let ball = this.balls[count];
          if(ball.show){
            let rect = ball.el.getBoundingClientRect();
            let x = rect.left - 32;
            let y = -(window.innerHeight - rect.top -22);
            //el.style.display = "";
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.transform = `translate3d(${x}px,0,0)`;
          }
        }
      },
      enter (el){
        let rf = el.offsetHeight;
        this.$nextTick(() => {
          //el.style.display = "";
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.transform = 'translate3d(0,0,0)';
        })
      },
      afterEnter (el){
        let ball = this.dropBalls.shift();
        if(ball){
          ball.show = false;
          el.style.display = 'none';
        }
      },
      toggleList (){
        if(!this.totalCount){
          return;
        }
        this.fold = !this.fold;
      },
      whichOneAdd (tar){
        this.drop(tar)
      },
      empty (){
        this.selectFood.forEach((food,k) => {
          food.count = 0;
        })
      },
      closeShopCartList (){
        this.fold = !this.fold;
      },
      pay (){
        if(this.totalPrice > this.minPrice){
          alert("支付"+this.totalPrice+'元')
        }
      }
    },
    computed: {
      totalPrice (){
        let total = 0;
        this.selectFood.forEach((v,k) => {
          total += v.price * v.count
        });
        return total
      },
      totalCount (){
        let count =0;
        this.selectFood.forEach((v,k) => {
          count += v.count;
        });
        return count
      },
      payDesc (){
        if(this.totalPrice === 0){
          return `¥${this.minPrice}元起送`
        }else if(this.totalPrice < this.minPrice){
          return `还差¥${this.minPrice-this.totalPrice}元起送`
        }else{
          return '去结算'
        }
      },
      isEnough (){
        return this.totalPrice >= this.minPrice
      },
      listShow (){
        if(!this.totalCount){
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if(show){
          this.$nextTick(() => {
            if(!this.shopCartListScroll){
              this.shopCartListScroll = new BetterScroll(this.$refs.shopCartList, {
                click: true
              });
            }else{
              this.shopCartListScroll.refresh();
            }
          });
        }
        return show;
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.stylus"

  //列表弹出过渡
  .cartList-enter,.cartList-leave-to
    transform translate3d(0,100%,0)
  .cartList-enter-active,.cartList-leave-active
    transition all 0.5s

    //背景mask过渡
  .listMask-enter,.listMask-leave-to
    opacity 0
  .listMask-enter-active,.listMask-enter-active
    transition all 0.5s
  .shopCart
    position fixed
    left 0
    bottom 0
    z-index 50
    width 100%
    height 48px
    .content
      display flex
      height 100%
      background #141d27
      .content-left
        flex 1
        font-size 0
        .logo-wrapper
          position absolute
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          background #141d27
          .logo
            display inline-block
            width 100%
            height 100%
            border-radius 50%
            background #2b343c
            text-align center
            &.highlight
              background rgb(0, 160, 220)
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color rgba(255, 255, 255, 0.2)
              &.highlight
                color #fff
          .number
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700px
            color #ffffff
            background rgb(2401, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price,.desc
          display inline-block
          color rgba(255, 255, 255, 0.4)
          font-size 12px
          line-height 24px
          font-weight 700
          margin-top 12px
        .price
          margin-left 74px
          padding-right 10px
          border-right 1px solid rgba(255, 255, 255, 0.1)
          &.highlight
            color #fff
        .desc
          margin-left 10px
      .content-right
        flex 0 0 105px
        .pay
          text-align center
          line-height 48px
          font-size 12px
          color rgba(255, 255, 255, 0.4)
          font-weight 700
          &.not-enough
            background #2b333b
          &.enough
            background #00b43c
            color #fff
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        &.drop-enter-active
          transition all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background rgb(0, 160, 220)
          transition all 0.4s linear
    .shopCart-list
      position fixed
      bottom 48px
      left 0
      z-index -1
      width 100%
      .list-header
        box-sizing border-box
        background #f3f5f7
        height 40px
        line-height 40px
        border-bottom 2px solid rgba(7, 17, 27, 0.1)
        .title
          float left
          margin-left  18px
          font-size 14px
          color rgb(7, 17, 27)
        .empty
          float right
          margin-right 18px
          font-size 12px
          color rgb(0, 160, 220)
      .list-content
        background #fff
        max-height 265px
        overflow hidden
        .food
          position relative
          box-sizing border-box
          height 48px
          padding 12px 0
          margin 0 18px
          border-1px(rgba(7, 17, 27, 0.1))
          .name
            font-size 14px
            color rgb(7, 17, 27)
            line-height 24px
          .price
            position absolute
            right 90px
            bottom 12px
            line-height 24px
            font-size 10px
            font-weight normal
            color rgb(240, 20, 20)
            .priceNumber
              font-size 14px
              font-weight 700
          .addSubtract
            bottom 12px
  .list-mask
    position fixed
    top 0
    left 0
    width 100%
    height 100%
    z-index 40
    background rgba(7, 17, 27, 0.6)
</style>
