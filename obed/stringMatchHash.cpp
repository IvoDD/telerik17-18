#include <iostream>
#include <string.h>
using namespace std;

const long long mod1 = 1000000007, mod2 = 1000000009;
char text[1048576], word[1048576];

int main(){
    cin>>text>>word;
    int n = strlen(text), m=strlen(word);
    int ans = 0;
    long long hw1=0, hw2=0;
    long long ht1=0, ht2=0;
    for (int i=0; i<m; ++i){
        hw1 *= 27; hw1 += word[i]-'a'+1; hw1 %= mod1;
        hw2 *= 29; hw2 += word[i]-'a'+1; hw2 %= mod2;

        ht1 *= 27; ht1 += text[i]-'a'+1; ht1 %= mod1;
        ht2 *= 29; ht2 += text[i]-'a'+1; ht2 %= mod2;
    }
    if (hw1 == ht1 && hw2 == ht2){++ans;}
    long long p27=1, p29=1;
    for (int i=0; i<m-1; ++i){
        p27 = p27*27%mod1;
        p29 = p29*29%mod2;
    }
    for (int i=0; i<n-m; ++i){
        //cout<<ht1<<" "<<hw1<<"\n";
        ht1 = ((ht1 - (text[i]-'a'+1)*p27%mod1 + mod1)%mod1 * 27 + text[i+m]-'a'+1) %mod1;
        ht2 = ((ht2 - (text[i]-'a'+1)*p29%mod1 + mod2)%mod2 * 29 + text[i+m]-'a'+1) %mod2;
        if (ht1 == hw1 && ht2 == hw2){++ans;}
    }
    cout<<ans<<"\n";
    return 0;
}
