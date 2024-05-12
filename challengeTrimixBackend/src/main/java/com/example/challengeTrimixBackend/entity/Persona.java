package com.example.challengeTrimixBackend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import java.util.Date;


@Entity
@NamedQueries({
        @NamedQuery(
                name = "filter_by_name",
                query = "SELECT p FROM Persona p WHERE LOWER(p.perNombre) LIKE LOWER(:filtroNombre)"
        ),
        @NamedQuery(
                name = "filter_by_document_type",
                query = "SELECT p FROM Persona p WHERE p.perTipoDocumento = :filtroTipoDocumento"
        ),
        @NamedQuery(
                name = "filter_by_name_and_document_type",
                query = "SELECT p FROM Persona p WHERE LOWER(p.perNombre) LIKE LOWER(:filtroNombre) AND p.perTipoDocumento = :filtroTipoDocumento"
        ),
        @NamedQuery(
                name = "get_all",
                query = "SELECT p FROM Persona p"
        )
})
public class Persona {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long perId;

    @NotNull
    String perApellido;

    @NotNull
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy/MM/dd")
    Date perFechaNacimiento;

    @NotNull
    String perNombre;

    @NotNull
    Long perNumeroDocumento;

    @NotNull
    TipoDocumento perTipoDocumento;

    public Persona() {
    }

    public Persona(String perApellido, Date perFechaNacimiento, String perNombre, Long perNumeroDocumento, TipoDocumento perTipoDocumento) {
        this.perApellido = perApellido;
        this.perFechaNacimiento = perFechaNacimiento;
        this.perNombre = perNombre;
        this.perNumeroDocumento = perNumeroDocumento;
        this.perTipoDocumento = perTipoDocumento;
    }

    public String getPerApellido() {
        return perApellido;
    }

    public Date getPerFechaNacimiento() {
        return perFechaNacimiento;
    }

    public String getPerNombre() {
        return perNombre;
    }

    public Long getPerNumeroDocumento() {
        return perNumeroDocumento;
    }

    public TipoDocumento getPerTipoDocumento() {
        return perTipoDocumento;
    }

    public Long getPerId() {
        return perId;
    }

    public void setPerApellido(String perApellido) {
        this.perApellido = perApellido;
    }

    public void setPerFechaNacimiento(Date perFechaNacimiento) {
        this.perFechaNacimiento = perFechaNacimiento;
    }

    public void setPerNombre(String perNombre) {
        this.perNombre = perNombre;
    }

    public void setPerNumeroDocumento(Long perNumeroDocumento) {
        this.perNumeroDocumento = perNumeroDocumento;
    }

    public void setPerTipoDocumento(TipoDocumento perTipoDocumento) {
        this.perTipoDocumento = perTipoDocumento;
    }

    @Override
    public String toString() {
        return "Persona{" +
                "perApellido='" + perApellido + '\'' +
                ", perFechaNacimiento=" + perFechaNacimiento +
                ", perNombre='" + perNombre + '\'' +
                ", perNumeroDocumento=" + perNumeroDocumento +
                ", perTipoDocumento=" + perTipoDocumento +
                '}';
    }
}
