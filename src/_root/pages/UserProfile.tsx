import { useEffect, useState } from 'react';
import PostComponent from '@/components/shared/PostComponent';
import { Post } from '@/types/postTypes';
import { child, get, getDatabase, ref } from 'firebase/database';
import { useSelector } from 'react-redux';
import LikesData from '@/components/shared/LikesData';


const UserProfile = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [username, setUsername] = useState(useSelector((state: { user: any; }) => state.user));
  const dbRef = ref(getDatabase());
  const [likesData, setLikesData] = useState({ totalLikes: 10, womenLikes: 5, menLikes: 5 })
  useEffect(() => {
    const fetchPosts = async () => {
      get(child(dbRef, `posts`)).then((snapshot: { exists: () => any; val: () => any; }) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          const dataArray = Object.entries(data).map(([key, value]) => ({ id: key, ...value }));

          if (dataArray) {
            const userPosts = dataArray.filter((post) => post.author == username.username);
            let totalLikes = 0;
            let womenLikes = 0;
            let menLikes = 0;

            let data = dataArray.map((item) => {
              if(item.likes){
                totalLikes = totalLikes +  item.likes?.length;
                womenLikes += item.likes?.filter((like) => like.sex === "f").length;
                menLikes += item.likes?.filter((like) => like.sex === "m").length;
              }
              
            });
            setLikesData({totalLikes: totalLikes, womenLikes: womenLikes, menLikes: menLikes})
            setPosts(userPosts);
          }
        } else {
          console.log("No data available");
        }
      }).catch((error) => {
        console.error(error);
      });



    };

    fetchPosts();
  }, [username]);

  console.log(posts, 'hi');

  return (

    <div className="w-full flex justify-center">

      <div className="w-3/4 bg-dark-2 my-2 p-3">
        <div className="w-3/4 bg-dark-2 my-2 p-3 flex">
          <div className=" w-full  flex flex-between justify-center items-center">
            <img src="/assets/images/profile.png" alt="" />
            <div>
              <h2>{username.name} {username.surname}</h2>
              <p>@{username.username}</p>

            </div>

          </div>
        </div>
        <h1>Posts</h1>


        <div>
          <div>
            {posts.map((post, index) => (
              <PostComponent key={index} post={JSON.stringify(post)} />
            ))}

          </div>
          <div>
            <LikesData data={likesData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;