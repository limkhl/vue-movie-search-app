<template>
  <h2
    v-show="isInit"
    class="guide">
    추천 검색어 <span>" {{ keyword }} "</span> (으)로 찾은 결과입니다.
  </h2>
  <h2
    v-show="!isInit && hasResult"
    class="guide">
    <span>" {{ keyword }} "</span> (으)로 찾은 결과입니다.
  </h2>
  <h2
    v-show="!isInit && !hasResult"
    class="guide">
    <span>" {{ keyword }} "</span> (으)로 찾은 결과가 없습니다.
  </h2>
  <ul
    class="list-container">
    <MoviesItem
      v-for="movie in movies"
      :key="movie.imdbID"
      :movie="movie"
      :keyword="keyword" />
  </ul>
</template>

<script>
import MoviesItem from '~/components/MoviesItem'

export default {
  components: {
    MoviesItem
  },
  data() {
    return {
      initKeyword: this.$store.getters['movies/initKeyword']
    }
  },
  computed: {
    isInit() {
      return this.$store.state.movies.isInit
    },
    keyword() {
      const { keyword } = this.$store.state.movies
      return keyword ?? this.initKeyword
    },
    movies() {
      return this.$store.state.movies.movies
    },
    hasResult() {
      return this.movies && this.movies.length
    },
    totalResults() {
      return this.$store.state.movies.totalResults
    }
  },
  created() {
    if (this.$route.query.keyword) {
      this.$store.commit('movies/changeKeyword', this.$route.query.keyword)
    } else {
      this.$store.dispatch('movies/searchMovies', this.keyword)
    }

    window.addEventListener('scroll', () => {
      const isScrollEnded = (window.innerHeight + window.scrollY) + 600 >= document.body.offsetHeight
      
      if (isScrollEnded && this.movies.length < this.totalResults && this.$route.name !== 'DetailPage') {
        this.infinityScroll()
      }
    })
  },
  methods: {
    infinityScroll() {
      if (!this.$store.getters['movies/loading']) {
        this.$store.commit('movies/changePage', this.$store.state.movies.page + 1)
        this.$store.dispatch('movies/fetchMoreMovies', this.keyword)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 40px;

  /* Media Query */
  @include grid-large {
    & {
      grid-template-columns: repeat(3, 1fr);
    }
  }

  @include grid-medium {
    & {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @include grid-small {
    & {
      grid-template-columns: repeat(1, 1fr);
    }
  }
}

.guide {
  padding: 30px 0;
  font-size: 20px;

  span {
    font-weight: bold;
    color: $color-secondary;
  }
}
</style>
