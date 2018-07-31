package com.walcron.module;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.walcron.hanleewan.weddingplanner.BuildConfig;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Lee Wan on 6/12/2016.
 */
public class SystemProperties extends ReactContextBaseJavaModule{
    ReactContext reactContext;

    public SystemProperties(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
    }

    @Override
    public String getName() { return "RNSystemProperties";}

    @Override
    public Map<String, Object> getConstants() {
        HashMap<String, Object> constants = new HashMap<>();
        constants.put("locale_language", getLocale_Language());
        constants.put("version", getVersion());
        return constants;
    }

    private String getLocale_Language() {
        String locale = reactContext.getResources().getConfiguration().locale.toString();
        String language = locale.substring(0, locale.indexOf("_"));
        return language;
    }

    private String getVersion() {
        String versionName = BuildConfig.VERSION_NAME;
        return versionName;
    }
}
