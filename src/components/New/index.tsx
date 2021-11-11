import React, {Dispatch, SetStateAction, useState} from "react";
import {AiFillCloseCircle} from "react-icons/ai";

import styles from './styles.module.scss';

import {Input} from "../Input";
import {Button} from "../Button";
import {Select} from "../Select";

import {useDevelopers} from "../../hooks/developers";

type NewProps = {
    visible: boolean;
    close: Dispatch<SetStateAction<boolean>>;
}

export function New({visible, close}: NewProps){
    const {insertNewDeveloper} = useDevelopers();

    const [nome, setNome] = useState('');
    const [sexo, setSexo] = useState('');
    const [nascimento, setNascimento] = useState('');
    const [hobby, setHobby] = useState('');

    const [error, setError] = useState<string | undefined>(undefined)

    // Close the modal
    function handleClose(){
        setNome('');
        setSexo('');
        setNascimento('');
        setHobby('');
        setError(undefined);

        close(false)
    }

    // Check the data before send the request to the api
    async function handleNew(){
        if(nome === ''){
            setError('Por favor, insira o nome do(a) dev.');
            return;
        }

        if(sexo === '' || sexo === 'Sexo'){
            setError('Por favor, selecione o sexo do(a) dev.');
            return;
        }

        if(nascimento === ''){
            setError('Por favor, insira a data de(a) nascimento do dev.');
            return;
        }

        let actualYear = new Date().getFullYear();
        let actualMonth = new Date().getMonth() + 1;
        let actualDay = new Date().getDate();

        let birthYear = parseInt(nascimento.split('-')[0]);
        let birthMonth = parseInt(nascimento.split('-')[1]);
        let birthDay = parseInt(nascimento.split('-')[2]);

        let idade = actualYear - birthYear;

        if(actualMonth < birthMonth)
            idade -= 1;

        if(actualMonth === birthMonth){
            if(actualDay < birthDay){
                idade -= 1;
            }
        }

        if(idade <=  14 || idade >= 70){
            setError('Dev deve ter entre 15 e 70 anos');
            return;
        }

        if(hobby === ''){
            setError('Por favor, insira o hobby do(a) dev.');
            return;
        }

        setError(undefined);
        await insertNewDeveloper(nome,sexo,idade,hobby,nascimento).then(() => {
            handleClose()
        })
    }

    return(
        <div className={`${styles.background} ${visible && styles.visible}`}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <p>Novo dev</p>
                    <AiFillCloseCircle
                        size={25}
                        onClick={handleClose}
                    />
                </div>
                <div className={styles.form}>
                    <div>
                        <Input
                            placeholder="Nome"
                            black
                            value={nome}
                            onchange={(text) => setNome(text)}
                        />
                    </div>
                    <div className={styles.multiple}>
                        <div>
                            <Select
                                placeholder="Sexo"
                                onchange={(text) => setSexo(text)}
                                options={['Masculino', 'Feminino']}
                                visible={visible}
                            />
                        </div>
                        <div>
                            <Input
                                placeholder="Data de nascimento"
                                type='date'
                                black
                                value={nascimento}
                                onchange={(text) => setNascimento(text)}
                            />
                        </div>
                    </div>
                    <div>
                        <Input
                            placeholder="Hobby"
                            textarea
                            black
                            value={hobby}
                            onchange={(text) => setHobby(text)}
                        />
                    </div>
                    {
                        error !== undefined && (
                            <div className={styles.error}>
                                <p>{error}</p>
                            </div>
                        )
                    }
                    <div className={styles.buttonsArea}>
                        <Button
                            title="Cancelar"
                            onClick={handleClose}
                            red
                        />
                        <Button
                            title="Adicionar"
                            black
                            onClick={handleNew}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
