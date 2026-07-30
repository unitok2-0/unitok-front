const linksAvailable = [
  { name: 'WHATSAPP', placeholder: 'Whatsapp', linkPlaceholder: 'Whatsapp            ', isPhone: true, titleInput: 'Links' },
  { name: 'EMAIL', placeholder: 'Email', linkPlaceholder: 'Email                    ' },
  { name: 'WEBSITE', placeholder: 'Site pessoal', linkPlaceholder: 'Site                       ' },
  { name: 'INSTAGRAM', placeholder: 'Instagram', linkPlaceholder: 'instagram.com/  ' },
  { name: 'FACEBOOK', placeholder: 'Facebook', linkPlaceholder: 'facebook.com/   ' },
  { name: 'LINKEDIN', placeholder: 'Linkedin', linkPlaceholder: 'linkedin.com/in/ ' },
  // { name: 'COMMERCIAL_WEBSITE', placeholder: 'Site comercial' },
]

export function returnButtonFormated(obj = {}) {
  const keys = Object.keys(obj)
  const buttons = linksAvailable.map(button => {
    const exist = keys.find(key => key === button.name)
    if (!exist) return {}
    const url = obj[button.name]
    return {
      url,
      name: button.name,
    }
  }).filter(e => e.url)

  return buttons
}

export default linksAvailable
