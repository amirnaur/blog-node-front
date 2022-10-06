import React, { useEffect } from "react";

import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import instance from "../api/api";
import { useState } from "react";

export const FullPost = () => {
  const { id } = useParams();
  const [ postData, setPostData ] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    instance.get(`posts/${id}`)
    .then(res => {
      setPostData(res.data);
      setIsLoading(false);
    })
  }, [])
  return (
    <>
      {isLoading ? ( <Post isLoading={isLoading} isFullPost/>) :
        <Post
          id={postData._id}
          title={postData.title}
          imageUrl="https://res.cloudinary.com/practicaldev/image/fetch/s--UnAfrEG8--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/icohm5g0axh9wjmu4oc3.png"
          user={postData.user}
          createdAt={postData.createdAt}
          viewsCount={postData.viewsCount}
          commentsCount={postData.commentsCount}
          tags={postData.tags}
          isFullPost
        >
          <p>
            {postData.text}
          </p>
        </Post>
      }
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
