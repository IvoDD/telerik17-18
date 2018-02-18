#include <iostream>
#include <vector>
using namespace std;

int n, m;
vector<int> e[100200];
int d[100200];

void mark(int a, int b){
    cout<<a<<" "<<b<<" is not critical\n";
}

int dfs(int ind, int pr, int depth){
    int ans = depth+1;
    d[ind] = depth;
    for (int curr: e[ind]){
        if (d[curr] == 0){
            int cans = dfs(curr, ind, depth+1);
            if (cans <= depth){mark(ind, curr);}
            if (cans < ans){ans = cans;}
        }else{
            if (d[curr] < depth && curr != pr){
                mark(ind, curr);
                if (d[curr] < ans){ans = d[curr];}
            }
        }
    }
    return ans;
}

int main(){
    cin>>n>>m;
    for (int i=0; i<m; ++i){
        int a, b;
        cin>>a>>b;
        e[a].push_back(b);
        e[b].push_back(a);
    }
    dfs(0, -1, 1);
    return 0;
}
