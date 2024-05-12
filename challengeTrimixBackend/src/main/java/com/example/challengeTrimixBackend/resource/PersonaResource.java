package com.example.challengeTrimixBackend.resource;

import com.example.challengeTrimixBackend.entity.PersonaResponse;
import com.example.challengeTrimixBackend.entity.TipoDocumento;
import com.example.challengeTrimixBackend.entity.Persona;
import com.example.challengeTrimixBackend.repository.PersonaRepository;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Path("/persona")
public class PersonaResource {

    @Autowired
    PersonaRepository personaRepository;

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response crearPersona(Persona persona){
        try{
            personaRepository.insert(persona);
            return response(Response.status(Response.Status.OK));
        } catch (Exception e){
            return response(Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()));
        }
    }

    @PUT
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response editarPersona(Persona persona){
        try {
            personaRepository.update(persona);
            return response(Response.status(Response.Status.OK));
        } catch (Exception e){
            return response(Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()));
        }

    }

    @GET
    @Produces(MediaType.APPLICATION_JSON)
    public Response buscarPersona(
            @QueryParam("name") String name,
            @QueryParam("documentType")String documentType,
            @QueryParam("page") @DefaultValue("1") int page,
            @QueryParam("size") @DefaultValue("5") int size )
    {
        try {
            List<Persona> personas;
            if (documentType.equals("Todas")) { //Si el tipo de documento es todas devolver las 3 opciones
                if (name != null) { // devolver las 3 opciones + el filtro de nombre
                    personas = personaRepository.filterByName(name);
                } else { //devolver las 3 opciones sin ningun filtro (todos los registros)
                    personas = personaRepository.getAll();
                }
            } else if (name != null) { // Si documentType != 'Todas' devolver el tipo elegido + filtro de nombre
                personas = personaRepository.filterByNameAndDocumentType(name, TipoDocumento.valueOf(documentType));
            } else { //Si documentType != 'Todas' sin ningun filtro de nombre devolver todos los registros de este documentType
                personas = personaRepository.filterByDocumentType(TipoDocumento.valueOf(documentType));
            }
            long totalPersonas = personas.size(); //Utilizar paginacion sobre los resultados filtrados en vez del total
            List<Persona> personasPaginadas = personaRepository.getPagination(personas,page,size);
            int pageValidated = page;
            if(size >= totalPersonas){ // Para evitar que un cambio de step del usuario a uno mayor a la cantidad de registro genere un error
                pageValidated = 1;
            }
            PersonaResponse personaResponse = new PersonaResponse(personasPaginadas, pageValidated, size, totalPersonas);
            return response(Response.ok(personaResponse));
        }catch (Exception e){
            return response(Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()));
        }
    }

    @DELETE
    @Path("/{id}")
    public Response borrarPersona(@PathParam("id") Long id){
        try {
            personaRepository.delete(id);
            return response(Response.status(Response.Status.OK));
        }catch (Exception e){
            return response(Response.status(Response.Status.INTERNAL_SERVER_ERROR).entity(e.getMessage()));
        }
    }

    @OPTIONS
    @Produces(MediaType.APPLICATION_JSON)
    public Response option() {
        return response(Response.status(Response.Status.OK));
    }

    @OPTIONS
    @Path("/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response options(@PathParam("id") Long id) {
        return response(Response.status(Response.Status.OK));
    }

    private Response response(Response.ResponseBuilder responseBuilder) {
        return responseBuilder
                .header("Access-Control-Allow-Origin", "*")
                .header("Access-Control-Allow-Headers", "origin, Content-Type, accept, authorization")
                .header("Access-Control-Allow-Credentials", "true")
                .header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
                .build();
    }

}
