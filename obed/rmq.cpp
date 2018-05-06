#include <iostream>
using namespace std;

int n, q;
int rmq[100100][32];

int main(){
    cin>>n>>q;
    for (int i=0; i<n; ++i){
        cin>>rmq[i][0];
    }
    int pw = 31 - __builtin_clz(n);
    for (int j=1; j<=pw; ++j){
        for (int i=0; i<n-(1<<j); ++i){
            rmq[i][j] = min(rmq[i][j-1], rmq[i+(1<<(j-1))][j-1]);
        }
    }
    for (int i=0; i<q; ++i){
        int a, b;
        cin>>a>>b;
        int j=31 - __builtin_clz(b-a+1);
        //cout<<a<<" "<<j<<" "<<a-(1<<j)+1<<" "<<j<<"\n";
        cout<<min(rmq[a][j], rmq[b-(1<<j)+1][j])<<"\n";
    }
    return 0;
}
