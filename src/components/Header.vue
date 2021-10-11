<template>
  <header>
    <h1>
      <a
        href="/"
        title="홈으로 가기">
        <img
          class="img-logo"
          :src="imgLogo"
          alt="logo" />
      </a>
    </h1>
    <button
      v-if="$route.name === 'DetailPage'"
      title="뒤로 가기"
      class="btn--back"
      @click="$router.push({
        name: 'MoviesList',
        query: {
          keyword: $route.query.keyword
        }
      })">
      <span class="material-icons">
        arrow_back
      </span>
    </button>
    <form @submit.prevent>
      <input
        id="search-input"
        :value="keyword"
        placeholder="영화 제목을 입력해주세요. (영어만 검색 가능)"
        type="text"
        autocomplete="off"
        @input="$store.commit('movies/changeKeyword', $event.target.value)" />
    </form>
  </header>
</template>

<script>
export default {
  data() {
    return {
      imgLogo: 'https://user-images.githubusercontent.com/84858773/136695329-9b24dc51-f05b-4fe9-a595-0aa826ce0f15.png',
    }
  },
  computed: {
    keyword() {
      return this.$store.state.movies.keyword
    }
  },
  watch: {
    keyword() {
      if (this.$store.state.movies.isInit === true) {
        this.$store.commit('movies/offInitState')
      }
      if(this.$route.name === 'DetailPage') {
        this.$router.push('/')
      } else {
        this.$store.dispatch('movies/searchMovies', this.keyword)
      }
    }
  },
}
</script>

<style lang="scss" scoped>
header {
  position: fixed;
  width: 100%;
  box-sizing: border-box;
  z-index: 1;
  background: $color-header-bg;
  box-shadow: $shadow-header;
  height: 100px;
  padding: 0 60px;
  display: flex;
  align-items: center;
  gap: 20px;

  a {
    display: block;
    width: 48px;
    text-decoration: none;
  }

  .img-logo {
    width: 100%;
  }

  form {
    flex-grow: 1;
    display: flex;
    justify-content: center;
  }

  .btn--back {
    color: black;
    background-color: transparent;
    border-radius: 50%;
    border: none;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.2s;

    &:hover {
      color: $color-primary;
      transform: scale(1.2);
    }
  }

  #search-input {
    width: 70%;
    padding: 10px;
    font-size: 16px;
    color: white;
    background-color: $color-secondary;
    border: 1px solid rgba(black, 0.2);
    outline: none;
    border-radius: 5px;
    box-shadow: $shadow-search;
    font-family: $font-family;

    @include grid-small {
      & {
        width: 100%;
      }
    }

    &::placeholder {
      color: rgba(white, 0.7);
    }

    &:focus {
      background-color: $color-primary;
    }
  }
}
</style>
