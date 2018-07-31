package com.walcron.component;

import android.app.Activity;
import android.app.FragmentManager;
import android.app.FragmentTransaction;
import android.content.Context;
import android.graphics.Color;
import android.os.Bundle;
import android.support.v4.content.ContextCompat;
import android.support.v7.widget.DefaultItemAnimator;
import android.support.v7.widget.GridLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.util.Log;
import android.view.View;
import android.widget.RelativeLayout;

import com.walcron.component.gallery.adapter.GalleryAdapter;
import com.walcron.component.gallery.bean.Image;
import com.walcron.component.gallery.layout.SlideshowDialogFragment;
import com.walcron.hanleewan.weddingplanner.R;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

/**
 * Created by Lee Wan on 6/2/2016.
 */
public class Gallery extends RelativeLayout {

    private ArrayList<Image> images;
    private GalleryAdapter mAdapter;
    private RecyclerView recyclerView;
    private String jsonImagesValue = "{}";
    private int loadingColor = Color.parseColor("#2196F3");

    public Gallery(final FragmentManager fm, final Activity activity, Context context) {
        super(context);
        inflate(context, R.layout.gallery_component, this);

        recyclerView = (RecyclerView) findViewById(R.id.recycler_view);

        images = new ArrayList<>();
        mAdapter = new GalleryAdapter(context, images);

        RecyclerView.LayoutManager mLayoutManager = new GridLayoutManager(context, 2);
        recyclerView.setLayoutManager(mLayoutManager);
        recyclerView.setItemAnimator(new DefaultItemAnimator());
        recyclerView.setAdapter(mAdapter);

        recyclerView.addOnItemTouchListener(new GalleryAdapter.RecyclerTouchListener(context, recyclerView, new GalleryAdapter.ClickListener() {
            @Override
            public void onClick(View view, int position) {
                Bundle bundle = new Bundle();
                bundle.putSerializable("images", images);
                bundle.putInt("position", position);
                bundle.putInt("loadingColor", getLoadingColor());

                FragmentTransaction ft = fm.beginTransaction();

                SlideshowDialogFragment newFragment = SlideshowDialogFragment.newInstance();
                newFragment.setActivity(activity);
                newFragment.setArguments(bundle);

                newFragment.show(ft, "slideshow");
            }

            @Override
            public void onLongClick(View view, int position) {
            }
        }));
    }

    private String getJSONValue() {
        return jsonImagesValue;
    }

    public void setJSONValue(String jsonImagesValue) {
        this.jsonImagesValue = jsonImagesValue;
        fetchImages(getJSONValue());
    }

    private int getLoadingColor() {
        return loadingColor;
    }

    public void setLoadingColor(String color) {
        if(color.startsWith("#") && color.length()==7) {
            loadingColor = Color.parseColor(color);
            mAdapter.setLoadingColor(getLoadingColor());
        }
    }

    private void fetchImages(String jsonValue) {
        images.clear();
        try {
            JSONArray imageObjects = new JSONObject(jsonValue).getJSONArray("images");
            for(int count=0; count<imageObjects.length(); count++) {
                JSONObject object = imageObjects.getJSONObject(count);
                JSONObject url = object.getJSONObject("url");
                Image image = new Image(object.getString("name"), url.getString("medium"),url.getString("large"), object.getString("timestamp"));
                images.add(image);
            }

        }catch(JSONException je) {
            Log.e("RNGallery", "Json parsing error: " + je.getMessage());
        }
    }
}
