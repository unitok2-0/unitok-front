import { Heading, Text } from 'components/Typography'
import * as S from './styles'

export interface TableProps {
  firstHead: string;
  secondHead: string;
  tableInfos: {
      icon: string;
      status: string;
      response: string;
    }[];
  isQrCode?: boolean;
}

// const table = [
//   {icon: 'assets/pending.svg', status: 'Pendente', response: 'Joana Souza Pagotto'},
//   {icon: 'assets/paidOut.svg', status: 'Pago', response: 'João Lacerda'},
//   {icon: 'assets/paidOut.svg', status: 'Pago', response: 'Lívia Mendes'},
//   {icon: 'assets/pending.svg', status: 'Pendente', response: 'Luíza Souza Pereira'},
//   {icon: 'assets/pending.svg', status: 'Pendente', response: 'Patrícia Costa'},
// ]

export function Table({
  firstHead,
  secondHead,
  tableInfos,
  isQrCode
} : TableProps) {
  return (
    <S.Table>
      <S.Thead>
        <S.Tr>
          <S.Th>
            <Heading
              font='titleXs'
              color='secondary'
            >
              {firstHead}
            </Heading>
          </S.Th>

          <S.Th>
            <Heading
              font='titleXs'
              color='secondary'
            >
              {secondHead}
            </Heading>
          </S.Th>
        </S.Tr>
      </S.Thead>

      <S.Tbody>
        {tableInfos?.map((info, i) => {
          return (
            <S.Tr key={i}>
              <S.Td>
                <div>
                <img src={info.icon} />
                  <Text
                    font='bodyMd'
                    color='secondary'
                  >
                    {info.status}
                  </Text>
                </div>
              </S.Td>
              <S.Td>
                {isQrCode ?
                <Text
                  font='bodyMd'
                  color='secondary'
                  style={{
                    position: 'relative'
                  }}
                >
                  {info.response}
                  <span className='qrUnderscore'></span>
                </Text>
                :
                <Text
                  font='bodyMd'
                  color='secondary'
                >
                  {info.response}
                </Text>
              }
              </S.Td>
              <S.Td>
                <Text
                  font='bodyMd'
                  color='primary'
                  style={{
                    textAlign: 'end',
                    position: 'relative'
                  }}
                >
                  Ver perfil
                  <span className='underscore'></span>
                </Text>
              </S.Td>
            </S.Tr>
          )
        })}
      </S.Tbody>
    </S.Table>
  )
}