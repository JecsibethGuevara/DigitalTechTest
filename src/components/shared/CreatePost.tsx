import  { useEffect, useState } from 'react';
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Button } from '../ui/button';
import { PostValidation } from '@/lib/validations';
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { savePost } from '@/lib/localStorage/posts';
import { Post } from '@/types/postTypes';
import { useDispatch, useSelector } from 'react-redux';

interface CreatePostFormValues {
  text: string;
}

interface LoggedInUser {
  username: string;
}

const CreatePost = () => {
  const dispatch = useDispatch
  const [username, setUsername] = useState( useSelector((state) => state.user.username));
  
  const form = useForm<CreatePostFormValues>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      text: "",
    },
  });

  // Define a submit handler.
  const onSubmit = async (values: CreatePostFormValues) => {
    // create the user
    const newPost: Post = {
      image: '',
      text: values.text,
      likes: [],
      author: username,
      createdAt: new Date().toISOString(),
      status: 'published',
    };

    savePost(newPost);
  };

  return (
    <div className="w-full bg-dark-3 p-5 border-b-1-slate mb-2">
      <div className="flex gap-5">
        <div>
          <img src="/assets/images/profile.png" alt="" />
        </div>
        <div>
          <div className="flex gap-3 mb-3">
            <h3> Name Surname </h3>
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

                <div className='flex items-center flex-between justify-center px-16' >
                  <button type='button'>
                    <img src="/assets/icons/gallery-add.svg" alt="" />
                  </button>
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