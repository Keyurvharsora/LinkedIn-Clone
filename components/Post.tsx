'use client'
import React from 'react'
import Profile from './shared/Profile'
import { useUser } from '@clerk/nextjs'
import { Trash2 } from 'lucide-react'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { IPostDocument } from '@/models/post.model'
import PostContent from './PostContent'
import SocialOptions from './SocialOptions'
import ReactTimeago from "react-timeago";
import { deletePostAction } from '@/lib/serverActions'

const Post = ({ post }: { post: IPostDocument }) => {
    const { user } = useUser();
    const fullName = post?.user?.firstName + " " + post?.user?.lastName;
    const loggedInUser = user?.id === post?.user?.userId;

    return (
        <div className='bg-white my-2 mx-2 md:mx-0 border border-gray-300 rounded-lg'>
            <div className='flex gap-2 p-4'>
                <Profile src={post?.user?.profilePhoto!} />
                <div className='flex items-center justify-between w-full'>
                    <div>
                        <h1 className='text-sm font-bold'>{fullName}<Badge variant={'secondary'}>You</Badge></h1>
                        <p className='text-xs text-gray-500'>@{user ? "keyurharsora" : "username"}</p>
                        <p className='text-xs text-gray-500'>
                            <ReactTimeago date={new Date(post.createdAt)} />
                        </p>
                    </div>
                </div>
                <div>
                    {
                        loggedInUser && (
                            <Button onClick={() => { const res = deletePostAction(post._id as string) }}
                                size={'icon'} className='rounded-full' variant={'outline'}>
                                <Trash2 />
                            </Button>
                        )
                    }
                </div>
            </div>
            <PostContent post={post} />
            <SocialOptions post={post}/>
        </div>
    )
}

export default Post