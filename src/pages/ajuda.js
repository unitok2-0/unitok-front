export default function Help() {
  return(
    <></>
  )
}

export const getServerSideProps =
  async (context) => {

    return{
      redirect:{
        destination: '/suporte',
        permanent: false,
      }
    }
  }
