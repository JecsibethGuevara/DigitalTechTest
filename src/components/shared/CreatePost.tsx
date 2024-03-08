
import  { useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from '../ui/button';
import { PostValidation } from '@/lib/validations';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Post } from '@/types/postTypes';
import {  useSelector } from 'react-redux';
import { Input } from "@/components/ui/input";
import { getDatabase, ref, set } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';



const CreatePost = () => {
  const uuid = uuidv4();
  const [username, setUsername] = useState( useSelector((state: { user: any; }) => state.user.username));
  const database = getDatabase();

  const form = useForm<Post>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      text: "",
      image: ""
    },
  });
  const writePost = (post :Post) =>{
    set(ref(database, 'posts/' + uuid ),{
      ...post
    })
  }
  const onSubmit = async (values: Post) => {
    const newPost: Post = {
      id: '',
      image: values.image,
      text: values.text,
      likes: [],
      author: username,
      createdAt: new Date().toISOString(),
      status: 'published',
    };
    writePost(newPost);
  };

  return (
    <div className="w-full bg-dark-3 p-5 border-b-1-slate mb-2">
      <div className="flex  gap-5">
        <div className="w-1/4">
          <img className="w-3/4" src="/assets/images/profile.png" alt="" />
        </div>
        <div>
          <div className="flex gap-3 mb-3">
          <Link to="/user">
          <h3 className=" font-bold text-2xl"> Hi! {username}</h3>
              </Link>
              
            
          </div>

          <Form {...form}>
            <div className="sm:w-420 flex-center flex-col">
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-3 w-full mt-4">
                <FormField
                  control={form.control}
                  name="text"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Textarea autoFocus placeholder='Say Something' className="bg-dark-3 border-none" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                

                <div className='flex items-left flex-between justify-center px-16' >
                  
                  <Button type="submit" className="shad-button_primary">
                    Post
                  </Button>
                </div>
              </form>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;