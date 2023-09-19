from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()


class Item(BaseModel):
    key: int
    message: str


todo_list: list[dict[str, str]] = []


@app.get("/api_python/get_message")
async def get_message() -> dict[str, str]:
    return {
        "message": "Hello World"
    }


@app.post("/api_python/post_message")
async def post_message(item: Item) -> dict[str, bool]:
    todo_list.append({
        "key": item.key,
        "message": item.message
    })
    print("todo_list in post_message : {}".format(todo_list))

    return {
        "message": True
    }


@app.put("/api_python/put_message")
async def put_message(new_item: Item, old_key: int) -> dict[str, str]:
    old_item = todo_list[old_key]
    new_element_list = old_item.copy()
    new_element_list["message"] = new_item.message
    todo_list[old_key] = new_element_list

    return {
        "old_key": old_key,
        "old_message": old_item["message"]
    }


@app.delete("/api_python/delete_message/{item_id}")
async def delete_message(item_id: int) -> dict[str, str]:
    id_item_to_remove: int = next((index for (index, d) in enumerate(todo_list) if d["key"] == item_id), -1)
    print(id_item_to_remove)
    removed_item = todo_list.pop(id_item_to_remove)

    return {
        "removed_key": "{}".format(item_id),
        "removed_message": removed_item["message"]
    }


@app.delete("/api_python/delete_all_messages")
async def delete_all_message() -> list[dict[str, str]]:
    old_todo_list = todo_list
    todo_list.clear()
    print("actual todo_list : {}".format(todo_list))
    print("old todo_list : {}".format(old_todo_list))

    return old_todo_list


@app.get("/api_python/get_all_messages")
async def get_all_messages() -> list[dict[str, str]]:
    print("todo_list in get_all_messages : {}".format(todo_list))
    return todo_list
