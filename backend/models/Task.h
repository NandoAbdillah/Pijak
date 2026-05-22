#ifndef TASK_H
#define TASK_H

#include <string>

using namespace std;

struct Task {
    string id;              // UUID
    string workroom_id;     // Relasi ke Workroom
    string title;           // Judul tugas
    string status;          // Belum Dimulai, Sedang Dikerjakan, Selesai
    string assignee_id;     // Relasi ke User
    
    Task* next;

    Task(string _id, string _workroomId, string _title, string _status, string _assigneeId)
        : id(_id), workroom_id(_workroomId), title(_title), status(_status), assignee_id(_assigneeId), next(nullptr) {}
};

#endif