package app.vakit.prototype;

import android.content.Context;
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
}
