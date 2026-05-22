#include <iostream>
#include <fstream>
#include <sstream>
#include <string>
#include <vector>

using namespace std;

// ========================================================
// 1. STRUCT & POINTER (Dasar semua struktur data)
// ========================================================

// Struct untuk Hash Table (User)
struct User {
    string id;
    string name;
    string role;
    int xp;
    User* next; // Pointer untuk chaining collision di Hash Table
};

// Struct untuk BST & Linked List Sorting (Opportunity)
struct Opportunity {
    int id;
    string title;
    string type;
    int reward;
    Opportunity* left;  // Pointer untuk BST
    Opportunity* right; // Pointer untuk BST
    Opportunity* next;  // Pointer untuk Linked List Sorting
};

// Struct untuk Queue (Proposal / Lamaran)
struct Proposal {
    string applicantName;
    string coverLetter;
    Proposal* next;
};

// Struct untuk Linked List (Task di Workroom)
struct Task {
    string title;
    string status;
    Task* next;
};

// Struct untuk Stack (Activity Log)
struct Activity {
    string logMsg;
    Activity* next;
};

// Struct untuk Graph Node (Koneksi antar User)
struct GraphNode {
    string userId;
    GraphNode* next;
};


// ========================================================
// 2. HASH TABLE (Menyimpan Data User)
// ========================================================
const int HASH_SIZE = 10;
class UserHashTable {
private:
    User* table[HASH_SIZE];

    // Simple Hash Function
    int hashFunction(string id) {
        int sum = 0;
        for (char c : id) sum += c;
        return sum % HASH_SIZE;
    }

public:
    UserHashTable() {
        for (int i = 0; i < HASH_SIZE; i++) table[i] = nullptr;
    }

    void insert(string id, string name, string role, int xp) {
        int index = hashFunction(id);
        User* newUser = new User{id, name, role, xp, nullptr};
        
        // Chaining jika terjadi collision
        if (table[index] == nullptr) {
            table[index] = newUser;
        } else {
            User* temp = table[index];
            while (temp->next != nullptr) temp = temp->next;
            temp->next = newUser;
        }
    }

    // SEARCHING di Hash Table
    User* search(string id) {
        int index = hashFunction(id);
        User* temp = table[index];
        while (temp != nullptr) {
            if (temp->id == id) return temp;
            temp = temp->next;
        }
        return nullptr;
    }

    void display() {
        cout << "\n--- DATA USER (Hash Table) ---\n";
        for (int i = 0; i < HASH_SIZE; i++) {
            if (table[i] != nullptr) {
                User* temp = table[i];
                while (temp != nullptr) {
                    cout << "ID: " << temp->id << " | Nama: " << temp->name << " | Role: " << temp->role << "\n";
                    temp = temp->next;
                }
            }
        }
    }
};

// ========================================================
// 3. BINARY SEARCH TREE & REKURSIF (Data Peluang)
// ========================================================
class OpportunityBST {
public:
    Opportunity* root;
    Opportunity* headList; // Untuk keperluan Sorting nantinya

    OpportunityBST() { root = nullptr; headList = nullptr; }

    // FUNGSI REKURSIF: Insert ke BST
    Opportunity* insertRecursive(Opportunity* node, int id, string title, string type, int reward) {
        if (node == nullptr) {
            Opportunity* newOpp = new Opportunity{id, title, type, reward, nullptr, nullptr, nullptr};
            // Masukkan juga ke Linked List untuk didemonstrasikan di Sorting
            newOpp->next = headList;
            headList = newOpp;
            return newOpp;
        }
        if (id < node->id) node->left = insertRecursive(node->left, id, title, type, reward);
        else if (id > node->id) node->right = insertRecursive(node->right, id, title, type, reward);
        return node;
    }

    void insert(int id, string title, string type, int reward) {
        root = insertRecursive(root, id, title, type, reward);
    }

    // FUNGSI REKURSIF: Inorder Traversal (Menampilkan data urut berdasarkan ID)
    void inorderRecursive(Opportunity* node) {
        if (node != nullptr) {
            inorderRecursive(node->left);
            cout << "ID: " << node->id << " | Reward: Rp" << node->reward << " | Judul: " << node->title << "\n";
            inorderRecursive(node->right);
        }
    }

    void displayInorder() {
        cout << "\n--- DAFTAR PELUANG (BST Inorder) ---\n";
        inorderRecursive(root);
    }
};

