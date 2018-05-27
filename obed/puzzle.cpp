#include <iostream>
using namespace std;

int n;
int t[100200][3][3];
int d1[3], d2[3];

int main(){
    cin>>n;
    for (int i=0; i<n; ++i){
        int k;
        cin>>k;
        for (int j=0; j<k; ++j){
            int a, b;
            cin>>a>>b;
            if (a>0) a=3-a;
            t[i][a][b]++;
        }
    }
    d1[0] = 1;
    d1[1] = d1[2] = 0;
    for (int i=0; i<n; ++i){
        for (int a=0; a<3; ++a){
            d2[a]=0;
            for (int b=0; b<3; ++b){
                d2[a]+=d1[b]*t[i][b][a];
            }
        }
        for (int a=0; a<3; ++a){
            d1[a] = d2[a];
            //cout<<d2[a]<<" ";
        }//cout<<"\n";
    }
    cout<<d2[0]<<"\n";
    return 0;
}
/*
3
3
0 0
0 1
0 2
2
1 1
1 2
3
0 0
1 0
2 0
*/
