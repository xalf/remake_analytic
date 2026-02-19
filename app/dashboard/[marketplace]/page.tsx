import AnalyticTable from "@/feature/analitic/AnalyticTable";
import getUser from "@/feature/getUser/action";
import { UserProvider } from "@/feature/getUser/UserProvider";
import MarketplaceTabs from "@/feature/selectMarketplace/MarketplaceTabs";
import Header from "@/shared/ui/Header";

export default async function DashboardPage() {
  const user = await getUser();
  return (
    <UserProvider initialUser={user}>
      <div className="flex flex-col h-screen items-center">
        <Header showAccountSelector={true} />
        <main className="flex-grow flex items-center">
          <div className="pt-6">
            <MarketplaceTabs />
            <div className="my-9 flex">
              <h1 className="text-2xl font-semibold">Аналитика бизнеса</h1>
            </div>
            <AnalyticTable />
          </div>
        </main>
      </div>
    </UserProvider>
  );
}
