import React, { useEffect, useState } from 'react';
import CreatePost from '@/components/shared/CreatePost';
import PostComponent from '@/components/shared/PostComponent';
import { getPosts } from '@/lib/localStorage/posts';
import { Post } from '@/types/postTypes';

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = getPosts();
      if (fetchedPosts) {
        setPosts(fetchedPosts);
      }
    };

    fetchPosts();
  }, []);

console.log(posts, 'hisasda')

  return (
    <div className="w-full flex justify-center">
      <div className="w-3/4 bg-dark-2 my-2 p-3">
        <div>
          <CreatePost />
        </div>

        {posts.map((post, index) => (
          <PostComponent key={index} post={post} />
        ))}
      </div>
    </div>
  );
}

export default Home;