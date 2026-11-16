# encode.sh kare_klasörü ses.wav çıktı.mp4
ffmpeg -y -loglevel error -framerate 30 -i "$1/%05d.jpg" -i "$2" -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p -af loudnorm=I=-14:TP=-1.5:LRA=11 -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart "$3"
