const light = (profileColor = "#FF4C1C") => ({
  title: "light",

  colors: {
    white: "#ffffff",
    primary: "#FF4C1C",
    secondary: "#01302F",
    tertiary: "#D4FEB2",
    primaryHover: "#D14018",
    secondaryHover: "#0B6442",
    profileColor: profileColor,
    error: "#E10101",
    success: "#2AC087",
    grayLighter: "#F9FAFA",
    grayLight: "#EFF2F2",
    gray: "#D0D4D1",
    grayDark: "#909692",
    grayDarkest: "#383D3B",
    m6Gray: "#f2f2f4",

    gradient: `linear-gradient(274.9deg, #FF4C1C 2.69%, #BFB0FF 100%)`,

    secundary: "#111",

    background: "#fff",
    text: "#000",
  } as const,

  fonts: {
    titleLg: "300 15.625rem/15.625rem GTMaru, Roboto, sans-serif;",
    titleMd: "500 3.75rem/4.6875rem GTMaru, Roboto, sans-serif;",
    titleMdLight: "300 3.75rem/4.6875rem GTMaru, Roboto, sans-serif;",
    titleMdMobile: "500 2.1875rem/3.125rem GTMaru, Roboto, sans-serif;",
    titleMdLightMobile: "300 2.1875rem/3.125rem GTMaru, Roboto, sans-serif;",
    titleSm: "500 1.25rem/2.5rem GTMaru, Roboto, sans-serif;",
    titleXs: "500 0.875rem/1.5rem GTMaru, Roboto, sans-serif;",
    bodyXl: "400 1.5rem/2.1875rem GTMaru, Roboto, sans-serif;",
    bodyLg: "400 1.25rem/2.5rem GTMaru, Roboto, sans-serif;",
    bodyMd: "400 0.875rem/1.5rem GTMaru, Roboto, sans-serif;",
    bodySm: "400 0.75rem/1.375rem GTMaru, Roboto, sans-serif;",
  },
});

export type Theme = ReturnType<typeof light>;
export type Colors = Theme["colors"];

export default light;
