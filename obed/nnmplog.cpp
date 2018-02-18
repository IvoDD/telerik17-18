#include <iostream>
#include <stdlib.h>

using namespace std;

int n;
int a[1000200], b[1000200], bs;

int bin_search(int fin){
    int l=-1, r=bs; //[l,r)
    while (l+1 < r){
        int med = (l+r)/2;
        if (b[med]<=fin){l = med;}
        else{r = med;}
    }
    return l;
}

int main(){
    cin>>n;
    for (int i=0; i<n; ++i){
        a[i] = rand();
    }

    b[0] = a[0];
    bs = 1;
    for (int i=1; i<n; ++i){
        int ind = bin_search(a[i]) + 1;
        b[ind] = a[i];
        if (ind==bs){++bs;}
    }
    cout<<bs<<"\n";
    return 0;
}
