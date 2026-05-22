#ifndef WORKROOM_H
#define WORKROOM_H

#include <string>

using namespace std;

struct Workroom {
    string id;              // UUID
    string opportunity_id;  // Relasi ke Opportunity
    int progress_pct;       // progress_pct
    string status;          // Berjalan, Selesai

    Workroom* next;

    Workroom(string _id, string _oppId, int _progress, string _status)
        : id(_id), opportunity_id(_oppId), progress_pct(_progress), status(_status), next(nullptr) {}
};

#endif