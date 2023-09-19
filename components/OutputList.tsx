"use client"

import {ItemList} from "@/components/InputComp";
import {useIsClient} from "@/app/lib/hooks";
import {useCallback, useEffect, useState} from "react";

export const dynamic = "force-dynamic"
export const revalidate = 3000

const URL_GET_ALL_MESSAGES = "/api/messages/"

async function removeItem(itemId: number) {
    const deleteResponse = await fetch(URL_GET_ALL_MESSAGES, {
        method: "DELETE",
        body: JSON.stringify({
            "removeAll": false,
            "keyToRemove": itemId
        })
    })
}

export default function OutputList({initialTodoList}: { initialTodoList: ItemList[] }) {
    const isClient = useIsClient();
    const [todoList, setTodoList] = useState<ItemList[]>(initialTodoList);

    // Em caso queremos pegar a cada mudança do backend
    // useEffect(() => {
    //         (async () => {
    //             const response = await fetch(URL_GET_ALL_MESSAGES, {
    //                 method: "GET",
    //                 next: {
    //                     revalidate: 10000
    //                 }
    //             });
    //             const todoListResponse: ItemList[] = await response.json();
    //             setTodoList(todoListResponse);
    //         })();
    //     }, [todoList, setTodoList]);

    const loadTodoList = useCallback(async function () {
        const response = await fetch(URL_GET_ALL_MESSAGES, {
            method: "GET"
        });
        const todoListResponse: ItemList[] = await response.json();
        setTodoList(todoListResponse);
    }, [])

    useEffect(() => {
        const timerId = setInterval(loadTodoList, revalidate);
        return () => clearInterval(timerId);
    }, [todoList, setTodoList]);

    if (!isClient) {
        return null;
    }

    return (
        <div>
            <ul className={"flex flex-col gap-3"}>
                {todoList.map((todoItem, index) => (
                    <li key={index} className={"bg-white border shadow w-80 sm:w-full hover:shadow-xl"}>
                        <div className={"px-2 py-1 text-black text-center sm:text-left"}>
                            <p className={"hidden pt-2 sm:block"}>
                                {todoItem.key}
                            </p>
                            <h1 className={"font-semibold font-orbitron sm:px-2"}>
                                {todoItem.message}
                            </h1>
                            <div className={"flex gap-2 items-center"}>
                                <button type={"submit"}
                                        className={"border bg-black flex gap-1 items-center px-2 py-1 rounded text-slate-100 " +
                                            "text-sm hover:bg-indigo-900 hover:text-slate-50"}
                                        onClick={() => removeItem(todoItem.key)}>
                                    Delete Message {todoItem.key}
                                </button>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
