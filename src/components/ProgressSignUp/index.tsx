import React from "react";
import { Fragment } from "react";

import { Container, CircleStage, Stage, Bar } from "./styles";

export interface ProgressSignUpProps {
  choice: "CART" | "DATA" | "ADDRESS" | "PAYMENT";
}

const progress = [
  { label: "Carrinho", numberStage: 1, route: "CART" },
  { label: "Dados", numberStage: 2, route: "DATA" },
  { label: "Endereço", numberStage: 3, route: "ADDRESS" },
  { label: "Pagamento", numberStage: 4, route: "PAYMENT" },
];

const ProgressSignUp: React.FC<ProgressSignUpProps> = ({ choice }) => {
  return (
    <Container>
      {progress.map((stage, index) => {
        return (
          <Fragment key={stage.route}>
            <Stage>
              <CircleStage isCurrentStage={choice === stage.route}>
                <span>{stage.numberStage}</span>
              </CircleStage>
              <p>{stage.label}</p>
            </Stage>
            {progress.length - 1 !== index && <Bar />}
          </Fragment>
        );
      })}
    </Container>
  );
};

export default ProgressSignUp;
