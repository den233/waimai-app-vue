<template>
  <div class="ratingSelect">
    <div class="rating-type border-1px">
      <span class="block positive" :class="{active:selectType===2}" @click="select(2)">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
      <span class="block positive" :class="{active:selectType===0}" @click="select(0)">{{desc.positive}}<span class="count">{{positives.length}}</span></span>
      <span class="block negative" :class="{active:selectType===1}" @click="select(1)">{{desc.negative}}<span class="count">{{negatives.length}}</span></span>
    </div>
    <div class="switch" :class="{'on': onlyContent}" @click="changeOnly">
      <i class="icon-check_circle"></i>
      <span class="text">只看有内容的评论</span>
    </div>
    <div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid, autem consequatur dicta facilis harum itaque molestias quod! Accusamus debitis et, eveniet ipsum molestias officia saepe temporibus totam unde vel vero.
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci atque illo maxime quis! Alias consectetur fugiat laudantium officia quia quo! Alias amet aperiam ea eligendi hic molestiae optio tempora totam.
      lorem
    </div>
  </div>
</template>

<script type="es6">
  export default {
    props: {
      ratings: {
        type: Array,
        default (){
          return []
        }
      },
      selectType: {
        type: Number,
        default: 2
      },
      onlyContent: {
        type: Boolean,
        default: false
      },
      desc: {
        type: Object,
        default (){
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    data (){
      return {
        POSITIVE: 1,
        NEGATIVE: 0,
        ALL: 2
      }
    },
    computed: {
      positives (){
        return this.ratings.filter((rating) => {
          return rating.rateType === this.POSITIVE;
        })
      },
      negatives (){
        return this.ratings.filter((rating) => {
          return rating.rateType === this.NEGATIVE;
        })
      },
    },
    methods: {
      select (type){
        this.$emit('changeType',type);
      },
      changeOnly (){
        this.$emit("changeOnly")
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.stylus"
  .ratingSelect
    .rating-type
      padding 18px 0
      margin 0 18px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size 0
      .block
        padding 8px 12px
        border-radius 1px
        margin-right 8px
        font-size 12px
        color rgb(77, 85, 93)
        .count
          margin-left 2px
          font-size 8px
        &.positive
          background rgba(0, 160, 220, 0.2)
          &.active
            color #fff
            background rgb(0, 160, 220)
        &.negative
          background rgba(77, 85, 93, 0.2)
          &.active
            color #fff
            background rgb(0, 160, 220)
    .switch
      padding 12px 18px
      border-bottom 2px solid rgba(7, 17, 27, 0.1)
      line-height 24px
      color rgb(147, 153, 159)
      font-size 0
      &.on>.icon-check_circle
        color #00c850
      .icon-check_circle
        display inline-block
        vertical-align top
        font-size 24px
        margin-right 4px
      .text
        font-size 12px
</style>
