import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'

interface PostProps {
    post: any;
  }

const Post = ({post}: PostProps) => {
    const [like, setLike] = useState(false)
    console.log(post)

    async function handleLike() {
        // inform like
        like == false ? setLike(true) : setLike(false)
        console.log(like)

    }

    return (
        <div className="w-full bg-dark-3 p-5 border-b-1-slate mb-2">
            <div className="flex gap-5">
                <div>
                    <img src="/assets/images/profile.png" alt="" />
                </div>
                <div>
                    <div className="flex gap-3 mb-3">
                        <h3> {post.name} {post.surname} </h3>
                        <h5> @{post.username} </h5>
                        <button type='button'>
                            <img src="/assets/icons/follow.svg" alt="" />
                        </button>
                    </div>
                    <div className='mb-4'>
                        <p> {post.message}
                        </p>
                    </div>
                    <div className='flex items-center flex-between justify-center px-16' >
                        <button type='button'>
                            <img src="/assets/icons/chat.svg" alt="" />
                        </button>
                        <button type='button' onClick={handleLike}>
                            <img src={like ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"} alt="" />
                        </button>
                        <button type='button'>
                            <img src="/assets/icons/save.svg" alt="" />
                        </button>
                        <button type='button'>
                            <img src="/assets/icons/share.svg" alt="" />
                        </button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Post