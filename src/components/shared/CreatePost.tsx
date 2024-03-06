import React from 'react'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import { Button } from '../ui/button'
import { PostValidation } from '@/lib/validations'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from 'zod'
import { Textarea } from "@/components/ui/textarea"


const CreatePost = () => {
    const form = useForm<z.infer<typeof PostValidation>>({
        resolver: zodResolver(PostValidation),
        defaultValues: {
            text: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof PostValidation>) {
        // create the user
        const newUser = values
        if (!newUser) {
            return;
        } else {
            console.log(values)
        }

    }

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
    )
}

export default CreatePost