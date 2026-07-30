import {
  createContext,
  useCallback,
  useContext,
  useState,
  useMemo,
  useEffect,
} from "react";
import useDisclosure from "hooks/useDisclosure";
import { CardVariants } from "constants/cards";
import { DropzoneFile } from "components/Dropzone/DropzoneComponent";

export type Card = {
  _id: string;
  color: {
    values: string[];
    label: string;
  };
  customizationSide: string;
  modelCard: string;
  name: string;
  variant: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  image_front: string;
  price?: number;
};

export type SelectedCard = {
  _id: string;
  name: string;
  variant: CardVariants;
  quantity: number;
  customNames: string[];
  customNamesFile?: DropzoneFile | null;
  customArtOrLogoFile?: DropzoneFile | null;
  unitPrice: number;
  shouldAllCustomNamesBeTheSame: boolean;
};

export type CartContextValue = {
  cards: Card[];
  selectedCards: SelectedCard[];
  addCardToCart: (card: SelectedCard) => void;
  removeCardFromCart: (variant: CardVariants) => void;
  updateCard: (
    variant: CardVariants,
    setterCallback: (card: SelectedCard) => SelectedCard
  ) => void;
  getCardSubtotalPrice: (variant: CardVariants) => number;
  allCardsSubtotal: number;
  handleCardQuantityChange: (variant: CardVariants, quantity: number) => void;
  getPersonalizationAmount: (card: SelectedCard) => number;
  isCardInCart: (variant: CardVariants) => boolean;
  PRICE_PER_PERSONALIZATION: number;
  headerCartDropdown: ReturnType<typeof useDisclosure>;
  cleanUpSelectedCardsStorage(): void;
};

export type CartProviderProps = {
  cards?: Card[];
};

export const CartContext = createContext({} as CartContextValue);

const PRICE_PER_PERSONALIZATION = 1000;
const SELECTED_CARDS_LOCALSTORAGE_KEY = "unitok.selectedCards";

export const CartProvider: React.FC<CartProviderProps> = (props) => {
  const cards = useMemo<Card[]>(() => {
    if (props.cards) return props.cards;

    return [];
    // const { "unitok.cards": cards } = parseCookies();
    // return JSON.parse(cards);
  }, [props.cards]);

  const headerCartDropdown = useDisclosure();

  const [selectedCards, setSelectedCards] = useState<SelectedCard[]>([]);

  const addCardToCart = useCallback((card: SelectedCard) => {
    setSelectedCards((state) => [...state, card]);
  }, []);

  const removeCardFromCart = useCallback((variant: CardVariants) => {
    setSelectedCards((state) => {
      return state.filter((card) => card.variant !== variant);
    });
  }, []);

  const updateCard = useCallback(
    (
      variant: CardVariants,
      setterCallback: (card: SelectedCard) => SelectedCard
    ) => {
      setSelectedCards((state) => {
        const cardToUpdateIndex = state.findIndex(
          (card) => card.variant === variant
        );

        if (cardToUpdateIndex === -1) return state;

        const newState = [...state];
        newState.splice(
          cardToUpdateIndex,
          1,
          setterCallback(state[cardToUpdateIndex])
        );

        return newState;
      });
    },
    []
  );

  const handleCardQuantityChange = useCallback(
    (variant: CardVariants, quantity: number) => {
      updateCard(variant, (card) => {
        const newCustomNames = card.shouldAllCustomNamesBeTheSame
          ? card.customNames
          : quantity > card.quantity
          ? card.customNames.length
            ? [...card.customNames, ""]
            : new Array(quantity).fill("")
          : quantity === card.quantity
          ? card.customNames
          : card.customNames.slice(0, -1);

        return {
          ...card,
          customNames: newCustomNames,
          quantity,
        };
      });
    },
    [updateCard]
  );

  const getPersonalizationAmount = useCallback((card: SelectedCard) => {
    const isCustomNamesQuantityOver10 = card.quantity > 10;

    return isCustomNamesQuantityOver10
      ? card.customNamesFile
        ? card.quantity
        : 0
      : card.shouldAllCustomNamesBeTheSame
      ? card.customNames.filter(Boolean).length && card.quantity
      : card.customNames.filter(Boolean).length;
  }, []);

  const getCardSubtotalPrice = useCallback(
    (variant: CardVariants) => {
      const card = selectedCards.find((card) => card.variant === variant);
      if (!card) return;

      const personalizationAmount = getPersonalizationAmount(card);

      return (
        card.unitPrice * card.quantity +
        personalizationAmount * PRICE_PER_PERSONALIZATION
      );
    },
    [selectedCards, getPersonalizationAmount]
  );

  const allCardsSubtotal = useMemo(() => {
    return selectedCards.reduce((subtotal, card) => {
      return subtotal + getCardSubtotalPrice(card.variant);
    }, 0);
  }, [selectedCards, getCardSubtotalPrice]);

  const isCardInCart = useCallback(
    (variant: CardVariants) => {
      return selectedCards.some((card) => card.variant === variant);
    },
    [selectedCards]
  );

  function cleanUpSelectedCardsStorage() {
    window.localStorage.removeItem(SELECTED_CARDS_LOCALSTORAGE_KEY);

    setSelectedCards([]);
  }

  useEffect(() => {
    setSelectedCards(() => {
      if (window) {
        return (
          JSON.parse(
            window.localStorage.getItem(SELECTED_CARDS_LOCALSTORAGE_KEY)
          ) || []
        );
      }
      return [];
    });
  }, []);

  useEffect(() => {
    if (window) {
      window.localStorage.setItem(
        SELECTED_CARDS_LOCALSTORAGE_KEY,
        JSON.stringify(selectedCards)
      );
    }
  }, [selectedCards]);

  return (
    <CartContext.Provider
      value={{
        cleanUpSelectedCardsStorage,
        cards,
        selectedCards,
        isCardInCart,
        addCardToCart,
        removeCardFromCart,
        updateCard,
        getCardSubtotalPrice,
        allCardsSubtotal,
        handleCardQuantityChange,
        getPersonalizationAmount,
        PRICE_PER_PERSONALIZATION,
        headerCartDropdown,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
