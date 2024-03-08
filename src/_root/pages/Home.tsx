import { useEffect, useState } from "react";
import CreatePost from "@/components/shared/CreatePost";
import PostComponent from "@/components/shared/PostComponent";
import { Post } from "@/types/postTypes";
import Sidebar from "@/components/shared/Sidebar";
import { useSelector } from "react-redux";
import { getDatabase, ref, child, get } from "firebase/database";
import { getStorage, refa, getDownloadURL } from "firebase/storage";


function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const filter = useSelector((state) => state.filter);
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
    
      if (posts) {
        let showPosts;


        switch (filter) {
          case "user": 
            showPosts = [...posts].sort((a, b) =>
              a.author.localeCompare(b.author)
            );
            console.log(showPosts);
            setPosts(showPosts);
            break;
          case "likes":
            showPosts = [...posts]
              .slice()
              .sort((a, b) => b.likes?.length - a.likes?.length);
            console.log(showPosts);
            setPosts(showPosts);
            break;
          case "date":
            showPosts = [...posts]
              .slice()
              .sort((a, b) => a.createdAt - b.createdAt);
            console.log(showPosts);
            setPosts(showPosts);
            break;

          default:
            setPosts(posts);
            break;
        }
      }
    };

    fetchPosts();
  }, [filter]); // Add filter as a dependency to trigger the effect on filter change

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
