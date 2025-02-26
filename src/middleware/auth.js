export default function ({ store, redirect }) {
  if (!store.state.authUser || !store.state.authUser.emailVerified) {
    return redirect('/acesso-restrito')
  } else if (store.state.authUser && !store.state.authUser.termsAccepted) {
    return redirect('/aceitar-termos')
  }
}
