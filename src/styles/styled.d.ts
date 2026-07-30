import "styled-components";

import { Theme } from "./themes/light";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
