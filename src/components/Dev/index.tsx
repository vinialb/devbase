import React from "react";
import {IoMdAdd} from "react-icons/io";
import {IoMdRemove} from "react-icons/io";

import styles from './styles.module.scss';

import {DevProps, useDevelopers} from "../../hooks/developers";
import {Button} from "../Button";

export function Dev(dev: DevProps){
    const {id, nome, sexo, idade, hobby, datanascimento} = dev;

    const {selectedDeveloper, setSelectedDeveloper, setDeleteVisible, setUpdateVisible} = useDevelopers();

    // Select this dev to show all his info
    function handleSelect(){
        if(selectedDeveloper !== undefined && selectedDeveloper.id === id) {
            setSelectedDeveloper({} as DevProps);
            return;
        }

        setSelectedDeveloper(dev)
    }


    return (
        <section className={styles.container}>
            <div
                className={`${styles.header} ${(selectedDeveloper !== undefined && selectedDeveloper.id === id) && styles.selected}`}
                onClick={handleSelect}
            >
                <h2>{nome}</h2>
                {
                    selectedDeveloper !== undefined && selectedDeveloper.id !== id ? (
                        <IoMdAdd size={20}/>
                    ) : (
                        <IoMdRemove size={20}/>
                    )
                }
            </div>
            <div
                className={styles.info}
                style={(selectedDeveloper !== undefined && selectedDeveloper.id === id) ? {display: 'block'} : {display: 'none'}}
            >
                <p><span>Sexo:</span> {sexo}</p>
                <p><span>Idade:</span> {idade}</p>
                <p><span>Hobby:</span> {hobby}</p>
                <p><span>Data de nascimento:</span>
                    {datanascimento.split('-')[2]+'/'+datanascimento.split('-')[1]+'/'+datanascimento.split('-')[0]}
                </p>
                <div>
                    <Button
                        title='Deletar'
                        red
                        onClick={() => setDeleteVisible(true)}
                    />
                    <Button
                        title='Alterar'
                        black
                        onClick={() => setUpdateVisible(true)}
                    />
                </div>
            </div>
        </section>
    )
}
