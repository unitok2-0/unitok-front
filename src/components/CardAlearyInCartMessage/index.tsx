import { useRouter } from "next/router";
import ButtonPrimary from "../Buttons/ButtonPrimary";
import { Heading } from "../Typography";

export default function CartAlreadyInCartMessage() {
  const router = useRouter();

  return (
    <div
      style={{
        display: "grid",
        gap: "1.5rem",
        paddingTop: "1.5rem",
      }}
    >
      <Heading as="h3" fontWeight="300" style={{ textAlign: "center" }}>
        Este cartão já está na sacola
      </Heading>
      <ButtonPrimary
        onClick={() => router.push("/checkout/cart")}
        variant="secondary"
        fullWidth
        type="button"
      >
        Ver sacola
      </ButtonPrimary>
    </div>
  );
}
