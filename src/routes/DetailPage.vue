<template>
  <h2 class="blind">
    영화 상세 페이지
  </h2>
  <section
    v-show="!isLoading"
    v-cloak
    :key="$route.params.id"
    class="container">
    <img
      :src="imgPath"
      class="img-poster"
      :alt="`영화 ${detail.Title} 포스터 사진`" />
    <ul class="detail-list">
      <li
        v-for="(detailItem, index) in detailItems"
        :key="index"
        class="detail-list__item"
        :class="detailItem">
        <span
          v-if="detailItem !== 'Title'"
          class="title">{{ detailItem }}</span>
        <span class="content">{{ detail[detailItem] }}</span>
      </li>
      <li
        v-for="(ratingItem, index) in detail.Ratings"
        :key="index"
        class="detail-list__item">
        <span class="title">{{ ratingItem.Source }}</span>
        <span class="content">{{ ratingItem.Value }}</span>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      detailItems: [
        'Title',
        'Year',
        'Released',
        'Runtime',
        'Genre',
        'Director',
        'Actors',
        'Plot',
        'Writer',
        'Production',
        'Language',
        'Country',
        'Awards',
        'BoxOffice',
        'Type',
        'imdbVotes',
        'imdbRating',
      ],
    }
  },
  computed: {
    detail() {
      return this.$store.state.movies.detail
    },
    isLoading() {
      return this.$store.getters['movies/loading']
    },
    imgPath() {
      return this.detail.Poster !== 'N/A' ? this.detail.Poster : this.$store.state.movies.imgNotFound
    }
  },
  created() {
    this.$store.dispatch('movies/readDetail', {
      id: this.$route.params.id
    })
  }
}
</script>

<style lang="scss" scoped>
.blind {
  text-indent: -9999px;
}

.container {
  display: flex;
  gap: 40px;

  @include grid-large {
    & {
      flex-direction: column;
    }
  }
}

.img-poster {
  height: fit-content;
  max-width: 300px;
}

.detail-list {
  display: grid;
  width: 100%;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));

  .title {
    font-size: 18px;
    font-weight: bold;
    padding-bottom: 5px;
  }

  .content {
    font-size: 16px;
  }

  &__item {
    padding: 15px;

    &.Title, &.Plot, &.Actors {
      grid-column: 1 / -1;
    }

    &.Title .content {
      font-size: 48px;
      line-height: 1.2;
      font-weight: bold;
    }
  }

  span {
    display: block;
  }
}

[v-cloak] {
  display: none;
}
</style>
