export default function ({ store, route, from, redirect }) {
  if (!store.state.authUser || !store.state.authUser.emailVerified) {
    if ((!route || route.path !== '/acesso-restrito') && (!from || from.path !== '/acesso-restrito')) {
      return redirect('/acesso-restrito')
    }
  }
}
