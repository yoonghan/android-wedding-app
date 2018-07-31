package com.walcron.hanleewan.weddingplanner;

import android.annotation.TargetApi;
import android.app.Activity;
import android.app.Notification;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.TaskStackBuilder;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.Bundle;
import android.view.View;

import com.facebook.react.ReactActivity;

public class MainActivity extends ReactActivity {

    private static Activity mCurrentActivity = null;
    private static final String TAG = "MainActivity";


    /**
     * Returns the name of the main component registered from JavaScript.
     * This is used to schedule rendering of the component.
     */
    @Override
    protected String getMainComponentName() {
        return "WeddingPlanner";
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        mCurrentActivity = this;

//        getWindow().getDecorView().setSystemUiVisibility(
//                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
//                | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
//                | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
//                | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // hide nav bar
//                | View.SYSTEM_UI_FLAG_FULLSCREEN
//                | View.SYSTEM_UI_FLAG_IMMERSIVE);

        if (getIntent().getExtras() != null) {
            String firebase_key = getIntent().getExtras().getString("from");
            if( firebase_key != null && firebase_key.equals(getResources().getString(R.string.firebase_key))) {
                //Not to do anything as of now.
            }
        }
    }

//    public void onWindowFocusChanged(boolean hasFocus) {
//        super.onWindowFocusChanged(hasFocus);
//        if (hasFocus) {
//            getWindow().getDecorView().setSystemUiVisibility(
//                View.SYSTEM_UI_FLAG_LAYOUT_STABLE
//                        | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
//                        | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
//                        | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION // hide nav bar
//                        | View.SYSTEM_UI_FLAG_FULLSCREEN
//                        | View.SYSTEM_UI_FLAG_IMMERSIVE);
//        }
//    }

    public static Activity getActivity(){
        Activity activity = mCurrentActivity;
        return activity;
    }

    @TargetApi(Build.VERSION_CODES.M)
    public static void sendNotification(String title, String text) {
        title = (title == null || title.isEmpty()) ? mCurrentActivity.getResources().getString(R.string.firebase_more_events): title;

        // Creates an explicit intent for an Activity in your app
        Intent resultIntent = new Intent(mCurrentActivity.getApplicationContext(), MainActivity.class);
        TaskStackBuilder stackBuilder = TaskStackBuilder.create(mCurrentActivity);
// Adds the back stack for the Intent (but not the Intent itself)
        stackBuilder.addParentStack(MainActivity.class);
// Adds the Intent that starts the Activity to the top of the stack
        stackBuilder.addNextIntent(resultIntent);
        Notification.Builder notificationBuilder = new Notification.Builder(mCurrentActivity.getApplicationContext())
            .setContentTitle(title)
            .setContentText(text)
            .setContentIntent(stackBuilder.getPendingIntent(
                    0,
                    PendingIntent.FLAG_UPDATE_CURRENT
            ))
            .setPriority(Notification.PRIORITY_HIGH);
        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.LOLLIPOP) {
            notificationBuilder.setDefaults(Notification.DEFAULT_ALL);
        }

        NotificationManager notificationManager = (NotificationManager) mCurrentActivity.getSystemService(Context.NOTIFICATION_SERVICE);
        notificationManager.notify(1, notificationBuilder.build());
    }
}
