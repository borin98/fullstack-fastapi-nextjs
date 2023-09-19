import "server-only"
import {ItemList} from "@/components/InputComp";

export interface MessageTest {
    message: string
}

export interface PostStatus {
    message: boolean
}

async function fetchToPython(url: string, method: string, payload?: any) {
    return fetch(url, {
        method: method,
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        }
    });
}

export async function getMessage(url: string): Promise<MessageTest> {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    return await response.json() as MessageTest;
}

export async function postMessage(url: string, item: ItemList) {
    const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(item),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const jsonResponse: PostStatus = await response.json();
    console.log("post return");
    console.log(jsonResponse);

    return jsonResponse;
}

export async function getAllMessages(url: string) {
    console.log("getAllMessages url : ", url);

    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        },
        cache: "no-cache"
    });

    const todoList: ItemList[] = await response.json();
    // console.log("my todoList : ", todoList);

    return todoList;
}

export async function getListLen(url: string) {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const listMessages: ItemList[] = await response.json();
    // console.log("listMessages : ", listMessages);
    // console.log("listMessages len : ", listMessages.length);

    return listMessages.length;
}

export async function deleteALLItems(url: string) {
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const oldListMessages: ItemList[] = await response.json();
    console.log("listMessages : ", oldListMessages);
    console.log("listMessages len : ", oldListMessages.length);

    return oldListMessages;
}

export async function deleteItem(url: string) {
    const response = await fetch(url, {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const oldListMessages: ItemList = await response.json();
    console.log("listMessages : ", oldListMessages);

    return oldListMessages;
}