#include <iostream>
#include <string.h>
using namespace std;

char text[100200], word[100200];

int main(){
    cin>>text>>word;
    int ans = 0;
    int n = strlen(text), m = strlen(word);
    for (int i=0; i<n-m+1; ++i){
        bool ok=true;
        for (int j=0; j<m; ++j){
            if (text[i+j] != word[j]){ok = false; break;}
        }
        ans += ok;
    }
    cout<<ans<<"\n";
    return 0;
}
