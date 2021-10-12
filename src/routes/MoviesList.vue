<template>
  <StatusMessage :init-keyword="initKeyword" />
  <ul
    class="list-container">
    <MoviesItem
      v-for="movie in movies"
      :key="movie.imdbID"
      :movie="movie"
      :keyword="keyword" />
    <MoviesItem
      v-show="hasMoreItem"
      class="skeleton" />
  </ul>
</template>

<script>
import MoviesItem from '~/components/MoviesItem'
import StatusMessage from '~/components/StatusMessage'

export default {
  components: {
    MoviesItem,
    StatusMessage
  },
  data() {
    return {
      initKeyword: this.$store.getters['movies/initKeyword']
    }
  },
  computed: {
    keyword() {
      return this.$store.state.movies.keyword ?? this.initKeyword
    },
    movies() {
      return this.$store.state.movies.movies
    },
    totalResults() {
      return this.$store.state.movies.totalResults
    },
    hasMoreItem() {
      return this.movies && this.movies.length && this.movies.length < this.totalResults
    }
  },
  created() {
    if (this.$route.query.keyword) {
      this.$store.commit('movies/changeKeyword', this.$route.query.keyword)
    } else {
      this.$store.dispatch('movies/searchMovies', { keyword: this.keyword })
    }

    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    infinityScroll() {
      if (!this.$store.getters['movies/loading']) {
        this.$store.commit('movies/changePage', this.$store.state.movies.page + 1)
        this.$store.dispatch('movies/fetchMoreMovies', { keyword: this.keyword })
      }
    },
    handleScroll() {
      const isScrollEnded = (window.innerHeight + window.scrollY) + 600 >= document.body.offsetHeight
      
      if (isScrollEnded && this.movies.length < this.totalResults && this.$route.name !== 'DetailPage') {
        this.infinityScroll()
      }
    },
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
