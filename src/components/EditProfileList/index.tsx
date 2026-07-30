import { FormEvent, useEffect, useState, useMemo, useRef } from "react";
import {
  DragDropContext,
  DragDropContextProps,
  Droppable,
  Draggable,
} from "react-beautiful-dnd";
import * as S from "./styles";
import { Heading, Text } from "components/Typography";
import ButtonPrimary from "components/Buttons/ButtonPrimary";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import useDisclosure from "hooks/useDisclosure";
import ModalPerfilEditor from "components/Modals/ModalPerfilEditor";
import Input from "components/Inputs/Input";
import { CgTrash } from "react-icons/cg";
import { ButtonsProps } from "domain/User";
import { useAuth } from "contexts/AuthContext";
import SpinnerLoader from "components/Loaders/SpinnerLoader";
import IconsPatterns, { IconPatterProps, iconsPatternContainerLeft, iconsPatternContainerRight, teamsIconsPatterns } from "utils/IconsPatterns";
import { toast } from "react-toastify";
import { createProduct, deleteBrand } from "services/brands";
import { getLocationForCep } from "services/cep";
import IconMores from '/public/assets/group_more.svg';
import ButtonLink from "components/Buttons/ButtonLink";
import { ButtonMenu } from "components/ButtonMenu";
import { AddIcon } from "components/AddIcon";

interface EditProfileDataProps {
  socialButtons: ButtonsProps[];
  setButtons: (value: ButtonsProps[]) => void;
  getValuesUser: () => any;
  colorUser: string;
  buttonsToShow?: string[]; 
}

