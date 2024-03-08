import { useEffect, useState } from "react";
import CreatePost from "@/components/shared/CreatePost";
import PostComponent from "@/components/shared/PostComponent";
import { Post } from "@/types/postTypes";
import Sidebar from "@/components/shared/Sidebar";
import { useSelector } from "react-redux";
import { getDatabase, ref, child, get } from "firebase/database";


function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState()
  const filter = useSelector((state : {filter : any }) => state.filter);
  const dbRef = ref(getDatabase());
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const snapshot = await get(child(dbRef, `posts`));
        if (snapshot.exists()) {
          let data = snapshot.val();
          const dataArray = Object.entries(data).map(([key, value]) => ({
            id: key,
            ...(value as any),
          }));
  
          // Sort the posts based on the filter value
          if (filter === 'likes') {
            dataArray.sort((a, b) => {
              const likesA = a.likes ? a.likes.length : 0;
              const likesB = b.likes ? b.likes.length : 0;
              return likesB - likesA;
            });
          }else if (filter === 'date') {
            dataArray.sort(
              (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          } else if (filter === 'users') {
            dataArray.sort((a, b) =>
              a.username.localeCompare(b.username, undefined, {
                sensitivity: 'base',
              })
            );
          }
  
          setPosts(dataArray);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
  
    setLoading(true);
    fetchPosts();
  }, [filter]);
  return (
    <div className="w-full flex justify-center">
      <div className="w-3/4 bg-dark-2 my-2 p-3">
        <div>
          <CreatePost />
        </div>
        <Sidebar />
        {posts.map((post, index) => (
          <PostComponent key={index} post={JSON.stringify(post)} />
        ))}
      </div>
    </div>
  );
}

export default Home;
