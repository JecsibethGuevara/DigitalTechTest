import * as z from "zod";

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { SignUpValidation } from "@/lib/validations";
import Loader from "@/components/shared/Loader";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "@/lib/redux/user.js";
import { User } from "@/types/userTypes";
import { getDatabase, ref as dbref, set } from "firebase/database";
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, getStorage, uploadBytes, ref } from "firebase/storage";


function SignupForm() {
  const isLoading = false;
  const dispatch = useDispatch(); 
  const uuid = uuidv4();
  const database = getDatabase();
  const storage = getStorage(); // Initialize Firebase Storage


  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
        id: "1",
      name: "",
      surname: "",
      username: "",
      avatar : ""
      
    },
  })

  async function  onSubmit(values: z.infer<typeof SignUpValidation>) {
    values.id =  uuid;
    writeUser(values)
    dispatch(setUser(values));
  }

  const writeUser = async (user: User) => {
    const avatarFile = form.getValues("avatar"); // Get the selected file from the form
  
    if (avatarFile) {
      const avatarRef = ref(storage, `avatars/${uuid}`);
      await uploadBytes(avatarRef, avatarFile); // Upload the file to Firebase Storage
  
      const downloadURL = await getDownloadURL(avatarRef); // Get the download URL of the uploaded file
  
      user.avatar = downloadURL; // Assign the download URL to the user's avatar property
    }
  
    set(dbref(database, "users/" + uuid), user); // Save the user data (including the avatar URL) to the Realtim
  }
  return (

    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12" >Create a new account</h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">Please enter your account details</p>
      

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          
          <FormField
            control={form.control}
            name="name"
            render={({field}) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input"{...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="surname"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Surname</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="sex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gender</FormLabel>
                <FormControl>
                  <select className="shad-input" {...field}>
                    <option value="f">Female</option>
                    <option value="m">Male</option>
                  </select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="avatar"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Avatar</FormLabel>
                <FormControl>
                  <Input type="file" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="shad-button_primary">
            {isLoading ? (
              <div className="flex-center gap-2" >
                <Loader/>Loading...
              </div>
            ) : "Sign Up"}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2 ">
            Already have an account? <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1"  >Log in!</Link>
          </p>
        </form>
      </div>
    </Form>
    

  )
}

export default SignupForm;