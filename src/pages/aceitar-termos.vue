<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col cols="12" sm="10" md="9" xl="6">
        <v-card :loading="loading" class="float-over-expanded">
          <v-toolbar color="primary" flat>
            <v-btn icon href="acesso-restrito" class="ma-0 mr-2" @click.prevent="logout">
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>
            <v-toolbar-title class="pa-0">{{ $metaInfo.title }}</v-toolbar-title>
          </v-toolbar>

          <v-card-text class="pa-8 pt-10 pb-0">
            <div class="text-center">
              <h1 class="mb-2">Termos e Condições Gerais de Contratação do fomecerta.com.br</h1>
              <em>Atualizado em: 03 de Março de 2020</em>
            </div>

            <br />

            <p>Por meio do presente instrumento, são estabelecidos os termos e as condições gerais para a contratação do Fome Certa para a prestação dos Serviços (as “Condições Gerais”), os quais ficam incorporados, para todos os fins e efeitos, ao formulário de contratação do Fome Certa (o “Formulário” e, em conjunto com a Condições Gerais, o “Contrato”).</p>

            <h2>1. Objeto</h2>

            <p>1.1. O Contrato tem por objeto (a) a promoção, pelo Fome Certa, das atividades do Restaurante no território brasileiro por meio da Plataforma Fome Certa , nos termos o art.710 da Lei n. 10.406/2002; e (b) o licenciamento não exclusivo do uso dos Softwares pelo Fome certa ao Restaurante.</p>

            <h2>2. Informações do Restaurante</h2>

            <p>2.1. O Restaurante é o único responsável por todas e quaisquer informações a respeito de suas atividades que venham a ser por ele disponibilizadas ao Fome Certa e aos Clientes Finais (as “Informações do Restaurante”), e compromete-se a mantê-las, por meio dos Softwares e/ou de quaisquer outros canais de comunicação disponibilizados pelo Fome Certa, a todo tempo atualizadas e em estrita observância à legislação aplicável.</p>

            <p>2.2. O acesso do Restaurante aos Softwares será realizado por meio de nome de usuário e senha de uso pessoal e intransferível. O Restaurante reconhece que será oúnicoresponsávelportodoequalqueracessoaoPortaldo Parceiro por meio do seu nome de usuário e da suasenha.</p>

            <p>2.3. No prazo máximo de 30 dias contados da data de recebimento das Informações do Restaurante, o Fome Certa disponibilizará a Loja Virtual na PlataformaFome Certa.</p>

            <p>2.4. O Restaurante concorda que todos e quaisquer descontos e promoções oferecidas em outros canais de delivery por ele utilizados, sejam próprios ou de terceiros, deverão ser oferecidas também aos ClientesFinais.</p>

            <p>2.5. O Restaurante não poderá disponibilizar aos Clientes Finais os seus números de telefone e os endereços virtuais de quaisquer outros canais de delivery, sejam eles de titularidade do Restaurante ou de terceiros, sendo vedado ao Restaurante, ainda, a utilização dos dados dos Clientes Finais para a divulgação de tais canais, incluindo, sem limitação, o envio de mala direta aos ClientesFinais.</p>

            <h2>3. Pedidos</h2>

            <p>
              3.1. O Fome Certa será exclusivamente responsável pela intermediação entre o Restaurante e os Clientes Finais, por meiodaPlataformaFome Certa,eemnenhumahipótese
              responderá por danos emergentes, lucros cessantes ou danos indiretos perante o Restaurante.
            </p>

            <p>3.2. O Restaurante será o único responsável pela execução e pela correção dos Pedidos feitos de forma inadequada ou incompleta, bem como pela completa observância de todas e quaisquer normas aplicáveis a suas atividades, incluindo, sem limitação, as normas sanitárias, e pela emissão e entrega de nota fiscal, recibo ou documento equivalente para os Clientes Finais com relação aos Pedidos.</p>

            <p>3.3. Os Pedidos serão recebidos pelo Restaurante por meio dos Softwares, cabendo ao Restaurante aceitá-los, rejeitá-los ou cancelá-los também por meio dos Softwares, sendovedadoaoRestauranterejeitare/oucancelarmaisdo que 5% dos Pedidos por ele recebidos dentro de cadamês.</p>

            <p>3.4. NahipótesedeoFome Certaconcordarcomaintegração entreosSoftwareseossistemasutilizadospeloRestaurante para que o Restaurante possa receber os Pedidos, referida integração deverá ser regulada por meio de instrumento específico assinado entre o Fome Certa e os fornecedores dos sistemas utilizados pelo Restaurante, contendo o cronograma de homologação e implantação da integraçãoe as responsabilidades de cadaParte.</p>

            <p>3.5. ORestaurantedeveráatualizarostatusdosPedidos por meio do Gerenciador dePedidos.</p>

            <p>3.6. Caso o Pedido fuja dos padrões de consumo, incluindo, sem limitação, em decorrência do seu valor e/ou da quantidade de itens adquiridos, o Restaurante deverá imediatamente entrar em contato com o Fome Certa, para que as Partes possam, de comum acordo, decidir quais medidas serão tomadas com relação ao Pedido em questão. Caso o Restaurante não consiga entrar em contato com o Fome Certa, o Pedido deverá ser rejeitado pelo Restaurante. Os Pedidos rejeitados nos termos desta Cláusula não serão contabilizados para fins da Cláusula 4.3,acima.</p>

            <p>3.7. O Restaurante deverá elaborar e embalar as refeições, bebidas e/ou demais produtos pedidos pelos Clientes Finais exatamente como consta em seu Cardápio. É vedado ao Restaurante utilizar embalagens deconcorrentes do Fome Certa para embalar as refeições, bebidas e/ou demais produtos adquiridos pelos ClientesFinais.</p>

            <p>3.8. O Restaurante se compromete a não preparare/ou entregar aos Clientes Finais, conforme o caso, os Pedidos que houverem sido por eles cancelados, independentemente do motivo docancelamento.</p>

            <p>3.9. Caso o Pedido contenha bebidas alcóolicas ou quaisquer outros produtos cujo consumo possua restrições, nos termos da legislação aplicável, o Restaurante deverá tomar as medidas necessárias para confirmar que o Cliente Final possui idade legal para o consumo de taisprodutos.</p>

            <p>
              3.10. O Restaurante assume, em caráter irrevogável, irretratável e irreversível, a obrigação de manter o Fome Certa a todo tempo livre e indenizado de todas e quaisquer perdas, danos e demandas que o Fome Certa eventualmente venha a sofrer de Clientes Finais ou quaisquer outros terceirosem
              decorrência da execução e entrega dos Pedidos pelo Restaurante ou da violação pelo Restaurante destas Condições Gerais ou de qualquer legislação a ele aplicável.
            </p>

            <h2>4. Entrega dos Pedidos</h2>

            <p>4.1. A depender do plano de contratação escolhido no Formulário, o Restaurante concorda que (a) a entrega dos Pedidos deverá ser feita pelo próprio Restaurante (o “Plano Básico”);ou(b)aentregadeveráserfeitapelosparceirosde entrega do Fome Certa (os “PlanosLogísticos”).</p>

            <p>4.2. Em caso de contratação do Plano Básico, o Restaurante será o único responsável pela entrega dos Pedidos, independentemente de os serviços de entrega serem prestados diretamente pelo Restaurante ou por terceiroporelecontratado.Nestemodelodecontratação,o Restaurantedeverá(a)definiraáreadeentregadosPedidos pormeiodoPortaldoParceiro;(b)definirovalordataxade entrega a ser cobrada dos Clientes Finais; e (c) informar ao Fome Certaaocorrênciadequaisquereventualidadesrelativasaos Pedidos que prejudiquem e/ou impossibilitem a realização das entregas aos ClientesFinais.</p>

            <p>4.3. Na hipótese de contratação dos PlanosLogísticos, a entrega dos Pedidos será realizada por prestadores de serviços independentes contratados pelo Fome Certa (os “Parceiros de Entrega”), devendo o Fome Certa, como condição essencial para a prestação dos serviços de intermediação aqui previstos, tomar as medidas necessárias para que os Parceiros de Entrega façam a coleta dos Pedidos no Restaurante e a entrega nos endereços informados pelos Clientes Finais. Neste modelo de contratação, (a) o Fome Certa será responsável por definir a área de entrega, o tempo de entrega e a disponibilidade do Restaurante na Plataforma Fome Certa (desde que dentro do horário de funcionamento informado pelo Restaurante); e (b) o Restaurante não será responsável por problemas relacionados com a entrega dos Pedidos, responsabilizando-se apenas e tão somente pela execução dos Pedidos, nos termos da Cláusula4.</p>

            <p>4.4. Caso o Restaurante deseje contratar os Planos Logísticos, ele deverá optar por uma dentre as seguintes modalidades: (a) “Plano Logística Completa”, em que o Restaurante pagará ao Fome Certa somente a Comissão prevista naCláusula7.1,eoFome Certapoderádeterminar,aseuexclusivo critério, a remuneração que será paga pelos Clientes Finais ao Fome Certa; e (b) “Plano Básico com entrega”, em que o Restaurante pagará ao Fome Certa a Comissão prevista na Cláusula 7.1 acrescida de um valor fixo por Pedido, a ser definido pelas Partes no Formulário. Na hipótese de contratação do plano previsto neste item (b), o Restaurante poderá, a seu exclusivo critério, cobrar uma taxa de entrega dos Clientes Finais, a qual em nenhuma hipótese será superioraovalorfixoporPedidodevidopeloRestauranteao Fome Certa.</p>

            <h2>5. Pagamento dosPedidos</h2>

            <p>
              5.1. ORestauranteconcordaqueoFome Certadisponibilizará aosClientesFinaissistemadepagamentoonlineintegradoà Plataforma Fome Certa (o “Sistema de Pagamentos Fome Certa”), o qualpoderáserfornecido,totalouparcialmente,
              Diretamente pelo Fome Certa ou por terceiros por ele contratados paraessafinalidade.Dessaforma,oRestauranteoutorgaao Fome Certa,nostermosdoart.684daLein.10.406/2002,poderes paraqueoFome Certapossacontratar,emnomedoRestaurante, todos e quaisquer serviços necessários ou úteis à disponibilização e manutenção do Sistema de Pagamentos Fome Certa, incluindo, mas sem se limitar a isto, serviços de credenciamento de estabelecimentos comerciais em arranjos de pagamento, de coleta, processamento e liquidação de transações com cartões de crédito ou débito, de abertura de contas de pagamento em instituições de pagamento parceiras do Fome Certa, dentreoutros.
            </p>

            <p>5.1.1. O Fome Certa poderá fornecer aos Parceiros de Entrega, diretamente ou por meio de terceiros, equipamentospointof sale– POS ou outros equipamentos similares (os “Meios de Pagamento Presenciais do Fome Certa”) que permitam aos Clientes Finais realizarem os pagamentos dos Pedidos diretamente a tais Parceiros de Entrega, sendo certo que os Meios de Pagamento Presenciais do Fome Certa integrarão, para todos os fins e efeitos, o Sistema de PagamentosFome Certa.</p>

            <p>5.1.2. Os Pedidos pagos por meio do Sistema de Pagamentos Fome Certa serão repassados ao Restaurante no prazo e na forma previstos na Cláusula 8.</p>

            <p>5.1.3. Em caso de pagamento realizado por meio do SistemadePagamentosFome Certa,eventuaisChargebacksserão assumidos pelo Fome Certa, devendo os valores dos respectivos Pedidos serem incluídos nos Repasses. Para os fins do Contrato,“Chargeback”significaumPedidocujopagamento tenha sido realizado por meio do Sistema de Pagamentos Fome Certa e que tenha sido estornado com sucesso pelo titular docartãoutilizadonopagamento,incluindoemdecorrência de pagamento fraudulento, resultando no cancelamento da transferência, pelos fornecedores do Sistema de Pagamentos Fome Certa, do valor do Pedido para oFome Certa.</p>

            <p>5.1.4. O Restaurante compromete-se a não rejeitar e/ou cancelar os Pedidos nos quais os Clientes Finais optem pela utilização do Sistema de PagamentosFome Certa.</p>

            <p>5.1.5. Exceto em caso de contratação do Plano Logística completa, em contrapartida pela disponibilização do Sistema de Pagamentos Online, o Restaurante pagará ao Fome Certa uma comissão adicional por Pedido pago por meio de referido sistema, a qual será definida pelas Partes no Formulário (a “Taxa de PagamentoOnline”).</p>

            <p>5.2. ExclusivamentenahipótesedeoRestauranteoptar pela contratação do Plano Básico, o Restaurante poderá disponibilizaraosClientesFinaispossibilidadedepagamento de forma presencial, no ato da entrega do Pedido, diretamente aos entregadores do Restaurante (o “Pagamento Offline”).</p>

            <p>5.2.1. Na hipótese de o Cliente Final optar pelo Pagamento Offline, o Restaurante sempre deverá permitir queosClientesFinaisrealizemopagamentodosPedidosem dinheiro ou com cartões de crédito oudébito.</p>

            <p>
              5.2.2. Caso o Restaurante contratante do Plano Básico desejeusarosMeiosdePagamentoPresenciaisdoFome Certanas
              suas operações, as Partes ajustam de comum acordo que serão aplicáveis aos pagamentos de Pedidos realizados nessa modalidade: (a) as regras previstas ao Sistema de Pagamentos Fome Certa; e (b) a Taxa de Pagamento Online.
            </p>

            <h2>6. Remuneração</h2>

            <p>6.1. Pela prestação do Serviço, o Restaurante pagará ao Fome Certa Remuneração composta pelos seguintes valores: (a) “Comissão”, correspondente a um percentual sobre a Receita Bruta obtida pelo Restaurante em decorrência dos Pedidos realizados pelos Clientes Finais; (b) “Mensalidade”, correspondente a uma remuneração mensal fixa, como contrapartida ao licenciamento não exclusivo do uso dos Softwares; e (c) Taxa de PagamentoOnline.</p>

            <p>6.2. Em caso de contratação do Plano Básico com entrega, o Fome Certa também fará jus ao recebimento de um valor fixo por Pedido entregue pelos Parceiros de Entrega, nos termos da Cláusula 5.4(b).</p>

            <h2>7. Forma de Pagamento eRepasse</h2>

            <p>7.1. Com relação aos Pedidos em que os Clientes Finais optem por (a) Pagamento Offline, os Clientes Finais efetuarão o pagamento dos respectivos Pedidos diretamente ao Restaurante, o qual deverá, no prazo e nas condições previstas nesta Cláusula, realizar o pagamento da Comissão; e (b) Sistema de Pagamentos Fome Certa, o Restaurante expressamente autoriza o Fome Certa ou quaisquer terceiros por ele contratado a receber dos Clientes Finais, em nome do Restaurante, o valor total dos Pedidos e a repassar este valor para ao Restaurante, no prazo e nas condições previstas nesta Cláusula (o“Repasse”).</p>

            <p>7.2. O Restaurante poderá acompanhar, por meio do PortaldoParceiro,asinformaçõesarespeitodosRepassese dos Pedidos recebidos por meio da Plataforma Fome Certa, os quais poderão ser questionados pelo Restaurante até às 10:00h do dia seguinte ao seu recebimento, desde que sejam indicados, com o maior número de detalhes possível, os motivos do seu questionamento. O não questionamento dos Pedidos no prazo previsto nesta Cláusula será considerado, para todos os fins e efeitos, como uma concordância irrevogável e irretratável do Restaurante quanto aos Pedidos recebidos e concluídos no dia imediatamente anterior, os quais serão integralmente considerados pelo Fome Certa no cálculo do Repasse correspondente.</p>

            <p>7.3. O Repasse será feito pelo Fome Certa ao Restaurante no prazodeaté30(trinta)diascontadosdadatadepagamento do Pedido por meio do Sistema de Pagamentos Fome Certa, observadas as regras previstas nesta Cláusula, ou em qualquer outro prazo acordado pelas Partes noFormulário.</p>

            <p>7.3.1. O Fome Certa consolidará os Repasses referentes a Pedidos recebidos pelo Restaurante em 1 (um) mesmo dia (assim entendido o período compreendido entre 00:00h e 23:59h de cada dia) e fará 1 (um) único Repasse para o Restaurante, ficando o Fome Certa desde já autorizado a reter do RepasseemquestãoosvaloresdaRemuneraçãodevidapelo Restaurante ao Fome Certa, conforme fórmulaabaixo:</p>
            <br />Repasse = VP – VC, onde:
            <br />“VP” significa o valor total dos Pedidos pagos por meio do
            Sistema de Pagamentos Fome Certa em um determinado dia; e
            <br />“VC” significa o valor total da Remuneração devida ao Fome Certa pelo Restaurante em um determinado dia.
            <br />
            <p>7.3.2. Caso, na fórmula prevista na Cláusula 8.3.1, o valor do VC seja superior ao valor do VP, o saldo remanescente será descontado pelo Fome Certa do Repasse seguinte devido ao Restaurante. Caso, ao término de cada mês, ainda existam saldosapagarpeloRestauranteaoFome Certa,oFome Certaenviaráao Restauranteboletobancáriocomovalorcorrespondenteao saldoemquestão,comvencimentonoprazode10(dez)dias contados da data de seu recebimento peloRestaurante.</p>

            <p>7.3.3. Na hipótese de o Restaurante desejar alterar a sua contabancáriainformadanoContrato,deveráinformar,por escrito, os dados da nova conta bancária para o Fome Certa com antecedência mínima de 15 (quinze) dias, sob pena de o Repasse em questão ser feito pelo Fome Certa para a conta bancária anteriormente indicada peloRestaurante.</p>

            <p>7.3.4. Na hipótese de o último dia do prazo de transferência do Repasse cair em um final de semana ou outra data em que os bancos comerciais permaneçam fechados nas cidades de São Paulo e/ou Osasco, ambas no Estado de São Paulo, o prazo limite para o pagamento do RepasseDevidoemquestãoseráprorrogadoparaoprimeiro dia útilsubsequente.</p>

            <p>7.4. No caso de o Restaurante atrasar o pagamento da Remuneração devida ao Fome Certa ou de o Fome Certa atrasar o pagamento do Repasse devido ao Restaurante, no todo ou emparte,aParteinocentefarájusaorecebimentodemulta moratória equivalente a 1% (um por cento) do valor em atraso e juros moratórios de 1% (um por cento) aomês.</p>

            <p>7.5. NocasodeoatrasonopagamentodaRemuneração perdurar por 10 dias, o Fome Certa poderá (a) suspender os acessos à Loja Virtual; (b) desabilitar a opção do Pagamento Offline; e (c) suspender todas as demais atividades relacionadas ao Contrato, até que o Restaurante efetue o pagamento dos valores pendentes. Caso o Restaurante atrase o pagamento da Remuneração por mais de 15 dias, o Fome Certa poderá, a seu exclusivo critério, rescindir oContrato.</p>

            <h2>8. Exclusividade</h2>

            <p>8.1. O Restaurante declara, por meio da assinatura no Formulário, que está ciente e concorda que o Fome Certa poderá prestarosserviçosobjetodesteContratoaquaisqueroutros estabelecimentos, ainda que estes sejam direta ou indiretamente concorrentes doRestaurante.</p>

            <p>
              8.2. Caso o Restaurante opte no Formulário por ser um parceiro exclusivo do Fome Certa, o Restaurante não poderá, direta ou indiretamente, contratar serviços de quaisquer concorrentesdiretosouindiretosdoFome Certa,ou,ainda,terem os seus respectivos serviços e produtos oferecidos em plataformasdeconcorrentesdiretosouindiretosdoFome Certa.
              Para os fins desta Cláusula, são considerados concorrentes do Fome Certa quaisquer empresas que se dediquem a promover os negócios de restaurantes e estabelecimentos similares por meio de plataformas online e/ou offline de captação de pedidos do gênero alimentício, independentemente de tais concorrentesexerceremsuasatividadesapenasnomercado dealimentaçãoeindependentementedearesponsabilidade pela entrega ser de taisconcorrentes.
            </p>

            <h2>9. Avaliações</h2>

            <p>9.1. O Fome Certa poderá disponibilizar na Plataforma Fome Certa as avaliações sobre os Pedidos realizadas pelos Clientes Finais, de acordo com as estipulações dispostas na “Política de Avaliações” disponível no Portal do Parceiro. O Restaurante reconhece e concorda que o Fome Certa não terá qualquerresponsabilidadepelasAvaliaçõesqueforemfeitas pelos ClientesFinais.</p>

            <p>9.2. O Restaurante se compromete a sempreresponder as Avaliações dos Clientes Finais de forma polida e prestativa, de acordo com as melhores práticas de mercado ecomautilizaçãoadequadaecorretadalínguaportuguesa. O Restaurante deverá, no menor tempo possível, entrar em contato com os Clientes Finais que houverem mantido tratativas com o Fome Certa, tomando todas e quaisquer providências necessárias para garantir a total satisfação dos ClientesFinais.</p>

            <h2>10. PropriedadeIntelectual</h2>

            <p>10.1. Todos e quaisquer direitos de propriedade intelectual ou industrial relativos à Plataforma Fome Certa e/ou aos Softwares pertencem única e exclusivamente ao Fome Certa. Em nenhuma hipótese, o Contrato implica transferência, no todo ou em parte, de qualquer direito de propriedade intelectual ou industrial pelo Fome Certa para o Restaurante. O Restaurantesecomprometea(a)utilizaraPlataformaFome Certa e os Softwares de acordo com as suas finalidades e exigências técnicas; (b) disponibilizar meio adequado para a implantação e a utilização dos Softwares, conforme instruções do Fome Certa, incluindo, sem limitação, comrelação a hardware, rede, pessoas capacitadas etc.; (c) responsabilizar-se legalmente por quaisquer dados e informações que venham a ser armazenados pelo Restaurante nos Softwares; (d) não fazeroudistribuir quaisquer cópias dos Softwares; (e) não alterar, combinar, adaptar, traduzir, decodificar, fazer ou solicitar a terceiros engenharia reversa dos Softwares; (f) não criar trabalhos deles derivados ou solicitar que terceiros o façam; e (g) não ceder, licenciar, sublicenciar ou de qualquer outra forma dispor dosSoftwares.</p>

            <p>10.2. CasooRestaurantedesejeveicularquaisquersinais distintivos do Fome Certa em seus estabelecimentos, no Cardápio ou em qualquer outro material de divulgação, deverá obter a prévia autorização por escrito do Fome Certa e somente poderá fazê-lo de acordo com a orientação doFome Certa.</p>

            <p>
              10.3. O Restaurante outorga ao Fome Certa, por meio da assinatura no Contrato e pelo seu prazo de vigência, licença gratuita de uso dos Sinais Distintivos, os quais serão veiculados na Plataforma Fome Certa e em outrasmídias,
              exclusivamente para fins de cumprimento do objeto do Contrato, responsabilizando-se o Fome Certa pelo uso indevido que fizer de referidos Sinais Distintivos.
            </p>

            <p>10.3.1. ORestaurantedeclaraseroúnicoeexclusivotitular ou possuir a devida autorização de uso dos titulares dos direitos da propriedade intelectual sobre os Sinais Distintivos, reconhecendo que o Fome Certa poderá solicitar a comprovação de referida titularidade ouautorização.</p>

            <h2>11. Inadimplemento</h2>

            <p>
              11.1. O Restaurante reconhece e concorda que, em caso dedescumprimentodoContrato,estarásujeitoàsseguintes penalidades, a serem determinadas e aplicadas a exclusivo critériodoFome Certa,conformeascaracterísticasparticularesde cada caso: (a) rebaixamento da posição ocupada pelo Restaurante na lista de restaurantes constante na PlataformaFome Certa,porperíodode1(um)a30(trinta)dias;
              (b) desativação da Loja Virtual pelo período de 1 (um) a 30 (trinta) dias; (c) desativação da modalidade do Pagamento Offline, no caso de atrasos no pagamento da Remuneração; e (d) suspensão do Repasse, no caso previsto na Cláusula 14.3, abaixo.
            </p>

            <p>11.2. O Fome Certa disponibilizará, por meio do Portal do Parceiro, uma lista exemplificativa de hipóteses de descumprimento e suas penalidades, a qual poderá ser revista pelo Fome Certa sem a necessidade de comunicação ou aviso prévio aoRestaurante.</p>

            <p>11.3. SemprejuízododireitodoFome Certadeimediatamente aplicar ao Restaurante as penalidades previstas acima, no casodeumadasPartestornar-seinadimplentenotocantea uma ou mais de suas obrigações assumidas no Contrato, a outraPartepoderácomunicá-laparaque,noprazoatribuído na comunicação, o qual não poderá ser inferior a 5 (cinco) dias úteis, a Parte inadimplente sane e/ou esclareça tal inadimplemento.SeaParteinadimplentenãoofizer,aoutra Parte poderá resolver imediatamente oContrato.</p>

            <h2>12. Alteração destas CondiçõesGerais</h2>

            <p>12.1. O Restaurante reconhece e concorda que o Fome Certa poderá alterar estas Condições Gerais a qualquer tempo, mediante o envio de notificação escrita ao Restaurante, por meiodoPortaldoParceiro,comantecedênciamínimade30 (trinta) dias contados da data de entrada em vigor da nova versão desteinstrumento.</p>

            <p>
              12.1.1. Se a alteração destas Condições Gerais tiver um efeito adverso importante sobre o Restaurante e o Restaurante não concordar com a alteração, o Restaurante poderá apresentar notificação escrita ao Fome Certa no prazo de até 30 (trinta) dias após o recebimento da notificação da mudança prevista na Cláusula 13.1. O Fome Certa entrará em contato com o Restaurante para discutir os motivos pelos quais o Restaurante não concorda com a alteração destas Condições Gerais. Se o Restaurante continuar a se recusar a aceitar a mudança e o Fome Certa recusar-se a retirar a mudança anunciada,qualquerdasPartespoderárescindiroContrato, mediante o envio de comunicação por escrito à outraParte.
              12.1.2. O Restaurante reconhece e concorda que não terá o direito de apresentar objeção a qualquer alteração nestes Termos e Condições que o Fome Certa venha a implantar para o cumprimentodeexigênciaslegaisouregulatórias.Paraessas alterações, períodos de notificação menores podem ser aplicados pelo Fome Certa, conforme necessário para o cumprimento dos requisitosrelevantes.
            </p>

            <p>12.2. O não envio da notificação de objeção prevista na Cláusula13.1.1valerácomoumaconcordânciairrevogávele irretratável do Restaurante quanto à alteração destas Condições Gerais peloFome Certa.</p>

            <h2>13. Das Boas Práticas deIntegridade</h2>

            <p>13.1. Ao cumprir as obrigações previstas no Contrato, o Restaurante, seus funcionários, agentes e representantes devem respeitar, plenamente, todas as leis aplicáveis sobre anticorrupção, antissuborno, antiterrorismo, antiboicote, antilavagem de dinheiro e de sanções econômicas e de defesa da concorrência, incluindo, mas não limitado à Lei n. 12.846/2013, e conduzir as suas atividades, de acordo com osmaisrigorososconceitoseprincípiosdaética,integridade e boa-fé, evitando por si e/ou por meio de terceiros, participação em atividades comerciais ilícitas, incluindo concorrência antiética ou desleal e demais ilícitos penais, das quais, em função da atividade exercida, o Restaurante delas sabe ou deveria saber.</p>

            <p>13.2. ORestauranteestádeacordocomoCódigodeÉtica eCondutadoFome Certa(o“CódigodeÉtica”),oqualseencontra disponível no seguinte endereço:https://www.Fome Certa.com.br/codigo-de-conduta, tomouciência de seu conteúdo e garante que não violará as disposições neleconstantes.</p>

            <p>13.3. O Restaurante se compromete a fornecer, noprazo máximo de 30 (trinta) dias, documentos no formato original e de forma organizada, bem como esclarecimentos, quando solicitado, seja para cadastro, seja para fins de auditoria. Se compromete também a, durante o prazo de vigência do Contratoeumperíodoadicionalde5(cinco)anosapósoseu término, manter livros contábeis precisos, completos e registros apurados em conexão com os Serviços. O não fornecimento dos documentos resultará na suspensão do Repasse até o efetivo fornecimento dos documentos solicitados peloFome Certa.</p>

            <p>13.4. O Restaurante deverá informar ativamente o Fome Certa sobre ações ou recursos relacionados a processos com alegaçõesdecorrupção,lavagemdedinheirooucompetição limitada, assim como investigações e medidas coercitivas decorrentes de violação delei.</p>

            <p>
              13.5. O Restaurante se compromete a manter o Fome Certa livre e indene de todo e qualquer dano e perda, incluindo multa, custo, obrigação de reparação de danos, taxas,juros, honorários advocatícios ou outras responsabilidades, incluindo as criminais, imputadas ao Fome Certa a partir de investigação ou qualquer outro procedimento judicial ou administrativo em face do Fome Certa, mas que tenha sido originado a partir de qualquer ação ou omissão do Restaurante, diretamente, ou por seusadministradores,
              sócios, empregados, agentes, prepostos ou representantes, que configurem uma violação das leis e normas da Cláusula.
            </p>

            <p>13.6. OdescumprimentodestaCláusulagaranteaoFome Certa a faculdade de rescindir oContrato.</p>

            <h2>14. Privacidade deDados</h2>

            <p>14.1. O Restaurante reconhece que poderá ter acesso a dados enviados pelo Fome Certa que identifiquem ou permitam a identificação de indivíduos (os “Dados Pessoais”). As Partes concordam que a execução do presente Contrato será guiada (i) pelos princípios deprivacy by design; e (ii) pelas leis brasileiras aplicáveis, incluindo, mas sem se limitar, o MarcoCivildaInterneteoCódigodeDefesadoConsumidor.</p>

            <p>14.2. O acesso, utilização, coleta, produção, recepção, classificação, acesso, reprodução, transmissão, distribuição, processamento, arquivamento, armazenamento, eliminação, avaliação ou controle da informação, modificação, comunicação, transferência, difusão ou extração e o compartilhamento pelo Restaurante de Dados Pessoais que lhe forem enviados pelo Fome Certa será autorizado elimitadoaoestritamentenecessárioparaaexecuçãodeste Contrato. Fica vedada a utilização dos Dados Pessoais para quaisquer finalidades que não tenham sido expressamente autorizadas pelos Clientes Finais e/ou peloFome Certa.</p>

            <p>14.3. O Restaurante somente poderá realizar o tratamento de Dados Pessoais recebidos por força deste Contratoduranteasuavigênciaecomafinalidadeestritade cumprir as obrigações do presenteinstrumento.</p>

            <p>14.4. Fica vedado ao Restaurante transferir, no todo ou em parte, os Dados Pessoais que lhe forem enviados pelo Fome Certa para quaisquer terceiros não necessários ao cumprimento das obrigações por ele assumidas neste Contrato,mesmoquedeformaagregadae/ouanonimizada.</p>

            <p>14.5. O Restaurante deverá promover a exclusão definitiva de quaisquer Dados Pessoais que lhe foram transmitidos por força deste Contrato por solicitação dos respectivos titulares dos Dados Pessoais ou do Fome Certa, com exceção dos Dados Pessoais que deverão ser mantidos por conta de obrigaçõeslegais.</p>

            <p>14.6. O Restaurante deverá notificar o Fome Certa, em até 48 (quarentaeoito)horasapartirdoseuconhecimento,acerca dequalquervazamentooucomprometimentodesuasbases de dados relacionadas com o presente Contrato, bem como acerca de qualquer violação da legislação de privacidade e deproteçãodedadospessoaisquetiverciênciacomrelação aos dados em sua custódia, inclusive violação acidental ou culposa.</p>

            <h2>15. DisposiçõesGerais</h2>

            <p>15.1. A relação jurídica estabelecida entre as Partes é de prestação de serviços, de modo que o Contrato não estabelece relação de consumo, trabalho, representação comercial ou de qualquer outra natureza, sendo certo que as Partes são e permanecerão a todo tempo autônomas e independentes entresi.</p>

            <p>15.2. O Restaurante reconhece e concorda que o Fome Certa poderá ceder e transferir os seus direitos e obrigações previstos no Contrato a quaisquerterceiros.</p>

            <p>15.3. As relações jurídicas estabelecidas pelo Contrato são celebradas em caráter irrevogável e irretratável, obrigando as Partes e seus sucessores, seja qual for o título da sucessão. A eventual tolerância por qualquer das Partes quanto ao inexato ou impontual cumprimento das obrigações da outra Parte valerá tão somente de forma isolada, não constituindo renúncia ounovação.</p>

            <p>15.4. CasoqualquerdisposiçãodoContratosetornenula ou ineficaz, a validade ou eficácia das disposições restantes não será afetada, permanecendo em pleno vigor e efeito e, em tal caso, as Partes entrarão em negociações de boa-fé visando substituir a disposição ineficaz por outra que, tanto quanto possível e de forma razoável, atinja a finalidade e os efeitosdesejados.</p>

            <p>15.5. ORestaurantereconheceeconcordaqueoFome Certa,a seu exclusivo critério, poderá fornecer a terceiros interessados, a título gratuito ou oneroso, dados e informações gerais obtidos a partir do seu banco de dados, incluindo,semlimitação,informaçõesarespeitodepadrões de comportamento, hábitos de consumo e outras estatísticas. Referidos dados e informações em nenhuma hipótese indicarão o nome do Restaurante ou serão apresentados de modo que possam ser identificados como lhe sendo atribuídosespecificamente.</p>

            <p>15.6. As disposições contidas no Contrato representam a totalidade dos entendimentos mantidos entre as Partes, superando todos e quaisquer entendimentos anteriores, verbaisouescritos,consubstanciando-senadeclaraçãofinal de suasvontades.</p>

            <p>15.7. O Restaurante declara que está ciente e de acordo com que o Fome Certa preste os serviços objeto destas Condições Geraisaquaisqueroutrosestabelecimentos,aindaqueestes sejamdiretaouindiretamenteconcorrentesdoRestaurante.</p>

            <p>15.8. Caso o Restaurante tenha assinado o Contrato por meio de qualquer ferramenta eletrônica, o Fome Certa poderá solicitar, a qualquer momento, que o Restaurante assine e rubrique uma via física do Contrato e destas Condições Gerais. Caso o Restaurante não cumpra essa solicitação do Fome Certa no prazo de até 5 (cinco) dias úteis contados da data de recebimento da notificação do Fome Certa a este respeito, o Fome Certa terá o direito de suspender, total ou parcialmente, os serviços descritos nestes Termos e Condições, até que o Restaurante tenha cumprido talsolicitação.</p>

            <p>15.9. O Contrato será regido e interpretado de acordo com a legislação da República Federativa do Brasil. No caso de qualquer reivindicação ou controvérsia decorrente do Contrato,ouaelesrelacionada,ou,ainda,resultantedeseu inadimplemento, as Partes elegem desde já o foro da Comarca de Taquaritinga , Estado de São Paulo, para a solução da reivindicação ou controvérsia, com a exclusão de qualquer outro, por mais privilegiado queseja.</p>
          </v-card-text>

          <v-card-actions>
            <v-row align="center" justify="center" class="pt-4 pb-4">
              <v-btn large color="primary" :loading="loading" @click="accept">Aceito os termos</v-btn>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getMessage } from '@/helpers/messages'
import restrictGuests from '@/mixins/restrict-guests'

export default {
  name: 'PageTOS',
  middleware: 'auth-tos',
  mixins: [restrictGuests],
  data () {
    return {
      loading: true
    }
  },
  mounted () {
    this.loading = false
  },
  methods: {
    async logout () {
      try {
        await this.$fireAuth.signOut()
      } catch (error) {
        console.error(error)
        this.$snackbar.showMessage(getMessage(error))
      }
    },

    async accept () {
      try {
        this.loading = true

        await this.$fireStore.doc(`establishments/${this.authUser.uid}`).set(
          {
            termsAccepted: true
          },
          {
            merge: true
          }
        )

        const authUser = { ...this.authUser }
        authUser.termsAccepted = true
        this.$store.commit('SET_AUTH_USER', { authUser })

        this.$router.push('/')
      } catch (error) {
        console.error(error)
        this.$snackbar.showMessage(getMessage(error), 'error')
      } finally {
        this.loading = false
      }
    }
  },
  head: () => ({
    title: 'Termos e condições gerais'
  })
}
</script>

<style lang="scss" scoped>
h2 {
  margin: 2rem 0 0.5rem;
}
</style>
