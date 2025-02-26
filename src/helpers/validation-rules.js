export default {
  required: [
    (value) => (!!value && (!!value.length || (typeof value === 'object' && !Array.isArray(value)))) || 'Preenchimento obrigatório.'
  ],
  fullName: [
    (value) => !!value || 'É necessário informar seu nome.',
    (value) =>
      /([\w]{3,})+\s+([\w]{3,})+/i.test(value) ||
      'Preencha com todos os seus nomes e sobrenomes.'
  ],
  singleImageUpload: [
    (value) => !value || typeof value === 'string' || ['image/jpeg', 'image/png'].includes(value.type) || 'Somente os formatos JPG e PNG são aceitos para o envio da imagem.',
    (value) => !value || typeof value === 'string' || value.size <= 2000000 || 'O arquivo selecionado deve ter um tamanho máximo de 2 MB.'
  ],
  singleImageUploadRequired: [
    (value) => !!value || 'Preenchimento obrigatório.',
    (value) => !value || typeof value === 'string' || ['image/jpeg', 'image/png'].includes(value.type) || 'Somente os formatos JPG e PNG são aceitos para o envio da imagem.',
    (value) => !value || typeof value === 'string' || value.size <= 2000000 || 'O arquivo selecionado deve ter um tamanho máximo de 2 MB.'
  ],
  sku: [
    (value) => !value || value.length < 18 || 'Não utilize mais do que 18 caracteres para o SKU.',
  ],
  address: {
    zipCode: [
      (value) => !!value || 'Preenchimento obrigatório.',
      (value) => !value || value.length === 9 || /\d{5}-\d{3}/g.test(value) || 'Por favor, informe um valor válido.'
    ],
    street: [
      (value) => !!value || 'Preenchimento obrigatório.',
      (value) => !value || value.length > 3 || 'Por favor, informe um valor válido.'
    ],
    district: [
      (value) => !!value || 'Preenchimento obrigatório.',
      (value) => !value || value.length > 3 || 'Por favor, informe um valor válido.'
    ]
  },
  geolocation: {
    latitude: [
      (value) => !!value || 'Preenchimento obrigatório.',
      (value) => !value || value.toString().length > 5 || (value > -91 && value < 91) || 'Por favor, informe um valor válido.'
    ],
    longitude: [
      (value) => !!value || 'Preenchimento obrigatório.',
      (value) => !value || value.toString().length > 5 || (value > -181 && value < 181) || 'Por favor, informe um valor válido.'
    ]
  },
  email: [
    (value) => !!value || 'É necessário informar seu e-mail.',
    (value) => /.+@.+\..+/.test(value) || 'Por favor, informe um e-mail válido.'
  ],
  password: [
    (value) => !!value || 'É necessário informar a senha desejada.'
  ],
  passwordConfirm (target) {
    return [
      (value) => !!value || 'É necessário repetir a senha para confirmá-la.',
      (value) => value === target || 'A confirmação deve ser igual à senha escolhida.'
    ]
  },
  passwordStrength (value) {
    if (!value) return null

    let index = 0
    const colors = ['red', 'deep-orange', 'amber', 'lime', 'green']
    const levels = ['Muito fraca', 'Fraca', 'Média', 'Forte', 'Muito forte']

    // Password length lower than 7.
    if (value.length < 7) {
      return {
        value: 1,
        color: colors[index],
        level: levels[index]
      }
    }

    // Password contains uppercase letters.
    if (/[A-Z]/.test(value)) index += 0.75

    // Password contains lowercase letters.
    if (/[a-z]/.test(value)) index += 0.75

    // Password contains numbers.
    if (/\d/.test(value)) index += 0.75

    // Password contains special characters.
    if (/[!-/:-@[-`{-~]/.test(value)) index++

    // Password length greater than 9.
    if (value.length > 9) index++

    index = index > 4 ? 4 : Math.floor(index)

    let result = Math.ceil((index + 1) * 16.6)
    result = result > 80 ? 100 : result > 50 ? 75 : result

    return {
      value: result,
      color: colors[index],
      level: levels[index]
    }
  }
}
