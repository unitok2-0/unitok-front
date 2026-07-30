import { CSSProperties } from 'styled-components';

import SimplePrevArrow from '../../../public/assets/pagination_prev_simple_arrow.svg';
import DoblePrevArrow from '../../../public/assets/pagination_prev_doble_arrow.svg';
import SimpleNextArrow from '../../../public/assets/pagination_next_simple_arrow.svg';
import DobleNextArrow from '../../../public/assets/pagination_next_doble_arrow.svg';

import * as S from './styles';

interface PaginationProps {
  total: number;
  page: number;
  limit: number;
  onPageSelected: (page: number) => void;
  containerStyle?: CSSProperties
}

export function Pagination({ total, page, limit, onPageSelected, containerStyle }: PaginationProps) {
  if(total <= limit || total < 1 || page < 1 || limit < 1 || !total || !page || !limit)
    return <></>;

  const pagesAvailable = Math.ceil(total / limit);

  return (
    <S.Container style={containerStyle}>
      {page > 3 && <DoblePrevArrow onClick={() => onPageSelected(1)}/>}
      {page > 2 && <SimplePrevArrow onClick={() => onPageSelected(page - 2)} />}
      {page > 1 && <S.Item onClick={() => onPageSelected(page - 1)}>{page - 1}</S.Item>}
      <S.Item selected>{page}</S.Item>
      {pagesAvailable - page >= 1 && <S.Item onClick={() => onPageSelected(page + 1)}>{page + 1}</S.Item>}
      {pagesAvailable - page >= 2 && <SimpleNextArrow onClick={() => onPageSelected(page + 2)} />}
      {pagesAvailable - page >= 3 && <DobleNextArrow onClick={() => onPageSelected(pagesAvailable)}/>}
    </S.Container>
  )
}