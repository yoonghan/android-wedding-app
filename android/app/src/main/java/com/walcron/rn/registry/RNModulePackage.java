package com.walcron.rn.registry;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.walcron.module.BarcodeModule;
import com.walcron.module.PermissionRequest;
import com.walcron.module.SystemProperties;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Created by Lee Wan on 6/12/2016.
 */
public class RNModulePackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        List<NativeModule> modules = new ArrayList<>();
        modules.add(new SystemProperties(reactContext));
        modules.add(new PermissionRequest(reactContext));
        modules.add(new BarcodeModule(reactContext));
        return modules;
    }

    @Override
    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

}
