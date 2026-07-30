
import { createApi } from 'unsplash-js'


export function useUnsplash() {
  const api = createApi({
    accessKey: process.env.NEXT_PUBLIC_UNSPLASH_KEY
  })


  return { unsplashApi: api }
}