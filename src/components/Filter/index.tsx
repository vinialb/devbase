import React, {Dispatch, SetStateAction, useState} from "react";
import {AiFillCloseCircle} from "react-icons/ai";

import styles from './styles.module.scss';

import {Button} from "../Button";
import {Input} from "../Input";

import {useDevelopers} from "../../hooks/developers";

type FilterProps = {
    visible: boolean,
    setVisible: Dispatch<SetStateAction<boolean>>,
}

export function Filter({visible, setVisible}: FilterProps){
    const {filterDevelopers, getDevelopers} = useDevelopers();

    const [minAge, setMinAge] = useState('');
    const [maxAge, setMaxAge] = useState('');
    const [onlyMan, setOnlyMan] = useState(false);
    const [onlyWoman, setOnlyWoman] = useState(false);

    const [error, setError] = useState<string | undefined>('');

    function handleChangeSex(sex: string){
        if(sex === 'masculino'){
            setOnlyWoman(false);
            setOnlyMan(oldValue => !oldValue)
        }

        if(sex === 'feminino'){
            setOnlyMan(false);
            setOnlyWoman(oldValue => !oldValue)
        }
    }

    async function handleClose(){
        setVisible(false);
        setMinAge('');
        setMaxAge('');
        setOnlyMan(false);
        setOnlyWoman(false);

        await getDevelopers();
    }

    async function handleFilter(){
        if(parseInt(minAge) < 15 || parseInt(maxAge) > 70){
            setError('Dev deve ter entre 15 e 70 anos');
            return;
        }

        setError('');
        await filterDevelopers(minAge, maxAge, onlyMan, onlyWoman).then(() => {
            setVisible(false);
        })
    }

    return(
        <div className={`${styles.background} ${visible && styles.visible}`}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <p>Idade:</p>
                    <AiFillCloseCircle
                        size={25}
                        onClick={() => setVisible(false)}
                    />
                </div>
                <div className={styles.inputsArea}>
                    <div>
                        <Input
                            placeholder="Min."
                            value={minAge}
                            onchange={(t) => setMinAge(t)}
                            black
                        />
                    </div>
                    <div>
                        <Input
                            placeholder="Max."
                            value={maxAge}
                            onchange={(t) => setMaxAge(t)}
                            black
                        />
                    </div>
                </div>
                <div className={styles.buttonsArea}>
                    <Button
                        title='Somente homens'
                        black
                        onClick={() => handleChangeSex('masculino')}
                        selected={onlyMan}
                    />
                    <Button
                        title='Somente mulheres'
                        black
                        onClick={() => handleChangeSex('feminino')}
                        selected={onlyWoman}
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
                        title='Limpar'
                        onClick={handleClose}
                        red
                    />
                    <Button
                        title='Aplicar'
                        onClick={handleFilter}
                        black
                    />
                </div>
            </div>
        </div>
    )
}
