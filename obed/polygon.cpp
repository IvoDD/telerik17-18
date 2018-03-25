#include <iostream>
using namespace std;

int n;
int x[1000200], y[1000200];

int abs(int a){
    return a<0 ? -a : a;
}

int gcd (int a, int b){
    if (a < b){swap(a, b);}
    while (b>0){
        int h = b;
        b = a%b;
        a = h;
    }
    return a;
}
int main(){
    cin>>n;
    for (int i=0; i<n; ++i){
        cin>>x[i]>>y[i];
    }
    long long ans = n;
    for (int i=0; i<n; ++i){
        int nx = (i+1)%n;
        ans += gcd(abs(x[i]-x[nx]), abs(y[i]-y[nx])) - 1;
    }
    cout<<ans<<"\n";
    return 0;
}
