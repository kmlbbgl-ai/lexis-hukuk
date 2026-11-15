# sheet.sh çıktı.jpg genişlik dosyalar...  -> yan yana birleştir
out=$1; w=$2; shift 2; args=""; fl=""; i=0
for f in "$@"; do args="$args -i $f"; fl="$fl[$i]scale=$w:-1[v$i];"; i=$((i+1)); done
st=""; for j in $(seq 0 $((i-1))); do st="$st[v$j]"; done
ffmpeg -y -loglevel error $args -filter_complex "${fl}${st}hstack=$i" $out
