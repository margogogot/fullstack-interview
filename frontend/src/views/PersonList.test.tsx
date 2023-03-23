import { screen, render } from '@testing-library/react';
import Person from "../models/Person";
import PersonList from './PersonList';

test('check list is not empty', () => {
    let people: Person[] = [{id: 0, firstName: "firstName", lastName: "lastName"}];
    render(
        <PersonList
        people={people}
        deletePerson={()=>{}}
        navigatePerson={()=>{}}
        />
      );
    expect(screen.getByText(/Name:/i)).toBeInTheDocument();
});
