package com.walcron.component.gallery.bean;

import java.io.Serializable;

/**
 * Created by Lee Wan on 6/2/2016.
 */
public class Image implements Serializable {
    private String name;
    private String medium, large;
    private String timestamp;

    public Image() {
    }

    public Image(String name, String medium, String large, String timestamp) {
        this.name = name;
        this.medium = medium;
        this.large = large;
        this.timestamp = timestamp;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getMedium() {
        return medium;
    }

    public void setMedium(String medium) {
        this.medium = medium;
    }

    public String getLarge() {
        return large;
    }

    public void setLarge(String large) {
        this.large = large;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }
}
