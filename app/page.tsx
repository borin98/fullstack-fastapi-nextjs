import InputComp from "@/components/InputComp";
import OutputList from "@/components/OutputList";
import {getAllMessages, getListLen} from "@/app/lib/infos";

const URL_GET_ALL_MESSAGES = `${process.env.NEXT_PUBLIC_BACKEND_IP_ROUT}${process.env.NEXT_PUBLIC_FASTAPI_PATH}get_all_messages`;

export default async function Home() {
    const initialTodoList = await getAllMessages(URL_GET_ALL_MESSAGES);

    return (
        <>
            <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
                <h1>TODO List</h1>
            </div>
            <InputComp initialId={initialTodoList.length - 1}/>
            <OutputList initialTodoList={initialTodoList}/>
        </>
    )
}
