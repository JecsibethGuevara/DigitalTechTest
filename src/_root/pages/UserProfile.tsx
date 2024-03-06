import Post from '@/components/shared/Post'
import React, { useEffect, useState } from 'react'

const UserProfile = () => {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('/data/posts.json');
                const data = await response.json();
                setPosts(data);
                console.log(posts)
            } catch (error) {
                console.log(error)
            }

        };

        fetchPosts();
    }, []);
    console.log(posts)
    return (
        <div className="w-full flex  justify-center">

            <div className="w-3/4 bg-dark-2 my-2 p-3">
                <div className="w-3/4 bg-dark-2 my-2 p-3 flex" >
                   <div>
                        <img src="/assets/images/profile.png" alt="" />
                        <h2> Name Surname</h2>
                        <p>@username</p>
                        <p>joined 1/1/11</p>
                   </div>
                </div>
                <h1>Posts</h1>
                {posts.map((post) => <Post key={1} post={post}/>)}
            </div>
        </div>
    )
}

export default UserProfile