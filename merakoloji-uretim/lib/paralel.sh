# paralel.sh sahne.html hash W H toplam_kare klasör [işçi=4] [baş=0]
f=$1; h=$2; W=$3; H=$4; N=$5; D=$6; K=${7:-4}; S=${8:-0}
mkdir -p "$D"; Q=$(( (N-S+K-1)/K ))
for k in $(seq 0 $((K-1))); do a=$((S+k*Q)); b=$((S+(k+1)*Q)); [ $b -gt $N ] && b=$N; node "$(dirname $0)/render.js" "$f" "$h" $W $H $a $b "$D" & done; wait
