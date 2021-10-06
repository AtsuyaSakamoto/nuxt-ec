<template>
  <div>
    <div v-if="favoriteItemLength == true">
      <h1>お気に入り商品</h1>
      <div class="favorite">
        <div class="column-labels">
          <label class="product-image">写真</label>
          <label class="product-details">詳細</label>
          <label class="product-price">価格</label>
        </div>
        <div class="m-top"></div>
        <div v-for="item in favoriteItem" :key="item.index" class="product">
          <router-link :to="{ path: `/item/${item.favoriteId}` }">
            <div class="product-image">
              <img class="item-img" :src="item.itemImage" />
            </div>
            <div class="product-details">
              <div class="item-name">{{ item.itemName }}</div>
            </div>
          </router-link>
          <div class="product-price">
            {{ item.itemPrice.toLocaleString() }}
          </div>

          <div class="product-removal">
            <button
              class="delete-btn"
              @click="deleteFavoriteItem(item.favoriteId, item.userId)"
            >
              お気に入り解除
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty-favorite">
      <div class="empty-content">
        <p class="empty-text">お気に入り商品はありません</p>
        <div class="empty-icon">
          <fa :icon="faStar" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { faStar } from '@fortawesome/free-solid-svg-icons'
export default {
  middleware: 'direct-login',
  computed: {
    favoriteItem() {
      return this.$store.state.users.favoriteItem
    },

    faStar() {
      return faStar
    },
    favoriteItemLength() {
      if (this.$store.getters['users/favoriteItemArry'].length === 0) {
        return false
      } else {
        return true
      }
    },
  },
  methods: {
    deleteFavoriteItem(favoriteId, userId) {
      const deleteData = {
        favoriteId,
        userId,
      }
      if (confirm('お気に入りを解除しますか？')) {
        this['users/deleteFavoriteItem'](deleteData)
      }
    },
    ...mapActions(['users/deleteFavoriteItem', 'users/getFavoriteItem']),
  },
}
</script>

<style lang="scss" scoped>
/* Global settings */
$color-border: #eee;
$color-label: #aaa;
$font-default: 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue',
  Helvetica, Arial, sans-serif;
$font-bold: 'HelveticaNeue-Medium', 'Helvetica Neue Medium';

.m-top {
  margin-top: 20px;
  border-top: 1px solid $color-border;
  margin-bottom: 30px;
}
.favorite {
  width: 100%;
}

.item-img {
  width: 120px;
  height: 100px;
}

.delete-btn {
  border-radius: 6px;
  padding: 5px;
  width: 90px;
  display: block;
  letter-spacing: 0.05em;
  background: #5bc8ac;
  color: #fff;
  font-weight: bold;
  font-size: 14px;
  margin: 0 auto;
  margin-top: 10px;
  margin-right: 50%;
  cursor: pointer;
}

.product-image {
  float: left;
  width: 20%;
  margin-left: 3%;
}
.product-details {
  float: left;
  width: 45%;
}

.product-price {
  float: left;
  width: 17%;
  text-align: center;
}
.product-removal {
  float: left;
  width: 15%;
}

.group:before,
.group:after {
  content: '';
  display: table;
}
.group:after {
  clear: both;
}
.group {
  zoom: 1;
}

.favorite,
.column-labels,
.product,
.totals-item {
  @extend .group;
}

.product .product-price:before,
.product .product-line-price:before,
.totals-value:before {
  content: '￥';
}

h1 {
  font-weight: 100;
}

label {
  color: $color-label;
}

.product {
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid $color-border;
}

.menu-icon {
  font-size: 100px;
  color: #555555;
  margin: 0 auto;
}

.empty-favorite {
  margin-top: 80px;
  .empty-content {
    .empty-text {
      text-align: center;
      font-size: 30px;
    }
    .empty-icon {
      font-size: 150px;
      display: flex;
      justify-content: center;
      color: #555555;
      margin-bottom: 20px;
    }
  }
}
.column-labels {
  display: none;
}

@media screen and (max-width: 650px) {
  .favorite {
    margin: 0;
    padding-top: 0px;
    border-top: initial;
    margin-top: 0px;
  }

  .product-details {
    margin-right: 20px;
    margin-left: 40px;
    font-family: $font-bold;
  }

  .item-name {
    font-size: 10px;
    width: 100%;
    margin-left: 10%;
  }
  .item-img {
    width: 100px;
    height: 100px;
    padding: 0 5px;
  }
  .delete-btn {
    font-size: 10px;
    margin-left: 5px;
    margin-top: 0px;
  }
  h1 {
    font-size: 20px;
    font-weight: $font-bold;
  }
  .product {
    width: auto;
  }
  .product-image {
    float: right;
    width: 30%;
    img {
      margin: 0 0 10px 10px;
    }
  }

  .product-details {
    float: left;
    margin-bottom: 10px;
  }
  .product-price {
    clear: both;
    width: 40%;
  }

  .product-removal {
    width: 20%;
  }
  .product-line-price {
    float: right;
    width: 30%;
  }
  .empty-favorite {
    margin-top: 80px;
    .empty-content {
      .empty-text {
        font-size: 20px;
      }
      .empty-icon {
        font-size: 120px;
      }
    }
  }
}
</style>
