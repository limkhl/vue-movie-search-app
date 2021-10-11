import { createRouter, createWebHistory } from 'vue-router'
import MoviesList from './MoviesList'
import DetailPage from './DetailPage'
import NotFound from './NotFound'

export default createRouter({
  history: createWebHistory(),
  scrollBehavior: () => ({ top: 0 }),
  routes: [
    {
      path: '/',
      component: MoviesList,
      children: [
        {
          name: 'MoviesList',
          path: 'movies',
          component: MoviesList
        }
      ]
    },
    {
      name: 'DetailPage',
      path: '/detail/:id',
      component: DetailPage,
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    }
  ]
})
