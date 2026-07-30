/* eslint-disable react/jsx-key */
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { BsClock, BsFillCheckCircleFill, BsXCircleFill } from 'react-icons/bs'
import { SaleResponse } from 'services/sale'
import { getSales } from 'services/internManagement'
import { toast } from 'react-toastify'

import ButtonPrimary from 'components/Buttons/ButtonPrimary'
import {
  GenericDropdown,
  GenericDropdownButton,
  GenericDropdownHeader,
} from 'components/GenericDropdown'
import Input from 'components/Inputs/Input'
import NewTable from 'components/NewTable'
import Modal from 'components/Modals/MainModal'
import CartItem from 'components/CartItem'
import { formatPrice } from 'utils/formatter'
import { CardVariants } from 'constants/cards'
import { Heading, Text } from 'components/Typography'

import DashbardContainer from 'containers/dashboard'
import useDisclosure from 'hooks/useDisclosure'
import { useEffect, useState } from 'react'
import { BiSearch } from 'react-icons/bi'
import * as S from 'styles/pageStyles/intern-management/styles'
import useDebounce from 'hooks/useDebounce'
import { withSSRAuth } from 'utils/withSSRAuth'
import GenericStatusLabel from 'components/GenericStatusLabel'

export type AddAccountPageProps = {
  sales: SaleResponse[]
}

const paymentStatusLabels = {
  paid: {
    label: 'Pago',
    icon: <BsFillCheckCircleFill />,
  },
  waiting_payment: {
    label: 'Pendente',
    icon: <BsClock />,
  },
  cancelled: {
    label: 'Cancelado',
    icon: <BsXCircleFill />,
  },
  refused: {
    label: 'Recusado',
    icon: <BsXCircleFill />,
  },
}

