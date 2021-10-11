export default {
  namespaced: true,
  state() {
    return {
      movies: [],
      detail: {},
      isInit: true,
      keyword: null,
      suggestKeywords: ['moonlight', 'hidden', 'd\'Amélie', 'harold', 'vertigo', 'billboards', 'daniel', 'arrival', 'ghostbusters', 'spy', 'lady', 'killing', 'you were', 'roma', 'favourite', 'high life', 'the half'],
      loadings: [],
      imgNotFound: 'https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg',
      page: 1,
      totalResults: 0
    }
  },
  getters: {
    initKeyword(state) {
      return state.suggestKeywords[Math.floor(Math.random() * state.suggestKeywords.length)]
    },
    loading(state) {
      return state.loadings.some(loading => loading)
    }
  },
  mutations: {
    assignState(state, payload) {
      Object.keys(payload).forEach(key => {
        state[key] = payload[key]
      })
    },
    changeKeyword(state, newKeyword) {
      state.keyword = newKeyword
    },
    offInitState(state) {
      state.isInit = false
    },
    startLoading(state) {
      state.loadings.push(true)
    },
    endLoading(state) {
      state.loadings.splice(0, 1)
    },
    changePage(state, newPage) {
      state.page = newPage
    }
  },
  actions: {
    async searchMovies({ state, commit, dispatch }, payload) {
      commit('changePage', 1)
      const { Search, totalResults } = await dispatch('_request', {
        url: `&s=${payload}&page=${state.page}`
      })
      commit('assignState', {
        movies: Search,
        totalResults: parseInt(totalResults)
      })
    },
    async readDetail({ commit, dispatch }, payload) {
      const detail = await dispatch('_request', {
        url: `&i=${payload.id}&plot=short`
      })
      commit('assignState', {
        detail
      })
    },
    async fetchMoreMovies({ state, commit, dispatch }, payload) {
      const { Search } = await dispatch('_request', {
        url: `&s=${payload}&page=${state.page}`
      })
      commit('assignState', {
        movies: [...state.movies, ...Search]
      })
    },
    async _request({ commit }, payload) {
      commit('startLoading')
      try {
        // eslint-disable-next-line no-undef
        const res = await fetch(`${API_ENDPOINT}${payload.url}`)
        if (!res.ok) {
          throw new Error('API 호출 에러')
        }
        return await res.json()
      } catch (e) {
        console.log(e.message)
      } finally {
        commit('endLoading')
      }
    }
  }
}
