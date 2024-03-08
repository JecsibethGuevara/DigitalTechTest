import { useEffect, useState } from 'react';
import PostComponent from '@/components/shared/PostComponent';
import { Post } from '@/types/postTypes';
import { child, get, getDatabase, ref } from 'firebase/database';

const UserProfile = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [username, setUsername] = useState('');
  const dbRef = ref(getDatabase());
  useEffect(() => {
    const fetchPosts = async () => {
        get(child(dbRef, `posts`)).then((snapshot: { exists: () => any; val: () => any; }) => {
          if (snapshot.exists()) {
            let data = snapshot.val();
            const dataArray = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));
            setPosts(dataArray);
          } else {
            console.log("No data available");
          }
        }).catch((error) => {
          console.error(error);
        });
      
      if(posts){
        const userPosts = posts.filter((post) => post.author == username);
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
          <PostComponent key={index} post={JSON.stringify(post)} />
        ))}
      </div>
    </div>
  );
};

export default UserProfile;