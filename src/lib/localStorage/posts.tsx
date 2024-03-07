import { Post } from '@/types/postTypes';
import { User } from '@/types/userTypes';
import { getCurrentUser } from './saveUser';

const savePost = (values: Post) => {
    // Get posts from local storage
    let storedData = localStorage.getItem('posts');
  
    if (storedData) {
      // Parse existing data
      const parsedData: Post[] = JSON.parse(storedData);
      // Add new post to existing data
      parsedData.push(values);
      // Store updated data in local storage
      localStorage.setItem('posts', JSON.stringify(parsedData));
    } else {
      // Create a new array with the new post
      const data = JSON.stringify([values]);
      // Store the new array in local storage
      localStorage.setItem('posts', data);
    }
  };
  
  const getPosts = (): Post[] | null => {
    // Get posts from local storage
    const storedData = localStorage.getItem('posts');
    if (storedData) {
      // Parse and return the posts
      let posts = JSON.parse(storedData);
      console.log(posts)
      return posts
    }

    return null;
  };
  
  // const updatePostsLikes = (values: Post[], username : string) => {
  //   // Store the updated posts in local storage
  //   let data = localStorage.getItem('posts')

  //   if(data){
  //     let allPosts = JSON.parse(data)
  //     let currentUser = getCurrentUser(username)
  //     let likedPost = allPosts.map((post : Post) =>{
  //       if(post.text === values.text  ){
  //         if(post.likes.username !== username){

  //         } ? post.likes.push(currentUser) : post.likes.
          
  //       }
  //       return post
  //     } );
  //     console.log(likedPost)
  //   }
  // };
  
  export { savePost, getPosts };