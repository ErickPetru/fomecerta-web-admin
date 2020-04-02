export default function ({ store, redirect }) {
  if (!store.state.authUser || !store.state.authUser.emailVerified) {
    return redirect('/acesso-restrito')
  }

  if (store.state.authUser.role !== 'admin') {
    return redirect('/')
  }
}
