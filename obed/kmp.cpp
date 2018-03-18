#include <iostream>
#include <string.h>
using namespace std;

char text[100200], word[100200];
int suf[100200];

int main(){
    int ans = 0;
    cin>>text>>word;
    suf[0]=0;
    int n = strlen(text), m=strlen(word);
    for (int i=1; i<m; ++i){
        int cand = suf[i-1]+1;
        while (word[cand-1] != word[i]){
            if (cand==1){cand=0; break;}
            cand = suf[cand-1]+1;
        }
        suf[i] = cand;
    }
    int match = 0;
    for (int i=0; i<n; ++i){
        while (word[match] != text[i]){
            if (match == 0){break;}
            match = suf[match-1];
        }
        if (word[match] == text[i]) ++match;
        //cout<<match<<" ";
        if (match == m){
            match = suf[match-1];
            ++ans;
        }
    }
    cout<<ans<<"\n";
    return 0;
}
