const linkGenerators = {
  facebook: (content: string) =>
    `https://www.facebook.com/sharer/sharer.php?u=${content}`,
  linkedin: (content: string) =>
    `https://www.linkedin.com/shareArticle?mini=true&url=${content}&title=&summary=&source=`,
  whatsapp: (content: string) =>
    `whatsapp://send?text=${content}`,
  email: (content: string, email?: string) =>
    `mailto:${email}`,
  instagram: (content: string) => 
    ``

};

export default function genererateShareLink(
  app: keyof typeof linkGenerators,
  content: string,
  email?: string
) {
  return linkGenerators[app]?.(content, email);
}
