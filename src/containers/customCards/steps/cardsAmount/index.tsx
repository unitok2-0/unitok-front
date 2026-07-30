import Input from "components/Inputs/Input";
import { Heading } from "components/Typography";

import { Container } from "./styles";

interface CardsAmountProps {
  register: any;
  clearErrors: any;
  errors: any;
  getValues: any;
  setValue: any;
}

export function CardsAmount({
  clearErrors,
  errors,
  register,
  getValues,
  setValue,
}: CardsAmountProps) {
  return (
    <Container>
      <Heading font="titleSm">
        Quantos cartões Unitok precisa para sua empresa?
      </Heading>
      <Input
        autoFocus
        name="amount"
        type="number"
        id="amount"
        label="Informe a quantidade"
        errorMessage={errors?.amount?.message}
        onClick={() => clearErrors("amount")}
        {...register("amount")}
      />

      <div style={{ marginTop: "3rem" }}>
        <Input
          label="Razão social"
          name="corporate_name"
          id="corporate_name"
          errorMessage={errors?.corporate_name?.message}
          onClick={() => clearErrors("corporate_name")}
          {...register("corporate_name")}
        />

      </div>
      <div style={{ marginTop: "3rem" }}>
        <Input
          label="Nome do responsável para contato"
          name="name"
          id="name"
          errorMessage={errors?.name?.message}
          onClick={() => clearErrors("name")}
          {...register("name")}
        />
      </div>
      <div className="grid-inputs" style={{ marginTop: "3rem" }}>
        <Input
          label="Celular"
          type="tel"
          name="phone"
          id="phone"
          onPhoneChange={(phone) => setValue("phone", phone)}
          errorMessage={errors?.phone?.message}
          onClick={() => clearErrors("phone")}
          {...register("phone")}
        />
        <Input
          label="E-mail"
          name="email"
          id="email"
          errorMessage={errors?.email?.message}
          onClick={() => clearErrors("email")}
          {...register("email")}
        />

      </div>
    </Container>
  );
}
