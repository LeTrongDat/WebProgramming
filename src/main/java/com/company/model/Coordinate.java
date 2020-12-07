package com.company.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.primefaces.model.diagram.DefaultDiagramModel;

import javax.annotation.PostConstruct;
import javax.enterprise.context.SessionScoped;
import javax.inject.Named;
import java.io.Serializable;

@Named
@NoArgsConstructor
@Getter
@Setter
@SessionScoped
public class Coordinate implements Serializable {
    private DefaultDiagramModel model;

    @PostConstruct
    public void init() {

    }

}
