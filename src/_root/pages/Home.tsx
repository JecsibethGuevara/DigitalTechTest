import CreatePost from '@/components/shared/CreatePost'
import Post from '@/components/shared/Post'
import React, { useEffect, useState } from 'react'

interface Post{
  id: number; 
  image?:string;
  message?:string; //done
  likes?:string[]; 
  author?:string; 
  createdAt?:string;
  status?:string;
}

function Home() {

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
    <div  className="w-full flex justify-center">
      
      <div className="w-3/4 bg-dark-2 my-2 p-3">
      <div>
        <CreatePost/>
      </div>
       
        {posts.map((post) => <Post key={1} post={post}/>)

        }
      </div>
    </div>
  )
}

export default Home