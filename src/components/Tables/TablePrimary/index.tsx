import moment from 'moment';
import { IBatch } from 'pages/intern-management/qrcodes';
import * as S from './styles';

type TablePrimaryProps = {
  columns?: {
    title: string
  }[];
  data?: IBatch[];
  styleProp?: any;
}

export default function TablePrimary({ columns, data, styleProp }: TablePrimaryProps) {

  return (
    <S.TableContainer style={styleProp}>
      <div className="overflowX">
        <table className="table" id="emp-table">
          <thead>
            <tr>
              {columns.map((column, index) => (
                <th key={index}>{column.title}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {data.map(batch => (
              <tr key={batch._id}>
                <td>{batch.title || batch._id}</td>
                <td>{batch.product_type}</td>
                <td>{batch.quantity}</td>
                <td>{moment(batch.createdAt).local().format('DD/MM/YYYY')}</td>
                <td style={{ color: '#FF4C1C', textDecoration: 'underline' }}>
                  <a
                    target={"_blank"}
                    href={`https://view.officeapps.live.com/op/view.aspx?src=${batch.sheet_location}`} rel="noreferrer"
                  >
                    Ver planilha
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </S.TableContainer>
  )
}