
export default function CheckImage({imageObj}) {
    return isImageExist(imageObj)
}

export function isImageExist(obj){
    if(obj){
        return obj.url
    }
    return false
}
  