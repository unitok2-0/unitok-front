import Input from "components/Inputs/Input";
import Select from "components/Select";
import DashboardContainer from "containers/dashboard";
import IconInterrogation from "/public/assets/icon_interrogation.svg";
import * as S from "styles/pageStyles/intern-management/qrcodes/styles";
import ButtonPrimary from "components/Buttons/ButtonPrimary";
import ModalInformation from "components/Modals/ModalOptionsDevice/ModalInformation";
import ChevronDown from '../../../public/assets/chevron-down-red.svg';
import Head from "next/head";
import TablePrimary from "components/Tables/TablePrimary";
import { QRCodeSVG } from 'qrcode.react';
import { useRef, useState } from "react";
import { ProductsAdmin } from "constants/products";
import Radio from "components/Radio";
import { FiSearch } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { generateQRcodes, getBatchs } from "services/internManagement";
import { withSSRAuth } from "utils/withSSRAuth";
import { toast } from "react-toastify";
import { Heading } from "components/Typography";



type ProductTypes = "CARD" | "TAG" | "STICKER" | "PETS";

type formData = {
  withPassword: boolean;
  quantity: number;
  productType: ProductTypes;
  title: string;
  withImage: boolean;
}

export interface IBatch {
  _id: string;
  with_password: boolean;
  password_batch?: number;
  product_type: ProductTypes;
  sheet_location: string;
  quantity: number;
  title: string;
  createdAt: Date;
}

interface QRCodesPagesProps {
  batchList: IBatch[];
}

const schema = yup.object({
  withPassword: yup.boolean().required().default(true),
  withImage: yup.boolean().default(false),
  productType: yup.string().required('Campo obrigatório').default('CARD'),
  title: yup.string().required('Campo obrigatório'),
  quantity: yup.number().positive().max(5000, "Limite máximo de 5000 QR Codes").required('Campo obrigatório').typeError("Insira um valor válido")
}).required();

