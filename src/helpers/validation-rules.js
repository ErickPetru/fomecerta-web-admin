export default {
  fullName: [
    (v) => !!v || 'É necessário informar seu nome.',
    (v) =>
      /([\w]{3,})+\s+([\w]{3,})+/i.test(v) ||
      'Preencha com todos os seus nomes e sobrenomes.'
  ],
  email: [
    (v) => !!v || 'É necessário informar seu e-mail.',
    (v) => /.+@.+\..+/.test(v) || 'Por favor, informe um e-mail válido.'
  ],
  password: [
    (v) => !!v || 'É necessário informar a senha desejada.'
  ],
  passwordConfirm (target) {
    return [
      (v) => !!v || 'É necessário repetir a senha para confirmá-la.',
      (v) => v === target || 'A confirmação deve ser igual à senha escolhida.'
    ]
  }
}
