'use client';

import { HeroUIProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useRouter } from "next/navigation";


const queryClient = new QueryClient()

export default function Providers({ children }: { children: React.ReactNode; }) {
    const router = useRouter();
    return <HeroUIProvider navigate={router.push}>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    </HeroUIProvider>
}