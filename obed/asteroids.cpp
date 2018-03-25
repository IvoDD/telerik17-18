#include <iostream>
using namespace std;

int n, m;
char t[256][256];
bool used[256][256];

int dfs(int i, int j){
    used[i][j] = 1;
    int ans = 1;
    if (i>0 && !used[i-1][j] && t[i-1][j]=='1') ans+=dfs(i-1, j);
    if (i<n-1 && !used[i+1][j] && t[i+1][j]=='1') ans+=dfs(i+1, j);
    if (j>0 && !used[i][j-1] && t[i][j-1]=='1') ans+=dfs(i, j-1);
    if (j<m-1 && !used[i][j+1] && t[i][j+1]=='1') ans+=dfs(i, j+1);
    return ans;
}

int main(){
    cin>>n>>m;
    for (int i=0; i<n; ++i){
        cin>>t[i];
    }
    for (int i=0; i<n; ++i){
        for (int j=0; j<m; ++j){
            if (!used[i][j] && t[i][j]=='1'){
                cout<<dfs(i, j)<<" ";
            }
        }
    }cout<<"\n";
    return 0;
}
