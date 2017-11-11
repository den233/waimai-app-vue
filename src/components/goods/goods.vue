<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="item in goods" class="menu-item">
          <div class="content">
            <span v-if="item.type > 0">x</span>{{ item.name }}
          </div>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="item in goods" class="food-list">
          <h1 class="title">{{ item.name }}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
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
                  <span class="nowPrice"><i>￥</i>{{ food.price }}</span><span v-if="food.oldPrice" class="oldPrice"><i>￥</i>{{ food.oldPrice }}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="es6">
  export default {
    data (){
      return {
        goods: []
      }
    },
    created (){
      this.$http.get('/api/goods').then(
        (res) => {
          if(res.data.errno === 0)
            this.goods = res.data.data;
        },
        (error) => {
          console.log(error)
        }
      )
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.stylus"
  .goods
    display flex
    position absolute
    top 174px
    bottom 44px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      background #f3f5f7
      .menu-item
        display table
        text-align center
        vertical-align middle
        width 56px
        height 54px
        font-size 12px
        line-height 14px
        color rgb(7, 17, 27)
        margin 0 auto
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
        .content
          height 100%
          display table-cell
          vertical-align middle
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
          font-size 0
          margin 0 18px
          padding 18px 0
          border-1px(rgba(7, 17, 27, 0.1))
          &:last-child
            border-none()
          .icon
            display inline-block
            vertical-align top
          .content
            display inline-block
            margin-left 10px
            .name
              font-size 14px
              line-height 14px
              color rgb(7, 17, 27)
              margin-top 2px
              margin-bottom 8px
            .desc
              font-size 10px
              line-height 10px
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
                &>i
                  font-size 10px
                  font-style normal
                  font-weight normal

</style>
