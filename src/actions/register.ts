"use server"

import {IFormData} from "@/types/form-data";
import prisma from "@/utils/prisma";
import {saltAndHashPassword} from "@/utils/password";

export async function registerUser(formData: IFormData) {
    const {email, password, confirmPassword} = formData

    if(password !== confirmPassword) {
        return {
            error: "Passwords do not match",
        }
    }
    if(password.length < 6) {
        return {
            error: "Password is too short < 6",
        }
    }
    try {
        const existingUser = await prisma.user.findUnique({
            where: {email}
        })
        if(existingUser) {
            return {
                error: "User already exists with that email",
            }
        }

        const pwHash = await saltAndHashPassword(password)

        const user = await prisma.user.create({
            data:{
                email: email,
                password: pwHash,
            }
        })
        return user
    } catch (error) {
        console.log('Error registration', error);
    }

 }