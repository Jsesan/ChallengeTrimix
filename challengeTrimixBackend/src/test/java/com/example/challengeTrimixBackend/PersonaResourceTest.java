package com.example.challengeTrimixBackend;

import com.example.challengeTrimixBackend.entity.Persona;
import com.example.challengeTrimixBackend.entity.PersonaResponse;
import com.example.challengeTrimixBackend.entity.TipoDocumento;
import com.example.challengeTrimixBackend.repository.PersonaRepository;
import com.example.challengeTrimixBackend.resource.PersonaResource;
import jakarta.ws.rs.core.Response;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class PersonaResourceTest {
    @Mock
    PersonaRepository personaRepository;

    @InjectMocks
    PersonaResource personaResource;

    @Test
    void getPersonasByNameWithAllDocTypes(){
        String nameFilter = "Juan";
        List<Persona> personas = new ArrayList<>();
        personas.add(new Persona("Sesan",new Date("2000/02/24"),"Juan",(long) 12345, TipoDocumento.Dni));
        when(personaRepository.filterByName(nameFilter)).thenReturn(personas);
        when(personaRepository.getPagination(personas,1,5)).thenReturn(personas);
        Response response = personaResource.buscarPersona(nameFilter,"Todas",1,5);
        PersonaResponse personaResponse = new PersonaResponse(personas, 1, 5, 1L);
        assertEquals(personaResponse.toString(), response.getEntity().toString());
    }

    @Test
    void getPersonasByNameAndDniAsDocType(){
        String nameFilter = "a";
        String documentTypeFilter = String.valueOf(TipoDocumento.Dni);
        List<Persona> personas = new ArrayList<>();
        personas.add(new Persona("Sesan",new Date("2000/02/24"),"Juan",(long) 12345, TipoDocumento.Dni));
        personas.add(new Persona("Sesan",new Date("2000/02/24"),"Martin",(long) 12345, TipoDocumento.Dni));
        personas.add(new Persona("Perez",new Date("2000/02/24"),"Martin",(long) 12345, TipoDocumento.Cedula));
        List<Persona> personasDni = personas.subList(0,2);
        when(personaRepository.filterByNameAndDocumentType(nameFilter,TipoDocumento.Dni)).thenReturn(personasDni);
        when(personaRepository.getPagination(personasDni,1,5)).thenReturn(personasDni);
        Response response = personaResource.buscarPersona(nameFilter,documentTypeFilter,1,5);
        PersonaResponse personaResponse = new PersonaResponse(personasDni, 1, 5, 2L);
        assertEquals(personaResponse.toString(), response.getEntity().toString());
    }
}
