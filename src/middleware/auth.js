export default function ({ store, app, redirect }) {
  if (!store.state.authUser || !store.state.authUser.emailVerified) {
    return redirect('/acesso-restrito')
  }
}
