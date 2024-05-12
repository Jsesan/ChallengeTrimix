package com.example.challengeTrimixBackend.entity;
import java.util.List;

public class PersonaResponse {
    List<Persona> personas;
    int page;
    int size;
    long totalPersonas;

    public PersonaResponse(List<Persona> personas, int page, int size, Long totalPersonas) {
        this.personas = personas;
        this.page = page;
        this.size = size;
        this.totalPersonas = totalPersonas;
    }

    public List<Persona> getPersonas() {
        return personas;
    }

    public void setPersonas(List<Persona> personas) {
        this.personas = personas;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }

    public long getTotalPersonas() {
        return totalPersonas;
    }

    public void setTotalPersonas(long totalPersonas) {
        this.totalPersonas = totalPersonas;
    }

    @Override
    public String toString() {
        return "PersonaResponse{" +
                "personas=" + personas +
                ", page=" + page +
                ", size=" + size +
                ", totalPersonas=" + totalPersonas +
                '}';
    }
}