export default function EditProfileList({
  socialButtons,
  setButtons,
  getValuesUser,
  colorUser,
  buttonsToShow
}: EditProfileDataProps) {
  const { updateUser, user } = useAuth();

  const editPerfil = useDisclosure();
  const editButton = useDisclosure();
  
  const [modalInfos, setModalInfos] = useState<ButtonsProps>();
  const [modalAdderInfos, setModalAdderInfos] = useState<IconPatterProps>();
  const [modalInfoSource, setModalInfoSource] = useState<number>();
  const [modalAddButton, setModalAddButton] = useState<boolean>(false);
  const [editedUrl, setEditedUrl] = useState("");
  const [secondItemAdd, setSecondItemAdd] = useState<string>();
  const [loading, setLoading] = useState(false);
  const [loadingButton, setLoadingButton] = useState(false);
  const [loadingButtonSecondary, setLoadingButtonSecondary] = useState(false);

  const [brand, setBrand] = useState("");
  const [product, setProduct] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const [cep, setCep] = useState("");
  const [street, setStreet] = useState("");
  const [addressNumber, setAddressNumber] = useState("");
  const [complement, setComplement] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");

  const [websiteName, setWebsiteName] = useState("");
  const [title, setTitle] = useState("");
  const [choiceMenu, setChoiceMenu] = useState<string>('');

  const isTeamUser = !!user?.administrator;

  let iconsPatternContainer = isTeamUser 
    ? teamsIconsPatterns 
    : [ ...iconsPatternContainerLeft, ...iconsPatternContainerRight]

  if(buttonsToShow)
    iconsPatternContainer = iconsPatternContainer.filter(btnPattern => buttonsToShow.includes(btnPattern.value))

  function handleDragEnd(result: DragDropContextProps) {
    if (!result.destination) return;
    const items = Array.from(socialButtons);
    const [reorderedItem] = items.splice(result.source.index, 1);

    items.splice(result.destination.index, 0, reorderedItem);

    setButtons(items);
  }

  function handleOpenEditModal(source: number) {
    const infosModal = socialButtons[source];
    if (infosModal.name === "PRODUCT") {
      setBrand(infosModal.brand_name);
      setProduct(infosModal.product_name);
      setVideoUrl(infosModal.video_url);
    }

    if (infosModal.name === "WEBSITE") {
      setWebsiteName(infosModal.website_name)
    }

    if ((infosModal.name === "VIMEO" || infosModal.name === "YOUTUBE")) {
      setTitle(infosModal.title)
    }

    if (infosModal.name === "LOCALIZATION") {
      setCep(infosModal.postalCode);
      setStreet(infosModal.street);
      setAddressNumber(infosModal.number);
      setComplement(infosModal.complement);
      setDistrict(infosModal.district);
      setCity(infosModal.city);
      setState(infosModal.state);
    }

    setModalInfos(infosModal);
    setWebsiteName(infosModal.website_name);
    setTitle(infosModal?.title);
    setSecondItemAdd(infosModal.url);
    setModalInfoSource(source);
    setEditedUrl(socialButtons[source].url);
    editPerfil.handleOpen();
  }

  function handleGetPattern(name: string, className: string) {
    if (!name) 
      return {};
    
    const iconReturn = IconsPatterns.find((ic) => ic.value === name?.toUpperCase());

    if(!iconReturn)
      return {}

    if (iconReturn?.value === 'WEBSITE') {
      iconReturn.name = 'Link'
    }

    return {
      Icon: <iconReturn.icon className={className} />,
      Name: iconReturn?.name,
      labelInput: iconReturn?.labelInput,
      typeInput: iconReturn?.typeInput,
    };
  }

  async function handleDeleteItem(source: number) {
    const items = [...socialButtons];
    const item = items[source];
    items.splice(source, 1);

    if (item.brand_name) {
      try {
        await deleteBrand({
          brand_name: formatBrandValues(item.brand_name),
          user_id: user._id,
          product_name: formatBrandValues(item.product_name),
        });
      } catch (err) {
        toast.error(err, {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }

    const updatedButtons = items.map(({_id, ...data}) => ({ ...data }));

    try {
      await updateUser({
        buttons: updatedButtons,
      });
      setButtons(items);
    } catch (err) {
      toast.error(err, {
        position: "top-right",
        autoClose: 3000,
      });
    }

    editPerfil.handleClose();
  }

  function handleOpenAddButtons() {
    setModalInfos(null);
    setModalInfoSource(null);
    setModalAddButton(false);
    editPerfil.handleOpen();
  }

  function handleOpenAdderButton(source: number, side: string) {
    const clearStates = () => {
      setWebsiteName('');
      setSecondItemAdd('');
    }

    if (side === 'left') {
      clearStates();
      setModalAdderInfos(iconsPatternContainerLeft.find(button => button.index === source))
    } else {
      clearStates();
      setModalAdderInfos(iconsPatternContainerRight.find(button => button.index === source))
    }
    setModalAddButton(true);
  }

  function handleOpenAddButton(buttonInfo: IconPatterProps) {
    const clearStates = () => {
      setWebsiteName('');
      setSecondItemAdd('');
    }

    clearStates();
    setModalAdderInfos(buttonInfo);
    setModalAddButton(true);
  }

  function checkEmptyAdderInputs() {
    // if (firstItemAdd === undefined || secondItemAdd === undefined) return true
    // if (firstItemAdd === '' || secondItemAdd === '') return true

    if (secondItemAdd === undefined) if (secondItemAdd === "") return true;
    return false;
  }

  function checkEmptyAdderInputsPhone() {
    if (secondItemAdd.length < 12) return true;
    return false;
  }

  function formatBrandValues(value: string) {
    const newValue = value.toLowerCase().replace(/ /g, "-");
    return newValue;
  }
  function getFormatedAddress() {
    const formatedStreet = street.replace(/ /g, "+");
    const formatedDistrict = district.replace(/ /g, "+");
    const formatedCity = city.replace(/ /g, "+");
    return `https://maps.google.com?q=${formatedStreet}+${addressNumber}+${formatedDistrict}+${formatedCity}+${state}`;
  }

  interface IHandleAddButton {
    e: FormEvent
    addAnotherPhone?: boolean;
  }

  async function handleAddButton({ e, addAnotherPhone }: IHandleAddButton) {
    e.preventDefault();

    if (addAnotherPhone) {
      setLoadingButtonSecondary(true);
    } else {
      setLoadingButton(true);
    }


    let formatedUrl = secondItemAdd;

    if (modalAdderInfos.value === "PRODUCT") {
      formatedUrl = `/ads/${formatBrandValues(brand)}/${formatBrandValues(
        product
      )}`;
      try {
        await createProduct({
          brand_name: formatBrandValues(brand),
          product_name: formatBrandValues(product),
          video_url: videoUrl,
          id: user._id,
        });
      } catch (err) {
        toast.error(err, {
          position: "top-right",
          autoClose: 3000,
        });
        return;
      }
    }

    if (modalAdderInfos.value === "LOCALIZATION") {
      formatedUrl = getFormatedAddress();
    }
    const items = Array.from(socialButtons);
    items.push({
      _id: `${Math.random() + "idNecessárioParaODND"}`,
      name: modalAdderInfos.value,
      url: formatedUrl,
      realUrl: formatedUrl,
      hide: false,
      brand_name: brand,
      website_name: websiteName,
      product_name: product,
      title: title,
      video_url: videoUrl,
      postalCode: cep,
      city: city,
      district: district,
      complement: complement,
      street: street,
      state: state,
      number: addressNumber,
    });

    const updatedButtons = items.map((data) => ({
      name: data.name,
      url: data.url,
      hide: data.hide,
      brand_name: data?.brand_name,
      title: data?.title,
      product_name: data?.product_name,
      video_url: data?.video_url,
      postalCode: data.postalCode,
      city: data.city,
      district: data.district,
      street: data.street,
      complement: data.complement,
      number: data.number,
      state: data.state,
    }));

    try {
      const values = getValuesUser();
      await updateUser({
        ...values,
        profileColor: colorUser,
        buttons: updatedButtons,
      });
    } catch (err) {
      toast.error(err, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoadingButton(false);
      setLoadingButtonSecondary(false);
      setSecondItemAdd('')
      setTitle('')
    }

    setButtons(items);
    setSecondItemAdd('');

    if (addAnotherPhone) {
      return
    } else {
      editPerfil.handleClose();
    }
  }

  async function handleEditSubmit(source: number) {
    setLoadingButton(true);
    const items = [...socialButtons];
    const item = items[source];
    items[source].url = editedUrl;
    if (item.name === "LOCALIZATION") {
      items[source].postalCode = cep;
      items[source].state = state;
      items[source].street = street;
      items[source].complement = complement;
      items[source].district = district;
      items[source].city = city;
      items[source].number = addressNumber;
      items[source].url = getFormatedAddress();
    }
    if (item.name === "WEBSITE") {
      items[source].website_name = websiteName;
    }
    if ((item.name === "VIMEO" || item.name === "YOUTUBE")) {
      items[source].title = title;
    }

    const updatedButtons = items.map((data) => ({
      name: data.name,
      url: data.url,
      hide: data.hide,
      website_name: data?.website_name,
      title: data?.title,
      brand_name: data?.brand_name,
      product_name: data?.product_name,
      video_url: data?.video_url,
      postalCode: data?.postalCode,
      city: data?.city,
      district: data?.district,
      street: data?.street,
      number: data?.number,
      complement: data?.complement,
      state: data?.state,
    }));

    try {
      const values = getValuesUser();
      await updateUser({
        ...values,
        profileColor: colorUser,
        buttons: updatedButtons,
      });
      setButtons(items);
    } catch (err) {
      toast.error(err, {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoadingButton(false);
      setTitle('')
    }

    editPerfil.handleClose();
  }

  const buttonSelectEdit = useMemo(() => {
    return handleGetPattern(modalInfos?.name, "modalEditIcon");
  }, [modalInfos?.name]);

  async function onGetLocationCep(cep: string) {
    try {
      const { city, district, state, street } = await getLocationForCep({
        cep,
      });
      // setFocus('number')
      setCity(city);
      setState(state);
      setStreet(street);
      setDistrict(district);

      const elementNumber = document.getElementById("numberLocation");
      elementNumber?.focus();
    } catch {
      toast.warning("Cep não foi encontrado", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }

  return <>
    {!loading ? (
      <>
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="socials">
            {(provided) => (
              <S.Ul
                className="socials"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {socialButtons?.map((data, i) => {
                  const LiIcon = handleGetPattern(data.name, "icon");

                  return (
                    <>
                      <Draggable
                        key={data._id}
                        draggableId={data._id}
                        index={i}
                      >

                        {(provided) => (
                          <S.Li
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            hidden={!data.hide}
                          >
                            <S.LiLeftContainer hidden={!data.hide}>
                              <div style={{
                                display: 'grid',
                                placeItems: 'center'
                              }}>
                                <IconMores />
                                {/* <IoIosArrowUp
                                onClick={() =>
                                  i === 0 ? handleChangeArrayOrder(i, i) : handleChangeArrayOrder(i, i - 1)
                                }
                                style={{
                                  bottom: 0,
                                }}
                                size={20}
                              />
                              <IoIosArrowDown
                                onClick={() =>
                                  socialButtons.length - 1 === i ? handleChangeArrayOrder(i, i) : handleChangeArrayOrder(i, i + 1)
                                }
                                style={{
                                  top: 0,
                                }}
                                size={20}
                              /> */}
                              </div>

                              {/* {iconReturn && (
                          <iconReturn.icon className='icon' />
                        )} */}

                              <S.Icon>{LiIcon.Icon}</S.Icon>

                              <Text
                                font="bodyMd"
                                color="secondary"
                                style={{
                                  textTransform: "capitalize",
                                }}
                              >
                                {LiIcon.Name}
                              </Text>
                            </S.LiLeftContainer>

                            <S.LiRightContainer hidden={!data.hide}>

                              <HiOutlinePencilAlt
                                className="perfilEditEditorIcon"
                                onClick={() => handleOpenEditModal(i)}
                              // onClick={editPerfil.handleOpen}
                              />
                              <S.ButtonOpenModal disabled={data.hide}>
                                <img
                                  src="/assets/iconOpenStand.svg"
                                  alt=""
                                  style={{
                                    cursor: 'pointer',
                                  }}
                                  onClick={() => setChoiceMenu(data.name)}
                                />
                              </S.ButtonOpenModal>
                              {data.name === choiceMenu && (
                                <ButtonMenu
                                  onBackdropClicked={() => setChoiceMenu('')}
                                  socialButtons={socialButtons}
                                  onButtonsUpdated={setButtons}
                                  index={i}
                                />
                              )}

                            </S.LiRightContainer>
                          </S.Li>
                        )}
                      </Draggable>
                    </>
                  );
                })}

                {provided.placeholder}
              </S.Ul>

            )}
          </Droppable>
        </DragDropContext>

        <S.AddMoreButtons onClick={handleOpenAddButtons}>
          <AddIcon />
          Adicionar mais botões
        </S.AddMoreButtons>
      </>
    ) : (
      <SpinnerLoader colorSpinner="black" />
    )}

    <ModalPerfilEditor
      closeModal={editPerfil.handleClose}
      modalIsOpen={editPerfil.isOpen}
    // isDesktop={isDesktop || !modalAddButton}
    >
      {modalInfos ? (
        <>
          {buttonSelectEdit?.Icon}

          <Heading as="h1" font="titleXs">
            {
              modalInfos?.name === "PRODUCT" && "VITRINE"
            }
            {
              modalInfos?.name === "LOCALIZATION" && "LOCALIZAÇÃO"
            }
            {
              modalInfos?.name === "WEBSITE" && "URL"
            }
            {
              modalInfos?.name !== "PRODUCT" &&
              modalInfos?.name !== "LOCALIZATION" &&
              modalInfos?.name !== "WEBSITE" &&
              modalInfos?.name
            }
          </Heading>

          <S.Form style={{ paddingTop: "2rem", width: "100%" }}>

            {modalInfos?.name === "PRODUCT" && (
              <>
                <Input
                  autoFocus
                  id="brand"
                  name="brand"
                  type={modalAdderInfos?.typeInput}
                  label="Nome da marca"
                  onChange={(e) => {
                    setBrand(e.target.value);
                  }}
                  value={brand}
                />
                <Input
                  id="product"
                  name="product"
                  type={modalAdderInfos?.typeInput}
                  label="nome do produto"
                  onChange={(e) => {
                    setProduct(e.target.value);
                  }}
                  value={product}
                />
                <Input
                  id="video_url"
                  name="video_url"
                  type={modalAdderInfos?.typeInput}
                  label="URL do YouTube"
                  onChange={(e) => {
                    setVideoUrl(e.target.value);
                  }}
                  value={videoUrl}
                />
              </>
            )}
            {modalInfos?.name === "LOCALIZATION" && (
              <>
                <Input
                  id="cep"
                  label="Digite o CEP"
                  name="cep"
                  autoFocus
                  value={cep}
                  onChange={(e) => {
                    const cep = e.target.value?.replace(/\D/g, "");
                    setCep(cep);
                    if (cep.length === 8) {
                      try {
                        onGetLocationCep(cep);
                      } catch (error) {
                        console.log("Error when getting geolocation");
                      }
                    }
                  }}
                />
                <Input
                  id="address"
                  name="address"
                  type={modalAdderInfos?.typeInput}
                  label="Digite o endereço"
                  onChange={(e) => {
                    setStreet(e.target.value);
                  }}
                  value={street}
                />
                <S.FlexInput middle>
                  <Input
                    id="numberLocation"
                    name="number"
                    type={modalAdderInfos?.typeInput}
                    label="Número"
                    onChange={(e) => {
                      setAddressNumber(e.target.value);
                    }}
                    value={addressNumber}
                  />
                  <Input
                    id="complement"
                    name="complement"
                    type={modalAdderInfos?.typeInput}
                    label="Complemento"
                    onChange={(e) => {
                      setComplement(e.target.value);
                    }}
                    value={complement}
                  />
                </S.FlexInput>
                <Input
                  id="district"
                  name="district"
                  type={modalAdderInfos?.typeInput}
                  label="Bairro"
                  onChange={(e) => {
                    setDistrict(e.target.value);
                  }}
                  value={district}
                />
                <S.FlexInput>
                  <Input
                    id="city"
                    name="city"
                    type={modalAdderInfos?.typeInput}
                    label="Cidade"
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                    value={city}
                  />

                  <Input
                    id="state"
                    label="Estado"
                    name="state"
                    value={state}
                  />
                </S.FlexInput>
              </>
            )}

            {modalInfos?.name === "WEBSITE" &&
              <>
                <Input
                  id="website-name"
                  name="website-name"
                  type={modalAdderInfos?.typeInput}
                  label="Nome do URL"
                  value={websiteName}
                  onChange={(e) => setWebsiteName(e.target.value)}
                />

                <Input
                  id="modalEditir2"
                  type={modalAdderInfos?.typeInput}
                  label={modalAdderInfos?.labelInput}
                  value={secondItemAdd}
                  autoFocus
                  {...(modalAdderInfos?.typeInput === "tel"
                    ? {
                      onPhoneChange: (phone) => {
                        setSecondItemAdd(phone);
                      },
                    }
                    : {
                      onChange: (e) => setSecondItemAdd(e.target.value),
                    })}
                />
              </>
            }
            {(modalInfos?.name === "VIMEO" || modalInfos?.name === "YOUTUBE") &&
              <>
                <Input
                  id="video-title"
                  name="video-title"
                  type={modalAdderInfos?.typeInput}
                  label="Nome do vídeo"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <Input
                  id="modalEditir2"
                  type={buttonSelectEdit?.typeInput}
                  label={buttonSelectEdit?.labelInput}
                  value={editedUrl}
                  autoFocus
                  {...(buttonSelectEdit?.typeInput === "tel"
                    ? {
                      onPhoneChange: (phone) => {
                        setEditedUrl(phone);
                      },
                    }
                    : {
                      onChange: (e) => setEditedUrl(e.target.value),
                    })}
                />
              </>
            }

            {modalInfos?.name !== "PRODUCT" &&
              modalInfos?.name !== "LOCALIZATION" &&
              modalInfos?.name !== "WEBSITE" &&
              modalInfos?.name !== "VIMEO" &&
              modalInfos?.name !== "YOUTUBE" &&
              (
                <Input
                  id="modalEditir2"
                  type={buttonSelectEdit?.typeInput}
                  label={buttonSelectEdit?.labelInput}
                  value={editedUrl}
                  autoFocus
                  {...(buttonSelectEdit?.typeInput === "tel"
                    ? {
                      onPhoneChange: (phone) => {
                        setEditedUrl(phone);
                      },
                    }
                    : {
                      onChange: (e) => setEditedUrl(e.target.value),
                    })}
                />
              )}

            {modalInfos.name != "PRODUCT" && (
              <ButtonPrimary
                // type="submit"
                fullWidth
                className="modalProfileEditSubmitButton"
                loading={loadingButton}
                onClick={() => handleEditSubmit(modalInfoSource)}
              >
                Salvar
              </ButtonPrimary>
            )}
          </S.Form>

          <ButtonPrimary
            variant="tertiary"
            className="modalProfileDeleteButton"
            onClick={() => handleDeleteItem(modalInfoSource)}
          >
            Excluir botão
            <CgTrash />
          </ButtonPrimary>
        </>
      ) : modalAddButton ? (
        <S.AddButtonContainer>
          <AiOutlineArrowLeft
            className="modalReturnIcon"
            onClick={() => {
              setModalAddButton(false)
            }}
          />

          <modalAdderInfos.icon className="modalEditIcon" />

          <Heading as="h1" font="titleXs" className="AdderButtonIcon">
            {modalAdderInfos.name}
          </Heading>

          <S.Form>
            {modalAdderInfos?.value === "PRODUCT" && (
              <>
                <Input
                  autoFocus
                  id="brand"
                  name="brand"
                  type={modalAdderInfos?.typeInput}
                  label="Nome da marca"
                  onChange={(e) => {
                    setBrand(e.target.value);
                  }}
                  value={brand}
                />
                <Input
                  id="product"
                  name="product"
                  type={modalAdderInfos?.typeInput}
                  label="nome do produto"
                  onChange={(e) => {
                    setProduct(e.target.value);
                  }}
                  value={product}
                />
                <Input
                  id="video_url"
                  name="video_url"
                  type={modalAdderInfos?.typeInput}
                  label="URL do YouTube"
                  onChange={(e) => {
                    setVideoUrl(e.target.value);
                  }}
                  value={videoUrl}
                />
              </>
            )}
            {modalAdderInfos?.value === "LOCALIZATION" && (
              <>
                <Input
                  id="cep"
                  type={modalAdderInfos?.typeInput}
                  label="Digite o CEP"
                  name="cep"
                  autoFocus
                  // mask="99999-999"
                  value={cep}
                  onChange={(e) => {
                    const cep = e.target.value.replace(/\D/g, "");
                    setCep(cep);
                    if (cep.length === 8) {
                      try {
                        onGetLocationCep(cep);
                      } catch (error) {
                        console.log("Error when getting geolocation");
                      }
                    }
                  }}
                />
                <Input
                  id="address"
                  name="address"
                  type={modalAdderInfos?.typeInput}
                  label="Digite o endereço"
                  onChange={(e) => {
                    setStreet(e.target.value);
                  }}
                  value={street}
                />
                <S.FlexInput middle>
                  <Input
                    id="numberLocation"
                    name="number"
                    type={modalAdderInfos?.typeInput}
                    label="Número"
                    onChange={(e) => {
                      setAddressNumber(e.target.value);
                    }}
                    value={addressNumber}
                  />
                  <Input
                    id="complement"
                    name="complement"
                    type={modalAdderInfos?.typeInput}
                    label="Complemento"
                    onChange={(e) => {
                      setComplement(e.target.value);
                    }}
                    value={complement}
                  />
                </S.FlexInput>
                <Input
                  id="district"
                  name="district"
                  type={modalAdderInfos?.typeInput}
                  label="Bairro"
                  onChange={(e) => {
                    setDistrict(e.target.value);
                  }}
                  value={district}
                />
                <S.FlexInput>
                  <Input
                    id="city"
                    name="city"
                    type={modalAdderInfos?.typeInput}
                    label="Cidade"
                    // onChange={(e) => {
                    //   setCity(e.target.value);
                    // }}
                    value={city}
                  />
                  {/* <Select
                    options={States}
                    onSelect={(e) => {
                      setState(e.value);
                    }}
                    label="Estado"
                    selectId="state"
                    // defaultSelectedOptionValue={state}
                  /> */}
                  <Input
                    id="state"
                    label="Estado"
                    name="state"
                    value={state}
                  />
                </S.FlexInput>
              </>
            )}

            {modalAdderInfos?.value === "WEBSITE" &&
              <>
                <Input
                  id="website-name"
                  name="website-name"
                  type={modalAdderInfos?.typeInput}
                  label="Nome da URL"
                  value={websiteName}
                  onChange={(e) => setWebsiteName(e.target.value)}
                />

                <Input
                  id="modalEditir2"
                  type={modalAdderInfos?.typeInput}
                  label={modalAdderInfos?.labelInput}
                  value={secondItemAdd}
                  autoFocus
                  {...(modalAdderInfos?.typeInput === "tel"
                    ? {
                      onPhoneChange: (phone) => {
                        setSecondItemAdd(phone);
                      },
                    }
                    : {
                      onChange: (e) => setSecondItemAdd(e.target.value),
                    })}
                />
              </>
            }
            {(modalAdderInfos?.value === "YOUTUBE" || modalAdderInfos?.value === "VIMEO") && (
              <>
                <Input
                  id="video-title"
                  name="video-title"
                  type={modalAdderInfos?.typeInput}
                  label="Nome do vídeo"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <Input
                  id="modalEditir2"
                  type={modalAdderInfos?.typeInput}
                  label={modalAdderInfos?.labelInput}
                  value={secondItemAdd}
                  autoFocus
                  {...(modalAdderInfos?.typeInput === "tel"
                    ? {
                      onPhoneChange: (phone) => {
                        setSecondItemAdd(phone);
                      },
                    }
                    : {
                      onChange: (e) => setSecondItemAdd(e.target.value),
                    })}
                />
              </>
            )
            }

            {modalAdderInfos?.value !== "PRODUCT" &&
              modalAdderInfos?.value !== "LOCALIZATION" &&
              modalAdderInfos?.value !== "WEBSITE" &&
              modalAdderInfos?.value !== "YOUTUBE" &&
              modalAdderInfos?.value !== "VIMEO" &&
              (
                <Input
                  id="modalEditir2"
                  type={modalAdderInfos?.typeInput}
                  label={modalAdderInfos?.labelInput}
                  value={secondItemAdd}
                  autoFocus
                  {...(modalAdderInfos?.typeInput === "tel"
                    ? {
                      onPhoneChange: (phone) => {
                        setSecondItemAdd(phone);
                      },
                    }
                    : {
                      onChange: (e) => setSecondItemAdd(e.target.value),
                    })}
                />
              )}

            {modalAdderInfos?.value === "TELEFONE" ? (
              <div style={{
                display: 'grid',
                gridGap: '10px',
                height: '40px',
                marginTop: '0px',
              }}
              >
                <ButtonPrimary
                  type="submit"
                  disabled={checkEmptyAdderInputsPhone()}
                  fullWidth
                  className="modalProfileEditSubmitButton"
                  onClick={(e: FormEvent) => handleAddButton({ e })}
                  loading={loadingButton}
                  textButton="Salvar"
                />
                <ButtonPrimary
                  type="button"
                  disabled={checkEmptyAdderInputsPhone()}
                  fullWidth
                  className="modalProfileEditButton"
                  variant="secondary"
                  onClick={(e: FormEvent) => handleAddButton({ e, addAnotherPhone: true })}
                  loading={loadingButtonSecondary}
                  textButton="Adicionar outro telefone"
                />
              </div>
            ) : (
              <ButtonPrimary
                type="submit"
                disabled={checkEmptyAdderInputs()}
                fullWidth
                className="modalProfileEditSubmitButton"
                onClick={(e: FormEvent) => handleAddButton({ e })}
                loading={loadingButton}
                textButton="Salvar"
              />
            )
            }

          </S.Form>
        </S.AddButtonContainer>
      ) : (
        <S.ButtonAdderContainer>
          <section>
            <Heading as="h1" font="titleXs" color="primary">
              Novo botão
            </Heading>

            <Text font="bodyMd" color="secondary">
              Escolha um dos modelos abaixo para adicionar ao seu perfil:
            </Text>
          </section>

          {/* {handleGetIcon(info)} */}

          <S.AddButtonsContainer>
            <S.AddButtonsContainerGrid>
              {iconsPatternContainer.map(info => (
                <S.ButtonSelector
                  key={info.name}
                  onClick={() => handleOpenAddButton(info)}
                >
                  <info.icon />
                  {info.name}
                </S.ButtonSelector>
              ))}
            </S.AddButtonsContainerGrid>
            {/* <S.AddButtonsContainerLeft>
              {iconsPatternContainerLeft?.map((info) => (
                <S.ButtonSelector
                  key={info.name}
                  onClick={() => {
                    handleOpenAdderButton(info.index, 'left');
                  }}
                >
                  <info.icon />
                  {info.name}
                </S.ButtonSelector>
              ))}
            </S.AddButtonsContainerLeft>
            <S.AddButtonsContainerRight>
              {iconsPatternContainerRight?.map((info) => (
                <S.ButtonSelector
                  key={info.name}
                  onClick={() => {
                    handleOpenAdderButton(info.index, 'right');
                  }}
                >
                  <info.icon />
                  {info.name}
                </S.ButtonSelector>
              ))}
            </S.AddButtonsContainerRight> */}
          </S.AddButtonsContainer>
        </S.ButtonAdderContainer>
      )}
    </ModalPerfilEditor>
  </>;
}
