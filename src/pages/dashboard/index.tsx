import Head from "next/head"
import { Header } from "../../components/Header"
import { canSSRAuth } from "../../utils/canSSRAuth"
import styles from './styles.module.scss';
import {FiRefreshCcw} from 'react-icons/fi';
import { setupAPIClient } from "../../services/api";
import {useState} from 'react'

type OrderProps = {
    id: string;
    table: string;
    status: string | number;
    draft: boolean;
    name: string | null;
}

interface HomeProps{
    orders: OrderProps[]
}

export default function dashboard({orders}: HomeProps){
    
    const [orderList, setOrderList] = useState(orders || []);

    function handleOpenModalView(id: string){
        alert('test')
    }
    return(
       <>
        <Head>
            <title>Painel - Sujeito Pizzaria</title>
        </Head>
        <Header />
        <main className={styles.container}>
            <div className={styles.containerHeader}>
                <h1>Ultimos pedidos</h1>
                <button>
                    <FiRefreshCcw color="#3fffa3" size={25} />
                </button>
            </div>

            <article className={styles.listOreders}>
                {orderList.map(item =>(
                <section key={item.id} className={styles.orderItem}>
                    <button onClick={() => handleOpenModalView(item.id)}>
                        <div className={styles.tag}></div>
                        <span>Mesa {item.table}</span>
                    </button>
                </section>
                ))}
            </article>

        </main>
       </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) =>{
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/orders');
    
    return{
        props:{
            orders: response.data
        }
    }
})