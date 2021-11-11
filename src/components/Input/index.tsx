import React, {ReactNode, useEffect, useState} from "react";

import styles from './styles.module.scss'

type InputProps = {
    placeholder: string;
    type?: string;
    value: string;
    onchange: (text: string) => any;
    icon?: ReactNode;
    keyPress?: (key: string) => any;
    textarea?: boolean;
    black?: boolean;
}

export function Input({placeholder, type='text', value, onchange, icon, keyPress, textarea, black}: InputProps) {

    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {

        if (value !== ""){
            setIsFocused(true);
        }else{
            setIsFocused(false);
        }

    }, [value])

    function handleFocus() {
        setIsFocused(true);
    }

    function handleBlur() {
        if (value !== "")
            return;

        setIsFocused(false);
    }

    function changeInputValue(text: string) {
        handleFocus();
        onchange(text);
    }

    return (
        <div className={`${styles.container} ${black ? styles.black : ''}`}>
            <label
                style={textarea ? {alignItems: 'flex-start'}: {alignItems: 'center'}}
            >
                <p
                    style={isFocused ? {display: 'none'} : {}}
                >
                    {placeholder}
                </p>
                {
                    textarea === undefined ? (
                        <>
                            <input
                                type={type}
                                onFocus={handleFocus}
                                onBlur={handleBlur}
                                value={value}
                                onChange={(text) => changeInputValue(text.target.value)}
                                onKeyPress={(e) => {
                                    if(keyPress !== undefined)
                                        keyPress(e.key)
                                }}
                                style={isFocused ? {opacity: 1} : {opacity: 0}}
                            />
                            {icon !== undefined && icon}
                        </>
                    ) : (
                        <textarea
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            value={value}
                            onChange={(text) => changeInputValue(text.target.value)}
                            onKeyPress={(e) => {
                                if(keyPress !== undefined)
                                    keyPress(e.key)
                            }}
                        />
                    )
                }
            </label>
        </div>
    )
}
