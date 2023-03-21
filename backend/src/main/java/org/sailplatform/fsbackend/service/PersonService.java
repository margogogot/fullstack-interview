package org.sailplatform.fsbackend.service;

import java.util.List;
import java.util.Optional;

import org.sailplatform.fsbackend.model.Person;
import org.sailplatform.fsbackend.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonService {

    @Autowired
    PersonRepository personRepository;
    
    public Person add(Person toAdd){
        return personRepository.save(toAdd);
    }

    public List<Person> getAll(){
        return personRepository.findAll();
    }

    public Optional<Person> loadPersonById(Long id) {
		return personRepository.findById(id);
	}

    public List<Person> findByFirstName(String firstName){
        return personRepository.findByFirstNameStartsWith(firstName);
    }

    public void deletePersonById(Long id) {
        personRepository.deleteById(id);
    }

    public Person update(Long id, Person toUpdate){
        return personRepository.save(toUpdate);
    }
}
