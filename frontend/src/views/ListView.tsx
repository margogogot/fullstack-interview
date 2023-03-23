import { useState, useEffect } from "react";
import Person from "../models/Person";
import { AxiosResponse } from "axios";
import axios from 'axios';
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import PersonList from './PersonList';

function ListView(){

    const [people, setPeople] = useState<Person[]>([]);
    const [searchString, setSearchString] = useState<string>('');
    const [loadingComplete, setLoadingComplete] = useState<boolean>(false);
    const history = useHistory();

    useEffect(()=>{
        let searchUrl = "http://localhost:8080/all"
        if(searchString){
            searchUrl = "http://localhost:8080/person-search/"+searchString
        }
        axios(searchUrl).then((response: AxiosResponse<Person[]> ) => {
            setPeople(response.data);
        }).catch((error)=>{
            alert(error);
        }).finally(()=>{
            setLoadingComplete(true);
        })
    })

    function deletePerson(id: number){
        setLoadingComplete(false);
        axios.delete("http://localhost:8080/person/"+id)
        .then((response: AxiosResponse)=>{

        })
        .catch((error)=>{
            alert(error);
        })
        .finally(()=>{
            setLoadingComplete(true);
        })
    }

    function navigatePerson(id: number){
        history.push('/edit/'+id);
    }

    function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>){
        setSearchString(e.target.value);
    }

    function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
    }

    return <ListWrapper> 
        <h1>List of all People</h1>
        {
        loadingComplete &&
        <>
            <form onSubmit={handleSearchSubmit}>
                <label htmlFor="searchString">
                    Search:
                <input type="text" name="searchString" id="searchString" value={searchString} onChange={handleSearchChange} placeholder="FirstName" />
                </label>
            </form>
            <PersonList 
            people={people}
            deletePerson={deletePerson}
            navigatePerson={navigatePerson}
            />
        </>
        }
        <Link to={"/add"}>Add Person</Link>
    </ListWrapper>
}

export default ListView;

const ListWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 600px;
    padding: 1rem;
    margin: 0 auto;
`;