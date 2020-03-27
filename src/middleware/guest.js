export default function ({ store, route, from, redirect }) {
  if (store.state.authUser && store.state.authUser.emailVerified) {
    if ((!route || route.path !== '/') && (!from || from.path !== '/')) {
      return redirect('/')
    }
  }
}
