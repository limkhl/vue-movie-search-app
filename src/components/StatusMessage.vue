<template>
  <h2
    v-cloak
    class="guide">
    <div
      v-show="isInit">
      추천 검색어 <span>" {{ initKeyword }} "</span> (으)로 {{ totalResults }}건의 결과를 찾았습니다.
    </div>
    <div
      v-show="!isInit && isTyping && !isEmpty">
      키워드 입력 중입니다.
    </div>
    <div
      v-show="isEmpty">
      키워드를 입력해주세요.
    </div>
    <div
      v-show="hasKorean && !isTyping && !isEmpty"
      class="alert">
      한글로 검색할 수 없습니다. 영어를 입력해주세요.
    </div>
    <div
      v-show="!isInit && !isTyping && !isEmpty && !hasKorean">
      <div v-show="isLoading">
        <span>" {{ keyword }} "</span> (으)로 검색 중입니다.
      </div>
      <div v-show="hasResult && !isLoading">
        <span>" {{ keyword }} "</span> (으)로 {{ totalResults }}건의 결과를 찾았습니다.
      </div>
      <div v-show="!hasResult && !isLoading">
        <span>" {{ keyword }} "</span> (으)로 찾은 결과가 없습니다.
      </div>
    </div>
  </h2>
</template>

<script>
export default {
  props: {
    initKeyword: {
      type: String,
      default: ''
    }
  },
  computed: {
    keyword() {
      return this.$store.state.movies.keyword
    },
    movies() {
      return this.$store.state.movies.movies
    },
    hasResult() {
      return this.movies && this.movies.length
    },
    totalResults() {
      return this.$store.state.movies.totalResults
    },
    isInit() {
      return this.$store.state.movies.isInit
    },
    isLoading() {
      return this.$store.getters['movies/loading']
    },
    isTyping() {
      return this.$store.state.movies.typing
    },
    isEmpty() {
      return this.$store.state.movies.isEmpty
    },
    hasKorean() {
      return this.$store.state.movies.hasKorean
    }
  },
}
</script>

<style lang="scss" scoped>
.guide {
  padding: 30px 0;
  font-size: 20px;

  span {
    font-weight: bold;
    color: $color-secondary;
  }

  .alert {
    font-weight: bold;
    color: $color-primary;
  }
}

[v-cloak] {
  display: none;
}
</style>
