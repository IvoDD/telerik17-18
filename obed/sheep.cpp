#include <iostream>
#include <algorithm>
using namespace std;

int n, m, cap;
int a[100200], b[100200];

bool check(int t){
    int ia, ib=0, free=cap;
    for (ia=0; ia<n; ++ia){
        if (a[ia] <= b[ib]+t && a[ia] >= b[ib]-t && free>0){
            --free;
        }else{
            ++ib;
            if (ib >= m) return 0;
            free=cap;
            --ia;
        }
    }
    return 1;
}

int main(){
    cin>>n>>m>>cap;
    for (int i=0; i<n; ++i){
        cin>>a[i];
    }
    for (int i=0; i<m; ++i){
        cin>>b[i];
    }
    int l=-1, r=1000000000;
    while (r-l>1){
        int mid = (l+r)/2;
        if ( check(mid) ) r=mid;
        else l=mid;
    }
    cout<<r<<"\n";
    return 0;
}