// ========================================================
// 4. SORTING (Merge Sort pada Linked List Peluang)
// ========================================================
// FUNGSI REKURSIF: Memisahkan dan menggabungkan list untuk Merge Sort
Opportunity* mergeSortedLists(Opportunity* a, Opportunity* b) {
    if (a == nullptr) return b;
    if (b == nullptr) return a;

    Opportunity* result = nullptr;
    // Sorting berdasarkan REWARD tertinggi ke terendah
    if (a->reward >= b->reward) {
        result = a;
        result->next = mergeSortedLists(a->next, b);
    } else {
        result = b;
        result->next = mergeSortedLists(a, b->next);
    }
    return result;
}

void splitList(Opportunity* source, Opportunity** frontRef, Opportunity** backRef) {
    Opportunity* fast;
    Opportunity* slow;
    slow = source;
    fast = source->next;

    while (fast != nullptr) {
        fast = fast->next;
        if (fast != nullptr) {
            slow = slow->next;
            fast = fast->next;
        }
    }
    *frontRef = source;
    *backRef = slow->next;
    slow->next = nullptr;
}

void mergeSort(Opportunity** headRef) {
    Opportunity* head = *headRef;
    Opportunity* a;
    Opportunity* b;

    if ((head == nullptr) || (head->next == nullptr)) return;

    splitList(head, &a, &b);
    mergeSort(&a);
    mergeSort(&b);
    *headRef = mergeSortedLists(a, b);
}


// ========================================================
// 5. QUEUE (Antrean Proposal Masuk)
// ========================================================
class ProposalQueue {
private:
    Proposal *front, *rear;
public:
    ProposalQueue() { front = rear = nullptr; }

    void enqueue(string name, string cover) {
        Proposal* temp = new Proposal{name, cover, nullptr};
        if (rear == nullptr) {
            front = rear = temp;
            return;
        }
        rear->next = temp;
        rear = temp;
        cout << ">> Proposal dari " << name << " masuk ke antrean.\n";
    }

    void dequeue() {
        if (front == nullptr) {
            cout << ">> Tidak ada proposal di antrean.\n";
            return;
        }
        Proposal* temp = front;
        front = front->next;
        if (front == nullptr) rear = nullptr;
        cout << ">> Memproses proposal dari: " << temp->applicantName << "\n";
        delete temp;
    }
};

// ========================================================
// 6. STACK (Riwayat Aktivitas)
// ========================================================
class ActivityStack {
private:
    Activity* top;
public:
    ActivityStack() { top = nullptr; }

    void push(string msg) {
        Activity* temp = new Activity{msg, top};
        top = temp;
    }

    void pop() {
        if (top == nullptr) return;
        Activity* temp = top;
        top = top->next;
        delete temp;
    }

    void display() {
        cout << "\n--- RIWAYAT AKTIVITAS TERBARU (Stack) ---\n";
        Activity* temp = top;
        int count = 1;
        while (temp != nullptr) {
            cout << count++ << ". " << temp->logMsg << "\n";
            temp = temp->next;
        }
    }
};

// ========================================================
// 7. GRAPH & SEARCHING (Koneksi Komunitas / User)
// ========================================================
class UserGraph {
private:
    // Adjacency List array
    GraphNode* adjList[HASH_SIZE]; 
    
    // Fungsi Hash untuk pemetaan ID ke Index array
    int hashFunction(string id) {
        int sum = 0;
        for (char c : id) sum += c;
        return sum % HASH_SIZE;
    }

public:
    UserGraph() {
        for (int i = 0; i < HASH_SIZE; i++) adjList[i] = nullptr;
    }

    void addEdge(string srcId, string destId) {
        int srcIndex = hashFunction(srcId);
        GraphNode* newNode = new GraphNode{destId, adjList[srcIndex]};
        adjList[srcIndex] = newNode;
        
        // Undirected graph (dua arah)
        int destIndex = hashFunction(destId);
        GraphNode* newNode2 = new GraphNode{srcId, adjList[destIndex]};
        adjList[destIndex] = newNode2;
    }

    // FUNGSI REKURSIF: DFS Searching untuk mencari koneksi jaringan user
    void DFS(string startId, bool visited[]) {
        int index = hashFunction(startId);
        visited[index] = true;
        cout << startId << " ";

        GraphNode* temp = adjList[index];
        while (temp != nullptr) {
            int neighborIndex = hashFunction(temp->userId);
            if (!visited[neighborIndex]) {
                cout << "-> ";
                DFS(temp->userId, visited);
            }
            temp = temp->next;
        }
    }

