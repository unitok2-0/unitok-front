import { Footer } from "./styles";
import { CSSProp } from 'styled-components'
interface IFooterConarh {
  activeFixed: boolean;
  styleProps?: CSSProp;
}

export default function FooterConarh({ activeFixed, styleProps }: IFooterConarh) {
  return (
    <Footer activeFixed={activeFixed} styleProps={styleProps}>
      <img
        src='/assets/powered-by-unitok.svg'
        alt="Powered by Unitok"
      />
    </Footer>
  )
}
