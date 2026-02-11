"use server";

import LoginApi from '@/shared/api/LoginApi';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z, flattenError } from 'zod';

export interface LoginErrorState {
    errors: {
        email?: string[];
        password?: string[];
    };
}
const LoginSchema = z.object({
    email: z.email("Неверная почта"),
    password: z.string().min(5, "Пароль должен быть больше 5 символов").max(15, "Пароль должен быть меньше 15 символов")
});

export async function loginAction(previosState: LoginErrorState | undefined, form: FormData): Promise<LoginErrorState | undefined> {
    const parseResult = LoginSchema.safeParse({
        password: form.get('password'),
        email: form.get('email')
    });

    if (!parseResult.success) {
        return { errors: flattenError(parseResult.error).fieldErrors };
    }

    console.log('login data', parseResult.data);

    const api = new LoginApi();
    const authTokens = await api.login(parseResult.data);
    const cookieStore = await cookies();

    cookieStore.set("X_ACCESS_TOKEN", authTokens.access_token, { httpOnly: true, maxAge: 6600 });
    cookieStore.set("X_REFRESH_TOKEN", authTokens.refresh_token, { httpOnly: true, maxAge: 594000 });

    redirect('/select-cabinet');
}