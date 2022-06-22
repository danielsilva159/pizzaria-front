import { canSSRAuth } from "../../utils/canSSRAuth"

export default function dashboard(){
    return(
        <div>
            <h1>Bem vindo ao painel</h1>
        </div>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) =>{
    return{
        props:{}
    }
})