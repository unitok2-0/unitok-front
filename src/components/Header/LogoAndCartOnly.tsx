import CartDropdown from "components/CartDropdown";

import { HeaderTextColorProps } from ".";
import { HeaderContent2, HeaderDiv } from "./styles";

export function LogoAndCartOnly({ color }: HeaderTextColorProps) {
  return (
    <HeaderContent2>
      <HeaderDiv>
        <CartDropdown />
      </HeaderDiv>
    </HeaderContent2>
  );
}
