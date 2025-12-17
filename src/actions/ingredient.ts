"use server"

import {ingredientSchema} from "@/schema/zod";
import prisma from "@/utils/prisma";
import {ZodError} from "zod";

export async function createIngredient(formData: FormData) {
    try {
        const data = {
            name: formData.get('name') as string,
            category: formData.get('category') as string,
            unit: formData.get('unit') as string,
            pricePerUnit: formData.get('pricePerUnit') ?
                parseFloat(formData.get('pricePerUnit') as string) :
                null,
            description: formData.get('description') as string,
        }
        const validatedData = ingredientSchema.parse(data);

        const ingredient = await prisma.ingredient.create({
            data: {
                name: validatedData.name,
                category: validatedData.category,
                unit: validatedData.unit,
                pricePerUnit: validatedData.pricePerUnit,
                description: validatedData.description,
            }
        })
        return {success: true, ingredient}
    } catch (er) {
        if (er instanceof ZodError) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            return {error: er.errors.map((e) => e.message).join(', ')};
        }
        console.error(er);
        return {error: 'Error creating ingredient'}
    }
}
export async function getIngredients() {
    try {
        const ingredients = await prisma.ingredient.findMany();
        return {
            success: true,
            ingredients
        };
    } catch (e) {
        console.error('Error to get ingredients', e);
        return {error: 'Error getting ingredients'};
    }
}

export async function deleteIngredient(id: string) {
    try {
        const ingredient = await prisma.ingredient.delete({
            where: {id}
        });
        return {
            success: true,
            ingredient
        };
    } catch (e) {
        console.error('Error to delete ingredient', e);
        return {error: 'Error deleting ingredient'};
    }
}