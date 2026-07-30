import { AccordionList } from "components/AccordionList"
import { Text } from "components/Typography"
import * as S from './styles'

const termsPrivacity = [
  {
    title: "1. Do objetivo dos serviços e da plataforma",
    content: `A plataforma de serviços Unitok, acessível através do site www.unitok.com, é composta por códigos de programas de computador, website, aplicativos, tecnologias do tipo Near Field Communication e vários outros ativos de propriedade intelectual. Este termo visa licenciar através da internet, o direito de uso da plataforma de serviços para usuários empresariais (pessoas jurídicas) e usuários individuais (pessoas naturais).`,
  },
  {
    title: "2. Caracterização da plataforma dos serviços",
    content:
    <S.TermsTopicArea>
        <Text>A plataforma é compreendida por:</Text>
        <S.TermsUl>
          <S.TermsLi>Portal web, provedor de conteúdo e outros serviços de informação na internet;</S.TermsLi>
          <S.TermsLi>Suporte técnico prestado por uma equipe profissional de atendimento</S.TermsLi>
          <S.TermsLi>Manutenção da plataforma e outros serviços de tecnologia da informação;</S.TermsLi>
          <S.TermsLi>
            Venda dos seguintes serviços à distância (via internet): 1) serviços em tecnologia da informação; 2) licenciamento, sem custos, de adesivos e  cartões em PVC dotados com chips do tipo NFC (Near Field Communication) para que os usuários possam acessar os serviços da plataforma; 3) armazenamento de dados.
          </S.TermsLi>
        </S.TermsUl>
    </S.TermsTopicArea>,
  },
  {
    title: "3. O aceite nos termos da prestação de serviços",
    content: 
    <S.TermsTopicArea>
      <Text style={{marginBottom: 28}}>
        O presente Termo estabelece as condições de uso da plataforma e obrigações contratadas entre ambas as Partes (Unitok de um lado) e (o usuário - pessoa física ou jurídica de outro lado), de livre e espontânea vontade, por tempo indeterminado. Ao utilizar a plataforma o usuário aceita integralmente as presentes normas e compromete-se a observá-las, sob o risco de aplicação das penalidades cabíveis.
      </Text>
      <Text>
        A aceitação do presente termo é imprescindível para o acesso e para a utilização de quaisquer serviços fornecidos pela empresa. Caso não concorde com as disposições deste instrumento, o usuário não deve utilizá-los.
      </Text>
    </S.TermsTopicArea>,
  },
  {
    title: "4. Do acesso dos usuários",
    content: 
    <S.TermsTopicArea>
      Serão utilizadas todas as soluções técnicas/tecnológicas à disposição do responsável pela plataforma (Unitok) para permitir o acesso ao serviço 24 (vinte e quatro) horas por dia, 7 (sete) dias por semana. No entanto, a navegação na plataforma ou em alguma de suas páginas poderá ser interrompida, limitada ou suspensa para atualizações, modificações ou qualquer ação necessária ao seu bom funcionamento.
    </S.TermsTopicArea>,
  },
  {
    title: "5. Do cadastro de dados",
    content: 
    <S.TermsTopicArea>
      <Text style={{marginBottom: 28}}>
        O acesso às funcionalidades da plataforma exigirá a realização de um cadastro prévio e, a depender dos serviços ou produtos escolhidos, o pagamento de determinado valor que estará expresso no website www.unitok.com.
      </Text>
      <Text style={{marginBottom: 28}}>
        Ao se cadastrar o direito de uso da plataforma, o usuário deverá informar dados completos, atualizados e válidos, sendo de sua exclusiva responsabilidade manter referidos dados atualizados, bem como o usuário se compromete com a veracidade dos dados fornecidos. Se a informação fornecida não parecer congruente, correta, atualizada ou completa, há o direito do Unitok de recusar o acesso do usuário a esse site ou qualquer um de seus serviços e também de cancelar ou suspender seu acesso a qualquer tempo, sem notificação prévia.
      </Text>
      <Text style={{marginBottom: 28}}>
        O usuário se compromete a não informar seus dados cadastrais e/ou de acesso à plataforma a terceiros, responsabilizando-se integralmente pelo uso que deles seja feito, bem como de manter em total sigilo toda senha de acesso.
      </Text>
      <Text style={{marginBottom: 28}}>
        Menores de 18 anos e aqueles que não possuírem plena capacidade civil deverão obter previamente o consentimento expresso de seus responsáveis legais para utilização da plataforma e dos serviços ou produtos oferecidos pelo Unitok, sendo de responsabilidade exclusiva do usuário o não por menores de idade e por aqueles que não possuem plena capacidade civil sem a prévia autorização.
      </Text>
      <Text style={{marginBottom: 28}}>
        Mediante a realização do cadastro, o usuário declara e garante expressamente ser plenamente capaz, podendo exercer e usufruir livremente dos serviços e produtos.
      </Text>
      <Text style={{marginBottom: 28}}>
        O usuário deverá fornecer um endereço de e-mail válido, através do qual o site realizará todas as comunicações necessárias. De acordo com as Leis 12.965/2014 e 13.709/2018, que regulam o uso da Internet e o tratamento de dados pessoais no Brasil, o usuário autoriza a UNITOK SISTEMAS LTDA a enviar notificações por e-mail ou outros meios e concordância com sua Política de Privacidade.
      </Text>
      <Text style={{marginBottom: 28}}>
        Após a confirmação do cadastro, o usuário receberá um login e uma senha pessoal, a qual assegura o acesso individual ao mesmo. Desta forma, compete ao usuário exclusivamente a manutenção de referida senha de maneira confidencial e segura, evitando o acesso indevido às suas informações pessoais.
      </Text>
      <Text style={{marginBottom: 28}}>
        Toda e qualquer atividade realizada com o uso da senha será de responsabilidade do usuário, que deverá informar prontamente a plataforma em caso de uso indevido da respectiva senha.
      </Text>
      <Text style={{marginBottom: 28}}>
        Não será permitido ceder, vender, alugar ou transferir, de qualquer forma, a conta, que é pessoal e intransferível, bem como, permitir que terceiros usem o login e senha do usuário, sob pena de caracterizar fraude de uso a plataforma Unitok. 
        Caberá ao usuário assegurar que o seu equipamento seja compatível com as características técnicas que viabilize a utilização da plataforma e dos serviços ou produtos.
      </Text>
      <Text style={{marginBottom: 28}}>
        O usuário poderá, a qualquer tempo, requerer o cancelamento de seu cadastro e acesso junto ao site www.unitok.com ou diretamente por e-mail <S.TermsPrimaryColorText>contato@unitok.com</S.TermsPrimaryColorText>. O descadastramento será realizado o mais rapidamente possível, desde que não sejam verificados débitos em aberto. Porém, o Unitok terá como prazo regular e mínimo para o descadastramento e emissão de cobrança de qualquer período usado e não pago da plataforma ao usuário, 48 (quarenta e oito) horas a contar da data e hora de registro do pedido de descadastramento. 
      </Text>
      <Text>
        O usuário, ao aceitar este instrumento de Termos e Condições de Uso da Plataforma de Serviços e Website, autoriza expressamente a plataforma a coletar, usar, armazenar, tratar, ceder ou utilizar as informações derivadas do uso dos serviços, do site e quaisquer plataformas, incluindo todas as informações preenchidas pelo usuário no momento em que realizar ou atualizar seu cadastro, além de outras expressamente descritas na Política de Privacidade.  O usuário declara ainda que conhece e concorda integralmente com o conteúdo e as demais políticas da plataforma de serviços, inclusive com a Política de Privacidade, regida pelas leis brasileiras sobre o tratamento de dados.
      </Text>
    </S.TermsTopicArea>,
  },
  {
    title: "6. Da forma como os serviços são apresentados",
    content: 
    <S.TermsTopicArea>
      <Text style={{marginBottom: 28}}>
        A plataforma de serviços disponibiliza aos seus usuários funcionalidades e ferramentas que materializam a entrega dos serviços prestados. Tais funcionalidades e ferramentas são descritas e apresentadas ao público em geral, com maior grau de exatidão, de forma gratuita, no site www.unitok.com.
      </Text>
      <Text style={{marginBottom: 28}}>
        Neste site é possível encontrar a descrição dos serviços em texto, na forma de perguntas frequentes e em vídeos explicativos. São apresentadas a composição, os preços, a distinção entre funcionalidades e ferramentas, assim como as limitações e restrições.
      </Text>
      <Text>
        É obrigação dos usuários, antes de realizar a compra e/ou adesão à plataforma de serviços, se informar sobre as suas especificações e sobre a sua destinação. A caracterização de entrega dos serviços só ocorrerá após a finalização da compra.
      </Text>
    </S.TermsTopicArea>,
  },
  {
    title: "7. Das condições comerciais e preços",
    content: 
    <S.TermsTopicArea>
      <Text style={{marginBottom: 28}}>
        A plataforma de serviços se reserva o direito de definir e reajustar unilateralmente, a qualquer tempo, os preços cobrados, bem como os valores de cupons de descontos, eventuais comissões e/ou bonificações sem consulta ou anuência prévia do usuário. Os valores aplicados são aqueles que estão em vigor no momento do pedido.
      </Text>
      <Text style={{marginBottom: 28}}>
        Os preços são indicados em moeda Real e não incluem as taxas de entrega, as quais são especificadas à parte e são informadas ao usuário antes da finalização do pedido, a menos que esteja explicitamente descrito como “frete grátis”, quando aplicável.
      </Text>
      <Text style={{marginBottom: 28}}>
        Na contratação dos serviços, a plataforma poderá solicitar as informações financeiras do usuário, como CPF, endereço de cobrança e dados de cartões de créditos/débitos. Ao inserir referidos dados o usuário concorda que sejam cobrados, de acordo com a forma de pagamento que venha a ser escolhida, os preços então vigentes e informados quando da contratação. Referidos dados financeiros poderão ser armazenados para facilitar acessos e contratações futuras.
      </Text>
      <Text>
      Caso seja um serviço de cobrança recorrente, a contratação será renovada automaticamente pela plataforma, independentemente de comunicação ao usuário, mediante cobrança periódica da mesma forma de pagamento indicada pelo usuário quando do pedido.
      </Text>
    </S.TermsTopicArea>,
  },
  {
    title: "8. Da política de cancelamento",
    content: 
    <S.TermsTopicArea>
      <Text style={{marginBottom: 28}}>
        O usuário poderá cancelar a contratação dos serviços de acordo com os termos que forem definidos no momento de sua contratação. Ainda, o usuário também poderá cancelar os serviços em até 7 (sete) dias após a contratação, mediante contato com o suporte pelo <S.TermsPrimaryColorText>suporte@unitok.com</S.TermsPrimaryColorText>, de acordo com o Código de Defesa do Consumidor (Lei no. 8.078/90).<br/>
        O serviço poderá ser cancelado por:
      </Text>
      <Text style={{marginBottom: 28}}>
        a) parte do usuário: nessas condições os serviços somente cessarão quando concluído o ciclo vigente ao tempo do cancelamento;
      </Text>
      <Text>
        b) por parte do Unitok: violação dos Termos e Condições de Uso: os serviços serão cessados imediatamente.
      </Text>
    </S.TermsTopicArea>,
  },
  {
    title: "9. Da troca e devolução",
    content: 
    <S.TermsTopicArea>
      <Text style={{marginBottom: 28}}>
        Por se tratar de uma plataforma de serviços, não há a caracterização de troca de produto. Para acessar a plataforma, o usuário receberá em sua residência um cartão de PVC com chip NFC, um adesivo com chip NFC, algum outro dispositivo além do seu usuário e login/senha de acesso.
      </Text>
      <Text style={{marginBottom: 28}}>
        Para a troca do cartão de PVC, adesivo ou outro dispositivo:
      </Text>
      <Text style={{marginBottom: 28}}>
        A política de troca e devoluções da plataforma é regida conforme o Código de Defesa do Consumidor (Lei nº 8.078/90 e outra que venha substituí-la/atualizá-la). A troca e/ou devolução poderá ocorrer por:
      </Text>
      <Text style={{marginBottom: 28}}>
        a) direito de arrependimento;
      </Text>
      <Text style={{marginBottom: 28}}>
        b) vício de uso.
      </Text>
      <Text style={{marginBottom: 28}}>
        Em caso de arrependimento, o usuário poderá devolver em até 7 (sete) dias após o seu recebimento, mediante contato com o suporte pelo suporte@unitok.com, de acordo com o Código de Defesa do Consumidor (Lei nº 8.078/90).
      </Text>
      <Text style={{marginBottom: 28}}>
        Em caso de vício de uso, deverá ser verificado vícios de qualidade ou quantidade que tornem o dispositivo impróprio ou inadequado ao consumo a que se destinam ou que lhes diminuam o valor. Ainda, poderão ser trocados ou devolvidos os dispositivos que apresentam disparidade com as indicações constantes na plataforma no momento da compra ou na embalagem, respeitando as variações decorrentes de sua natureza.
      </Text>
      <Text>
        O usuário deverá entrar em contato com o suporte pelo <S.TermsPrimaryColorText>suporte@unitok.com</S.TermsPrimaryColorText> tão logo constate o vício. Se, no prazo máximo de 30 (trinta) dias corridos, não for possível resolver o vício ou, independentemente deste prazo, a substituição das partes viciadas puder comprometer a qualidade ou características do dispositivo ou serviço, diminuir-lhe o valor ou se tratar de um dispositivo essencial, o usuário poderá optar pela substituição do mesmo por outro da mesma espécie, pela devolução das quantias pagas ou pelo abatimento proporcional do preço.
      </Text>
    </S.TermsTopicArea>,
  },
  {
    title: "10. Do suporte",
    content: 
    <S.TermsTopicArea>
      <Text style={{marginBottom: 28}}>
        Em caso de qualquer dúvida, sugestão ou problema com a utilização da plataforma, o usuário poderá entrar em contato com o suporte exclusivamente através do <S.TermsPrimaryColorText>suporte@unitok.com</S.TermsPrimaryColorText>.
      </Text>
      <Text style={{marginBottom: 28}}>
      Este atendimento ao usuário estará disponível em dias úteis (exceto finais de semana e feriados nacionais), das 9h às 18h, no horário de Brasília/Brasil. O tempo mínimo requerido para as respostas é de 4 (quatro) horas, podendo ser estendido sem uma prévia determinação em função do problema ou necessidade a ser solucionada.
      </Text>
    </S.TermsTopicArea>,
  },
  {
    title: "11. Das responsabilidades",
    content: 
    <S.TermsTopicArea>
      <Text>
        É de responsabilidade do usuário:
      </Text>
      <Text style={{marginBottom: 28}}>
        a) defeitos ou vícios técnicos originados no próprio sistema do usuário;
      </Text>
      <Text style={{marginBottom: 28}}>
        b) a correta utilização da plataforma e dos serviços oferecidos, prezando pela boa convivência, pelo respeito e cordialidade entre os usuários;
      </Text>
      <Text style={{marginBottom: 28}}>
        c) pelo cumprimento e respeito ao conjunto de regras disposto neste Termo de Condições de Uso, na respectiva Política de Privacidade e na legislação nacional e internacional;
      </Text>
      <Text style={{marginBottom: 28}}>
        d) pela proteção/sigilo aos dados de acesso à sua conta/perfil (login e senha).
      </Text>
      <Text style={{marginBottom: 28}}>
        É de responsabilidade da Plataforma de Serviços Unitok:
      </Text>
      <Text style={{marginBottom: 28}}>
        a) indicar as características do serviço ou produto;
      </Text>
      <Text style={{marginBottom: 28}}>
        b) prover o serviço aos usuários pagantes por pelo menos 1 ano, podendo esse período se estender por conveniência ou mera liberalidade da plataforma, não sendo entendido como direito adquirido ao usuário;
      </Text>
      <Text style={{marginBottom: 28}}>
        c) os defeitos e vícios encontrados no serviço oferecido desde que lhe tenha dado causa;
      </Text>
      <Text style={{marginBottom: 28}}>
        d) as informações que foram por ela divulgadas, sendo que os comentários ou informações divulgadas por usuários são de inteira responsabilidade dos próprios usuários;
      </Text>
      <Text style={{marginBottom: 28}}>
        e) dos conteúdos ou atividades ilícitas praticadas através da sua plataforma, desde que não tenha tomado os procedimentos cabíveis de mitigação, coerção e ou correção.
      </Text>
      <Text style={{marginBottom: 28}}>
        A plataforma não se responsabiliza, endossa, verifica, garante ou possui qualquer ligação com os proprietários de links externos contidos em seu sistema que possam redirecionar o usuário ao ambiente externo a sua rede, não sendo responsável por seu conteúdo, precisão, políticas, práticas ou opiniões.
      </Text>
      <Text style={{marginBottom: 28}}>
        Não poderão ser incluídos links externos ou páginas com informações ilícitas, violentas, polêmicas, pornográficas, xenofóbicas, discriminatórias ou ofensivas.
      </Text>
      <Text>
        O Unitok não se responsabiliza por invasões de hackers ou sistemas piratas, bem como, por queda de sistemas de internet que venham a prejudicar a disponibilização da plataforma Unitok. 
      </Text>      
    </S.TermsTopicArea>,
  },
  {
    title: "12. Dos direitos autorais",
    content: 
    <S.TermsTopicArea>
      <Text style={{marginBottom: 28}}>
        O presente Termo e Condições de Uso concede aos usuários uma licença não exclusiva (direito de uso temporário a título oneroso), não transferível e não sublicenciável, para acessar e fazer uso da plataforma Unitok  e dos serviços por ela disponibilizados.
      </Text>
      <Text style={{marginBottom: 28}}>
        A estrutura do site ou aplicativo, as marcas, logotipos, nomes comerciais, layouts, gráficos e design de interface, imagens, ilustrações, fotografias, apresentações, vídeos, conteúdos escritos e de som e áudio, programas de computador, banco de dados, arquivos de transmissão e quaisquer outras informações, patente, desenho industrial, know how, direito autoral e direitos de propriedade intelectual da UNITOK SISTEMAS LTDA, observados os termos da Lei da Propriedade Industrial (Lei nº 9.279/96), Lei de Direitos Autorais (Lei nº 9.610/98) e Lei do Software (Lei nº 9.609/98), estão devidamente reservados.
      </Text>
      <Text style={{marginBottom: 28}}>
        Este Termo de Condições de Uso não cede ou transfere ao usuário qualquer direito, de modo que o acesso não gera qualquer direito de propriedade intelectual ao usuário, exceto pela licença limitada ora concedida.
      </Text>
      <Text>
        O uso da plataforma pelo usuário é pessoal, individual e intransferível, sendo vedado qualquer uso não autorizado, comercial ou não-comercial. Tais usos consistirão em violação dos direitos de propriedade intelectual da UNITOK SISTEMAS LTDA, passível de responsabilidade civil ou criminal ao violador.
      </Text>
    </S.TermsTopicArea>,
  },
  {
    title: "13. Das sanções",
    content: 
    <S.TermsTopicArea>
      <Text style={{marginBottom: 28}}>
        Sem prejuízo das demais medidas legais cabíveis, a UNITOK SISTEMAS LTDA poderá, a qualquer momento, advertir, suspender ou cancelar a conta do usuário: 
      </Text>
      <Text style={{marginBottom: 28}}>
        a) que violar qualquer dispositivo do presente Termo;
      </Text>
      <Text style={{marginBottom: 28}}>
        b) que descumprir os seus deveres de usuário;
      </Text>
      <Text>
        c) que tiver qualquer comportamento fraudulento, doloso ou que ofenda a terceiros.
      </Text>
    </S.TermsTopicArea>,
  },
  {
    title: "14. Da rescisão",
    content: 
    <S.TermsTopicArea>
      <Text style={{marginBottom: 28}}>
        A não observância das obrigações pactuadas neste Termo de Condições de Uso ou da legislação aplicável poderá, sem prévio aviso, ensejar a imediata rescisão unilateral por parte da UNITOK SISTEMAS LTDA e o bloqueio de todos os serviços prestados ao usuário.
      </Text>
      <Text>
        O usuário poderá requerer a rescisão da contratação com a Unitok, a qualquer tempo do seu interesse, devendo cumprir as regras deste Termo de Condições de Uso.
      </Text>
    </S.TermsTopicArea>,
  },
  {
    title: "15. Das alterações",
    content: 
    <S.TermsTopicArea>
      <Text style={{marginBottom: 28}}>
        Os itens descritos no presente instrumento poderão sofrer alterações, unilateralmente e a qualquer tempo, por parte da UNITOK SISTEMAS LTDA, para adequar ou modificar os serviços, bem como para atender novas exigências legais. As alterações serão veiculadas pelo site www.unitok.com e o usuário poderá optar por aceitar o novo conteúdo ou por cancelar o uso dos serviços, caso seja assinante.
      </Text>
      <Text>
        Os serviços oferecidos podem, a qualquer tempo e unilateralmente, e sem qualquer aviso prévio, ser deixados de fornecer, alterados em suas características, bem como restringido para o uso ou acesso, desde que seja informado na plataforma Unitok.
      </Text>
    </S.TermsTopicArea>,
  },
  {
    title: "16. Da política de privacidade",
    content: 
    <S.TermsTopicArea>
      Além do presente Termo, o usuário deverá consentir com as disposições contidas na respectiva Política de Privacidade a ser apresentada a todos os interessados dentro da interface da plataforma e no site www.unitok.com.
    </S.TermsTopicArea>,
  },
  {
    title: "17. Do foro",
    content: 
    <S.TermsTopicArea>
      Para a solução de controvérsias decorrentes do presente instrumento será aplicado integralmente o direito brasileiro, sendo eleito o Foro Central da  Comarca da Cidade de São Paulo, Fórum João Mendes, como o único eleito, afastando qualquer outro por mais privilegiado que seja.
    </S.TermsTopicArea>,
  },
];

export function UseTerms() {
  return  <AccordionList items={termsPrivacity} />
}