import React from "react";

import styles from './styles.module.scss';

import {Button} from "../Button";

import {useDevelopers} from "../../hooks/developers";

export function Delete(){
    const {deleteVisible, deleteDeveloper, setDeleteVisible, selectedDeveloper} = useDevelopers();

    return(
        <div className={`${styles.background} ${deleteVisible && styles.visible}`}>
            <div className={styles.content}>
                {
                    selectedDeveloper && (
                        <p>
                            O dev {selectedDeveloper.nome} de id {selectedDeveloper.id} será deletado, essa ação é irreversível. Deseja continuar?
                        </p>
                    )
                }
                <div className={styles.buttonsArea}>
                    <Button
                        title="Cancelar"
                        onClick={() => setDeleteVisible(false)}
                        red
                    />
                    <Button
                        title="Confirmar"
                        black
                        onClick={deleteDeveloper}
                    />
                </div>
            </div>
        </div>
    )
}
