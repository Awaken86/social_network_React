import React from 'react';
import { PostDataType } from '../../../../types/Types';
import s from './Post.module.css';
const Post = (props: PostDataType) => {
  return (

    <div className={s.item}>
      <img alt='' src="https://cs-site.ru/uploads/posts/2020-09/1599774156_296.jpg" />
      {props.message}
      <div>
        <span className={s.item}>like</span> {props.likesCount}
        <span className={s.item}>dislike </span>{props.dislikesCount}
      </div>
    </div>

  )
}

export default Post;