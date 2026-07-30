import CardInfo from "../card/card-info";

export default function ListInfocards({ data }) {
  return listItensInfo(data);
}

function listItensInfo(list) {
  const listItens = list.map((block, i) => {
    const item = {
      'icon': (block?.Imagem) ? block?.Imagem.url : block.Icone.url,
      'title': block.Titulo,
      'text': block.Texto
    }
    return (
      <div className="md:w-5/12 w-full" key={i}>
        <CardInfo icon={item.icon} title={item.title} text={item.text} />
      </div>
    )
  });
  return (
    <div className="flex justify-between flex-wrap gap-x-4 md:gap-y-20 gap-y-14">
      {listItens}
    </div>
  );
}
