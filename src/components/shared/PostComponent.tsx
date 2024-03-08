import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getDatabase, ref, child, push, update, onValue } from "firebase/database";
import { Link } from 'react-router-dom';


const PostComponent = ({ post }: any) => {
    post = JSON.parse(post)
    const [like, setLike] = useState(false);
    const [updatedPost, setUpdatedPost] = useState(post);
    const [likeCount, setLikeCount] = useState(post.likes?.length || 0);
    const [username, setUsername] = useState(useSelector((state: { user: { username: any; }; }) => state.user));

    useEffect(() =>{
        const getLikes = () =>{
            const usernameIndex = post.likes?.findIndex((like: any) => like.username === username.username);
            usernameIndex >= 0 ? setLike(true) : false
        }

        getLikes()
    }, [like])
   
    

    const handleLike = async (e: any) => {
        const db = getDatabase();
       
            const likesArray = post.likes || [];
            const usernameIndex = likesArray.findIndex((like: any) => like.username === username.username);
            if (usernameIndex !== -1) {
                likesArray.splice(usernameIndex, 1);
                setLike(false);
                setLikeCount(likesArray.length);
                console.log(post,'dsj')
            } else {
                likesArray.push(username);
                setLike(true);
                setLikeCount(likesArray.length);
                console.log(post, 'after')
            }
            const updates = {};
            updates['/posts/' + post.id + '/likes'] = likesArray; // Update the likes array in the post
            console.log(post);
            return update(ref(db), updates);


           
     
}


return (
    <div className="w-full bg-dark-3 p-5 border-b-1-slate mb-2">
        <div className="flex gap-5">
            <div>
                <img src="/assets/images/profile.png" alt="" />
            </div>
            <div className='w-full'>
                <div className="flex gap-3 mb-3">
                    <Link to="/user" className="flex gap-3 ">
                        <p>@{post.author} </p>
                    </Link>

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
                        <p>{likeCount}</p>
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

export default PostComponent;