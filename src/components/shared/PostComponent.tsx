import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { getCurrentUser } from '@/lib/localStorage/saveUser';
import { updatePostsLikes } from '@/lib/localStorage/posts';

interface PostProps {
    post: any;
}

const PostComponent = ({post}: PostProps) => {
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
        like == false ? setLike(true) : setLike(false)
        like ? removeLike(post, username) : updatePostsLikes(post, username);

        
    }

    return (
        <div className="w-full bg-dark-3 p-5 border-b-1-slate mb-2">
            <div className="flex gap-5">
                <div>
                    <img src="/assets/images/profile.png" alt="" />
                </div>
                <div className='w-full'>
                    <div className="flex gap-3 mb-3">
                        <h3> {post.name} {post.surname} </h3>
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
                            <p>{post.likes}</p>
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

function removeLike(post: any, username: string) {
    throw new Error('Function not implemented.');
}
