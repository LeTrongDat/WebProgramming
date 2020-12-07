package com.company.model;

import com.company.exception.WLException;
import com.company.exception.WebLabException;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Date;

@Entity
@NoArgsConstructor
@Getter @Setter
public class Query implements Serializable {
    private static final long serialVersionUID = 8442671044445353433L;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    private Double x;
    private Double y;
    private Double r;
    private String result;
    private Long executionTime;
    private Date creationTime;

    public Query(Double x, Double y, Double r) {
        this.x = x;
        this.y = y;
        this.r = r;
    }

    public String getResult() {
        if (this.x == null || this.y == null || this.r == null) return null;
        creationTime = new Date();
        this.executionTime = System.currentTimeMillis();
        this.result = isInsideArea() ? "Yes" : "No";
        this.executionTime = System.currentTimeMillis() - this.executionTime;
        return this.result;
    }

    // ------- Private methods -------
    private boolean isInsideArea() {
        return (isInsideCircle() || isInsideRectangle() || isInsideTriangle());
    }

    private boolean isInsideCircle() {
        return (this.x <= 0 && this.y >= 0 && Math.pow(this.x, 2) + Math.pow(this.y, 2) <= Math.pow(this.r, 2));
    }

    private boolean isInsideRectangle() {
        return (0 <= this.x && this.x <= this.r && 0 <= this.y && this.y <= this.r);
    }

    private boolean isInsideTriangle() {
        return (this.x >= 0 && this.x <= this.r && this.y <= 0 && 2*Math.abs(this.y) <= (this.r - this.x));
    }
}
