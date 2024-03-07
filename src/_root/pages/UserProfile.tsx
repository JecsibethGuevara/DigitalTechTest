import { getPosts } from '@/lib/localStorage/posts';
import React, { useEffect, useState } from 'react';
import PostComponent from '@/components/shared/PostComponent';
import { Post } from '@/types/postTypes';

const UserProfile = () => {
  const [posts, setPosts] = useState<Post[]>([]);
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

  useEffect(() => {
    const fetchPosts = async () => {
      const allPosts = getPosts();
      console.log(allPosts, 'all', username);
      if(allPosts){
        const userPosts = allPosts.filter((post) => post.author == username);
        console.log(userPosts, 'user')
        setPosts(userPosts);
      }
      
    };

    fetchPosts();
  }, [username]);

  console.log(posts, 'hi');

  return (
    <div className="w-full flex justify-center">
      <div className="w-3/4 bg-dark-2 my-2 p-3">
        <div className="w-3/4 bg-dark-2 my-2 p-3 flex">
          <div>
            <img src="/assets/images/profile.png" alt="" />
            <h2>Name Surname</h2>
            <p>@username</p>
            <p>joined 1/1/11</p>
          </div>
        </div>
        <h1>Posts</h1>
        {posts.map((post, index) => (
          <PostComponent key={index} post={post} />
        ))}
      </div>
    </div>
  );
};

export default UserProfile;