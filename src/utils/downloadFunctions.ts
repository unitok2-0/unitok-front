import axios from 'axios'

export const browserDownload = (content: Blob, arqName: string = 'portal') => {
  const url = window.URL.createObjectURL(content)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', arqName) //or any other extension
  document.body.appendChild(link)
  link.click()
  link.parentElement.removeChild(link)
}

type downloadImagProps = {
  url: string
  arqName: string
}

export const downloadFile = async ({
  url = '',
  arqName
}: downloadImagProps) => {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'blob'
    })

    browserDownload(new Blob([response.data]), arqName)
  } catch (error) {}
}

export const browserDownloadForLink = (
  link: string,
  arqName: string = 'portal'
) => {
  const linKContent = new Blob([link])
  const url = window.URL.createObjectURL(linKContent)
  const linkDownload = document.createElement('a')
  linkDownload.href = url
  linkDownload.setAttribute('download', arqName) //or any other extension
  document.body.appendChild(linkDownload)
  linkDownload.click()
  linkDownload.parentElement.removeChild(linkDownload)
}