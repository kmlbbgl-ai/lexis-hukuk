package app.vakit.prototype;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import org.json.JSONArray;
import org.json.JSONObject;

/** Ezan alarmlarını kurar; vakti gelince ezan servisini başlatır; açılışta yeniden kurar. */
public class AdhanReceiver extends BroadcastReceiver {
    static final String FIRE = "app.vakit.prototype.ADHAN_FIRE";
    static final int MAX = 80;

    @Override
    public void onReceive(Context c, Intent i) {
        String a = i.getAction();
        if (FIRE.equals(a)) {
            Intent s = new Intent(c, AdhanService.class).putExtra("title", i.getStringExtra("title")).putExtra("body", i.getStringExtra("body"));
            try { if (Build.VERSION.SDK_INT >= 26) c.startForegroundService(s); else c.startService(s); } catch (Exception ignored) {}
        } else if (Intent.ACTION_BOOT_COMPLETED.equals(a) || "android.intent.action.MY_PACKAGE_REPLACED".equals(a)) {
            schedule(c, c.getSharedPreferences(PrayerWidget.PREFS, Context.MODE_PRIVATE).getString("adhan", "[]"));
            PrayerWidget.updateAll(c);
        }
    }

    static PendingIntent pi(Context c, int k, String title, String body) {
        Intent i = new Intent(c, AdhanReceiver.class).setAction(FIRE).putExtra("title", title).putExtra("body", body);
        return PendingIntent.getBroadcast(c, 500 + k, i, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);
    }

    static int schedule(Context c, String json) {
        c.getSharedPreferences(PrayerWidget.PREFS, Context.MODE_PRIVATE).edit().putString("adhan", json).apply();
        AlarmManager am = (AlarmManager) c.getSystemService(Context.ALARM_SERVICE);
        for (int k = 0; k < MAX; k++) am.cancel(pi(c, k, null, null));
        int n = 0;
        try {
            JSONArray arr = new JSONArray(json); long now = System.currentTimeMillis();
            boolean exact = Build.VERSION.SDK_INT < 31 || am.canScheduleExactAlarms();
            for (int k = 0; k < arr.length() && n < MAX; k++) {
                JSONObject o = arr.getJSONObject(k); long at = o.getLong("at");
                if (at <= now) continue;
                PendingIntent p = pi(c, n, o.optString("title"), o.optString("body"));
                if (exact) am.setAlarmClock(new AlarmManager.AlarmClockInfo(at, PendingIntent.getActivity(c, 4, new Intent(c, MainActivity.class), PendingIntent.FLAG_IMMUTABLE)), p);
                else am.setAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, at, p);
                n++;
            }
        } catch (Exception ignored) {}
        return n;
    }
}
