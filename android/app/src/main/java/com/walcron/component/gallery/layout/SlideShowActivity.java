package com.walcron.component.gallery.layout;

import android.app.FragmentTransaction;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import com.walcron.hanleewan.weddingplanner.R;

public class SlideShowActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_slide_show);

//
//        Bundle bundle = new Bundle();
//        bundle.putSerializable("images", images);
//        bundle.putInt("position", position);
//
//        FragmentTransaction ft = fm.beginTransaction();
//
//        SlideshowDialogFragment newFragment = SlideshowDialogFragment.newInstance();
//        newFragment.setActivity(activity);
//        newFragment.setArguments(bundle);
//
//        newFragment.show(ft, "slideshow");
    }
}
