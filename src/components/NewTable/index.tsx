import * as S from "./styles";

export type NewTableProps = S.WrapperProps & {
  tableHeads: React.ReactNode[];
  tableData: React.ReactNode[][];
};

export default function NewTable(props: NewTableProps) {
  return (
    <div
      className="white-custom-scrollbar"
      style={{ width: "100%", overflowX: "scroll" }}
    >
      <S.Wrapper gridTemplateColumns={props.gridTemplateColumns}>
        <thead>
          <tr>
            {props.tableHeads.map((th, index) => (
              <th key={index}>{th}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.tableData.map((dataRow, index) => (
            <tr key={index}>
              {dataRow.map((data, index) => (
                <td key={index}>{data}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </S.Wrapper>
    </div>
  );
}
