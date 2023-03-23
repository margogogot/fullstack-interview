import Person from "../models/Person";
import styled from "styled-components";

interface PersonListProps {
    people: Person[],
    deletePerson: Function,
    navigatePerson: Function
}


function PersonList(props:PersonListProps){

    return <div id='people-list'>
        {
            props.people.map((person: Person)=>{
                return <PersonRow key={person.id}>
                            <PersonCell>Name: </PersonCell>
                            <PersonCell>{person.firstName}</PersonCell>
                            <PersonCell>{person.lastName}</PersonCell>
                            <PersonCell>
                                <button onClick={
                                    function(){
                                        if(person?.id){
                                            props.navigatePerson(person.id)
                                        }
                                    }
                                }>
                                    Edit
                                </button>
                            </PersonCell>
                            <PersonCell>
                                <button onClick={
                                function(){
                                    if(person?.id){
                                        props.deletePerson(person.id)
                                    }
                                }
                                }>
                                Delete
                                </button>
                            </PersonCell>
                        </PersonRow>
            })
        }
    </div>
}

export default PersonList;

const PersonRow = styled.div`
    display: flex;
    flex-direction: row;
`;

const PersonCell = styled.span`
    padding: 1rem .25rem;
    &:first-child {
        font-weight: bold;
    }
    button:hover{
        cursor:pointer;
    }
`;