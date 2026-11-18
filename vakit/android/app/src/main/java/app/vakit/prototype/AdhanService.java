package app.vakit.prototype;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.content.pm.ServiceInfo;
import android.media.AudioAttributes;
import android.media.MediaPlayer;
import android.os.Build;
import android.os.IBinder;
import android.os.PowerManager;
import androidx.core.app.NotificationCompat;

/** Ezanı alarm ses akışında (sessiz modda da duyulur) çalan ön plan servisi. */
public class AdhanService extends Service {
    static final String CH = "ezan_oku";
    static final String STOP = "app.vakit.prototype.ADHAN_STOP";
    static final int NID = 7001;
    private MediaPlayer mp;
    private PowerManager.WakeLock wl;

    @Override public IBinder onBind(Intent i) { return null; }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if (intent != null && STOP.equals(intent.getAction())) { stopAll(); return START_NOT_STICKY; }
        String title = intent != null && intent.getStringExtra("title") != null ? intent.getStringExtra("title") : "Ezan vakti";
        String body = intent != null && intent.getStringExtra("body") != null ? intent.getStringExtra("body") : "";
        NotificationManager nm = (NotificationManager) getSystemService(Context.NOTIFICATION_SERVICE);
        if (Build.VERSION.SDK_INT >= 26 && nm.getNotificationChannel(CH) == null) {
            NotificationChannel c = new NotificationChannel(CH, "Ezan okunuyor", NotificationManager.IMPORTANCE_HIGH);
            c.setSound(null, null); c.enableVibration(false); c.setLockscreenVisibility(Notification.VISIBILITY_PUBLIC);
            nm.createNotificationChannel(c);
        }
        int fl = PendingIntent.FLAG_IMMUTABLE | PendingIntent.FLAG_UPDATE_CURRENT;
        PendingIntent stop = PendingIntent.getService(this, 2, new Intent(this, AdhanService.class).setAction(STOP), fl);
        PendingIntent open = PendingIntent.getActivity(this, 3, new Intent(this, MainActivity.class), fl);
        Notification n = new NotificationCompat.Builder(this, CH)
            .setSmallIcon(getApplicationInfo().icon).setContentTitle(title).setContentText(body)
            .setPriority(NotificationCompat.PRIORITY_MAX).setCategory(NotificationCompat.CATEGORY_ALARM)
            .setVisibility(NotificationCompat.VISIBILITY_PUBLIC).setContentIntent(open).setDeleteIntent(stop)
            .addAction(0, "Durdur", stop).setOngoing(false).build();
        try {
            if (Build.VERSION.SDK_INT >= 29) startForeground(NID, n, ServiceInfo.FOREGROUND_SERVICE_TYPE_MEDIA_PLAYBACK);
            else startForeground(NID, n);
        } catch (Exception e) { nm.notify(NID, n); }
        play();
        return START_NOT_STICKY;
    }

    private void play() {
        if (mp != null) { try { mp.release(); } catch (Exception ignored) {} }
        PowerManager pm = (PowerManager) getSystemService(Context.POWER_SERVICE);
        wl = pm.newWakeLock(PowerManager.PARTIAL_WAKE_LOCK, "vakit:ezan"); wl.acquire(6 * 60 * 1000L);
        try {
            mp = new MediaPlayer();
            mp.setAudioAttributes(new AudioAttributes.Builder().setUsage(AudioAttributes.USAGE_ALARM).setContentType(AudioAttributes.CONTENT_TYPE_MUSIC).build());
            mp.setDataSource(this, android.net.Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.vakit_ezan));
            mp.setOnCompletionListener(x -> stopAll());
            mp.prepare(); mp.start();
        } catch (Exception e) { stopAll(); }
    }

    private void stopAll() {
        if (mp != null) { try { mp.stop(); } catch (Exception ignored) {} mp.release(); mp = null; }
        if (wl != null && wl.isHeld()) wl.release();
        if (Build.VERSION.SDK_INT >= 24) stopForeground(STOP_FOREGROUND_REMOVE); else stopForeground(true);
        stopSelf();
    }

    @Override public void onDestroy() { if (mp != null) { try { mp.release(); } catch (Exception ignored) {} } if (wl != null && wl.isHeld()) wl.release(); super.onDestroy(); }
}
