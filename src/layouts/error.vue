<template>
  <v-layout justify-center align-center text-center>
    <v-flex xs12 sm8 md6 lg5>
      <div v-if="error && error.statusCode === 404">
        <h1 class="error404">
          <span class="n4">4</span>
          <span class="n0">😢</span>
          <span class="n4">4</span>
        </h1>

        <v-card class="mt-2 mb-8">
          <v-card-title class="primary justify-center">
            Opa! A página não foi encontrada...
          </v-card-title>
          <v-card-text class="pa-4 pt-5 pb-2">
            <p>Sentimentos muito, mas a página que você estava procurando não existe, foi removida, mudou de nome ou encontra-se temporariamente indisponível. Revise se o endereço está mesmo correto ou retorne à página inicial para tentar outra opção.</p>
          </v-card-text>
        </v-card>

        <v-btn outlined to="/" color="primary">Retornar à página inicial</v-btn>
      </div>

      <div v-else xs12 sm8 md6>
        <h1 v-if="error && error.statusCode">{{ error.statusCode }}</h1>
        <h1 v-else>!!!</h1>

        <v-card class="mt-2 mb-8">
          <v-card-title class="primary justify-center">
            Opa! Ocorreu um problema inesperado...
          </v-card-title>
          <v-card-text class="pa-4 pt-5 pb-2">
            <p>Sentimentos muito, mas não foi possível concluir a operação que você tentou realizar. Provavelmente é um problema temporário, mas se pesistir, entre em contato conosco.</p>
          </v-card-text>
        </v-card>

        <router-link to="/">Retornar à página inicial</router-link>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'LayoutError',
  layout: 'center',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  head () {
    return {
      title:
        this.error.statusCode === 404
          ? 'Página não encontrada'
          : 'Ocorreu um erro'
    }
  }
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 15rem;
  line-height: 1;
  letter-spacing: -.75rem;
  margin-left: -.75rem;
}

h1.error404 {
  letter-spacing: -2.75rem;
  margin-left: -2.75rem;

  .n0 {
    position: relative;
    font-size: 12rem;
    top: -2rem;
  }
}
</style>
