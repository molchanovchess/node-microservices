import axios from "axios";
import React, { useEffect, useState } from "react";

const CommentList = ({ postId }) => {
  const [comments, setComments] = useState([]);
  
  const fetchData = async () => {
    const res = await axios.get(
      `http://localhost:4001/posts/${postId}/comments`
    );

    setComments(res.data);
    
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderComments = comments.map((comment) => {
    return <li key={comment.id}>{comment.content}</li>;
  });

  return <ul>{renderComments}</ul>;
};

export default CommentList;