    void displayNetwork(string startId) {
        cout << "\n--- JARINGAN KONEKSI USER (Graph DFS) ---\n";
        bool visited[HASH_SIZE] = {false};
        cout << "Jaringan untuk " << startId << ":\n";
        DFS(startId, visited);
        cout << "\n";
    }
};


// ========================================================
// DUMMY CSV GENERATOR & PARSER (Jembatan Data)
// ========================================================

// Generate CSV otomatis agar tidak error saat dibaca
void createDummyCSV() {
    ofstream oppFile("opportunities.csv");
    oppFile << "1,Desain Konten Instagram,Freelance,150000\n";
    oppFile << "3,Project Video Dokumenter,Kolaborasi,0\n";
    oppFile << "2,Edukasi Anak Minggu,Volunteer,0\n";
    oppFile << "4,Input Data Penjualan,Freelance,100000\n";
    oppFile.close();

    ofstream userFile("users.csv");
    userFile << "U01,Raka Mahendra,Kreator Muda,320\n";
    userFile << "U02,Ayu Lestari,Marketing,450\n";
    userFile << "U03,Budi Santoso,Relawan,120\n";
    userFile.close();
}

void loadDataFromCSV(OpportunityBST& bst, UserHashTable& ht) {
    createDummyCSV(); // Buat file otomatis

    string line, word;
    
    // Parse Users
    ifstream userFile("users.csv");
    while (getline(userFile, line)) {
        stringstream s(line);
        string id, name, role, xpStr;
        getline(s, id, ',');
        getline(s, name, ',');
        getline(s, role, ',');
        getline(s, xpStr, ',');
        ht.insert(id, name, role, stoi(xpStr));
    }

    // Parse Opportunities
    ifstream oppFile("opportunities.csv");
    while (getline(oppFile, line)) {
        stringstream s(line);
        string idStr, title, type, rewardStr;
        getline(s, idStr, ',');
        getline(s, title, ',');
        getline(s, type, ',');
        getline(s, rewardStr, ',');
        bst.insert(stoi(idStr), title, type, stoi(rewardStr));
    }
    
    cout << "[SYSTEM] Berhasil memuat data dari CSV Lokal secara Sinkronus!\n";
}


// ========================================================
// MAIN FUNCTION (Fase 1 - CLI Demo)
// ========================================================
int main() {
    // Inisialisasi semua Struktur Data
    UserHashTable users;
    OpportunityBST opportunities;
    ProposalQueue proposals;
    ActivityStack activities;
    UserGraph network;

    cout << "========================================\n";
    cout << "    PIJAK BACKEND CORE (Fase 1 - C++)   \n";
    cout << "========================================\n";

    // 1. Sinkronisasi Data (Parsing CSV Local)
    loadDataFromCSV(opportunities, users);
    activities.push("Sistem melakukan sinkronisasi data CSV lokal.");

    // 2. Tampilkan Data Hash Table (Users)
    users.display();

    // 3. Tampilkan Data BST (Peluang diurutkan by ID)
    opportunities.displayInorder();

    // 4. Simulasi Queue (Ada orang melamar)
    cout << "\n--- SIMULASI ANTARA LAMARAN (Queue) ---\n";
    proposals.enqueue("Andi", "Saya jago desain grafis pakai Canva.");
    proposals.enqueue("Siti", "Saya suka mengajar anak-anak.");
    activities.push("Menerima 2 proposal lamaran baru.");

    // 5. Proses Queue
    proposals.dequeue(); // Proses lamaran Andi
    activities.push("Proposal Andi disetujui, Workroom dibuat.");

    // 6. Tampilkan Stack (Log Aktivitas Terbaru)
    activities.display();

    // 7. Sorting Linked List (Peluang by Reward Tertinggi)
    cout << "\n--- SORTING PELUANG (Merge Sort by Reward Terbesar) ---\n";
    mergeSort(&(opportunities.headList));
    Opportunity* tempOpp = opportunities.headList;
    while (tempOpp != nullptr) {
        cout << "Reward: Rp" << tempOpp->reward << " | Judul: " << tempOpp->title << "\n";
        tempOpp = tempOpp->next;
    }

    // 8. Graph (Membangun koneksi user di sebuah proyek)
    network.addEdge("U01", "U02"); // Raka setim dengan Ayu
    network.addEdge("U02", "U03"); // Ayu kenal Budi di event lain
    network.displayNetwork("U01"); // Lihat networknya Raka

    cout << "\n========================================\n";
    cout << "  Fase 1 Selesai - Semua 10 Syarat Terpenuhi!\n";
    cout << "========================================\n";

    return 0;
}