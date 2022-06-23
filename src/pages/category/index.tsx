import Head from 'next/head'
import {FormEvent, useState} from 'react'
import { Header } from '../../components/Header'
import styles from './styles.module.scss'
import {setupAPIClient} from '../../services/api'
import { toast } from 'react-toastify'

export default function Category(){
    const [name, SetName] = useState('');

    async function handleRegister(event: FormEvent){
        event.preventDefault();

        if(name === ''){
            return ;
        }

        const apiClient = setupAPIClient();
        await apiClient.post('/category', {
            name: name
        })

        toast.success('Categoria cadastrada com sucesso')
        SetName('')

    }


    return(
        <>
        <Head>
            <title>Nova Categoria - Sujeito Pizzaria</title>
        </Head>
        <div>
            <Header />
            <main className={styles.container}>
                <h1>Cadastrando categorias</h1>

                <form className={styles.form} onSubmit={handleRegister}>
                    <input 
                    type='text' 
                    value={name} 
                    placeholder='Digite o nome da categoria' 
                    className={styles.input} 
                    onChange={(e) => SetName(e.target.value)} />
                    <button type='submit' className={styles.buttonAdd}>Cadastrar</button>
                </form>
            </main>
        </div>



        </>
    )
}