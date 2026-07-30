/* eslint-disable react/jsx-key */
import { Meta, Story } from "@storybook/react/types-6-0";
import ButtonPrimary from "components/Buttons/ButtonPrimary";
import StatusLabel from "components/StatusLabel";

import NewTable, { NewTableProps } from ".";

const qrcodeData = [
  { isActive: false, qrcode: "flakdjfalsd", profileId: "fjaldkfjad" },
];

export default {
  title: "NewTable",
  component: NewTable,
  args: {
    tableHeads: ["Status", "QR Code", ""],
    gridTemplateColumns: "2fr 3fr 1fr",
    tableData: qrcodeData.map((data) => {
      return [
        <StatusLabel isActive={data.isActive} />,
        <ButtonPrimary variant="tertiary" onClick={() => alert(data.qrcode)}>
          Ver QRCode
        </ButtonPrimary>,
        <ButtonPrimary variant="tertiary" onClick={() => alert(data.qrcode)}>
          Ver perfil
        </ButtonPrimary>,
      ];
    }),
  },
} as Meta<NewTableProps>;

export const Default: Story<NewTableProps> = (args) => <NewTable {...args} />;
