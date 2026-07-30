import { Meta, Story } from "@storybook/react/types-6-0";
import ButtonPrimary from "components/Buttons/ButtonPrimary";

import Profile, { ProfileProps } from ".";

/* export default {
  title: "Profile",
  component: Profile,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    user: {
      name: "John Doe",
      imageUrl: "https://picsum.photos/200/200",
      profileColor: "#9966cc",
      profession: "The placeholder guy",
      phone: "0840129348",
      buttons: [
        { _id: "1", name: "FACEBOOK", realUrl: "https://facebook.com" },
      ],
      address: {
        street: "",
      },
    },
  },
} as Meta<ProfileProps>; */

export const Default: Story<ProfileProps> = (args) => <Profile {...args} />;

export const WithBannerChildren: Story<ProfileProps> = (args) => (
  <Profile {...args} />
);

WithBannerChildren.args = {
  bannerChildren: (
    <div
      style={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-end",
        gap: "2rem",
      }}
    >
      <ButtonPrimary variant="tertiary" colorScheme="white">
        Editar perfil
      </ButtonPrimary>
      <ButtonPrimary variant="tertiary" colorScheme="white">
        Sair
      </ButtonPrimary>
    </div>
  ),
};
