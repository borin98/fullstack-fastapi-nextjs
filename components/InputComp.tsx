"use client"

import {useState} from "react";
import {PostStatus} from "@/app/lib/infos";

export interface ItemList {
    key: number,
    message: string
}

const MESSAGES_ROUTE = "/api/messages"

async function insertPythonItem(item: ItemList) {
    const mgnResponsePost = await fetch(MESSAGES_ROUTE, {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const postStatus: PostStatus = await mgnResponsePost.json();
    console.log("post status : ", postStatus);

    // exemplo de resposta com o GET
    // const mgnResponse = await fetch("api/messages", {
    //     method: "GET"
    // });
    //
    // const mgnJson: MessageTest = await mgnResponse.json();
    // console.log("resposta tunada");
    // console.log(mgnJson)
}

async function deleteAllItems() {
    const mgnResponseDelete = await fetch(MESSAGES_ROUTE, {
        method: "DELETE",
        body: JSON.stringify({
            "removeAll": true
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const oldTodoList: ItemList[] = await mgnResponseDelete.json();
    console.table(oldTodoList);

}

export default function InputComp({initialId}: { initialId: number }) {
    const [itemId, setItemId] = useState<number>(initialId);
    const [itemMessage, setItemMessage] = useState<string>("");

    return (
        <div className={"z-10 gap-1 max-w-5xl w-full items-center font-mono text-sm lg:flex"}>
            <input className={"border text-black flex gap-1 items-center px-2 py-1 rounded " +
                "text-sm hover:bg-indigo-900 hover:text-slate-50"}
                   onChange={(e) => setItemMessage(e.target.value)}/>
            <div className={"flex gap-2 items-center"}>
                <button
                    type={"submit"} className={"border flex gap-1 items-center px-2 py-1 rounded text-slate-100 " +
                    "text-sm hover:bg-indigo-900 hover:text-slate-50"}
                    onClick={() => {
                        insertPythonItem({
                            key: itemId,
                            message: itemMessage
                        });
                        setItemId(itemId + 1);
                    }}>
                    Push item
                </button>
                <button
                    type={"submit"} className={"border flex gap-1 items-center px-2 py-1 rounded text-slate-100 " +
                    "text-sm hover:bg-indigo-900 hover:text-slate-50"}
                    onClick={() => {
                        deleteAllItems()
                        setItemId(0);
                    }}>
                    Delete all items
                </button>
            </div>
        </div>
    );
}
