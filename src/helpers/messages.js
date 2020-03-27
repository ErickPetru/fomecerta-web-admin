const messages = {
  'auth/weak-password': 'É necessário escolher uma senha mais forte para se cadastrar.',
  'auth/email-already-in-use': 'É necessário escolher uma senha mais forte para se cadastrar.',
  'auth/user-disabled': 'Esta conta encontra-se inativa. Por favor, contate um administrador.',
  'auth/user-not-found': 'As informações fornecidas não se mostraram válidas.',
  'auth/wrong-password': 'As informações fornecidas não se mostraram válidas.',
  'auth/email-not-verified': 'É necessário confirmar seu cadastro acessando seu e-mail.',
  'auth/user-created': 'Operação concluída. Acesse seu e-mail para confirmar o cadastro.',
  'auth/user-verification-sent': 'E-mail enviado. Acesse sua caixa de entrada para confirmar o cadastro.',
  'auth/password-reset-sent': 'E-mail enviado. Acesse sua caixa de entrada para prosseguir.',
  'auth/success': 'Acesso concedido, redirecionando...',
  [undefined]: 'A comunicação com o servidor não pôde ser concluída.'
}

export class ApplicationError {
  constructor (code, details) {
    this.code = code
    this.message = messages[code]
    this.details = details
  }
}

export default messages
