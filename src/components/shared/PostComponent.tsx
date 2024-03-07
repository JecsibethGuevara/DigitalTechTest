import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { getCurrentUser } from '@/lib/localStorage/saveUser';
import { removeLike, updatePostsLikes } from '@/lib/localStorage/posts';
import { Post } from '@/types/postTypes';


const PostComponent = ({post}) => {
    post = JSON.parse(post)
    const [like, setLike] = useState(false)
    const [username, setUsername] = useState('');

  useEffect(() => {
    const checkLoginStatus = () => {
      const logged = localStorage.getItem('isLoggedIn');
      if (logged) {
        const parsedLogged = JSON.parse(logged);
        setUsername(parsedLogged.username);

      }
    };

    checkLoginStatus();
  }, []);


    async function handleLike() {
        // inform like
        updatePostsLikes(post, username);
    }

    console.log('sdasd')
    return (
        <div className="w-full bg-dark-3 p-5 border-b-1-slate mb-2">
            <div className="flex gap-5">
                <div>
                    <img src="/assets/images/profile.png" alt="" />
                </div>
                <div className='w-full'>
                    <div className="flex gap-3 mb-3">
                        <h3> user  </h3>
                        <h5> @{post.author} </h5>
                        <button type='button'>
                            <img src="/assets/icons/follow.svg" alt="" />
                        </button>
                        <h5> {post.createdAt} </h5>
                    </div>
                    <div className='mb-4'>
                        <p> {post.text}
                        </p>
                    </div>
                    <div className='flex items-center flex-between justify-center px-16' >
                        <button type='button'>
                            <img src="/assets/icons/chat.svg" alt="" />
                        </button>
                        <button className='flex justify-center items-center gap-2' type='button' onClick={handleLike}>
                            <p>{post.likes.length}</p>
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

export default PostComponent

