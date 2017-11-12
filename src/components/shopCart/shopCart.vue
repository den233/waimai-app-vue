<template>
  <div class="shopCart">
    <div class="content">
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
      <div class="content-right">
        <div class="pay" :class="[isEnough ?'enough':'not-enough']">{{payDesc}}</div>
      </div>
    </div>
  </div>
</template>

<script type="es6">
  export default {
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
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
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
</style>
