import {useEffect, useState} from "react";

export function useIsClient(): boolean {
    const [isClient, setIsClient] = useState<boolean>(false);

    // We're using useEffect only to render the component into the browser instead of the server and then the client
    useEffect(() => {
        setIsClient(true);
    }, []);

    return isClient;
}