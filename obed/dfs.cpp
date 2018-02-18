#include <iostream>
using namespace std;

vector<int> e[1024];
bool used[1024];
int c=0;
void dfs(int v){
    used[v]=1;
    for (int i=0; i<e[v].size(); ++i){
        if (!used[e[v][i]]){
            dfs(e[v][i]);
        }
    }
}

int main(){
    //
    dfs(0);
    cout<<n==c
    return 0;
}
