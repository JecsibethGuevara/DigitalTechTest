import { useEffect, useState } from "react";
import CreatePost from "@/components/shared/CreatePost";
import PostComponent from "@/components/shared/PostComponent";
import { getPosts } from "@/lib/localStorage/posts";
import { Post } from "@/types/postTypes";
import Sidebar from "@/components/shared/Sidebar";
import { useSelector, useDispatch } from "react-redux";

function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  let filter = useSelector((state) => state.filter);

  useEffect(() => {
    const fetchPosts = async () => {
      const fetchedPosts = getPosts();
      if (fetchedPosts) {
        let showPosts;
        switch (filter) {
          case "user":
            showPosts = [...fetchedPosts].sort((a, b) =>
              a.author.localeCompare(b.author)
            );
            setPosts(showPosts);
            break;
          default:
            setPosts(fetchedPosts)
            break;

        }
      }
    };

    fetchPosts();
  }, []);

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
