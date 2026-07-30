import { api } from "./api";

export async function getCards() {
  try {
    const { data: cards } = await api.get("/cards");

    /** TEMPORARY RETURN !!! */
    return cards.map((card) => ({
      ...card,
      price: card.price || 0,
    }));

    return cards;
  } catch (err) {
    console.error(err.message);
  }
}
