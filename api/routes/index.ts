import path from "path"
import auth from "./auth"
import master from './master'
import misc from './misc'
import variable from './variable'

const routes = [
    {
        location: '/auth',
        dir: auth
    },
    {
        location: '/master',
        dir: master
    },
    {
        location: '/misc',
        dir: misc
    },
    {
        location: '/variable',
        dir: variable
    },
    // {
    //     location: '*',
    //     dir: (req: Request, res: Response) => {
    //         res.status(404);
    //         if (req.accepts("html")) {
    //           res.sendFile(path.join(__dirname, "views", "404.html"));
    //         } else if (req.accepts("json")) {
    //           res.json({ message: "404 not Found" });
    //         } else {
    //           res.type("txt").send("404 Not Found");
    //         }
    //       }
    //   }
]

export default routes