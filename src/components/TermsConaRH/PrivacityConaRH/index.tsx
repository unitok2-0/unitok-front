import { AccordionList } from "components/AccordionList"
import { Text } from "components/Typography"
import { Colors } from "styles/Colors";
import * as S from './styles'

const termsPrivacity = [
  {
    title: "1. Para que suas informações serão utilizadas",
    content:
      <S.PrivacyTopicArea>
        <Text style={{ marginBottom: 28 }}>
          Ao interagir com nossas plataformas virtuais, algumas informações são coletadas expressamente e outras automaticamente, como o protocolo de internet do seu computador, endereço de IP, por exemplo, ambas no intuito de obter dados sobre seu navegador e sistema operacional.
        </Text>
        <Text style={{ marginBottom: 28 }}>
          Algumas interações, como preenchimento de formulários e requerimentos para aderir nossos serviços, em nosso site e a coleta de informações pessoais que são cedidas por você, integram o processo de prospecção de informações e de novos clientes. São dados como o nome, o e-mail, o endereço, telefone e profissão.
        </Text>
        <Text>
          O envio de e-mail marketing será feito apenas com a sua permissão. Nesses e-mails, você poderá receber notícias de nossos parceiros, bem como sobre o Unitok, com novos serviços, conteúdos e outras atualizações.
        </Text>
        <Text>
          O uso das informações coletadas serão para proporcionar melhor controle por parte dos expositores e ABRH Brasil durante o CONARH 2022, facilitando a contagem e coleta de dados dos visitantes e congressistas para um possível contato no futuro, evitando assim o uso desnecessário de papel e proporcionando uma melhor experiência.
        </Text>
        <Text>
          Esses dados serão coletados através da realização do cadastro que o congressista e visitante farão ao ativar o cartão Unitok ou ao encostar o celular nos adesivos que estarão expostos em cada estande.
        </Text>
      </S.PrivacyTopicArea>,
  },
  {
    title: "2. Controlador de dados",
    content:
      <S.PrivacyTopicArea>
        <Text>
          O Unitok, é o Controlador de Dados nos termos da Lei, o que significa que determina para quais fins as informações pessoais mantidas serão usadas.
        </Text>
      </S.PrivacyTopicArea>,
  },
  {
    title: "3. Utilização e base legal de dados",
    content:
      <S.PrivacyTopicArea>
        <Text style={{ marginBottom: 28 }}>
          A base legal do Unitok para a coleta e uso das informações pessoais descritas nesta Política de Privacidade depende das Informações Pessoais que coletamos e do contexto específico em que as coletamos:
        </Text>
        <Text style={{ marginBottom: 28, color: Colors.orange, fontWeight: "bold" }}>
          3.1. Tipo de dado pessoal
        </Text>
        <Text style={{ marginBottom: 28 }}>
          Dados pessoais do Visitante: (i) nome completo; (ii) e-mail; (iii) telefone; (iv) cargo ou função;<br />
          Dados pessoais do Congressista: (i) nome completo; (ii) e-mail; (iii) telefone; (iv) cargo ou função;<br />
          O congressista, por estar portando o cartão Unitok que ganhará de cortesia do primeiro dia do evento, poderá utilizá-lo como um cartão de visita digital durante e depois do evento, possibilitando a inserção de suas redes sociais, além de seus dados de contato.
        </Text>
        <Text style={{ marginBottom: 28, color: Colors.orange, fontWeight: "bold" }}>
          3.2. Finalidade do tratamento
        </Text>
        <Text style={{ marginBottom: 28 }}>
          3.2.1. Você fornece os seus dados para o cadastro em sistemas internos.<br />
          3.2.2. Você fornece seus dados para utilização do cartão Unitok, no caso dos congressistas.<br />
          3.2.3. Você fornece seus dados para que o Unitok, Expositores presentes no CONARH 2022 e ABRH Brasil possam entrar em contato futuramente para oferecer informações, serviços, produtos, entre outros.<br />
          3.2.4. Para que o contato entre você,o Unitok e parceiros possa ser feito.
        </Text>
        <Text style={{ marginBottom: 28, color: Colors.orange, fontWeight: "bold" }}>
          Hipótese legal de tratamento
        </Text>
        <Text>
          LEI Nº 13.709, DE 14 DE AGOSTO DE 2018<br />
          Art. 7º O tratamento de dados pessoais somente poderá ser realizado nas seguintes hipóteses:<br />
          I - Mediante o fornecimento de consentimento pelo titular.<br />
          II – Legítimo interesse.<br />
          V - Quando necessário para a execução de contrato ou de procedimentos preliminares relacionados a contrato do qual seja parte o titular, a pedido do titular dos dados.
        </Text>
      </S.PrivacyTopicArea>,
  },
  {
    title: "4. Término de tratamento",
    content:
      <S.PrivacyTopicArea>
        <Text style={{ marginBottom: 28 }}>
          4.1. Em caso do término da finalidade pretendida para esta utilização de dados.
        </Text>
        <Text style={{ marginBottom: 28 }}>
          4.2. Até que sejamos formalmente comunicados por você acerca da revogação do consentimento.
        </Text>
        <Text style={{ marginBottom: 28 }}>
          4.3. Se após nos fornecer seus dados você mudar de ideia, você pode retirar o seu consentimento a qualquer momento, entrando em contato conosco pelo <S.PrivacyPrimaryColorText>suporte@unitok.com</S.PrivacyPrimaryColorText> / <S.PrivacyPrimaryColorText>contato@unitok.com</S.PrivacyPrimaryColorText>, pelo telefone 0800 455 0800 ou enviando uma correspondência para a Adbat/Unitok, no seguinte endereço: Av. Paulista, 1842, cj. 155, sala C, Torre Norte, Cerqueira Cesar, Bela Vista, São Paulo, SP, cep 01310.945.
        </Text>
        <Text style={{ marginBottom: 28 }}>
          O Unitok reterá suas informações pessoais apenas pelo tempo necessário para os fins previstos nesta Política de Privacidade.
          Reteremos e usaremos suas informações na medida necessária para cumprir nossas obrigações legais, resolver disputas e fazer cumprir nossas políticas.
        </Text>
        <Text style={{ marginBottom: 28 }}>
          O Unitok não trata dados definidos como sensíveis, entendido como aqueles relacionados à origem racial ou étnica, convicção religiosa, opinião política, filiação a sindicato ou a organização de caráter religioso, filosófico ou político, dado referente à saúde ou à vida sexual, dado genético ou biométrico, tampouco dados de crianças, assim considerados os indivíduos menores de 12 anos, para as finalidades gerais aqui dispostas.
        </Text>
        <Text>
          Na remota hipótese em que for necessário o tratamento desses dados, solicitaremos o consentimento específico e destacado do Usuário ou dos responsáveis deste, com base nas hipóteses autorizadoras pela Lei Geral de Proteção de Dados.
        </Text>
      </S.PrivacyTopicArea>,
  },
  {
    title: "5. Compartilhamento de dados pessoais",
    content:
      <S.PrivacyTopicArea>
        <Text style={{ marginBottom: 28 }}>
          O Unitok utiliza-se, para a operacionalização de seus serviços, da parceria com diversas empresas localizadas no Brasil e no exterior. Deste modo, o Unitok poderá compartilhar as suas informações pessoais, nas hipóteses abaixo expostas:
        </Text>
        <Text style={{ marginBottom: 28 }}>
          a) Com empresas parceiras e fornecedores no desenvolvimento e prestação de serviços voltados a você; inclusive, correspondentes bancários para que sejam oferecidos meios de pagamentos e assinaturas contratuais dos serviços.
        </Text>
        <Text style={{ marginBottom: 28 }}>
          b) Com autoridades, entidades governamentais ou outros terceiros institucionais, para a proteção dos interesses do Unitok em qualquer tipo de conflito, incluindo ações judiciais e processos administrativos.
        </Text>
        <Text style={{ marginBottom: 28 }}>
          c) No caso de transações e alterações societárias envolvendo o Unitok, em que a transferência das informações será necessária para a continuidade dos serviços.
        </Text>
        <Text style={{ marginBottom: 28 }}>
          d) Mediante ordem judicial ou pelo requerimento de autoridades administrativas que detenham competência legal para a sua requisição. Adicionalmente, é possível que algumas das transferências acima ocorram fora do território brasileiro. Ocasião em que o Unitok se compromete a fazê-lo somente para países que proporcionem um grau de proteção aos seus dados pessoais ao previsto na legislação aplicável, ou mediante a adoção de garantias e salvaguardas como cláusulas específicas, bem como mediante a prévia coleta do seu consentimento específico.
        </Text>
        <Text style={{ marginBottom: 28 }}>
          e) Com instituições financeiras, para análise, e possíveis cobranças de valores em aberto junto a nossa plataforma.
        </Text>
        <Text>
          f) Com todos os expositores presentes no CONARH 2022, bem como sua organizadora ABRH Brasil-Associação Brasileira de Recursos Humanos, com a finalidade de futuro contato para com o usuário.
        </Text>
      </S.PrivacyTopicArea>,
  },
  {
    title: "6. Direitos dos titulares de dados",
    content:
      <S.PrivacyTopicArea>
        <Text style={{ marginBottom: 28 }}>
          Você tem certos direitos de proteção de dados. Se você deseja ser informado sobre quais informações pessoais temos sobre você, se deseja que sejam removidas de nossos sistemas, ou se deseja exercer outro direito, entre em contato conosco através do e-mail: <S.PrivacyPrimaryColorText>contato@unitok.com</S.PrivacyPrimaryColorText>.
        </Text>
        <Text style={{ marginBottom: 28 }}>
          Em certas circunstâncias, você tem os seguintes direitos de proteção de dados:
        </Text>
        <Text style={{ marginBottom: 28 }}>
          a) confirmação da existência de tratamento.
        </Text>
        <Text style={{ marginBottom: 28 }}>
          b) acesso aos dados.
        </Text>
        <Text style={{ marginBottom: 28 }}>
          c) correção de dados incompletos, inexatos ou desatualizados.
        </Text>
        <Text style={{ marginBottom: 28 }}>
          d) anonimização, bloqueio ou eliminação de dados desnecessários, excessivos ou tratados em desconformidade com o disposto nesta Lei.
        </Text>
        <Text style={{ marginBottom: 28 }}>
          e) portabilidade dos dados a outro fornecedor de serviço ou produto, mediante requisição expressa, de acordo com a regulamentação da autoridade nacional, observados os segredos comercial e industrial.
        </Text>
        <Text style={{ marginBottom: 28 }}>
          f) eliminação dos dados pessoais tratados com o consentimento do titular.
        </Text>
        <Text style={{ marginBottom: 28 }}>
          g) informação das entidades públicas e privadas com as quais o controlador realizou uso compartilhado de dados.
        </Text>
        <Text style={{ marginBottom: 28 }}>
          h) informação sobre a possibilidade de não fornecer consentimento e sobre as consequências da negativa.
        </Text>
        <Text style={{ marginBottom: 28 }}>
          i) revogação do consentimento.
        </Text>
        <Text style={{ marginBottom: 28 }}>
          O Usuário fica ciente que a eventual solicitação de exclusão de informações essenciais para a gestão de seu cadastro junto ao Unitok, poderá implicar no término de sua relação contratual, com o consequente cancelamento dos serviços então prestados.
          O Unitok empreenderá todos os esforços razoáveis para atender as requisições feitas por Usuários no menor espaço de tempo possível. No entanto, fatores justificáveis, tais como a complexidade da ação requisitada, poderão atrasar ou impedir o seu rápido atendimento, sendo certo que, em caso de demora, apresentará os devidos motivos.
        </Text>
        <Text>
          Por fim, o usuário deve estar ciente que a sua requisição poderá ser legalmente rejeitada, seja por motivos formais (a exemplo de sua incapacidade de comprovar sua identidade) ou legais (a exemplo do pedido de exclusão de dados cuja manutenção é livre exercício de direito pelo Unitok), sendo certo que, na hipótese de impossibilidade de atendimento destas requisições, a Unitok apresentará as justificativas razoáveis.
        </Text>
      </S.PrivacyTopicArea>,
  },
  {
    title: "7. Segurança dos dados",
    content:
      <S.PrivacyTopicArea>
        <Text style={{ marginBottom: 28 }}>
          Qualquer informação fornecida pelo cliente será coletada e guardada de acordo com os mais rígidos padrões de segurança. Para tanto, o Unitok adota diversas precauções, em observância às diretrizes sobre padrões de segurança estabelecidas nas legislações e sua Política de Segurança da Informação, tais como:
        </Text>
        <Text style={{ marginBottom: 28 }}>
          a) Utiliza os mais recentes métodos e equipamentos disponíveis no mercado para criptografar e anonimizar os seus dados pessoais, quando necessário.
        </Text>
        <Text style={{ marginBottom: 28 }}>
          b) Possui proteção contra acesso não autorizado a seus sistemas.
        </Text>
        <Text style={{ marginBottom: 28 }}>
          c) Somente autoriza o acesso de pessoas específicas ao local onde são armazenadas as suas informações pessoais, desde que este acesso seja essencial ao desenvolvimento da atividade pretendida.
        </Text>
        <Text style={{ marginBottom: 28 }}>
          d) Garante que aqueles agentes, funcionários internos ou parceiros externos que realizarem o tratamento de dados pessoais deverão se comprometer a manter o sigilo absoluto das informações acessadas, bem como de adotar as melhores práticas para manuseio destas informações, conforme determinado nas políticas e procedimentos
        </Text>
        <Text style={{ marginBottom: 28 }}>
          O acesso às informações coletadas é restrito aos colaboradores e às pessoas autorizadas. Aqueles que se utilizarem indevidamente dessas informações, em violação desta Política de Privacidade e a de Segurança da Informação, estarão sujeitos a sanções disciplinares e legais cabíveis.
        </Text>
        <Text style={{ marginBottom: 28 }}>
          Além dos esforços técnicos, nós do Unitok também adotamos medidas institucionais visando a proteção de dados pessoais, de modo que mantenha o programa de privacidade aplicado às suas atividades, constantemente atualizado.
        </Text>
        <Text>
          Embora a Unitok adote os melhores esforços no sentido de preservar a sua privacidade e proteger os seus dados pessoais, nenhuma transmissão de informações é totalmente segura, de modo que o Unitok não pode garantir integralmente que todas as informações que recebe e/ou envia não sejam alvo de acessos não autorizados perpetrados por meio de métodos desenvolvidos para obter informações de forma indevida, como falhas técnicas, vírus ou invasões do banco de dados do site.
          De qualquer forma, na remota hipótese de incidência de episódios desta natureza, o Unitok garante o pleno esforço para remediar as consequências do evento.
        </Text>
      </S.PrivacyTopicArea>,
  },
  {
    title: "8. Arquivos de log",
    content:
      <S.PrivacyTopicArea>
        <Text>
          O Unitok segue um procedimento padrão de utilização de arquivos de log. Esses arquivos registram os visitantes quando eles visitam sites. Todas as empresas de hospedagem fazem isso e fazem parte da análise dos serviços de hospedagem. As informações coletadas pelos arquivos de log incluem endereços de protocolo de Internet (IP), tipo de navegador, provedor de serviços de Internet (ISP), carimbo de data e hora, páginas de referência / saída e possivelmente o número de cliques. Eles não estão vinculados a nenhuma informação de identificação pessoal. O objetivo das informações é analisar tendências, administrar o site, rastrear o movimento dos usuários no site e coletar informações demográficas.
        </Text>
      </S.PrivacyTopicArea>,
  },
  {
    title: "9. Política de Cookies",
    content:
      <S.PrivacyTopicArea>
        <Text color='primary' style={{ marginBottom: 28 }}>
          O que é um Cookie?
        </Text>
        <Text style={{ marginBottom: 28 }}>
          Cookies são pequenos arquivos de textos ou fragmentos de informação que são armazenadas no seu navegador ou dispositivo móvel (como um smartphone ou tablet) quando você visita o nosso site. Um cookie geralmente contém o nome do nosso site, o “tempo de vida”, ou seja, quanto tempo o cookie permanecerá em seu dispositivo, e um valor, que normalmente é um número exclusivo gerado aleatoriamente.
        </Text>
        <Text color='primary' style={{ marginBottom: 28 }}>
          Por que usamos Cookies em nosso site?
        </Text>
        <Text style={{ marginBottom: 28 }}>
          Coletamos certas informações através de ferramentas automáticas quando você visita www.unitok.com (“site”). Usamos cookies para registrar dados e estatísticas que nos possibilitam compreender a forma como os usuários navegam em nosso site, o que nos ajuda a melhorar a estrutura e o conteúdo dele.
        </Text>
        <Text color='primary' style={{ marginBottom: 28 }}>
          Quais tipos de Cookies usamos?
        </Text>
        <Text style={{ marginBottom: 28 }}>
          Usamos Cookies do tipo HTTP e/ou JavaScript, para aprimorar os serviços e funcionalidades para os usuários do nosso site.
          Apresentamos os tipos de Cookies que usamos, assim como as opções que você tem sobre eles. Caso você decida declinar do uso de algum deles, a sua navegação pode ser prejudicada em nosso site. Um Cookie poderá ser colocado no navegador do seu dispositivo para lembrar o nosso site das suas escolhas. Caso você não negue a permissão de nenhum Cookie e continue usando o site, os seguintes tipos de Cookie poderão ser adicionados ao seu navegador:
        </Text>
        <Text fontWeight="500" style={{ marginBottom: 28 }}>
          a) Cookies de Análise
        </Text>
        <Text style={{ marginBottom: 28 }}>
          Usado para melhorar a performance e análise dos números do site. Esse tipo de Cookie coleta informações como o tipo de dispositivo que está sendo usado (se é um computador, um celular, tablet, ou outros), o sistema operacional (Windows, iOs, Android ou outro), a versão de atualização do navegador, o domínio e URL de referência (endereço do site), número IP (número do protocolo que identifica o seu dispositivo), data e hora que visitou nosso site, fuso horário, a língua preferencial e onde o IP está localizado. Também são coletados dados de comportamento de navegação através das páginas do nosso site. O Cookie de análise é considerado do tipo “persistente”, ou seja, que permanece no seu dispositivo. O tempo de expiração é de até dois anos. Usamos tecnologias de Cookies fornecidas por uma empresa terceira, sendo o nosso provedor a ferramenta Google Analytics. Clique aqui para conhecer mais detalhes sobre a política desse Cookie.
        </Text>
        <Text fontWeight="500" style={{ marginBottom: 28 }}>
          b) Cookies de Análise
        </Text>
        <Text style={{ marginBottom: 28 }}>
          Usamos Cookies de plataformas como Facebook, Instagram e Google. Se você utilizar algum aplicativo de alguma dessas redes, eles poderão colocar um Cookie de sessão (são cookies temporários, que permanecerão até que este saia do nosso site) ou persistente, no navegador do seu dispositivo.
        </Text>
        <Text style={{ marginBottom: 28 }}>
          Para conhecer a política de Cookie dessas redes acesse: <S.PrivacyPrimaryColorText>https://www.google.com</S.PrivacyPrimaryColorText>
        </Text>
        <Text fontWeight="500" style={{ marginBottom: 28 }}>
          c) Cookies de Análise
        </Text>
        <Text style={{ marginBottom: 28 }}>
          Em todas as páginas do nosso site colocamos um alerta no rodapé informando sobre o uso de Cookies. Continuando a navegação pelo site, você aceitará esse uso. Para desativar esse alerta de Cookie durante a navegação, bastará clicar no link ou botão “aceito”.
        </Text>
        <Text>
          Você pode gerenciar a remoção de Cookies no browser do seu dispositivo. Para isso, basta acessar os links de instruções abaixo, de acordo com seu browser de uso:
        </Text>
        <S.PrivacyUl>
          <S.PrivacyLi>
            Google Chrome;
          </S.PrivacyLi>
          <S.PrivacyLi>
            Microsoft Edge;
          </S.PrivacyLi>
          <S.PrivacyLi>
            Firefox;
          </S.PrivacyLi>
          <S.PrivacyLi>
            Safari;
          </S.PrivacyLi>
        </S.PrivacyUl>
        <Text fontWeight="500" style={{ marginBottom: 28 }}>
          d) Cookies Facebook, Instagram e Whatsapp;
        </Text>
        <Text style={{ marginBottom: 28 }}>
          O Facebook é um fornecedor terceirizado em nosso site. Ele usa cookies para rastrear a utilização e o perfil dos usuários do site.
        </Text>
        <Text style={{ marginBottom: 28 }}>
          A Workfy é um fornecedor terceirizado em nosso site. Ele usa cookies para rastrear a utilização e o perfil dos usuários do site.
        </Text>
        <Text style={{ marginBottom: 28 }}>
          A Adbat é um fornecedor terceirizado em nosso site. Ele usa cookies para rastrear a utilização e o perfil dos usuários do site.
        </Text>
        <Text>
          Você pode consultar esta lista para conhecer a Política de Privacidade de cada um dos parceiros de publicidade do Unitok.
          Servidores de anúncios ou redes de anúncios de terceiros utilizam tecnologias como cookies, JavaScript que são utilizadas em seus respectivos anúncios e links que aparecem, que são enviados diretamente ao navegador dos usuários. Eles recebem automaticamente o seu endereço IP quando isso ocorre. Essas tecnologias são usadas para medir a eficácia de suas campanhas publicitárias e/ou para personalizar o conteúdo publicitário que você vê nos sites que visita. Observe que o Unitok não tem acesso ou controle sobre esses cookies que são usados por terceiros.
        </Text>
      </S.PrivacyTopicArea>,
  },
  {
    title: "10. Políticas de privacidade de terceiros",
    content:
      <S.PrivacyTopicArea>
        <Text style={{ marginBottom: 28 }}>
          A Política de Privacidade do Unitok não se aplica a outros anunciantes ou sites. Assim, aconselhamos você a consultar as respectivas Políticas de Privacidade desses servidores de anúncios de terceiros para obter informações mais detalhadas. Pode incluir suas práticas e instruções sobre como cancelar certas opções.
        </Text>
        <Text>
          Você pode optar por desabilitar os cookies por meio das opções individuais do navegador. Para saber informações mais detalhadas sobre o gerenciamento de cookies com navegadores da web específicos, elas podem ser encontradas nos respectivos sites dos navegadores.
        </Text>
      </S.PrivacyTopicArea>,
  },
  {
    title: "11. Dados de crianças e adolescentes",
    content:
      <S.PrivacyTopicArea>
        <Text style={{ marginBottom: 28 }}>
          Outra parte de nossa prioridade é adicionar proteção para crianças enquanto usam a internet. Incentivamos os pais e responsáveis a observar, participar e/ou monitorar e orientar suas atividades online.
        </Text>
        <Text>
          O Unitok não coleta intencionalmente quaisquer Informações Pessoais Identificáveis de crianças menores de 14 anos. Se você acha que seu filho fornece esse tipo de informação em nosso site, encorajamos você a nos contatar imediatamente e faremos o possível para prontamente remover essas informações de nossos registros.
        </Text>
      </S.PrivacyTopicArea>,
  },
  {
    title: "12. Mudanças na Política de Privacidade",
    content:
      <S.PrivacyTopicArea>
        <Text style={{ marginBottom: 28 }}>
          Reservamo-nos o direito de modificar esta Política de Privacidade a qualquer momento. E, assim sendo, as alterações e esclarecimentos vão surtir efeito imediatamente após sua publicação no site. Caso sejam feitas alterações relevantes que ensejem em um novo consentimento seu, publicaremos essa atualização e solicitamos um novo consentimento.
        </Text>
        <Text>
          Se o Unitok for adquirido ou fundido com outra empresa, suas informações poderão ser transferidas para os novos proprietários para que possamos continuar a interagir com você.
        </Text>
      </S.PrivacyTopicArea>,
  },
  {
    title: "13. Como entrar em contato conosco",
    content:
      <S.PrivacyTopicArea>
        <Text style={{ marginBottom: 28 }}>
          Se você tiver alguma dúvida sobre a política de privacidade da nossa empresa, os dados que mantemos sobre você, ou se gostaria de exercer um de seus direitos de proteção de dados, não hesite em nos contatar.
        </Text>
        <Text>
          Envie-nos um e-mail para: <S.PrivacyPrimaryColorText>contato@unitok.com</S.PrivacyPrimaryColorText>
        </Text>
      </S.PrivacyTopicArea>,
  },
  {
    title: "14. Legislação",
    content:
      <S.PrivacyTopicArea>
        <Text>
          Esta Política foi elaborada em conformidade com a Lei Federal nº 13.709/2018 (Lei Geral de Proteção de Dados Pessoais), Lei Federal nº 12.965/2014 (Marco Civil da Internet) e Lei Federal nº 8.078/1990 (Código de Defesa do Consumidor), sem prejuízo de observância das demais legislações aplicáveis para o Unitok.
        </Text>
      </S.PrivacyTopicArea>,
  },
];

export function Privacy() {
  return <AccordionList items={termsPrivacity} />
}
