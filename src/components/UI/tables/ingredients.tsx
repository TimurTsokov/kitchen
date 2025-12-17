"use client"

import { useAuthStore } from '@/store/auth.store';
import { useIngredientStore } from '@/store/ingredient.store';
import {Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow} from '@heroui/react';
import {CATEGORY_OPTIONS, UNIT_OPTIONS} from "@/constants/select-options";

const IngredientsTable = () => {
    const { ingredients, removeIngredient, isLoading } = useIngredientStore()
    const { isAuth } = useAuthStore();

    const handleDelete = async (id: string) => {
        await removeIngredient(id);
    }

    const getCategoryLabel = (value: string) => {
        const option = CATEGORY_OPTIONS.find((opt) => opt.value === value);
        return option ? option.label : value;
    }

    const getUnitLabel = (value: string) => {
        const option = UNIT_OPTIONS.find((opt) => opt.value === value);
        return option ? option.label : value;
    }

    return !isLoading && isAuth && ingredients.length > 0 ? (
        <Table
            aria-label="List of Ingredients"
            classNames={{
                wrapper: "mt-4",
                table: "w-full",
                th: "text-black",
                td: "text-black"
            }}
        >
            <TableHeader>
                <TableColumn>Name</TableColumn>
                <TableColumn>Category</TableColumn>
                <TableColumn>Unit of Meas.</TableColumn>
                <TableColumn>Price for one</TableColumn>
                <TableColumn>Description</TableColumn>
                <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
                {ingredients.map((ingredient) => (
                    <TableRow key={ingredient.id}>
                        <TableCell>{ingredient.name}</TableCell>
                        <TableCell>{getCategoryLabel(ingredient.category)}</TableCell>
                        <TableCell>{getUnitLabel(ingredient.unit)}</TableCell>
                        <TableCell>
                            {ingredient.pricePerUnit !== null
                                ? `${ingredient.pricePerUnit} ₽`
                                : "-"}
                        </TableCell>
                        <TableCell>{ingredient.description || "-"}</TableCell>
                        <TableCell>
                            <Button color="danger"
                                    size="sm"
                                    onPress={()=> handleDelete(ingredient.id)}>
                                    Delete
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    ) : (
        <p className="mt-4">
            {!isAuth ? 'User is not registered' : ingredients.length == 0 ? 'Table is empty' : 'Loading...'}
        </p>
    )
}

export default IngredientsTable;
