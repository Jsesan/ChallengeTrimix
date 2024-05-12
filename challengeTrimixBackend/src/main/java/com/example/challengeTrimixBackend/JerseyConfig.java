package com.example.challengeTrimixBackend;

import com.example.challengeTrimixBackend.resource.PersonaResource;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.context.annotation.Configuration;

@Configuration
public class JerseyConfig extends ResourceConfig {
    public JerseyConfig() {
        register(PersonaResource.class);
    }
}
