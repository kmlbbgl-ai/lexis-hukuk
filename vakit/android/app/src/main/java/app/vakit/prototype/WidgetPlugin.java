package app.vakit.prototype;

import android.appwidget.AppWidgetManager;
import android.content.ComponentName;
import android.content.Context;
import android.os.Build;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

@CapacitorPlugin(name = "VakitWidget")
public class WidgetPlugin extends Plugin {
    @PluginMethod
    public void save(PluginCall call) {
        Context c = getContext();
        c.getSharedPreferences(PrayerWidget.PREFS, Context.MODE_PRIVATE).edit().putString("data", call.getString("data", "")).apply();
        PrayerWidget.updateAll(c);
        call.resolve();
    }

    @PluginMethod
    public void pin(PluginCall call) {
        Context c = getContext();
        AppWidgetManager m = AppWidgetManager.getInstance(c);
        JSObject r = new JSObject();
        r.put("count", m.getAppWidgetIds(new ComponentName(c, PrayerWidget.class)).length);
        boolean ok = false;
        if (Build.VERSION.SDK_INT >= 26 && m.isRequestPinAppWidgetSupported()) {
            try { ok = m.requestPinAppWidget(new ComponentName(c, PrayerWidget.class), null, null); } catch (Exception e) { ok = false; }
        }
        r.put("ok", ok);
        call.resolve(r);
    }
}
