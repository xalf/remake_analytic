import getUser from "@/feature/getUser/action";
import { UserProvider } from "@/feature/getUser/UserProvider";
import SelectAccountForm from "@/feature/selectAccount/SelectAccountForm";
import Header from "@/shared/ui/Header";

export default async function SelectCabinetPage() {
  const user = await getUser();
  return (
    <UserProvider initialUser={user}>
      <div className="flex flex-col h-screen items-center">
        <Header />
        <main className="flex-grow flex items-center">
          <SelectAccountForm />
        </main>
      </div>
    </UserProvider>
  );
}
