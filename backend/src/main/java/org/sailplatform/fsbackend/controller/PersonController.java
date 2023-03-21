package org.sailplatform.fsbackend.controller;

import java.util.List;
import java.util.Optional;

import org.sailplatform.fsbackend.model.Person;
import org.sailplatform.fsbackend.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = { "*"})
public class PersonController {

    @Autowired PersonService personService;

    @GetMapping("/all")
	public List<Person> getAll() {
		return personService.getAll();
	}

    @PostMapping("/add")
	public Person add(@RequestBody Person toAdd) {
		return personService.add(toAdd);
	}

	@GetMapping("/person/{id}")
	public Optional<Person> get(@PathVariable Long id) {
		return personService.loadPersonById(id);
	}

	@GetMapping("/person-search/{firstName}")
	public List<Person> findWithFirstName(@PathVariable String firstName) {
		return personService.findByFirstName(firstName);
	}

	@PostMapping("/person/{id}")
	public Person get(@RequestBody Person toEdit) {
		return personService.add(toEdit);
	}

	@PutMapping("/person/{id}")
	public Person replacePerson(@RequestBody Person newPerson, @PathVariable Long id) {
		return personService.update(id, newPerson);
	}

	@DeleteMapping("/person/{id}")
  	ResponseEntity<?>  deletePerson(@PathVariable Long id) {
		personService.deletePersonById(id);
		return ResponseEntity.noContent().build();
  	}
}
