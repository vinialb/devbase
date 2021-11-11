import React from "react";

import styles from './styles.module.scss';

import loading from '../../assets/loading.gif';

type NewProps = {
    visible: boolean;
}

export function Loading({visible}: NewProps){
    return(
        <div className={`${styles.background} ${visible && styles.visible}`}>
            <img
                src={loading}
                alt='Loading gif'
                width={120}
                height={120}
            />
        </div>
    )
}
