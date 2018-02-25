#include <iostream>
#include <vector>
#include <queue>
#include <set>
using namespace std;

int n, m;
vector<pair<int, int> > e[100200];

int d[100200];
queue<int> q;
set<int> cs, ns;
void bfs(){
    d[0] = 1;
    q.push(0);
    while (!q.empty()){
        int curr = q.front();
        q.pop();
        for (auto next: e[curr]){
            if (d[next.first] == 0){
                d[next.first] = d[curr]+1;
                q.push(next.first);
            }
        }
    }
}

int main(){
    cin>>n>>m;
    for (int i=0; i<m; ++i){
        int a, b, c;
        cin>>a>>b>>c;
        e[a].push_back(make_pair(b, c));
        e[b].push_back(make_pair(a, c));
    }
    bfs();
    cs.insert(n-1);
    for (int i=1; i<d[n-1]; ++i){
        ns.clear();
        int best = 10;
        for (auto x : cs){
            //cout<<x<<" ";
            for (auto y: e[x]){
                if (d[y.first] == d[x]-1 && y.second < best){
                    best = y.second;
                }
            }
        }//cout<<"\n";
        for (auto x : cs){
            for (auto y: e[x]){
                if (d[y.first] == d[x]-1 && y.second == best){
                    ns.insert(y.first);
                }
            }
        }
        cs = ns;
        cout<<best;
    }
    return 0;
}
/*
6 9
0 1 1
0 2 3
1 4 6
1 3 5
2 4 2
2 3 7
3 4 1
3 5 4
4 5 4
*/
