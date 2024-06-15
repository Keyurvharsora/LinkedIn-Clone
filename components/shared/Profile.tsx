import React from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'

const Profile = ({src} : {src:string}) => {
  return (
    <div>
      <Avatar className='cursor-pointer'>
      <AvatarImage src={src} alt="Profile" />
    </Avatar>
    </div>
  )
}

export default Profile