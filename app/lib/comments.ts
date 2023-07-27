import { Comment } from "@/types";

function formatComments(comments: Array<Comment>) {
  const roots: Array<any> = [];
  const commentMap: any = {};

  comments.forEach((comment) => {
    const { id, parent } = comment;
    commentMap[id] = { ...comment, children: [] };
    if (parent !== null) {
      if (!commentMap[parent]) {
        commentMap[parent] = { children: [] };
      }
      commentMap[parent].children.push(commentMap[id]);
    } else {
      roots.push(commentMap[id]);
    }
  });

  return roots;
}

export default formatComments;
