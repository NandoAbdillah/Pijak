#ifndef USER_H
#define USER_H

#include <string>

using namespace std;

struct User {
    string id;          // UUID dari Supabase
    string name;        // name
    string role_title;  // role_title
    int level;          // level
    int xp;             // xp

    User* next; 

    User(string _id, string _name, string _role, int _level, int _xp) 
        : id(_id), name(_name), role_title(_role), level(_level), xp(_xp), next(nullptr) {}
};

#endif