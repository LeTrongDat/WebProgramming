package com.company.model;

import lombok.Getter;

import javax.enterprise.context.ApplicationScoped;
import javax.faces.model.SelectItem;
import javax.inject.Named;
import java.util.ArrayList;
import java.util.List;

@Named
@ApplicationScoped
@Getter
public class PointX {
    private List<SelectItem> optionItems;

    {
        optionItems = new ArrayList<>();
        for (double i = -2; i <= 2; i += 0.5)
            optionItems.add(new SelectItem(i));
    }
}
