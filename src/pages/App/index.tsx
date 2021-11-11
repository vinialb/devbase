import React, {useState} from "react";
import {BiSearchAlt} from "react-icons/bi";
import {FaFilter} from "react-icons/fa";
import {IoIosAddCircleOutline} from "react-icons/io";

import styles from './styles.module.scss';

import {Loading} from "../../components/Loading";
import {Delete} from "../../components/Delete";
import {Button} from "../../components/Button";
import {Update} from "../../components/Update";
import {Input} from "../../components/Input";
import {New} from "../../components/New";
import {Dev} from "../../components/Dev";

import {useDevelopers} from "../../hooks/developers";
import {Filter} from "../../components/Filter";

export default function App() {
    const {allDevelopers, loading, handleSearch} = useDevelopers();

    const [search, setSearch] = useState('');
    const [newOpen, setNewOpen] = useState(false);

    const [filterVisible, setFilterVisible] = useState(false);

    // Search when press the Enter button
    async function handlePress(key: string) {
        if (key === 'Enter')
            await handleSearch(search)
    }

    return (
        <main className={`globalContainer ${styles.container}`}>
            <New
                visible={newOpen}
                close={setNewOpen}
            />
            <Loading
                visible={loading}
            />
            <Update/>
            <Delete/>
            <Filter
                visible={filterVisible}
                setVisible={setFilterVisible}
            />
            <h1>DEV BASE</h1>
            <div className={styles.content}>
                <div className={styles.inputsArea}>
                    <div>
                        <Input
                            placeholder="Buscar dev"
                            type="text"
                            value={search}
                            onchange={(t) => setSearch(t)}
                            keyPress={(key) => handlePress(key)}
                            icon={
                                <BiSearchAlt
                                    size={20}
                                    onClick={() => handleSearch(search)}
                                />
                            }
                        />
                    </div>
                    <div>
                        <Button
                            title="Filtrar"
                            icon={<FaFilter size={20}/>}
                            onClick={() => setFilterVisible(oldValue => !oldValue)}
                        />
                        <Button
                            title="Novo"
                            icon={<IoIosAddCircleOutline size={25}/>}
                            onClick={() => setNewOpen(true)}
                        />
                    </div>
                </div>
                <div className={styles.scrollable}>
                    {
                        allDevelopers && allDevelopers.map((data) => {
                            return (
                                <Dev
                                    key={data.id}
                                    id={data.id}
                                    nome={data.nome}
                                    sexo={data.sexo}
                                    idade={data.idade}
                                    hobby={data.hobby}
                                    datanascimento={data.datanascimento}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </main>
    )
}
