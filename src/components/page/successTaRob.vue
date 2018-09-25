<template>
    <div id="successTaRob">
        <div class="wholeYe">
            <!-- 头部提醒 -->
            <div class="topTwo">
                <div class="otherTop">
                    <p class="successRob">您已成功帮微信好友
                        <span>xx</span> 抢到翡翠蛋一枚</p>
                    <p class="canBuy">Ta已抢到25枚</p>

                    <div class="fx recodeBuy">
                        <img src="../../img/code.jpg" alt="" class="Rcode">
                        <img src="../../img/code.jpg" alt="" class="Rcode">
                    </div>
                    <p class="guanZhu">长按关注公众号</p>
                    <p class="guanZhu">您可以向好友发起抢蛋活动</p>
                </div>
            </div>

            <!-- 他的抢蛋小分队 -->
            <div class="bottom">
                <p class="f1 c3">ta的抢蛋小分队</p>
                <ul>
                    <li class="fx fx-ai-c" v-for="(item,index) in joinArr" :key="index">
                        <div><img :src="item.img" alt=""></div>
                        <p class="f1">{{item.username}}成功帮ta抢到{{item.eggNum}}枚</p>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
</script>
<style lang="scss"  scoped>
#successTaRob {
  height: 100%;
  width: 100%;
  .fx-ai-c {
    align-items: center;
    -webkit-align-items: center;
  }
  .c2 {
    color: #ffb011;
  }
  .c3 {
    color: #840c32;
  }
  .f1 {
    font-size: 0.85rem;
  }

  .wholeYe {
    background-color: #f1f1f1;
    min-height: 36rem;

    .fx {
      display: flex;
    }
    .topTwo {
      background: #fff;
      height: 15rem;
      position: relative;
      .otherTop {
        text-align: center;

        .successRob {
          line-height: 2rem;
          font-size: 16px;
        }
        .canBuy {
          line-height: 2rem;
          font-size: 16px;
        }
        .guanZhu {
          line-height: 1.5rem;
          font-size: 14px;
        }
        .recodeBuy {
          margin: 0 auto;
          align-items: center;
          justify-content: center;
          img {
            width: 6rem;
            height: 6rem;
            margin: 0 1rem 0.5rem 1rem;
          }
        }
      }
    }
    .bottom {
      min-height: 3rem;
      box-sizing: border-box;
      background-color: rgb(240, 240, 242);
      padding: 1rem;
    }
  }
}
</style>
