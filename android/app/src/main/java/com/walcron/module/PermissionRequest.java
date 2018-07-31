package com.walcron.module;

import android.Manifest;
import android.app.Activity;
import android.content.pm.PackageManager;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.util.Log;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

/**
 * Created by Lee Wan on 6/18/2016.
 */
public class PermissionRequest extends ReactContextBaseJavaModule {

    private static final int REQUEST_CODE_ASK_PERMISSION = 1000;
    private static final String E_PERMISSION_DENIED = "E_PERMISSION_DENIED";

    private static Promise promise = null;

    public PermissionRequest(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() { return "RNPermissionRequest"; }

    @ReactMethod
    public void requestPermission(final String permission, final Promise promise) {
        Activity currentActivity = getCurrentActivity();

        if(currentActivity == null) {
            //TODO: Such activity should not even occur
        }

        switch(permission) {
            case "CAMERA":
                int permissionCheck = ContextCompat.checkSelfPermission(this.getReactApplicationContext(), Manifest.permission.CAMERA);
                if(permissionCheck != PackageManager.PERMISSION_GRANTED) {
                    this.promise = promise;
                    ActivityCompat.requestPermissions(currentActivity,
                            new String[]{Manifest.permission.CAMERA}, REQUEST_CODE_ASK_PERMISSION);
                } else {
                    promise.resolve(REQUEST_CODE_ASK_PERMISSION);
                }
                break;
        }
    }

    public static void onRequestPermissionsResult(int requestCode, int[] grantResults) {
        switch (requestCode) {
            case REQUEST_CODE_ASK_PERMISSION:
                if (grantResults[0] == PackageManager.PERMISSION_GRANTED && promise != null) {
                    promise.resolve(requestCode);
                } else {
                    promise.reject(E_PERMISSION_DENIED, "Permission denied:" + requestCode);
                }
                break;
            default:
                promise.reject(E_PERMISSION_DENIED, "Permission denied:" + requestCode);
                break;
        }
    }
}
