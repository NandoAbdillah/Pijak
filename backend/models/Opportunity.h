#ifndef OPPORTUNITY_H
#define OPPORTUNITY_H

#include <string>

using namespace std;

struct Opportunity {
    string id;        // UUID
    string title;     // title
    string reward;    // reward (karena di DB tipenya TEXT)
    string status;    // status (Open/Closed)

    Opportunity* left;
    Opportunity* right;

    Opportunity(string _id, string _title, string _reward, string _status) 
        : id(_id), title(_title), reward(_reward), status(_status), left(nullptr), right(nullptr) {}
};

#endif