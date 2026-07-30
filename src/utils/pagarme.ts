import pagarme from 'pagarme';

export async function generateCardHash (
  cardNumber: string,
  cardHolderName: string,
  cardExpirationDate: string,
  cardCvv: string
) {
  const client = await pagarme.client.connect({
    encryption_key: process.env.NEXT_PUBLIC_PAGARME_ENCRYPTION_KEY
  });

  const cardHash = await client.security.encrypt({
    card_number: cardNumber,
    card_holder_name: cardHolderName,
    card_expiration_date: cardExpirationDate,
    card_cvv: cardCvv
  });

  return cardHash;
}