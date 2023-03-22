package org.sailplatform.fsbackend;
import java.util.*;
import org.springframework.http.MediaType;
import com.fasterxml.jackson.databind.ObjectMapper;

import static org.assertj.core.api.Assertions.assertThat;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.Assertions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.sailplatform.fsbackend.service.PersonService;
import org.sailplatform.fsbackend.controller.PersonController;

@SpringBootTest
@AutoConfigureMockMvc
class FsbackendApplicationTests {
	@MockBean 
    PersonService personServiceMock;

	@Autowired
	private MockMvc mockMvc;

	@Autowired
	private PersonController controller;

	@Test
	void contextLoads() {
		assertThat(controller).isNotNull();
	}

	@Test
	public void checkGetAllPersons() throws Exception {
		this.mockMvc.perform(get("/all")).andDo(print()).andExpect(status().isOk())
		.andExpect(status().isOk());
	}

	@Test
	public void checkGetAddPerson() throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();

		Map<String,Object> body = new HashMap<>();
		body.put("firstName","new");
		body.put("lastName","Person");

		this.mockMvc.perform(post("/add")
		.contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(body))
		.accept(MediaType.APPLICATION_JSON))
		.andDo(print())
		.andExpect(status().isOk());
	}

	@Test
	public void checkGetPerson() throws Exception {
		this.mockMvc.perform(get("/person/11")
		.accept(MediaType.APPLICATION_JSON))
		.andDo(print())
		.andExpect(status().isOk());
	}

	@Test
	public void checkUpdatePerson() throws Exception {
		ObjectMapper objectMapper = new ObjectMapper();

		Map<String,Object> body = new HashMap<>();
		body.put("firstName","new");
		body.put("lastName","Person 2");

		this.mockMvc.perform(put("/person/11")
		.contentType(MediaType.APPLICATION_JSON)
        .content(objectMapper.writeValueAsString(body))
		.accept(MediaType.APPLICATION_JSON))
		.andDo(print())
		.andExpect(status().isOk());
	}

	@Test
	public void checkDeletePerson() throws Exception {
		this.mockMvc.perform(delete("/person/11")
		.accept(MediaType.APPLICATION_JSON))
		.andDo(print())
		.andExpect(status().isNoContent());
	}

}
