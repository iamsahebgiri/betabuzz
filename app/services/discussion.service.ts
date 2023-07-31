import APIService from "@/services/api.service";

const { NEXT_PUBLIC_API_BASE_URL } = process.env;

class DiscussionService extends APIService {
  constructor() {
    super(NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/v1");
  }

  async getAll() {
    return this.get("/discussions")
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getAllInfinite(url: string) {
    return this.get(url)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getDiscussion(id: string) {
    return this.get(`/discussions/${id}`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async updateDiscussion(id: string, payload: any) {
    return this.patch(`/discussions/${id}`, payload)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async voteDiscussion(id: string) {
    return this.post(`/discussions/${id}/vote`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async unvoteDiscussion(id: string) {
    return this.delete(`/discussions/${id}/unvote`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getReplies(discussionId: string) {
    return this.get(
      `/discussions/${discussionId}/replies?sortBy=createdAt:desc`
    )
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getgetRepliesInfinite(url: string) {
    return this.get(url)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async getReply(discussionId: string, replyId: string) {
    return this.get(`/discussions/${discussionId}/reply/${replyId}`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async postReply(discussionId: string, payload: any) {
    return this.post(`/discussions/${discussionId}/reply`, payload)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async editReply(discussionId: string, replyId: string, payload: any) {
    return this.patch(`/discussions/${discussionId}/reply/${replyId}`, payload)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async removeReply(discussionId: string, replyId: string) {
    return this.delete(`/discussions/${discussionId}/reply/${replyId}`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async voteReply(discussionId: string, replyId: string) {
    return this.post(`/discussions/${discussionId}/reply/${replyId}/vote`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async unvoteReply(discussionId: string, replyId: string) {
    return this.delete(`/discussions/${discussionId}/reply/${replyId}/unvote`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async deleteDiscussion(id: string) {
    return this.delete(`/discussions/${id}`)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }

  async createDiscussion(data: any) {
    return this.post("/discussions", data)
      .then((response) => {
        return response?.data;
      })
      .catch((error) => {
        throw error?.response?.data;
      });
  }
}

const discussionService = new DiscussionService();

export default discussionService;
