import axios from 'axios';

export async function getLocationForCep({ cep = '' }) {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json`)
    const { data } = response

    if (data.erro) throw new Error('Falha ao pesquisar CEP')

    return {
      district: data.bairro,
      city: data.localidade,
      street: data.logradouro,
      state: data.uf,
    }
  } catch (error) {
    throw 'Falha ao pesquisar CEP'
  }
}