/** This file is just a mock for the data that may come from BACKend
 * Development purposes only.
 */

const cards = [
  {
    modelCard: "Model Logo",
    name: "Personalizado com logotipo",
    variant: "with-logo-0",
    price: 8990,
    customizationSide: "FRONT",
    color: {
      label: "Branco",
      values: ["#FFFFFF"],
    },
  },
  {
    modelCard: "Model Logo",
    name: "Personalizado com logotipo",
    variant: "with-logo-1",
    price: 8990,
    customizationSide: "FRONT",
    color: {
      label: "Cinza",
      values: ["#9E9E9E"],
    },
  },
  {
    modelCard: "Model Logo",
    name: "Personalizado com logotipo",
    variant: "with-logo-2",
    price: 8990,
    customizationSide: "FRONT",
    color: {
      label: "Preto",
      values: ["#000000"],
    },
  },
  {
    modelCard: "Model Arte",
    name: "Personalizado com logotipotipo + arte",
    variant: "with-art-0",
    price: 8990,
    customizationSide: "BACK",
    color: {
      values: [],
    },
  },
  {
    modelCard: "Model 1",
    name: "Darktok",
    variant: "darktok-0",
    price: 2990,
    customizationSide: "FRONT",
    color: {
      values: [],
    },
  },
  {
    modelCard: "Model 2",
    name: "Classictok",
    variant: "classictok-0",
    price: 2990,
    customizationSide: "BACK",
    color: {
      label: "Verde",
      values: ["#033130"],
    },
  },
  {
    modelCard: "Model 2",
    name: "Classictok",
    variant: "classictok-1",
    price: 2990,
    customizationSide: "BACK",
    color: {
      label: "Preto",
      values: ["#171717"],
    },
  },
  {
    modelCard: "Model 3",
    name: "Colortok",
    variant: "colortok-0",
    price: 2990,
    customizationSide: "BACK",
    color: {
      label: "Lilás + cinza",
      values: ["#BFB0FF", "#282829"],
    },
  },
  {
    modelCard: "Model 3",
    name: "Colortok",
    variant: "colortok-1",
    price: 2990,
    customizationSide: "BACK",
    color: {
      label: "Menta + verde",
      values: ["#D4FEB2", "#033130"],
    },
  },
  {
    modelCard: "Model 4",
    name: "Wavetok",
    variant: "wavetok-0",
    price: 2990,
    customizationSide: "FRONT",
    color: {
      values: [],
    },
  },
  {
    modelCard: "Model 5",
    name: "Urbantok",
    variant: "urbantok-0",
    price: 2990,
    customizationSide: "FRONT",
    color: {
      values: [],
    },
  },
  {
    modelCard: "Model 6",
    name: "Happytok",
    variant: "happytok-0",
    price: 2990,
    customizationSide: "FRONT",
    color: {
      label: "Lilás",
      values: ["#BFB0FF", "#EFEFEF"],
    },
  },
  {
    modelCard: "Model 6",
    name: "Happytok",
    variant: "happytok-1",
    price: 2990,
    customizationSide: "FRONT",
    color: {
      label: "Preto",
      values: ["#565656", "#151516"],
    },
  },
] as const;

type Cards = typeof cards[number];

export type CardNames = Cards["name"];
export type CardVariants = Cards["variant"];
export type CardModels = Cards["modelCard"];
export type CardCustomizationSides = Cards["customizationSide"];

export default cards;
