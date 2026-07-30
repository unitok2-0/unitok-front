
export default function RemoveHtml({ children }) {
  return remove(children)
}

export function remove(content) {
  return content.replace(/<[^>]*>?/gm, '');
}