#include <iostream>
using namespace std;

int a[1048576];

int main(){
    int x=0;
    int n;
    cin>>n;
    for (int i=0; i<n; ++i){
        cin>>a[i];
        x ^= a[i];
    }
    if (x==0){cout<<"Ti si purvi\n";}
    else{
        cout<<"Az sum purvi\n";
        for (int i=0; i<n; ++i){
            if ((a[i]^x) < a[i]){
                cout<<"ot "<<a[i]<<" vzimam "<<a[i]-(a[i]^x)<<"\n";
                break;
            }
        }
    }
    return 0;
}
