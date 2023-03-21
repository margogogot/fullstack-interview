import { useState, useEffect } from "react";
import Person from "../models/Person";
import { AxiosResponse } from "axios";
import axios from 'axios';
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";

function EditView(){
    let history = useHistory();
    type PersonParams = {
        id: string;
    };
    const { id } = useParams<PersonParams>();
    const [person, setPerson] = useState<Person>();
    const [loadingComplete, setLoadingComplete] = useState<boolean>(false);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        axios.put("http://localhost:8080/person/"+id, person )
        .then((response: AxiosResponse<Person> ) => {
            history.push("/");
        }).catch((error)=>{
            alert(error);
        }).finally(()=>{
            setLoadingComplete(true);
        })
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setPerson({...person, [e.target.name]: e.target.value});
    }

    useEffect(() => {
        axios("http://localhost:8080/person/"+id)
        .then((response: AxiosResponse<Person> ) => {
            setPerson(response.data);
        }).catch((error)=>{
            alert(error);
        }).finally(()=>{
            setLoadingComplete(true);
        });
    }, []);

    return <EditForm>
        {loadingComplete &&
            <>
            <h1>Edit Person</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">
                    First Name:
                    <input type="text" required id="firstName" name="firstName" value={person?.firstName} onChange={handleChange} />
                </label>
                <label htmlFor="lastName">
                    Last Name:
                    <input type="text" required id="lastName" name="lastName" value={person?.lastName} onChange={handleChange} />
                </label>
                <input type="submit" value="Save" />
            </form>
            </>
        }
    </EditForm>;
}

export default EditView;

const EditForm = styled.div`
    width: 100%;
    max-width: 600px;
    padding: 1rem;
    margin: 0 auto;
    form, label {
        display: flex;
        flex-direction: column;
        gap: .5rem;
    }
    label {
        font-weight: bold;
    }
    input[type="submit"]{
        cursor: pointer;
    }
`;