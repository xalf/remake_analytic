"use client";

import { Form, Radio, RadioGroup, Skeleton } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import { loadAccountsList } from "./action";
import { Account } from "@/domain/account";

export default function SelectAccountForm() {
    const query = useQuery({ queryKey: ['accountsList'], queryFn: loadAccountsList });
    console.log("account query", query);

    if (query.isLoading) {
        return <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
                <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
                <div className="h-3 w-4/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
                <div className="h-3 w-2/5 rounded-lg bg-default-300" />
            </Skeleton>
        </div>
    }

    if (query.error) {
        return <div>{query.error.message}</div>
    }

    return (
        <Form>
            <RadioGroup>
                {query.data?.map((item: Account) => <Radio key={item.id} value={item.id.toString(10)}>{item.name}</Radio>)}
            </RadioGroup>
        </Form>
    );
}