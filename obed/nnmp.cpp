#include <iostream>
#include <stdlib.h>
using namespace std;

int n;
int a[1000200], g[1000200];

int main(){
    cin>>n;
    for (int i=0; i<n; ++i){
        a[i]=rand();
    }

    g[0] = 1;
    int ans = 0;
    for (int i=1; i<n; ++i){
        g[i] = 1;
        for (int j=0; j<i; ++j){
            if (a[j] <= a[i]){
               if (g[j]+1 > g[i]){
                    g[i] = g[j]+1;
               }
            }
        }
        if (g[i] > ans){ans = g[i];}
    }
    cout<<ans<<"\n";
    return 0;
}
