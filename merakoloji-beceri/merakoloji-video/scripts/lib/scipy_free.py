import numpy as np
def lfilter1(x,a):
    """y[n]=y[n-1]+a*(x[n]-y[n-1]) — sayısal olarak güvenli bloklu uygulama"""
    b=1.0-a
    if b<=1e-9: return x.copy()
    blk=max(8,min(4096,int(25.0/-np.log(b))))
    y=np.empty_like(x,dtype=np.float64); s=0.0; k=np.arange(blk)
    inv=b**(-k); pw=b**(k+1)
    for i in range(0,len(x),blk):
        xb=x[i:i+blk]; m=len(xb)
        c=np.cumsum(xb*inv[:m])
        yb=pw[:m]*s + a*(b**k[:m])*c
        y[i:i+m]=yb; s=yb[-1]
    return y
