#include <iostream>
#include <stdlib.h>
using namespace std;

struct node{
    int x;
    int y;
    node *l;
    node *r;
    node(int _x=0){
        x=_x;
        y=rand();
        l = nullptr;
        r = nullptr;
    }
};

pair<node*, node*> split(node* root, int x){
    if (!root) return {nullptr, nullptr};
    if (x==root->x) return {root->l, root->r};
    if (x < root->x){
        auto a = split(root->l, x);
        root->l = a.second;
        return {a.first, root};
    }
    auto a = split(root->r, x);
    root->r = a.first;
    return {root, a.second};
}

node* mer(node* a, node* b){
    if (!a) return b;
    if (!b) return a;
    if (a->y > b->y){
        a->r = mer(a->r, b);
        return a;
    }
    b->l = mer(a, b->l);
    return b;
}

node* push(node* root, int x){
    auto a = split(root, x);
    return mer( mer(a.first, new node(x)), a.second );
}
node* pop(node* root, int x){
    auto a = split(root, x);
    return mer(a.first, a.second);
}
bool fin(node* root, int x){
    if (!root) return false;
    if (root->x == x) return true;
    if (x < root->x) return fin(root->l, x);
    return fin(root->r, x);
}

int main(){
    node* root = nullptr;
    root = push(root, 5);
    root = push(root, 1);
    root = push(root, 4);
    root = push(root, 2);
    root = push(root, 7);
    root = push(root, 8);
    cout<<fin(root, 5)<<" "<<fin(root, 8)<<" "<<fin(root, 6)<<" "<<fin(root, 4);
    srand(42);
    return 0;
}
