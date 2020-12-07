package com.company.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.enterprise.context.ApplicationScoped;
import javax.faces.context.FacesContext;
import javax.faces.event.AjaxBehaviorEvent;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Persistence;
import java.io.IOException;
import java.io.Serializable;
import java.util.LinkedList;

@Named
@ApplicationScoped
@Getter
@Setter
@NoArgsConstructor
public class Result implements Serializable {
    private static final long serialVersionUID = 1475098483604448037L;

    private EntityManagerFactory resultManagerFactory;
    private EntityManager resultManager;
    private Query query;
    private Double interactiveX;
    private Double interactiveY;

    private LinkedList<Query> queries;

    @PostConstruct
    public void init() {
        query = new Query();
        resultManagerFactory = Persistence.createEntityManagerFactory("default");
        resultManager = resultManagerFactory.createEntityManager();
        queries = new LinkedList<>();
        queries.addAll(resultManager
                .createQuery("SELECT q FROM Query q", Query.class)
                .getResultList());
    }
    public String process() {
        save(query);
        queries.addFirst(query);
        reset();
        return ("result");
    }

    public String toQueryPage() {
        return ("query");
    }

    public String toHomePage() { return ("index"); }

    private void save(Query query) {
        query.getResult();
        resultManager.getTransaction().begin();
        resultManager.persist(query);
        resultManager.getTransaction().commit();
    }

    @PreDestroy
    public void close() {
        reset();
        resultManager.close();
        resultManagerFactory.close();
    }

    public void reset() {
        query = new Query();
    }

    public void clear() {
        resultManager.getTransaction().begin();
        resultManager.createQuery("DELETE FROM Query q").executeUpdate();
        resultManager.getTransaction().commit();
        queries = new LinkedList<>();
    }

    public void interactiveAction() {
        if (interactiveX == null || interactiveY == null) return;
        if (query.getR() == null) return;
        Query interactiveQuery = new Query(interactiveX, interactiveY, query.getR());
        save(interactiveQuery);
        queries.addFirst(interactiveQuery);
        try {
            FacesContext.getCurrentInstance().getExternalContext().redirect("result.xhtml");

            FacesContext.getCurrentInstance().responseComplete();
        } catch (IOException ioException) {
            ioException.printStackTrace();
        }
    }
}

