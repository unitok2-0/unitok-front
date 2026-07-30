import { CheckinContainer } from "containers/checkin";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";


interface CheckinProps {
  exhibitorCode?: string;
}

export default function Checkin({ exhibitorCode }: CheckinProps) {
  return (
    <CheckinContainer exhibitorCode={exhibitorCode}></CheckinContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { 'standCodeId': codeId } = parseCookies(context)

  const code = codeId ? codeId : null

  return {
    props: {
      exhibitorCode: code
    }
  }
}