import { AuthLoginQuery, AuthRefreshQuery, AuthResponse } from "@/domain/auth";
import { User } from "@/domain/user";

export default interface ILoginApi {
    login(query: AuthLoginQuery): Promise<AuthResponse>;
    refresh(query: AuthRefreshQuery): Promise<AuthResponse>;
    getUser(): Promise<User>; // должно ли оно быть тут или в отдельном апи?
}

