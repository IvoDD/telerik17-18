#include <iostream>
using namespace std;

int n, q;
int pw;
int maxv = 1000000000;

int segm[200200];

int calc(int i){
    if (i>=pw) return segm[i];
    return segm[i] = min(calc(2*i), calc(2*i+1));
}

void upd(int i){
    if (i<1) return;
    segm[i] = min(segm[2*i], segm[2*i+1]);
    upd(i/2);
}

int findmin(int i, int l, int r, int a, int b){
    //cout<<a<<" "<<b<<" "<<l<<" "<<r<<"\n";
    if (l<=a && b<=r) return segm[i];
    if (l>b || r<a) return maxv;
    return min(findmin(i*2, l, r, a, (a+b)/2), findmin(i*2+1, l, r, (a+b)/2+1, b));
}

int main(){
    cin>>n>>q;
    pw = 31-__builtin_clz(n);
    pw = 1<<(pw+1);
    for (int i=0; i<n; ++i){
        cin>>segm[pw+i];
    }
    calc(1);
    for (int i=0; i<q; ++i){
        int a, b, c;
        cin>>a>>b>>c;
        if (a==2){
            segm[pw+b]=c;
            upd((pw+b)/2);
        }else{
            cout<<findmin(1, b, c, 0, pw-1)<<"\n";
        }
    }
    return 0;
}
