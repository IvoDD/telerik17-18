#include <iostream>
#include <vector>
using namespace std;

int n, m;
vector<pair<int, int> > e[100200];
int used[100200];
int maxd = 0, maxi = 0;

void dfs(int ind, int dist){
    used[ind] = 1;
    if (dist > maxd){maxd = dist; maxi = ind;}
    for (auto curr: e[ind]){
        if (!used[curr.first]){
            dfs(curr.first, dist+curr.second);
        }
    }
}

int main(){
    cin>>n;
    m = n-1;
    for (int i=0; i<m; ++i){
        int a, b, c;
        cin>>a>>b>>c;
        e[a].push_back(make_pair(b, c));
        e[b].push_back(make_pair(a, c));
    }
    dfs(0, 0);
    cout<<"One end of diameter: "<<maxi<<"\n";
    maxd = 0;
    for (int i=0; i<n; ++i) used[i] = 0;
    dfs(maxi, 0);
    cout<<"Other end of diameter: "<<maxi<<"\n";
    cout<<"Diameter length: "<<maxd<<"\n";
    return 0;
}
