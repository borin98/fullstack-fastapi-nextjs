import {NextRequest, NextResponse} from "next/server";
import {deleteALLItems, deleteItem, getAllMessages, postMessage} from "@/app/lib/infos";
import {ItemList} from "@/components/InputComp";

export async function GET() {
    console.log("To na rota envenenada do server");
    const url = `${process.env.NEXT_PUBLIC_BACKEND_IP_ROUT}${process.env.NEXT_PUBLIC_FASTAPI_PATH}get_all_messages`;
    console.log(url);
    const todoList = await getAllMessages(url);
    return NextResponse.json(todoList);
}

export async function POST(request: NextRequest) {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_IP_ROUT}${process.env.NEXT_PUBLIC_FASTAPI_PATH}post_message`;
    const itemJson: ItemList = await request.json();
    console.log("POST function");
    console.log("url to server : ", url);
    console.log("itemJson : ", itemJson);
    const returnedItem = await postMessage(url, itemJson);
    return NextResponse.json(returnedItem);
}

export async function DELETE(request: NextRequest) {
    const {removeAll, keyToRemove}: { removeAll: boolean, keyToRemove: number } = await request.json();
    console.log("Oi rota do delete_all_items");
    if (removeAll) {
        console.log("Deleting all items");
        const url = `${process.env.NEXT_PUBLIC_BACKEND_IP_ROUT}${process.env.NEXT_PUBLIC_FASTAPI_PATH}delete_all_messages`;
        console.log(url);
        const newTodoList = await deleteALLItems(url);
        return NextResponse.json(newTodoList);
    } else {
        console.log("Deleting key =", keyToRemove);
        const url = `${process.env.NEXT_PUBLIC_BACKEND_IP_ROUT}${process.env.NEXT_PUBLIC_FASTAPI_PATH}delete_message/${keyToRemove}`;
        console.log(url);
        const removedItem = await deleteItem(url);
        return NextResponse.json(removedItem);
    }
}