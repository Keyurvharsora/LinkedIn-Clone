import { IPostDocument } from '@/models/post.model'
import Image from 'next/image'
import React from 'react'

const PostContent = ({post} : {post : IPostDocument}) => {
  return (
    <div className='my-3'>
        <p className='my-3 px-4 w-full h-500' >
            {post?.description}
        </p>
            {
                post?.imageUrl && (
                    <Image
                    src={post?.imageUrl}
                    alt='post-image'
                    width={500}
                    height={500}
                    className='w-full mx-auto'
                    />
                )                
            }
        
    </div>
  )
}

export default PostContent