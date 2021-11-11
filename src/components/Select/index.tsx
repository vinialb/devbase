import React, {useEffect, useState} from "react";

import styles from './styles.module.scss'

type SelectProps = {
    placeholder: string;
    onchange: (text: string) => any;
    options: string[];
    visible: boolean;
}

export function  Select({placeholder, onchange, options, visible}: SelectProps) {
    const [selected, setSelected] = useState(placeholder);
    const [isOpen, setIsOpen] = useState(false);

    // Change to the placeholder when is not visible
    useEffect(() => {
        setSelected(placeholder)
    }, [visible, placeholder])

    // Close when clicking elsewhere on the screen
    useEffect(() => {

        function preventClick(element: any){
            if(element.id !== 'selectElement'){
                setIsOpen(false)
            }
        }

        window.addEventListener('click', (e) => preventClick(e.srcElement));

        return () => window.removeEventListener('click', () => preventClick);

    }, [])

    // Change the state received from outside and the state selected
    function changeSex(sexo: string){
        onchange(sexo);
        setSelected(sexo);
    }

    return(
        <div className={`${styles.container} ${isOpen && styles.fixBorder}`}>
            <div
                className={styles.selected}
                id='selectElement'
                onClick={() => setIsOpen(oldValue => !oldValue)}
            >
                <p>{selected}</p>
            </div>
            <div className={`${styles.scrollable} ${isOpen && styles.isOpen}`}>
                {
                    options.map((data, k) => {
                        return(
                            <div
                                className={styles.option}
                                key={k}
                                onClick={() => changeSex(data)}
                            >
                                <p>{data}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>

    )
}
