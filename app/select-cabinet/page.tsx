import getUser from "@/feature/getUser/action";
import { UserProvider } from "@/feature/getUser/UserProvider";
import SelectAccountForm from "@/feature/selectAccount/SelectAccountForm";
import Header from "@/shared/ui/Header";

export default async function SelectCabinetPage() {
    const user = await getUser();
    console.log("user", user)
    return (
        <UserProvider initialUser={user}>
            <Header />
            <div className="p-6 w-68 bg-white border border-slate-200 rounded-xl">
                <h3 className="text-lg font-semibold">
                    Выберите кабинет
                </h3>
                <p className="text-sm font-normal">
                    Вам доступны следующие аккаунты
                </p>

                <SelectAccountForm />
            </div>
        </UserProvider>
    );
}