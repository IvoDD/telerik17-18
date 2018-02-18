#include <iostream>
using namespace std;

int heap[100200], hs;

void push(int value){
    heap[++hs] = value;
    int curr = hs;
    while (curr > 1 && heap[curr]>heap[curr/2]){
        swap(heap[curr], heap[curr/2]);
        curr/=2;
    }
}

void pop(){
    heap[1] = heap[hs--];
    int curr = 1;
    while (curr*2 <= hs && (heap[curr]<heap[2*curr] || curr*2<hs && heap[curr]<heap[2*curr+1])){
        int sw = curr*2;
        if (curr*2 < hs && heap[curr*2+1]>heap[sw]){sw = curr*2+1;}
        swap(heap[curr], heap[sw]);
        curr = sw;
    }
}

int top(){
    return heap[1];
}

int main(){
    int q;
    cin>>q;
    for (int i=0; i<q; ++i){
        int a;
        cin>>a;
        if (a==1){
            int b;
            cin>>b;
            push(b);
        }if (a==2){
            pop();
        }if (a==3){
            cout<<top()<<"\n";
        }
    }
    return 0;
}
