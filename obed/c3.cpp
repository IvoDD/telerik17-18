#include <iostream>
using namespace std;

long long mod = 1<<30, calc[12000][5200];
long long dp(int a, int b){
    if (calc[a][b]){return calc[a][b];}
    return calc[a][b] = (dp(a-1, b) + dp(a-1, b-1))%mod;
}

int main(){
    long long n, m, p, q, ans=0;
    cin>>n>>m>>p>>q;
    n = n-m; q = p-q;
    for (int x=0; (x-1)*p<=n; ++x){
        int y = (n-x*p)/q + (n-x*p)%q!=0;
        ans += dp(x+y, x);
        ans %= mod;
    }
    cout<<ans<<endl;
}
