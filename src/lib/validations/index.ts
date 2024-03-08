import * as z from "zod";
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


export const SignUpValidation = z.object({

    id: z.string(),
    name : z.string().min(2, {message: "Too Short"} ),
    surname : z.string().min(2, {message: "Too Short"} ),
    username: z.string().min(2).max(50, {message: "Please enter a shorter username"}),
    sex: z.string().min(1).max(1),
    avatar : z.string().min(0).max(5000, {message: "Please enter a shorter post"}),
  });

export const SignInValidation = z.object({
  username: z.string().min(2).max(50, {message: "Please enter a shorter username"}),
});
export const PostValidation = z.object({
  text: z.string().min(2).max(5000, {message: "Please enter a shorter post"}),
  image : z.string().min(0).max(5000, {message: "Please enter a shorter post"}),
});