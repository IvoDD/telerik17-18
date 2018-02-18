#include <iostream>
#include <stack>
using namespace std;

stack<int> s;
int a[500500];

int main(){
    int n;
    cin>>n;
    for (int i=0; i<n; ++i){
        cin>>a[i];
    }
    for (int i=n-1; i>=0; --i){
        while(!s.empty() && s.top()<a[i]){
            s.pop();
        }
        s.push(a[i]);
        a[i] = s.size()-1;
    }
    for (int i=0; i<n; ++i){
        cout<<a[i]<<" ";
    }cout<<"\n";
    return 0;
}
