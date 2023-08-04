import APIService from "@/services/api.service";

class MarkdownService extends APIService {
  async preview(payload: any) {
    return this.post(`/markdown/preview`, payload)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

const markdownService = new MarkdownService();

export default markdownService;
