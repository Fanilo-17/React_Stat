import Defense from "./page/Defense";
import Global from "./page/Global";
import Attaque from "./page/Attaque";

export const routes = [
    {
        path: "/",
        element: <Global />
    },
    {
        path: "/defense",
        element: <Defense />
    },
    {
        path: "/attaque",
        element: <Attaque />
    }
]