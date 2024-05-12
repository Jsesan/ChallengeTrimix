package com.example.challengeTrimixBackend.repository;

import com.example.challengeTrimixBackend.entity.TipoDocumento;
import com.example.challengeTrimixBackend.entity.Persona;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
@Transactional
public class PersonaRepository {

    @PersistenceContext
    EntityManager entityManager;

    public List<Persona> getAll(){
        TypedQuery<Persona> getAllQuery = entityManager.createNamedQuery("get_all", Persona.class);
        return getAllQuery.getResultList();
    }

    public List<Persona> filterByName(String name){
        TypedQuery<Persona> filterByNameQuery = entityManager.createNamedQuery("filter_by_name", Persona.class);
        filterByNameQuery.setParameter("filtroNombre", "%" + name + "%");
        return filterByNameQuery.getResultList();
    }

    public List<Persona> filterByDocumentType(TipoDocumento documentType){
        TypedQuery<Persona> filterByDocumentTypeQuery = entityManager.createNamedQuery("filter_by_document_type", Persona.class);
        filterByDocumentTypeQuery.setParameter("filtroTipoDocumento", documentType);
        return filterByDocumentTypeQuery.getResultList();
    }

    public List<Persona> filterByNameAndDocumentType(String name, TipoDocumento documentType){
        TypedQuery<Persona> filterByNameAndDocumentTypeQuery = entityManager.createNamedQuery("filter_by_name_and_document_type", Persona.class);
        filterByNameAndDocumentTypeQuery.setParameter("filtroNombre", "%" + name + "%");
        filterByNameAndDocumentTypeQuery.setParameter("filtroTipoDocumento", documentType);
        return filterByNameAndDocumentTypeQuery.getResultList();
    }

    public Persona update(Persona persona){
        return  entityManager.merge(persona);
    }

    public Persona insert(Persona persona){
        return  entityManager.merge(persona);
    }

    public void delete(Long id){
        Persona persona = entityManager.find(Persona.class, id);
        if(persona != null) {
            entityManager.remove(persona);
        }else {
                throw new RuntimeException("Persona con id:"+ id +" no existe en la BD");
         }
    }

    public List<Persona> getPagination(List<Persona> personas, int page, int size){
        int startIndex = (page - 1) * size;
        int endIndex = Math.min(startIndex + size, personas.size());
        if(startIndex >= endIndex){
            return personas;
        }
        return personas.subList(startIndex, endIndex);
    }
}

