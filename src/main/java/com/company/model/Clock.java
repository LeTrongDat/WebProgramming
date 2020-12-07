package com.company.model;

import lombok.Getter;
import lombok.Setter;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Named;
import java.io.Serializable;
import java.util.Date;

@Named
@ApplicationScoped
@Setter
@Getter
public class Clock implements Serializable {
    private Date date = new Date();

    public void update() {
        date = new Date();
    }
}
