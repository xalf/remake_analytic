"use server";

import { User } from "@/domain/user";
import LoginApi from "@/shared/api/LoginApi";

export default async function getUser(): Promise<User> {
    const api = new LoginApi();

    return api.getUser();
}