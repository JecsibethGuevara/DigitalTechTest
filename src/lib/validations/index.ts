import * as z from "zod";
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];


export const SignUpValidation = z.object({
    name : z.string().min(2, {message: "Too Short"} ),
    surname : z.string().min(2, {message: "Too Short"} ),
    username: z.string().min(2).max(50, {message: "Please enter a shorter username"}),
    // avatar : z.object({
    //   image : z.any().refine((file) => file?.size <= 5000000, 'Max image size is 5MB').refine((file) => ACCEPTED_IMAGE_TYPES,"Only .jpg, .jpeg, .png and .webp formats are supported." )
    // })
  });

export const SignInValidation = z.object({
  username: z.string().min(2).max(50, {message: "Please enter a shorter username"}),
});
export const PostValidation = z.object({
  text: z.string().min(2).max(5000, {message: "Please enter a shorter post"}),
});