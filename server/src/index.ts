import { app } from "./app";

const start = () => {

   

    try {
        app.listen({
            port: 3000
        }).then(() => {
            console.log('server rodando em http://localhost:3000')
        })
    } catch (error) {
        console.log(error)
    }



}

start()