#include <iostream>
using namespace std;

struct node{
    int val;
    int cnt;
    node *l;
    node *r;
    node(int x=0){
        val=x;
        cnt=1;
        l=nullptr;
        r=nullptr;
    }
};

int asdf(int *d){
    return d[5]=8;
}

bool isIn(node* root, int x){
    if (!root) return 0;
    if (root->val == x) return 1;
    return x < root->val ? isIn(root->l, x) : isIn(root->r, x);
}

node* ins(node* root, int x){
    if (!root) return new node(x);
    if (x < root->val){
        root->l = ins(root->l, x);
    }else{
        root->r = ins(root->r, x);
    }
    ++(root->cnt);
    return root;
}

int kth(node* root, int k){
    if (!root || k >= root->cnt) return -1;
    int lft = root->l ? root->l->cnt : 0;
    if (k == lft) return root->val;
    if (k < lft) return kth(root->l, k);
    return kth(root->r, k-lft-1);
}

int main(){
    /*int b[100]={5, 6, 7, 8, 9, 10};
    int *a = b;
    int n;
    cin>>n;
    int *d = new int[n];
    asdf(b);
    cout<<b[5]<<"\n";*/
    node *root = new node(5);
    ins(root, 3);
    ins(root, 7);
    ins(root, 8);
    ins(root, 0);
    cout<<kth(root, 0)<<" "<<kth(root, 1)<<" "<<kth(root, 2)<<" "<<kth(root, 3)<<"\n";
    return 0;
}
