'use client';

import { Button } from "@heroui/button";
import { Form, Input } from "@heroui/react";
import { useActionState } from "react";
import { loginAction, LoginErrorState } from '@/feature/login';

export default function LoginForm() {
    const initialState: LoginErrorState = { errors: {} };
    const [formState, formAction, isPending] = useActionState(loginAction, initialState);

    return (
        <Form action={formAction} validationErrors={formState?.errors}>
            <Input 
                type="email" 
                placeholder="Почта" 
                name="email" 
            />
            <Input 
                type="password" 
                placeholder="Пароль" 
                name="password" 
            />
            <Button type="submit" isLoading={isPending}>Войти</Button>
        </Form>
    );
}