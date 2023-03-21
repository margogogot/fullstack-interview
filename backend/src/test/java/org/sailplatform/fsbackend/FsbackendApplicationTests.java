package org.sailplatform.fsbackend;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import org.sailplatform.fsbackend.model.Person;
import org.sailplatform.fsbackend.service.PersonService;

@SpringBootTest
class FsbackendApplicationTests {

	@Test
	void contextLoads() {
	}

    PersonService personService;

    @Autowired
    void setPersonService(PersonService personService) {
        this.personService = personService;
    }

	@Test
    void add() {
    	Person person = personService.add(new Person("Marge", "Simpson"));
       	Assertions.assertNotNull(person);
    }

	@Test
    void findById() {
		Person newPerson = personService.add(new Person("Marge", "Simpson"));
        Optional<Person> person = personService.loadPersonById(newPerson.getId());
       	Assertions.assertTrue(person.isPresent());
    }

	@Test
	void findAll() {
		List<Person> people = personService.getAll();
		Assertions.assertNotNull(people);
	}

	@Test
	void updateOne() {
		Person newPerson = personService.add(new Person("Marge", "Simpson"));
		Person person = personService.update(newPerson.getId(), new Person("Lisa", "Simpson"));
		Assertions.assertNotNull(person);
	}

	@Test
	void findByFirstName() {
		List<Person> people = personService.findByFirstName(new String("Lisa"));
		Assertions.assertNotNull(people);
	}

	@Test
	void deleteOne() {
		Person newPerson = personService.add(new Person("Marge", "Simpson"));
		personService.deletePersonById(newPerson.getId());
		Optional<Person> person = personService.loadPersonById(newPerson.getId());
		Assertions.assertFalse(person.isPresent());
	}


}
