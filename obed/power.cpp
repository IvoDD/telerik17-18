#include <iostream>
using namespace std;

long long mod = 1000000007;
long long power(int a, int b){
    if (b==0){return 1;}
    long long ans = power(a, b/2);
    ans *= ans;
    ans %= mod;
    if (b%2){ans*=a; ans%=mod;}
    return ans;
}
long long rev(int a){
    return power(a, mod-2);
}
long long comb(int a, int b){
    long long ans = 1;
    for (int i=1; i<=b; ++i){
        ans = ans*(a-i+1)%mod;
        ans = ans*rev(i)%mod;
    }
    return ans;
}

int main(){
    long long x, y;
    cin>>x>>y;
    cout<<comb(x, y);
    return 0;
}
