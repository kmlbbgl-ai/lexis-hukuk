package app.vakit.prototype;

import android.app.AlarmManager;
import android.app.PendingIntent;
import android.appwidget.AppWidgetManager;
import android.appwidget.AppWidgetProvider;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.SystemClock;
import android.widget.RemoteViews;
import org.json.JSONArray;
import org.json.JSONObject;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class PrayerWidget extends AppWidgetProvider {
    static final String PREFS = "vakit_widget";
    static final String ACTION = "app.vakit.prototype.WIDGET_TICK";
    static final int[] TIME_IDS = {R.id.w_t0, R.id.w_t1, R.id.w_t2, R.id.w_t3, R.id.w_t4, R.id.w_t5};
    static final int[] NAME_IDS = {R.id.w_n0, R.id.w_n1, R.id.w_n2, R.id.w_n3, R.id.w_n4, R.id.w_n5};

    @Override public void onUpdate(Context c, AppWidgetManager m, int[] ids) { updateAll(c); }
    @Override public void onReceive(Context c, Intent i) {
        super.onReceive(c, i);
        String a = i.getAction();
        if (ACTION.equals(a) || Intent.ACTION_TIME_CHANGED.equals(a) || Intent.ACTION_TIMEZONE_CHANGED.equals(a) || Intent.ACTION_DATE_CHANGED.equals(a)) updateAll(c);
    }

    static void updateAll(Context c) {
        AppWidgetManager m = AppWidgetManager.getInstance(c);
        int[] ids = m.getAppWidgetIds(new ComponentName(c, PrayerWidget.class));
        if (ids.length == 0) return;
        RemoteViews v = new RemoteViews(c.getPackageName(), R.layout.widget_prayer);
        Intent open = new Intent(c, MainActivity.class);
        v.setOnClickPendingIntent(R.id.w_root, PendingIntent.getActivity(c, 0, open, PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT));
        long next = 0;
        try {
            JSONObject d = new JSONObject(c.getSharedPreferences(PREFS, Context.MODE_PRIVATE).getString("data", "{}"));
            JSONArray names = d.getJSONArray("names"), days = d.getJSONArray("days");
            long now = System.currentTimeMillis();
            SimpleDateFormat f = new SimpleDateFormat("HH:mm", Locale.getDefault());
            // Bugünün satırı: imsaktan önceyse önceki gün; ilk ileri vakti bul
            int di = -1, pi = -1;
            for (int x = 0; x < days.length() && di < 0; x++) {
                JSONArray t = days.getJSONArray(x);
                for (int k = 0; k < 6; k++) if (t.getLong(k) > now) { di = x; pi = k; break; }
            }
            if (di < 0) throw new Exception("stale");
            int row = (pi == 0 && di > 0) ? di - 1 : di;
            JSONArray t = days.getJSONArray(row);
            for (int k = 0; k < 6; k++) {
                v.setTextViewText(NAME_IDS[k], names.getString(k));
                v.setTextViewText(TIME_IDS[k], f.format(new Date(t.getLong(k))));
                boolean on = row == di && k == pi;
                int col = on ? 0xFFE2C47D : 0xFFFFFFFF;
                v.setTextColor(NAME_IDS[k], on ? col : 0xB3FFFFFF);
                v.setTextColor(TIME_IDS[k], col);
            }
            next = days.getJSONArray(di).getLong(pi);
            v.setTextViewText(R.id.w_city, d.optString("city", ""));
            v.setTextViewText(R.id.w_next, d.optString("left", "") .replace("%s", names.getString(pi)));
            v.setChronometer(R.id.w_count, SystemClock.elapsedRealtime() + (next - now), null, true);
            if (Build.VERSION.SDK_INT >= 24) v.setChronometerCountDown(R.id.w_count, true);
        } catch (Exception e) {
            v.setTextViewText(R.id.w_city, "Vakit");
            v.setTextViewText(R.id.w_next, "Uygulamayı açın");
        }
        m.updateAppWidget(ids, v);
        AlarmManager am = (AlarmManager) c.getSystemService(Context.ALARM_SERVICE);
        PendingIntent pi2 = PendingIntent.getBroadcast(c, 1, new Intent(c, PrayerWidget.class).setAction(ACTION), PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT);
        long at = next > 0 ? next + 1000 : System.currentTimeMillis() + 3600_000;
        try {
            if (Build.VERSION.SDK_INT >= 31 && !am.canScheduleExactAlarms()) am.setAndAllowWhileIdle(AlarmManager.RTC, at, pi2);
            else am.setExactAndAllowWhileIdle(AlarmManager.RTC, at, pi2);
        } catch (Exception e) { am.set(AlarmManager.RTC, at, pi2); }
    }
}
