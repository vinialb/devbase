import React, {createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState} from "react";
import api from "../services/api";
import {AxiosError} from "axios";

type DevelopersContextData = {
    allDevelopers: DevProps[];
    getDevelopers: ()  => Promise<any>;
    insertNewDeveloper: (nome: string, sexo: string, idade: number, hobby: string, datanascimento: string)  => Promise<any>;
    updateDeveloper: (nome: string, sexo: string, idade: number, hobby: string, datanascimento: string)  => Promise<any>;
    handleSearch: (term: string)  => Promise<any>;
    deleteDeveloper: ()  => Promise<any>;
    setSelectedDeveloper: Dispatch<SetStateAction<DevProps>>;
    selectedDeveloper: DevProps;
    loading: boolean;
    deleteVisible: boolean;
    setDeleteVisible: Dispatch<SetStateAction<boolean>>;
    updateVisible: boolean;
    setUpdateVisible: Dispatch<SetStateAction<boolean>>;
    filterDevelopers: (minAge: string, maxAge: string, onlyMan: boolean, onlyWoman: boolean) => Promise<any>;
}

type DevelopersProviderProps = {
    children: ReactNode;
}

export type DevProps = {
    id: number;
    nome: string;
    sexo: string;
    idade: number;
    hobby: string;
    datanascimento: string;
}

export const DevelopersContext = createContext({} as DevelopersContextData);

function DevelopersProvider({children}: DevelopersProviderProps) {
    const [allDevelopers, setAllDevelopers] = useState<DevProps[]>([] as DevProps[]);
    const [selectedDeveloper, setSelectedDeveloper] = useState<DevProps>({} as DevProps);

    const [loading, setLoading] = useState<boolean>(false);

    const [deleteVisible, setDeleteVisible] = useState<boolean>(false);

    const [updateVisible, setUpdateVisible] = useState<boolean>(false);

    // Get all the developers when start the aplication
    useEffect(() => {
        getDevelopers()
    }, [])

    // Search developer based on the name passed by parameter
    async function handleSearch(term: string){
        if(term === ''){
            await getDevelopers();
            return;
        }

        setLoading(true);

        let developers = await api.get(`/developers?nome_like=${term}&_sort=id&_order=desc`).then((response) => {

            console.log(response);
            return response;

        }).catch((err: AxiosError) => {

            return err.response!;

        })

        if(developers.status !== 200){
            setLoading(false);
            alert('Erro ao buscar devs.');
            return;
        }

        setAllDevelopers(developers.data);
        setLoading(false);

    }

    // Function to get all developers
    async function getDevelopers(){
        setLoading(true);

        let developers = await api.get('/developers?_sort=id&_order=desc').then((response) => {

            return response;

        }).catch((err: AxiosError) => {

            return err.response!;

        })

        if(developers.status !== 200){
            setLoading(false);
            alert('Erro ao buscar devs.');
            return;
        }

        setAllDevelopers(developers.data);
        setLoading(false);
    }

    // Function to insert a new developer
    async function insertNewDeveloper(nome: string, sexo: string, idade: number, hobby: string, datanascimento: string) {
        setLoading(true);

        let insert = await api.post('/developers',{
            nome: nome,
            sexo: sexo,
            idade: idade,
            hobby: hobby,
            datanascimento: datanascimento
        }).then((response) => {

            return response;

        }).catch((err: AxiosError) => {

            return err.response!;

        })

        if(insert.status !== 201){
            setLoading(false);
            alert('Erro ao inserir dev.');
            return;
        }

        // Update state after update the dev in db
        setAllDevelopers(oldValue => {
            let newArray = [insert.data];

            oldValue.map((data) => {
                return newArray.push(data)
            })

            return newArray
        })
        setLoading(false);
    }

    // Function to delete an specific dev
    async function deleteDeveloper(){
        setLoading(true);

        let developers = await api.delete(`/developers/${selectedDeveloper.id}`).then((response) => {

            console.log(response);
            return response;

        }).catch((err: AxiosError) => {

            return err.response!;

        })

        if(developers.status !== 200){
            setLoading(false);
            alert('Erro ao deletar dev.');
            return;
        }

        // Update state after delete from db
        setAllDevelopers(oldValue => {
            return oldValue.filter((data) => {
                if (data.id !== selectedDeveloper.id)
                    return data
            })
        });

        setDeleteVisible(false);
        setLoading(false);
    }

    // Function to update an specific dev
    async function updateDeveloper(nome: string, sexo: string, idade: number, hobby: string, datanascimento: string){
        setLoading(true);

        let developers = await api.put(`/developers/${selectedDeveloper.id}`,{
            nome: nome,
            sexo: sexo,
            idade: idade,
            hobby: hobby,
            datanascimento: datanascimento
        }).then((response) => {

            console.log(response);
            return response;

        }).catch((err: AxiosError) => {

            return err.response!;

        })

        if(developers.status !== 200){
            setLoading(false);
            alert('Erro ao alterar os dados do dev.');
            return;
        }

        setSelectedDeveloper({} as DevProps);
        setSelectedDeveloper(developers.data);

        // Update state after update db
        setAllDevelopers(oldValue => {
            return oldValue.map((data) => {
                if (data.id !== selectedDeveloper.id)
                    return data

                console.log('text');
                console.log(developers.data);
                return developers.data
            })
        });

        setDeleteVisible(false);
        setLoading(false);
    }

    // Function to filter the developer according to the passed parameters
    async function filterDevelopers(minAge: string, maxAge: string, onlyMan: boolean, onlyWoman: boolean){
        if(minAge === '' && maxAge === '' && !onlyMan && !onlyWoman ){
            await getDevelopers();
            return
        }

        await getDevelopers().then(() => {
            setAllDevelopers(oldValue => {
                let firstFilter = oldValue.filter((data) => {
                    if (onlyWoman && data.sexo === 'Feminino')
                        return data

                    if(!onlyWoman)
                        return data
                })

                let secondFilter = firstFilter.filter((data) => {
                    if (onlyMan && data.sexo === 'Masculino')
                        return data

                    if(!onlyMan)
                        return data
                })

                let thirdFilter = secondFilter.filter((data) => {
                    if (minAge !== '' && data.idade >= parseInt(minAge))
                        return data

                    if(minAge === '')
                        return data
                })

                return thirdFilter.filter((data) => {
                    if (maxAge !== '' && data.idade <= parseInt(maxAge))
                        return data

                    if (maxAge === '')
                        return data
                })
            })
        })

    }

    return (
        <DevelopersContext.Provider
            value={{
                allDevelopers,
                getDevelopers,
                insertNewDeveloper,
                setSelectedDeveloper,
                selectedDeveloper,
                loading,
                handleSearch,
                deleteDeveloper,
                deleteVisible,
                setDeleteVisible,
                updateDeveloper,
                updateVisible,
                setUpdateVisible,
                filterDevelopers
            }}
        >
            {children}
        </DevelopersContext.Provider>
    )
}

function useDevelopers() {
    return useContext(DevelopersContext);
}

export {
    DevelopersProvider,
    useDevelopers
}
