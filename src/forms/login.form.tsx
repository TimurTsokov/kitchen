"use client";

import {Button, Form, Input} from '@heroui/react';
import {FormEvent, useState} from "react";

interface IProps {
    onClose: () => void
}

const LoginForm = ({onClose}: IProps) => {
    const [formData, setFormData] = useState({email: '', password: '', confirmPassword: ''})

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onClose();
    }

    return (
        <Form className="w-full" onSubmit={handleSubmit}>
            <Input
                aria-label="Email"
                isRequired
                name="email"
                placeholder="Введите email"
                type="email"
                value={formData.email}
                classNames={{
                    inputWrapper: "bg-default-100",
                    input: "text-sm focus:outline-none"
                }}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                validate={(value) => {
                    if (!value) return "Почта обязательна";
                    return null;
                }}
            />
            <Input
                isRequired
                name="password"
                placeholder="Введите пароль"
                type="password"
                value={formData.password}
                classNames={{
                    inputWrapper: "bg-default-100",
                    input: "text-sm focus:outline-none"
                }}
                onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                }
                validate={(value) => {
                    if (!value) return "Пароль обязателен";
                    return null;
                }}
            />
            <div className="flex w-[100%] gap-4 items-center pt-8 justify-end">
                <Button variant='light' onPress={onClose}>
                    Cancel
                </Button>
                <Button color='primary' type="submit">
                    Login
                </Button>
            </div>
        </Form>
    );
};
export default LoginForm;
