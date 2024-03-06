import { INewUser } from "@/types";
import { ID } from "appwrite";
import { account, avatars, databases } from "./config";

export async function createUserAccount(user:INewUser){
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.name,
            user.username,
           
        );

        if(!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(user.name);
        const newUser =  await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            surname: newAccount.surname,
            username: user.username,
            imageUrl: avatarUrl
        });
        return newUser;
    } catch (error) {
        console.log(error)
        return error;
    }
}

export async function saveUserToDB(user: {
    accountId : string,
    surname: string,
    name: string,
    imageUrl: URL,
    username?: string
}){
    try {
        const newUser = await databases.createDocument(
            '65a3883d33d159291648',
            '65a388b1dd7ed6cc888d',
            ID.unique(),
            user
        )
        return newUser
    } catch (error) {
        console.log(error)
    }
}