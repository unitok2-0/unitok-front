import {
  ButtonDownloadSheetContainer,
  ButtonDownloadSheetContainerSquare
} from "./styles";

import IconDownload from '../../../../public/assets/download.svg';
import ReactHTMLTableToExcel from "react-html-table-to-excel";

interface IButtonDownloadSheetProps {
  isRetangule: boolean;
}

export default function ButtonDownloadSheet({ isRetangule }: IButtonDownloadSheetProps) {
  return (
    <>
      {isRetangule &&
        <ButtonDownloadSheetContainer>
          <ReactHTMLTableToExcel
            className="buttonDownloadExcel"
            table="emp-table"
            filename="Tabela-checkins"
            sheet="Sheet"
            buttonText="Baixar planilha completa"
          />
            <IconDownload />
        </ButtonDownloadSheetContainer>
      }
      {!isRetangule &&
        <ButtonDownloadSheetContainerSquare>
          <ReactHTMLTableToExcel
            className="buttonDownloadExcel"
            table="emp-table"
            filename="Tabela-checkins"
            sheet="Sheet"
            buttonText="Baixar planilha completa"
          />
        </ButtonDownloadSheetContainerSquare>
      }
    </>
  )
}