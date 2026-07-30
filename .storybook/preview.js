import * as nextImage from "next/image";
import { RouterContext } from "next/dist/next-server/lib/router-context"; // next < 11.2
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../src/styles/Global";
import light from "../src/styles/themes/light";
import "../src/styles/font-face.css";
import { CartProvider } from "../src/contexts/CartContext";
import { ToastContainer } from "react-toastify";
import { CheckoutProvider } from "../src/contexts/CheckoutContext";

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
};

export const decorators = [
  (Story) => (
    <ThemeProvider theme={light()}>
      <CartProvider>
        <CheckoutProvider>
          <GlobalStyle />
          <ToastContainer />
          <Story />
        </CheckoutProvider>
      </CartProvider>
    </ThemeProvider>
  ),
];

Object.defineProperty(nextImage, "default", {
  configurable: true,
  value: (props) => <img {...props} />,
});