export default function AddAccountPage(props: AddAccountPageProps) {
  const filterDropdown = useDisclosure()
  const saleModal = useDisclosure(false)
  const [sales, setSales] = useState(props.sales)
  const [lastSales, setLastSales] = useState(props.sales)
  const [selectedSale, setSelectedSale] = useState<SaleResponse>(null)
  const [filter, setFilter] = useState<'all' | 'paid' | 'waiting_payment'>(
    'all'
  )
  const [skip, setSkip] = useState(0)
  const [search, setSearch] = useState('')
  const searchDebounced = useDebounce(search, 350)

  async function loadMode() {
    const updatedSkip = skip + 10

    try {
      const sales = await getSales(null, {
        skip: updatedSkip,
        search,
        filter: filter !== 'all' ? filter : undefined,
      })
      setSales((state) => [...state, ...sales])
      setLastSales(sales)

      setSkip(updatedSkip)
    } catch {
      toast.error('Erro ao obter mais pagamentos')
    }
  }

  useEffect(() => {
    ; (async () => {
      try {
        const sales = await getSales(null, {
          search: searchDebounced,
          filter: filter !== 'all' ? filter : undefined,
        })
        setSales(sales)
        setLastSales(sales)
        setSkip(0)
      } catch {
        toast.error('Erro ao filtrar pagamentos')
      }
    })()
  }, [searchDebounced, filter])

  return (
    <>
      <Head>
        <title>Gestão de pagamentos | Unitok</title>
      </Head>
      <Modal modalIsOpen={saleModal.isOpen} closeModal={saleModal.handleClose}>
        <S.PaymentsSaleModalWrapper>
          <div className="orange-custom-scrollbar">
            <Heading font="titleSm">Detalhes da compra</Heading>
            <S.CartItems style={{ minWidth: '35rem' }}>
              {selectedSale?.items?.map((card) => {
                if (!card) return
                return (
                  <CartItem
                    shouldBeStatic
                    key={card.card_info?.variant}
                    variant={card.card_info?.variant as CardVariants}
                    formattedUnitPrice=""
                    cardName={card.card_info?.name}
                    customNames={card.customNames}
                    customNamesFileUrl={card.customNamesFileUrl}
                    customArtOrLogoFileUrl={card.customArtOrLogoFileUrl}
                    shouldAllCustomNamesBeTheSame={
                      card.quantity === card.customNamesAmount
                    }
                    formattedItemTotalPrice={formatPrice(
                      card.quantity * card.card_info?.price +
                      (card.customNamesAmount || 0) * 1000
                    )}
                    defaultQuantity={card.quantity}
                  />
                )
              })}
            </S.CartItems>

            <S.SaleInfos>
              {selectedSale?.transaction.voucherId && (
                <S.SpaceBetween>
                  <Text font="bodyMd">Voucher</Text>
                  <Text>{selectedSale?.transaction.voucherId}</Text>
                </S.SpaceBetween>
              )}

              <S.SpaceBetween>
                <Text font="bodyMd">Total</Text>
                <Text font="bodyLg" fontWeight="500">
                  {formatPrice(selectedSale?.transaction?.amount)}
                </Text>
              </S.SpaceBetween>

              <S.SpaceBetween>
                <Text font="bodyMd">Endereço de entrega</Text>
                <Text style={{ textAlign: 'right' }}>
                  {selectedSale?.address_delivery.street},{' '}
                  {selectedSale?.address_delivery.number} <br />
                  {selectedSale?.address_delivery.complement && (
                    <>
                      Complemento: {selectedSale?.address_delivery.complement}{' '}
                      <br />
                    </>
                  )}
                  {selectedSale?.address_delivery.district} –{' '}
                  {selectedSale?.address_delivery.city}/
                  {selectedSale?.address_delivery.state} <br />
                  CEP {selectedSale?.address_delivery.CEP}
                </Text>
              </S.SpaceBetween>
              <S.SpaceBetween>
                <Text>
                  Data da compra:{' '}
                  <strong>
                    {new Date(selectedSale?.createdAt).toLocaleString()}
                  </strong>
                </Text>
              </S.SpaceBetween>
              <S.SpaceBetween>
                <Text>
                  Id da compra:{' '}
                  <strong>{selectedSale?.transaction.transaction_id}</strong>
                </Text>
              </S.SpaceBetween>
              <S.SpaceBetween>
                <Text>
                  Telefone: <strong>{selectedSale?.buyer.phone}</strong>
                </Text>
              </S.SpaceBetween>
            </S.SaleInfos>
          </div>
        </S.PaymentsSaleModalWrapper>
      </Modal>
      <DashbardContainer title="Gestão de pagamentos">
        <S.ContentHStack>
          <S.ResponsiveStack>
            <Input
              id="search"
              label="Pesquise por código, nome, CPF..."
              rightElement={<BiSearch />}
              style={{ minWidth: '20rem' }}
              onChange={(event) => {
                setSearch(event.target.value)
              }}
            />

            <div>
              <GenericDropdown
                shouldShowContent={filterDropdown.isOpen}
                onClickOutside={filterDropdown.handleClose}
                header={
                  <GenericDropdownHeader
                    onClick={filterDropdown.handleOpen}
                    onMouseEnter={filterDropdown.handleOpen}
                  >
                    Filtrar pagamentos
                  </GenericDropdownHeader>
                }
              >
                <GenericDropdownButton
                  selected={filter === 'all'}
                  onClick={() => setFilter('all')}
                >
                  todos
                </GenericDropdownButton>
                <GenericDropdownButton
                  selected={filter === 'paid'}
                  onClick={() => setFilter('paid')}
                >
                  pagos
                </GenericDropdownButton>
                <GenericDropdownButton
                  selected={filter === 'waiting_payment'}
                  onClick={() => setFilter('waiting_payment')}
                >
                  pendentes
                </GenericDropdownButton>
              </GenericDropdown>
            </div>
          </S.ResponsiveStack>

          <NewTable
            gridTemplateColumns="3fr 2fr 150px"
            tableHeads={['Usuário', 'Status do pagamento']}
            tableData={sales.map((sale) => [
              sale.buyer.name,
              <GenericStatusLabel
                icon={paymentStatusLabels[sale.transaction.status]?.icon}
              >
                {paymentStatusLabels[sale.transaction.status]?.label}
              </GenericStatusLabel>,
              <ButtonPrimary
                // as="a"
                // href={`/checkout/success/${sale._id}#details`}
                // target="_blank"
                // rel="noopener"
                onClick={() => {
                  setSelectedSale(sale)
                  saleModal.handleOpen()
                }}
                variant="tertiary"
              >
                Ver detalhes
              </ButtonPrimary>,
            ])}
          />
          {lastSales.length >= 10 && (
            <ButtonPrimary onClick={loadMode}>Ver mais</ButtonPrimary>
          )}
        </S.ContentHStack>
      </DashbardContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(
  async (ctx) => {
    try {
      const sales = await getSales(ctx)

      return {
        props: {
          sales,
        },
      }
    } catch {
      return { props: { sales: [] } }
    }
  },
  {
    roles: ['ADMIN'],
  }
)
