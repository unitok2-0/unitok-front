export default function PaginationTable({total, pages}) {

  return(
  <>
    <div>{total}</div>
    <ul style={{paddingBottom: '100px'}}>
      {pages.map(page => (
        <li style={{display: 'flex'}} key={page}>{page}</li>
      ))}
    </ul>
  </>
  )
}