package com.walcron.module;


import android.app.Activity;
import android.content.Intent;
import android.util.Log;
import android.util.SparseArray;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableNativeMap;
import com.walcron.component.barcode.BarcodeReader;

/**
 * Created by Lee Wan on 6/18/2016.
 */
public class BarcodeModule extends ReactContextBaseJavaModule implements ActivityEventListener {
    final ReactApplicationContext reactContext;
    final SparseArray<Promise> promises = new SparseArray<>();
    private final String BAR_CODE_INTENT = "RNBarcodeIntent";

    public static final int RESULT_OK = 2;
    public static final String CODEX_KEYWORD = "CODEX";

    public BarcodeModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.reactContext = reactContext;
        reactContext.addActivityEventListener(this);
    }

    public String getName() {
        return BAR_CODE_INTENT;
    }

    @ReactMethod
    public void startActivityForResult(int requestCode, Promise promise) {
        Activity currentActivity  = getCurrentActivity();
        Intent intent = new Intent(reactContext, BarcodeReader.class);
        if(intent.resolveActivity(this.reactContext.getPackageManager()) != null) {
            currentActivity.startActivityForResult(intent, requestCode);
        }
//        final Intent galleryIntent = new Intent(Intent.ACTION_PICK);
//        galleryIntent.setType("image/*");
//        final Intent chooserIntent = Intent.createChooser(galleryIntent, "pick an Image");
//        currentActivity.startActivityForResult(chooserIntent, requestCode);
        promises.put(requestCode, promise);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        Log.i("CAMERA", "I'm getting response:"+requestCode+":"+resultCode+":"+data);

        WritableNativeMap obj = new WritableNativeMap();

        obj.putInt("requestCode", requestCode);
        obj.putInt("resultCode", resultCode);
        obj.putString("data", data != null ? data.getStringExtra(CODEX_KEYWORD) : null);

        promises.get(requestCode).resolve(obj);
        promises.remove(requestCode);
    }

    @Override
    public void onNewIntent(Intent intent) {

    }
}
