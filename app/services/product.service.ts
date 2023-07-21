import APIService from "@/services/api.service";

const { NEXT_PUBLIC_API_BASE_URL } = process.env;

class ProductService extends APIService {
  constructor() {
    super(NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/v1");
  }

  async getAll() {
    return this.get("/products")
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getProduct(id: string) {
    return this.get(`/products/${id}`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async updateProduct(id: string) {
    return this.patch(`/products/${id}`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async voteProduct(id: string) {
    return this.post(`/products/${id}/vote`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async unvoteProduct(id: string) {
    return this.delete(`/products/${id}/unvote`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getComments(productId: string) {
    return this.get(
      `/products/${productId}/comments?sortBy=createdAt:desc`
    )
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getCommentsInfinite(url: string) {
    return this.get(url)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getComment(productId: string, commentId: string) {
    return this.get(`/products/${productId}/comment/${commentId}`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async postComment(productId: string, payload: any) {
    return this.post(`/products/${productId}/comment`, payload)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async editComment(productId: string, commentId: string, payload: any) {
    return this.patch(`/products/${productId}/comment/${commentId}`, payload)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async removeComment(productId: string, commentId: string) {
    return this.delete(`/products/${productId}/comment/${commentId}`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async voteComment(productId: string, commentId: string) {
    return this.post(`/products/${productId}/comment/${commentId}/vote`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async unvoteComment(productId: string, commentId: string) {
    return this.delete(`/products/${productId}/comment/${commentId}/unvote`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async deleteProduct(id: string) {
    return this.delete(`/products/${id}`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async createProduct(data: any) {
    return this.post("/products", data)
      .then((response) => {
        return response?.data;
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