export default function QRCodesPage({ batchList }: QRCodesPagesProps) {
  const [batchs, setBatchs] = useState<IBatch[]>(batchList)

  const [openModalInformation, setOpenModalInformation] = useState<boolean>(false);
  const [havePassword, setHavePassword] = useState(true);
  const [withImage, setWithImage] = useState(false);
  const [qrcodeValue, setQrcodeValue] = useState('https://unitok.com/unitok')
  const [searchText, setSearchText] = useState('');

  const searchInput = useRef(null);

  async function handleGetBatch(search: string) {
    const batchs = await getBatchs(undefined, search)
    setBatchs(batchs)
  }

  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema)
  });

  async function generateQrcodeSubmit(values: formData) {
    const response = await generateQRcodes(values);
    setBatchs([response.batch, ...batchs]);
    reset()
    toast.success("Qrcodes gerados com sucesso")
  }

  const imageSettings = {
    src: "/assets/Unitok_qrcode.svg",
    x: null,
    y: null,
    height: 55,
    width: 55,
    excavate: false,
  }


  return (
    <DashboardContainer title="QR Codes" >
      <Head>
        <title>QR Codes | Unitok</title>
      </Head>

      <S.ContentHStack >

        <form onSubmit={handleSubmit(generateQrcodeSubmit)}>
          <S.Title>Gerar QR Codes</S.Title>
          <S.CheckBoxContainer>
            <Radio
              checked={havePassword}
              name="withPassword"
              onChange={() => {
                setHavePassword(true)
                setValue('withPassword', true)
              }}
            >
              <p className='shipment-type'>Com senha: 788316</p>
            </Radio>
            <Radio
              name="withPassword"
              checked={!havePassword}
              onChange={() => {
                setHavePassword(false)
                setValue('withPassword', false)
              }}
            >
              <p className='shipment-type'>Sem senha</p>
            </Radio>
          </S.CheckBoxContainer>

          <S.ContainerInputs>
            <Input
              type="number"
              name="quantity"
              id="quantity"
              label="Quantidade"
              classNameContainer="inputQuantity"
              errorMessage={errors?.quantity?.message}
              {...register('quantity')}
              onClick={() => clearErrors('quantity')}
            />

            <Select
              selectId="productType"
              defaultSelectedOptionValue="CARD"
              options={ProductsAdmin}
              label="Selecione o produto"
              onSelect={(type) => {
                clearErrors('productType')
                setValue('productType', type.value)
              }}

              errorMessage={errors?.productType?.message}
            />

            <Input
              type="text"
              name="title"
              id="title"
              {...register('title')}
              onClick={() => clearErrors('title')}
              errorMessage={errors?.title?.message}
              classNameContainer="inputOrderTitle"
              label="Título do pedido"
              rightElement={
                <>
                  <IconInterrogation
                    style={{ cursor: 'pointer', position: 'relative' }}
                    onMouseEnter={() => setOpenModalInformation(true)}
                    onMouseLeave={() => setOpenModalInformation(false)}
                  />

                  <div>
                    <S.PositionModalAbsolute>
                      {openModalInformation &&
                        <ModalInformation
                          text="Informe um breve descritivo do pedido para facilitar na busca da planilha posteriormente."
                          styleContainerProp={{ height: '100%', fontSize: '0.8rem' }}
                        />
                      }
                    </S.PositionModalAbsolute>
                  </div>
                </>
              }
            />
          </S.ContainerInputs>
          <S.QrcodeWrapper>
            <QRCodeSVG
              value={qrcodeValue}
              size={200}
              level="M"
              fgColor="#2E3436"
              imageSettings={withImage ? imageSettings : undefined}
            />

            <div className="controls">
              <Heading>Personalização:</Heading>
              <Radio
                checked={withImage}
                name="withImage"
                onChange={() => {
                  setWithImage(true)
                  setValue('withImage', true)
                }}
              >
                <p className='shipment-type'>Com logo</p>
              </Radio>
              <Radio
                name="withImage"
                checked={!withImage}
                onChange={() => {
                  setWithImage(false)
                  setValue('withImage', false)
                }}
              >
                <p className='shipment-type'>Sem logo</p>
              </Radio>

              <Input
                label="Valor do qrcode (apenas para teste)"
                id="qrcodeValue"
                defaultValue={'https://unitok.com/unitok'}
                value={qrcodeValue}
                classNameContainer="qrcode-value"
                onChange={(e) => setQrcodeValue(e.target.value)}
              />
            </div>



          </S.QrcodeWrapper>
          <ButtonPrimary
            textButton="Gerar QR Codes"
            style={{ marginTop: '4rem' }}
            type="submit"
            loading={isSubmitting}
          />
        </form>
        <S.ActionsSheetContainer>

          <Input
            type="text"
            name="keyword"
            id="keyword"
            label="Pesquise por uma palavra-chave"
            classNameContainer="inputSearch"
            rightElement={<FiSearch size={16} />}
            ref={searchInput}
            value={searchText}
            onChange={async (e) => {
              setSearchText(e.target.value)
              await handleGetBatch(e.target.value)
            }}
          />


          {/* <S.FilterDataGroup openModal={openModalFilter} onClick={() => setOpenModalFilter(!openModalFilter)}>
            <div className="filterTitle">Filtrar data</div>
            <ChevronDown className="chevronIcon" />
          </S.FilterDataGroup> */}

          {/* <S.ModalFilter
            checkinsQuery={dataCheckins?.checkins}
            setCheckins={setExhibitorCheckins}
            openModal={openModalFilter}
            setOpenModal={setOpenModalFilter}
          /> */}

        </S.ActionsSheetContainer>

        <TablePrimary
          columns={[
            { title: 'Título do Pedido' },
            { title: 'Produto' },
            { title: 'Quantidade' },
            { title: 'Data' }
          ]}
          styleProp={{ marginTop: '0rem' }}
          data={batchs}
        />

      </S.ContentHStack>
    </DashboardContainer>
  )
}
export const getServerSideProps = withSSRAuth(async () => {


  const batchList = await getBatchs();

  return {
    props: {
      batchList
    },
  };
}, {
  roles: ['ADMIN']
});
