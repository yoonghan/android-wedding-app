package com.walcron.view;

import android.app.Activity;
import android.app.FragmentManager;
import android.util.Log;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.walcron.component.Gallery;
import com.walcron.hanleewan.weddingplanner.MainActivity;

/**
 * Created by Lee Wan on 6/2/2016.
 */
public class GalleryManager extends SimpleViewManager<Gallery> {
    public static final String GALLERY_CLASS = "RNGallery";

    public String getName() {
        return GALLERY_CLASS;
    }

    public GalleryManager() {
    }

    public Gallery createViewInstance(ThemedReactContext context) {
        Activity activity = MainActivity.getActivity();
        Gallery gallery = new Gallery(activity.getFragmentManager(), activity, context);
        return gallery;
    }

    @ReactProp(name = "imagesAsJsonString")
    public void setImagesAsJsonString(Gallery view, String imagesAsJsonString) {
        view.setJSONValue(imagesAsJsonString);
    }

    @ReactProp(name = "loadingColor")
    public void setLoadingColor(Gallery view, String color) {
        view.setLoadingColor(color);
    }
}
