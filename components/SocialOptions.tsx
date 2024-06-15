import React, { useState } from 'react'
import { Button } from './ui/button'
import { MessageCircleMore, Repeat, Send, ThumbsUp } from 'lucide-react'
import { IPostDocument } from '@/models/post.model';
import { useUser } from '@clerk/nextjs';
import Comments from './Comments';
import CommentInput from './CommentInput';

const SocialOptions = ({ post }: { post: IPostDocument }) => {
 
  const { user } = useUser();

  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [commentOpen, setCommentOpen] = useState(false);


  const likeAndDislikeHandler = async () => {
    if (!user) throw new Error("User not authenticated");
    const tempLiked = liked;
    const tempLikes = likes;
    const dislike = likes?.filter((userId) => userId !== user.id);
    const like = [...(likes ?? []), user.id];
    const newLike = liked ? dislike : like;

    setLiked(!liked);
    setLikes(newLike);

    const res = await fetch(`/api/posts/${post._id}/${liked ? '/dislike' : '/like'}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user.id)
    })

    if (!res.ok) {
      setLiked(tempLiked);
      throw new Error("Failed to like or dislike");
    }

    const fetchAllLikes = await fetch(`/api/posts/${post._id}/like`);
    if (!fetchAllLikes.ok) {
      setLikes(tempLikes);
      throw new Error("Failed to fecth like");
    }
    const likeData = await fetchAllLikes.json();
    setLikes(likeData);
  }
  return (
    <div>
        <div className='text-xs p-2 flex items-center justify-between mx-2 border-b border-gray-300'>
          {
            (likes && likes.length > 0) && (
              <p className='text-xm text-gray-500 hover:text-blue-500 hover:underline hover:cursor-pointer'>{likes.length} Likes</p>
            )
          }
          {
            (post.comments && post.comments.length > 0) && (
              <p onClick={() => setCommentOpen(!commentOpen)} className='text-xm text-gray-500 hover:text-blue-500 hover:underline hover:cursor-pointer'>{post.comments.length} Comments</p>
            )
          }
        </div>
      <div className='flex items-center m-1 justify-between'>
        <Button onClick={likeAndDislikeHandler} variant={'ghost'} className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>
          <ThumbsUp className={`${liked && 'fill-[#378FE9]'}`}/>
          <p className={`${liked && 'text-[#378FE9]'}`}>Likes</p>
        </Button>

        <Button onClick={() => setCommentOpen(!commentOpen)} variant={'ghost'} className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>
          <MessageCircleMore />
          <p>Comments</p>
        </Button>
        
        <Button variant={'ghost'} className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>
          <Repeat />
          <p>Repost</p>
        </Button>
        
        <Button variant={'ghost'} className='flex items-center gap-1 rounded-lg text-gray-600 hover:text-black'>
          <Send />
          <p>Send</p>
        </Button>
      </div>
      {
        commentOpen && (
          <div className='p-4 '>
            <CommentInput postId={post._id}/>
            <Comments post={post}/>
          
          </div>
        )
      }
    </div>
  )
}

export default SocialOptions