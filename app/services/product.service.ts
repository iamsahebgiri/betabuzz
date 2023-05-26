import APIService from "@/services/api.service";

const { NEXT_PUBLIC_API_BASE_URL } = process.env;

class ProductService extends APIService {
  constructor() {
    super(NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/v1");
  }

  async createProduct(data: any) {
    return this.post("/products", data)
      .then((response) => {
        const { data } = response;
        console.log(data);
        return data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async uploadImage(image: File) {
    const formData = new FormData();
    formData.append("image", image);

    return this.mediaUpload(`/products/image`, formData)
      .then((response) => {
        const { data } = response;
        return data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async deleteImage(imageUrl: String) {
    return this.delete(`/products/image`, {
      image: imageUrl,
    })
      .then((response) => {
        const { data } = response;
        return data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

const productService = new ProductService();

export default productService;
