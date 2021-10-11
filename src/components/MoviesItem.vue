<template>
  <li
    class="item"
    tabindex="0"
    @click="$router.push({
      name: 'DetailPage',
      query: {
        keyword
      },
      params: {
        id: movie.imdbID
      }
    })">
    <div
      class="item__thumbnail">
      <img
        class="item__img"
        :src="imgPath"
        :alt="movie.Title" />
    </div>
    <div class="item__description">
      <div class="item__title">
        {{ movie.Title }}
      </div>
      <div class="item__year">
        {{ movie.Year }}
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: {
    movie: {
      type: Object,
      default: () => ({})
    },
    keyword: {
      type: String,
      default: ''
    },
  },
  computed: {
    imgPath() {
      return this.movie.Poster !== 'N/A' ? this.movie.Poster : this.$store.state.movies.imgNotFound
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  position: relative;
  display: block;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    transform: scale(1.05);

    .item__title {
      color: $color-primary;
    }

    .item__thumbnail::after {
      content: '';
      position: absolute;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }

  &__thumbnail {
    background-color: black;
    height: 400px;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: $shadow-movie-card;
    position: relative;
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__description {
    padding: 15px 0;
  }

  &__title {
    font-size: 24px;
    font-weight: bold;
    line-height: 1.2;
    margin-bottom: 5px;
  }
}
</style>
