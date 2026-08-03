import { useEffect, useState } from 'react'
import { resolveImageUrl, DEFAULT_IMAGE_PLACEHOLDER } from 'constants/functions'

// resolveImageUrl() só pega URLs que já reconhecidamente apontam pro bucket
// AWS morto (padrão de string). Chaves cruas do bucket antigo (ex: "avatar.jpg",
// sem NEXT_PUBLIC_FILES_URL configurada na época) não têm como ser detectadas
// só pelo formato — o único jeito confiável é o navegador tentar carregar a
// imagem de verdade e ver se ela quebra.
export function useImageFallback(url?: string | null, fallback: string = DEFAULT_IMAGE_PLACEHOLDER): string {
  const initialSrc = resolveImageUrl(url, fallback)
  const [src, setSrc] = useState(initialSrc)

  useEffect(() => {
    const resolved = resolveImageUrl(url, fallback)

    if (resolved === fallback) {
      setSrc(fallback)
      return
    }

    let cancelled = false
    const img = new window.Image()
    img.onload = () => { if (!cancelled) setSrc(resolved) }
    img.onerror = () => { if (!cancelled) setSrc(fallback) }
    img.src = resolved

    return () => { cancelled = true }
  }, [url, fallback])

  return src
}
