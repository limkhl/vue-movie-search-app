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
      class="item__thumbnail skeleton-element">
      <img
        class="item__img"
        :src="imgPath"
        :alt="movie.Title" />
    </div>
    <div class="item__description">
      <div class="item__title skeleton-element">
        {{ movie.Title }}
      </div>
      <div class="item__year skeleton-element">
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

.item.skeleton {
  .item {
    &__thumbnail::before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: lightgray;
    }

    &__description {
      div {
        background-color: rgba(lightgray, 0.5);
        border-radius: 5px;
      }
    }

    &__title {
      height: 50px;
    }

    &__year {
      height: 20px;
      width: 20%;
    }
  }

  div.skeleton-element {
    position: relative;
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(255, 255, 255, 0.2);
      transform: skew(5deg);
      animation: shine infinite 1.5s ease-in-out;
    }
  }

  @keyframes shine {
    from {
      transform: skew(45deg) translateX(0%);
    }
    to{
      transform: skew(45deg) translateX(200%);
    }
  }
}
</style>
