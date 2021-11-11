import React, {ButtonHTMLAttributes, ReactNode} from 'react';

import styles from './styles.module.scss';

type ButtonProps =  ButtonHTMLAttributes<HTMLButtonElement> & {
    title: string;
    icon?: ReactNode;
    red?: boolean;
    black?: boolean;
    selected?: boolean
}

export function Button({ title, icon, red, black, selected, ...rest }: ButtonProps) {

    return (
        <button
            {...rest}
            className={`${styles.container} ${red && styles.red} ${black && styles.black} ${selected && styles.selected}`}
        >
            {title}
            {icon !== undefined && icon}
        </button>
    )
}
