import { FaTrash } from 'react-icons/fa';

import Card from '../../components/Card';
import { InputNumber } from '../Inputs/InputNumber';

import { CheckoutCard } from '../../contexts/AuthContext';

import { Container, CardItem, CardInfo, CardActions } from './styles'
import { formatPrice } from '../../utils/formatter';

interface CheckoutCardListProps {
  cards?: CheckoutCard[];
  onCardQuantityChange: (cardId: string, quantity: number) => void;
  onCardRemoved: (cardId: string) => void;
}

const CheckoutCardList: React.FC<CheckoutCardListProps> = ({
  cards, 
  onCardQuantityChange, 
  onCardRemoved 
}) => {
  return (
    <Container>
      {cards.map((card) => (
        <CardItem key={card.cardId}>
          <Card width='100px' height='65px' />
          <CardInfo>
            <strong>{card.title}</strong>
            <span>{formatPrice(card.unitPrice)}</span>
          </CardInfo>

          {/* <CardActions>
            <InputNumber 
              placeholder="0"
              type="text"
              value={card.quantity}
              setValue={() => {}}
              onChange={() => {}} // Inserido para parar erro - TODO: fix
              actionOnChangeValue={(quantity) => onCardQuantityChange(card.cardId, quantity)}
            />
            <FaTrash 
              onClick={() => onCardRemoved(card.cardId)}
            />
          </CardActions> */}
        </CardItem>
      ))}
    </Container>
  )
}

export default CheckoutCardList;