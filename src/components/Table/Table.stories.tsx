import { Meta, Story } from "@storybook/react/types-6-0";

import { Table, TableProps} from '.'

export default {
  title: 'Table',
  component: Table
}

export const Default : Story<TableProps> = (args) => {
  return <Table {...args} />;
}