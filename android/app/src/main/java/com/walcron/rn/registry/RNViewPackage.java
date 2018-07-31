package com.walcron.rn.registry;

import android.app.Activity;
import android.app.FragmentManager;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.walcron.view.GalleryManager;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * Created by Lee Wan on 6/2/2016.
 */
public class RNViewPackage implements ReactPackage {


    public RNViewPackage() {
    }

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Arrays.<ViewManager>asList(
                new GalleryManager()
                );
    }

}
