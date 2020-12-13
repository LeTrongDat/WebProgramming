package com.company.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.annotation.Resource;
import javax.enterprise.context.ApplicationScoped;
import javax.faces.context.FacesContext;
import javax.inject.Named;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.UserTransaction;
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

    @PersistenceContext(unitName = "default")
    private EntityManager resultManager;

    @Resource
    private UserTransaction userTransaction;

    private Query query;
    private Double interactiveX;
    private Double interactiveY;

    private LinkedList<Query> queries;

    @PostConstruct
    public void init() {
        query = new Query();
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
        try {
            userTransaction.begin();
            resultManager.persist(query);
            userTransaction.commit();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @PreDestroy
    public void close() {
        reset();
    }

    public void reset() {
        query = new Query();
    }

    public void clear() {
        try {
            userTransaction.begin();
            resultManager.createQuery("DELETE FROM Query q").executeUpdate();
            userTransaction.commit();
        } catch (Exception e) {
            e.printStackTrace();
        }
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

