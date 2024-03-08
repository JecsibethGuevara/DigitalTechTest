import { useState } from 'react'
import { updatePostsLikes } from '@/lib/localStorage/posts';
import { useSelector } from 'react-redux';
import { getDatabase, ref, child, push, update } from "firebase/database";


const PostComponent = ({ post }: any) => {
    post = JSON.parse(post)
    const [like, setLike] = useState(false)
    const [username, setUsername] = useState(useSelector((state: { user: { username: any; }; }) => state.user));

    const handleLike = async (e: any) => {
        const db = getDatabase();
        const likesArray = post.likes || []; // Get the existing likes array or create a new array if it doesn't exist
      
        const usernameIndex = likesArray.findIndex((like: any) => like.username === username.username);
      
        if (usernameIndex !== -1) {
          // If the current username is found in the likes array, remove it
          likesArray.splice(usernameIndex, 1);
        } else {
          // If the current username is not found in the likes array, add it
          likesArray.push(username);
        }
      
        const updates = {};
        updates['/posts/' + post.id + '/likes'] = likesArray; // Update the likes array in the post
        console.log(post);
        return update(ref(db), updates);
      };

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
                        <img src={post?.image} />
                    </div>
                    <div className='flex items-center flex-between justify-center px-16' >
                        <button type='button'>
                            <img src="/assets/icons/chat.svg" alt="" />
                        </button>
                        <button className='flex justify-center items-center gap-2' type='button' onClick={handleLike}>
                            <p>{post.likes?.length}</p>
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

