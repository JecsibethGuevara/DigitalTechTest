import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignInValidation } from "@/lib/validations";
import Loader from "@/components/shared/Loader";
import { Link } from "react-router-dom";
import { loginUsername } from "@/lib/localStorage/saveUser";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/lib/redux/user";

function SignupForm() {

  const isLoading = false;

  const dispatch = useDispatch(); 
  let isLoggedIn = useSelector((state : {user : any}) => state.user);
  console.log(isLoggedIn, 'logedIn')
  // 1. Define form.
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      username: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit = async (values: z.infer<typeof SignInValidation>)=> {
    // create the us

   const user = await loginUsername(values.username)
    if (user.username) {
      dispatch(setUser(user));
    } else {
      console.log("error");
    }
  }

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <img src="/assets/images/logo.svg" alt="logo" />

        <h2 className="h3-bold md:h2-bold pt-5 sm:pt-12">
          Create a new account
        </h2>
        <p className="text-light-3 small-medium md:base-regular mt-2">
          Please enter your account details
        </p>

        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-5 w-full mt-4"
        >
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

          <Button type="submit" className="shad-button_primary">
            {isLoading ? (
              <div className="flex-center gap-2">
                <Loader />Loading...
              </div>
            ) : (
              "Sign Up"
            )}
          </Button>

          <p className="text-small-regular text-light-2 text-center mt-2 ">
            Already have an account?{" "}
            <Link to="/sign-in" className="text-primary-500 text-small-semibold ml-1">
              Log in!
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
}

export default SignupForm;
