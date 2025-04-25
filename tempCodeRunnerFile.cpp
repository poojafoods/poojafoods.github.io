#include <iostream>
#include <queue>
using namespace std;

class Node {
public:
    int data;
    Node* left;
    Node* right;

    Node(int d) {
        data = d;
        left = right = NULL;
    }
};

void inorder(Node* root) {
    if (root == NULL) {
        return;
    }
    inorder(root->left);     
    cout << root->data << " "; 
    inorder(root->right);     
}

int main() {
    int x;
    cout << "Enter the root element: ";
    cin >> x;

    Node* root = new Node(x);
    queue<Node*> q;
    q.push(root);

    while (!q.empty()) {
        Node* temp = q.front();
        q.pop();

        int leftVal, rightVal;
        cout << "Enter the left child of " << temp->data << " (-1 for no child): ";
        cin >> leftVal;
        if (leftVal != -1) {
            temp->left = new Node(leftVal);
            q.push(temp->left);
        }

        cout << "Enter the right child of ";
        cout << temp->data << " (-1 for no child): ";
        cin >> rightVal;
        if (rightVal != -1) {
            temp->right = new Node(rightVal);
            q.push(temp->right);
        }
    }

    cout << "Inorder traversal: ";
    inorder(root);
    cout << endl;

    return 0;
}
