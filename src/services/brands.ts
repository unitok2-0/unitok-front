

import { api } from "./api";


interface IProduct {
  name: string;
  video_url: string;
}

export interface BrandData {
  _id: string;
  brand_name: string;
  user_id: string;
  products: IProduct[];
}


export async function getBrandProduct(brand: string) {

  const response = await api.get<BrandData>(`/brands/${brand}`);
  return response.data;
}

interface CreateProductData {
  brand_name: string;
  product_name: string;
  video_url: string;
  id: string;
}

export async function createProduct({ brand_name, product_name, video_url, id }: CreateProductData) {

  const data = {
    brand_name,
    product_name,
    video_url,
    id
  }

  const response = await api.post('/brands', data)

  return response.data;
}


interface DeleteBrandData {
  brand_name: string;
  user_id: string;
  product_name: string;
}

export async function deleteBrand({
  brand_name, user_id, product_name
}: DeleteBrandData) {

  const data = {
    brand_name,
    product_name,
    user_id
  }

  const response = await api.patch('/brands', data)

  return response.data;
}