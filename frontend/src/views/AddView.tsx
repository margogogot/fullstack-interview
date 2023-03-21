import { useState } from "react";
import Person from "../models/Person";
import { AxiosResponse } from "axios";
import axios from 'axios';
import styled from "styled-components";
import { useHistory } from "react-router-dom"

function AddView(){
    let history = useHistory();
    const [formData, setFormData] = useState({id: "0", firstName: "", lastName: ""})
    const [loadingComplete, setLoadingComplete] = useState<boolean>(false);

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        axios.post("http://localhost:8080/add", formData )
        .then((response: AxiosResponse<Person> ) => {
            history.push("/");
        }).catch((error)=>{
            alert(error);
        }).finally(()=>{
            setLoadingComplete(true);
        })
    }

    function handleChange(e: React.ChangeEvent<HTMLInputElement>){
        setFormData({...formData, [e.target.name]: e.target.value});
    }

    return <AddForm>
            <h1>Add Person</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstName">
                    First Name:
                    <input type="text" required id="firstName" name="firstName" onChange={handleChange} />
                </label>
                <label htmlFor="lastName">
                    Last Name:
                    <input type="text" required id="lastName" name="lastName" onChange={handleChange} />
                </label>
                <input type="submit" value="Add" />
            </form>
    </AddForm>;
}

export default AddView;

const AddForm = styled.div`
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