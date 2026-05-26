#include "data.h"
#include "utils/helper.h"

#include <iostream>
#include <fstream>
#include <sstream>
#include <cstdlib>
#include <cstring>

using namespace std;

namespace data
{
    User *headUser = NULL;
    User *tailUser = NULL;

    Opportunity *headOpportunity = NULL;
    Opportunity *tailOpportunity = NULL;

    Proposal *frontProposal = NULL;
    Proposal *rearProposal = NULL;

    Workroom *headWorkroom = NULL;
    Workroom *tailWorkroom = NULL;

    Task *headTask = NULL;
    Task *tailTask = NULL;

    Activity *topActivity = NULL;

    OpportunityTree *rootOpportunity = NULL;
    UserHashNode *userHashTable[MAX_HASH];
    UserHashNode *authHashTable[MAX_HASH];

    GraphNode *headGraph = NULL;
    GraphNode *tailGraph = NULL;

    // HELPER DASAR

    void clearUsers()
    {
        while (headUser != NULL)
        {
            User *temp = headUser;
            headUser = headUser->next;
            delete temp;
        }
        tailUser = NULL;
    }

    void clearOpportunities()
    {
        while (headOpportunity != NULL)
        {
            Opportunity *temp = headOpportunity;
            headOpportunity = headOpportunity->next;
            delete temp;
        }
        tailOpportunity = NULL;
    }

    void clearProposals()
    {
        while (frontProposal != NULL)
        {
            Proposal *temp = frontProposal;
            frontProposal = frontProposal->next;
            delete temp;
        }
        rearProposal = NULL;
    }

    void clearWorkrooms()
    {
        while (headWorkroom != NULL)
        {
            Workroom *temp = headWorkroom;
            headWorkroom = headWorkroom->next;
            delete temp;
        }
        tailWorkroom = NULL;
    }

    void clearTasks()
    {
        while (headTask != NULL)
        {
            Task *temp = headTask;
            headTask = headTask->next;
            delete temp;
        }
        tailTask = NULL;
    }

    void clearActivities()
    {
        while (topActivity != NULL)
        {
            Activity *temp = topActivity;
            topActivity = topActivity->next;
            delete temp;
        }
    }

    void clearOpportunityTree(OpportunityTree *root)
    {
        if (root == NULL)
            return;
        clearOpportunityTree(root->left);
        clearOpportunityTree(root->right);
        delete root;
    }

    void clearGraph()
    {
        while (headGraph != NULL)
        {
            GraphNode *g = headGraph;
            headGraph = headGraph->next;

            while (g->edges != NULL)
            {
                GraphEdge *e = g->edges;
                g->edges = g->edges->next;
                delete e;
            }

            delete g;
        }
        tailGraph = NULL;
    }

    void clearUserHash()
    {
        for (int i = 0; i < MAX_HASH; i++)
        {
            UserHashNode *bantu = userHashTable[i];
            while (bantu != NULL)
            {
                UserHashNode *temp = bantu;
                bantu = bantu->next;
                delete temp;
            }
            userHashTable[i] = NULL;
        }
    }

    int hashId(string id)
    {
        int sum = 0;
        for (int i = 0; i < (int)id.size(); i++)
        {
            sum += (int)id[i];
        }
        return sum % MAX_HASH;
    }

    int rewardToInt(string reward)
    {
        string angka = "";
        for (int i = 0; i < (int)reward.size(); i++)
        {
            if (reward[i] >= '0' && reward[i] <= '9')
                angka += reward[i];
        }

        if (angka == "")
            return 0;
        return atoi(angka.c_str());
    }

    // 1. INITIAL

    void init()
    {
        headUser = NULL;
        tailUser = NULL;

        headOpportunity = NULL;
        tailOpportunity = NULL;

        frontProposal = NULL;
        rearProposal = NULL;

        headWorkroom = NULL;
        tailWorkroom = NULL;

        headTask = NULL;
        tailTask = NULL;

        topActivity = NULL;

        rootOpportunity = NULL;

        headGraph = NULL;
        tailGraph = NULL;

        clearUserHash();
    }

    
    // 2. COUNT

    int countUsers()
    {
        int total = 0;
        User *bantu = headUser;
        while (bantu != NULL)
        {
            total++;
            bantu = bantu->next;
        }
        return total;
    }

    int countOpportunities()
    {
        int total = 0;
        Opportunity *bantu = headOpportunity;
        while (bantu != NULL)
        {
            total++;
            bantu = bantu->next;
        }
        return total;
    }

    int countProposals()
    {
        int total = 0;
        Proposal *bantu = frontProposal;
        while (bantu != NULL)
        {
            total++;
            bantu = bantu->next;
        }
        return total;
    }

    int countWorkrooms()
    {
        int total = 0;
        Workroom *bantu = headWorkroom;
        while (bantu != NULL)
        {
            total++;
            bantu = bantu->next;
        }
        return total;
    }

    int countTasks()
    {
        int total = 0;
        Task *bantu = headTask;
        while (bantu != NULL)
        {
            total++;
            bantu = bantu->next;
        }
        return total;
    }

    // 3. FIND

    User *findUserById(string id)
    {
        User *bantu = headUser;
        while (bantu != NULL)
        {
            if (bantu->id == id)
                return bantu;
            bantu = bantu->next;
        }
        return NULL;
    }

    User *findUserByName(string name)
    {
        User *bantu = headUser;
        while (bantu != NULL)
        {
            if (bantu->name == name)
                return bantu;
            bantu = bantu->next;
        }
        return NULL;
    }

    Opportunity *findOpportunityById(string id)
    {
        Opportunity *bantu = headOpportunity;
        while (bantu != NULL)
        {
            if (bantu->id == id)
                return bantu;
            bantu = bantu->next;
        }
        return NULL;
    }

    Proposal *findProposalById(string id)
    {
        Proposal *bantu = frontProposal;
        while (bantu != NULL)
        {
            if (bantu->id == id)
                return bantu;
            bantu = bantu->next;
        }
        return NULL;
    }

    Workroom *findWorkroomById(string id)
    {
        Workroom *bantu = headWorkroom;
        while (bantu != NULL)
        {
            if (bantu->id == id)
                return bantu;
            bantu = bantu->next;
        }
        return NULL;
    }

    Task *findTaskById(string id)
    {
        Task *bantu = headTask;
        while (bantu != NULL)
        {
            if (bantu->id == id)
                return bantu;
            bantu = bantu->next;
        }
        return NULL;
    }

    // 4. INSERT

    void insertUser(User newUser)
    {
        User *baru = new User;
        *baru = newUser;
        baru->next = NULL;

        if (headUser == NULL)
        {
            headUser = tailUser = baru;
        }
        else
        {
            tailUser->next = baru;
            tailUser = baru;
        }
    }

    void insertOpportunity(Opportunity newOpportunity)
    {
        Opportunity *baru = new Opportunity;
        *baru = newOpportunity;
        baru->next = NULL;

        if (headOpportunity == NULL)
        {
            headOpportunity = tailOpportunity = baru;
        }
        else
        {
            tailOpportunity->next = baru;
            tailOpportunity = baru;
        }
    }

    void insertWorkroom(Workroom newWorkroom)
    {
        Workroom *baru = new Workroom;
        *baru = newWorkroom;
        baru->next = NULL;

        if (headWorkroom == NULL)
        {
            headWorkroom = tailWorkroom = baru;
        }
        else
        {
            tailWorkroom->next = baru;
            tailWorkroom = baru;
        }
    }

    void insertTask(Task newTask)
    {
        Task *baru = new Task;
        *baru = newTask;
        baru->next = NULL;

        if (headTask == NULL)
        {
            headTask = tailTask = baru;
        }
        else
        {
            tailTask->next = baru;
            tailTask = baru;
        }
    }

    // 5. QUEUE PROPOSAL

    void enqueueProposal(Proposal newProposal)
    {
        Proposal *baru = new Proposal;
        *baru = newProposal;
        baru->next = NULL;

        if (frontProposal == NULL)
        {
            frontProposal = rearProposal = baru;
        }
        else
        {
            rearProposal->next = baru;
            rearProposal = baru;
        }
    }

    Proposal *findFirstPendingProposal()
    {
        Proposal *bantu = frontProposal;
        while (bantu != NULL)
        {
            if (bantu->status == "Menunggu")
                return bantu;
            bantu = bantu->next;
        }
        return NULL;
    }

    bool dequeueProposal(Proposal *&outProposal)
    {
        if (frontProposal == NULL)
            return false;

        outProposal = frontProposal;
        frontProposal = frontProposal->next;

        if (frontProposal == NULL)
            rearProposal = NULL;

        outProposal->next = NULL;
        return true;
    }

    // 6. STACK ACTIVITY

    bool loadAllActivities()
    {
        clearActivities();

        ifstream file(DB_ACTIVITIES);
        if (!file.is_open())
            return true;

        string line;
        bool firstLine = true;
        Activity *tailAct = NULL;

        while (getline(file, line))
        {
            if (line == "")
                continue;

            if (firstLine)
            {
                firstLine = false;
                continue;
            }

            string fields[3];
            helper::splitCSV(line, fields, 3);

            Activity *baru = new Activity;
            baru->user_id = fields[0];
            baru->text = helper::csvUnescape(fields[1]);
            baru->created_at = helper::csvUnescape(fields[2]);
            baru->next = NULL;

            if (topActivity == NULL)
                topActivity = tailAct = baru;
            else
            {
                tailAct->next = baru;
                tailAct = baru;
            }
        }

        return true;
    }

    bool saveAllActivities()
    {
        ofstream file(DB_ACTIVITIES);
        if (!file.is_open())
        {
            helper::logError("Gagal membuka activities.csv");
            return false;
        }

        file << "user_id,text,created_at\n";

        Activity *bantu = topActivity;
        while (bantu != NULL)
        {
            file << bantu->user_id << ","
                 << helper::csvEscape(bantu->text) << ","
                 << helper::csvEscape(bantu->created_at) << "\n";
            bantu = bantu->next;
        }

        return true;
    }

    void pushActivity(string text)
    {
        pushActivity("SYSTEM", text);
    }

    void pushActivity(string user_id, string text)
    {
        Activity *baru = new Activity;
        baru->user_id = user_id;
        baru->text = text;
        baru->created_at = helper::nowText();
        baru->next = topActivity;
        topActivity = baru;
        saveAllActivities();
    }

    string activitiesToJson()
    {
        string out = "[";
        Activity *bantu = topActivity;
        bool first = true;
        int idx = 1;

        while (bantu != NULL)
        {
            if (!first)
                out += ",";
            out += string("{") +
                   "\"id\":" + to_string(idx) + "," +
                   "\"user_id\":" + helper::quote(bantu->user_id) + "," +
                   "\"text\":" + helper::quote(bantu->text) + "," +
                   "\"created_at\":" + helper::quote(bantu->created_at) +
                   "}";
            first = false;
            bantu = bantu->next;
            idx++;
        }

        out += "]";
        return out;
    }

    string activitiesToJsonByUser(string user_id)
    {
        string out = "[";
        Activity *bantu = topActivity;
        bool first = true;
        int idx = 1;

        while (bantu != NULL)
        {
            if (bantu->user_id == user_id)
            {
                if (!first)
                    out += ",";
                out += string("{") +
                       "\"id\":" + to_string(idx) + "," +
                       "\"user_id\":" + helper::quote(bantu->user_id) + "," +
                       "\"text\":" + helper::quote(bantu->text) + "," +
                       "\"created_at\":" + helper::quote(bantu->created_at) +
                       "}";
                first = false;
            }
            bantu = bantu->next;
            idx++;
        }

        out += "]";
        return out;
    }

    // 7. LOAD 
    bool loadAllUsers()
    {
        clearUsers();

        ifstream file(DB_USERS);
        if (!file.is_open())
        {
            helper::logWarning("users.csv belum ada.");
            return true;
        }

        string line;
        bool firstLine = true;

        while (getline(file, line))
        {
            if (line == "")
                continue;

            if (firstLine)
            {
                firstLine = false;
                continue;
            }

            string fields[12];
            helper::splitCSV(line, fields, 12);

            User u;
            u.id = fields[0];
            u.name = fields[1];
            u.email = fields[2];
            u.phone = fields[3];
            u.password = fields[4];
            u.role_title = fields[5];
            u.level = atoi(fields[6].c_str());
            u.xp = atoi(fields[7].c_str());
            u.skills = fields[8];
            u.stats_hours = atoi(fields[9].c_str());
            u.stats_co2 = atoi(fields[10].c_str());
            u.created_at = fields[11];
            u.next = NULL;

            insertUser(u);
        }

        helper::logSuccess("Users berhasil dimuat.");
        return true;
    }

    bool loadAllOpportunities()
    {
        clearOpportunities();

        ifstream file(DB_OPPORTUNITIES);
        if (!file.is_open())
        {
            helper::logWarning("opportunities.csv belum ada.");
            return true;
        }

        string line;
        bool firstLine = true;

        while (getline(file, line))
        {
            if (line == "")
                continue;

            if (firstLine)
            {
                firstLine = false;
                continue;
            }

            string fields[10];
            helper::splitCSV(line, fields, 10);

            Opportunity o;
            o.id = fields[0];
            o.creator_id = fields[1];
            o.title = fields[2];
            o.type = fields[3];
            o.category = fields[4];
            o.location = fields[5];
            o.reward = fields[6];
            o.deadline = fields[7];
            o.status = fields[8];
            o.created_at = fields[9];
            o.next = NULL;

            insertOpportunity(o);
        }

        helper::logSuccess("Opportunities berhasil dimuat.");
        return true;
    }

    bool loadAllProposals()
    {
        clearProposals();

        ifstream file(DB_PROPOSALS);
        if (!file.is_open())
        {
            helper::logWarning("proposals.csv belum ada.");
            return true;
        }

        string line;
        bool firstLine = true;

        while (getline(file, line))
        {
            if (line == "")
                continue;

            if (firstLine)
            {
                firstLine = false;
                continue;
            }

            string fields[7];
            helper::splitCSV(line, fields, 7);

            Proposal p;
            p.id = fields[0];
            p.opportunity_id = fields[1];
            p.applicant_id = fields[2];
            p.cover_letter = helper::csvUnescape(fields[3]);
            p.portfolio_url = helper::csvUnescape(fields[4]);
            p.status = helper::csvUnescape(fields[5]);
            p.created_at = helper::csvUnescape(fields[6]);
            p.next = NULL;

            enqueueProposal(p);
        }

        helper::logSuccess("Proposals berhasil dimuat.");
        return true;
    }

    bool loadAllWorkrooms()
    {
        clearWorkrooms();

        ifstream file(DB_WORKROOMS);
        if (!file.is_open())
        {
            helper::logWarning("workrooms.csv belum ada.");
            return true;
        }

        string line;
        bool firstLine = true;

        while (getline(file, line))
        {
            if (line == "")
                continue;

            if (firstLine)
            {
                firstLine = false;
                continue;
            }

            string fields[5];
            helper::splitCSV(line, fields, 5);

            Workroom w;
            w.id = fields[0];
            w.opportunity_id = fields[1];
            w.progress_pct = atoi(fields[2].c_str());
            w.status = fields[3];
            w.created_at = fields[4];
            w.next = NULL;

            insertWorkroom(w);
        }

        helper::logSuccess("Workrooms berhasil dimuat.");
        return true;
    }

    bool loadAllTasks()
    {
        clearTasks();

        ifstream file(DB_TASKS);
        if (!file.is_open())
        {
            helper::logWarning("tasks.csv belum ada.");
            return true;
        }

        string line;
        bool firstLine = true;

        while (getline(file, line))
        {
            if (line == "")
                continue;

            if (firstLine)
            {
                firstLine = false;
                continue;
            }

            string fields[6];
            helper::splitCSV(line, fields, 6);

            Task t;
            t.id = fields[0];
            t.workroom_id = fields[1];
            t.title = fields[2];
            t.status = fields[3];
            t.assignee_id = fields[4];
            t.created_at = fields[5];
            t.next = NULL;

            insertTask(t);
        }

        helper::logSuccess("Tasks berhasil dimuat.");
        return true;
    }

    // 8. SAVE CSV

    bool saveAllUsers()
    {
        ofstream file(DB_USERS);
        if (!file.is_open())
        {
            helper::logError("Gagal membuka users.csv");
            return false;
        }

        file << "id,name,email,phone,password,role_title,level,xp,skills,stats_hours,stats_co2,created_at\n";

        User *bantu = headUser;
        while (bantu != NULL)
        {
            file << bantu->id << ","
                 << bantu->name << ","
                 << bantu->email << ","
                 << bantu->phone << ","
                 << bantu->password << ","
                 << bantu->role_title << ","
                 << to_string(bantu->level) << ","
                 << to_string(bantu->xp) << ","
                 << bantu->skills << ","
                 << to_string(bantu->stats_hours) << ","
                 << to_string(bantu->stats_co2) << ","
                 << bantu->created_at << "\n";
            bantu = bantu->next;
        }

        return true;
    }

    bool saveAllOpportunities()
    {
        ofstream file(DB_OPPORTUNITIES);
        if (!file.is_open())
        {
            helper::logError("Gagal membuka opportunities.csv");
            return false;
        }

        file << "id,creator_id,title,type,category,location,reward,deadline,status,created_at\n";

        Opportunity *bantu = headOpportunity;
        while (bantu != NULL)
        {
            file << bantu->id << ","
                 << bantu->creator_id << ","
                 << bantu->title << ","
                 << bantu->type << ","
                 << bantu->category << ","
                 << bantu->location << ","
                 << bantu->reward << ","
                 << bantu->deadline << ","
                 << bantu->status << ","
                 << bantu->created_at << "\n";
            bantu = bantu->next;
        }

        return true;
    }

    bool saveAllProposals()
    {
        ofstream file(DB_PROPOSALS);
        if (!file.is_open())
        {
            helper::logError("Gagal membuka proposals.csv");
            return false;
        }

        file << "id,opportunity_id,applicant_id,cover_letter,portfolio_url,status,created_at\n";

        Proposal *bantu = frontProposal;
        while (bantu != NULL)
        {
            file << bantu->id << ","
                 << bantu->opportunity_id << ","
                 << bantu->applicant_id << ","
                 << helper::csvEscape(bantu->cover_letter) << ","
                 << helper::csvEscape(bantu->portfolio_url) << ","
                 << helper::csvEscape(bantu->status) << ","
                 << helper::csvEscape(bantu->created_at) << "\n";
            bantu = bantu->next;
        }

        return true;
    }

    bool saveAllWorkrooms()
    {
        ofstream file(DB_WORKROOMS);
        if (!file.is_open())
        {
            helper::logError("Gagal membuka workrooms.csv");
            return false;
        }

        file << "id,opportunity_id,progress_pct,status,created_at\n";

        Workroom *bantu = headWorkroom;
        while (bantu != NULL)
        {
            file << bantu->id << ","
                 << bantu->opportunity_id << ","
                 << to_string(bantu->progress_pct) << ","
                 << bantu->status << ","
                 << bantu->created_at << "\n";
            bantu = bantu->next;
        }

        return true;
    }

    bool saveAllTasks()
    {
        ofstream file(DB_TASKS);
        if (!file.is_open())
        {
            helper::logError("Gagal membuka tasks.csv");
            return false;
        }

        file << "id,workroom_id,title,status,assignee_id,created_at\n";

        Task *bantu = headTask;
        while (bantu != NULL)
        {
            file << bantu->id << ","
                 << bantu->workroom_id << ","
                 << bantu->title << ","
                 << bantu->status << ","
                 << bantu->assignee_id << ","
                 << bantu->created_at << "\n";
            bantu = bantu->next;
        }

        return true;
    }

    // 9. CRUD USER

    void clearAuthHash()
    {
        for (int i = 0; i < MAX_HASH; i++)
        {
            UserHashNode *bantu = authHashTable[i];
            while (bantu != NULL)
            {
                UserHashNode *temp = bantu;
                bantu = bantu->next;
                delete temp;
            }
            authHashTable[i] = NULL;
        }
    }

    int authHashFunction(string key)
    {
        int sum = 0;
        for (int i = 0; i < (int)key.size(); i++)
            sum += (int)key[i];
        return sum % MAX_HASH;
    }

    void buildAuthHashTable()
    {
        clearAuthHash();
        User *bantu = headUser;
        while (bantu != NULL)
        {
            // Kita hash berdasarkan Email
            int idxEmail = authHashFunction(bantu->email);
            UserHashNode *nodeEmail = new UserHashNode;
            nodeEmail->data = *bantu;
            nodeEmail->next = authHashTable[idxEmail];
            authHashTable[idxEmail] = nodeEmail;

            // Kita hash juga berdasarkan Phone (kalau ada isinya)
            if (bantu->phone != "")
            {
                int idxPhone = authHashFunction(bantu->phone);
                UserHashNode *nodePhone = new UserHashNode;
                nodePhone->data = *bantu;
                nodePhone->next = authHashTable[idxPhone];
                authHashTable[idxPhone] = nodePhone;
            }
            bantu = bantu->next;
        }
    }

    // Pencarian O(1) 
    User *findUserByAuthKey(string authKey)
    {
        int idx = authHashFunction(authKey);
        UserHashNode *bantu = authHashTable[idx];
        while (bantu != NULL)
        {
            if (bantu->data.email == authKey || bantu->data.phone == authKey)
                return &(bantu->data);
            bantu = bantu->next;
        }
        return NULL;
    }

    bool addUser(User newUser)
    {
        if (findUserById(newUser.id) != NULL)
            return false;

        insertUser(newUser);
        return saveAllUsers();
    }

    bool updateUser(User updatedUser)
    {
        User *bantu = findUserById(updatedUser.id);
        if (bantu == NULL)
            return false;

        bantu->name = updatedUser.name;
        bantu->email = updatedUser.email;
        bantu->phone = updatedUser.phone;
        bantu->password = updatedUser.password;
        bantu->role_title = updatedUser.role_title;
        bantu->level = updatedUser.level;
        bantu->xp = updatedUser.xp;
        bantu->skills = updatedUser.skills;
        bantu->stats_hours = updatedUser.stats_hours;
        bantu->stats_co2 = updatedUser.stats_co2;
        bantu->created_at = updatedUser.created_at;

        return saveAllUsers();
    }

    bool deleteUser(string id)
    {
        User *bantu = headUser;
        User *prev = NULL;

        while (bantu != NULL)
        {
            if (bantu->id == id)
            {
                if (prev == NULL)
                    headUser = bantu->next;
                else
                    prev->next = bantu->next;

                if (bantu == tailUser)
                    tailUser = prev;

                delete bantu;
                return saveAllUsers();
            }

            prev = bantu;
            bantu = bantu->next;
        }

        return false;
    }

    // 10. CRUD OPPORTUNITY

    bool addOpportunity(Opportunity newOpportunity)
    {
        if (findOpportunityById(newOpportunity.id) != NULL)
            return false;

        insertOpportunity(newOpportunity);
        return saveAllOpportunities();
    }

    bool updateOpportunity(Opportunity updatedOpportunity)
    {
        Opportunity *bantu = findOpportunityById(updatedOpportunity.id);
        if (bantu == NULL)
            return false;

        bantu->creator_id = updatedOpportunity.creator_id;
        bantu->title = updatedOpportunity.title;
        bantu->type = updatedOpportunity.type;
        bantu->category = updatedOpportunity.category;
        bantu->location = updatedOpportunity.location;
        bantu->reward = updatedOpportunity.reward;
        bantu->deadline = updatedOpportunity.deadline;
        bantu->status = updatedOpportunity.status;
        bantu->created_at = updatedOpportunity.created_at;

        return saveAllOpportunities();
    }

    bool deleteOpportunity(string id)
    {
        Opportunity *bantu = headOpportunity;
        Opportunity *prev = NULL;

        while (bantu != NULL)
        {
            if (bantu->id == id)
            {
                if (prev == NULL)
                    headOpportunity = bantu->next;
                else
                    prev->next = bantu->next;

                if (bantu == tailOpportunity)
                    tailOpportunity = prev;

                delete bantu;
                return saveAllOpportunities();
            }

            prev = bantu;
            bantu = bantu->next;
        }

        return false;
    }

    // 11. CRUD PROPOSAL

    bool addProposal(Proposal newProposal)
    {
        newProposal.status = "Menunggu";
        enqueueProposal(newProposal);
        return saveAllProposals();
    }

    bool updateProposal(Proposal updatedProposal)
    {
        Proposal *bantu = frontProposal;
        while (bantu != NULL)
        {
            if (bantu->id == updatedProposal.id)
            {
                bantu->opportunity_id = updatedProposal.opportunity_id;
                bantu->applicant_id = updatedProposal.applicant_id;
                bantu->cover_letter = updatedProposal.cover_letter;
                bantu->portfolio_url = updatedProposal.portfolio_url;
                bantu->status = updatedProposal.status;
                bantu->created_at = updatedProposal.created_at;
                return saveAllProposals();
            }
            bantu = bantu->next;
        }
        return false;
    }

    bool deleteProposal(string id)
    {
        Proposal *bantu = frontProposal;
        Proposal *prev = NULL;

        while (bantu != NULL)
        {
            if (bantu->id == id)
            {
                if (prev == NULL)
                    frontProposal = bantu->next;
                else
                    prev->next = bantu->next;

                if (bantu == rearProposal)
                    rearProposal = prev;

                delete bantu;
                return saveAllProposals();
            }

            prev = bantu;
            bantu = bantu->next;
        }

        return false;
    }


    // 12. CRUD WORKROOM

    bool addWorkroom(Workroom newWorkroom)
    {
        insertWorkroom(newWorkroom);
        return saveAllWorkrooms();
    }

    bool updateWorkroom(Workroom updatedWorkroom)
    {
        Workroom *bantu = findWorkroomById(updatedWorkroom.id);
        if (bantu == NULL)
            return false;

        bantu->opportunity_id = updatedWorkroom.opportunity_id;
        bantu->progress_pct = updatedWorkroom.progress_pct;
        bantu->status = updatedWorkroom.status;
        bantu->created_at = updatedWorkroom.created_at;

        return saveAllWorkrooms();
    }

    bool deleteWorkroom(string id)
    {
        Workroom *bantu = headWorkroom;
        Workroom *prev = NULL;

        while (bantu != NULL)
        {
            if (bantu->id == id)
            {
                if (prev == NULL)
                    headWorkroom = bantu->next;
                else
                    prev->next = bantu->next;

                if (bantu == tailWorkroom)
                    tailWorkroom = prev;

                delete bantu;
                return saveAllWorkrooms();
            }

            prev = bantu;
            bantu = bantu->next;
        }

        return false;
    }

    // 13. CRUD TASK

    bool addTask(Task newTask)
    {
        insertTask(newTask);
        return saveAllTasks();
    }

    bool updateTask(Task updatedTask)
    {
        Task *bantu = findTaskById(updatedTask.id);
        if (bantu == NULL)
            return false;

        bantu->workroom_id = updatedTask.workroom_id;
        bantu->title = updatedTask.title;
        bantu->status = updatedTask.status;
        bantu->assignee_id = updatedTask.assignee_id;
        bantu->created_at = updatedTask.created_at;

        return saveAllTasks();
    }

    bool deleteTask(string id)
    {
        Task *bantu = headTask;
        Task *prev = NULL;

        while (bantu != NULL)
        {
            if (bantu->id == id)
            {
                if (prev == NULL)
                    headTask = bantu->next;
                else
                    prev->next = bantu->next;

                if (bantu == tailTask)
                    tailTask = prev;

                delete bantu;
                return saveAllTasks();
            }

            prev = bantu;
            bantu = bantu->next;
        }

        return false;
    }

    // 14. JSON MODEL

    string userToJson(User user)
    {
        return string("{") +
               "\"id\":" + helper::quote(user.id) + "," +
               "\"name\":" + helper::quote(user.name) + "," +
               "\"role_title\":" + helper::quote(user.role_title) + "," +
               "\"level\":" + to_string(user.level) + "," +
               "\"xp\":" + to_string(user.xp) + "," +
               "\"skills\":" + helper::quote(user.skills) + "," +
               "\"stats_hours\":" + to_string(user.stats_hours) + "," +
               "\"stats_co2\":" + to_string(user.stats_co2) + "," +
               "\"created_at\":" + helper::quote(user.created_at) +
               "}";
    }

    string opportunityToJson(Opportunity opportunity)
    {
        return string("{") +
               "\"id\":" + helper::quote(opportunity.id) + "," +
               "\"creator_id\":" + helper::quote(opportunity.creator_id) + "," +
               "\"title\":" + helper::quote(opportunity.title) + "," +
               "\"type\":" + helper::quote(opportunity.type) + "," +
               "\"category\":" + helper::quote(opportunity.category) + "," +
               "\"location\":" + helper::quote(opportunity.location) + "," +
               "\"reward\":" + helper::quote(opportunity.reward) + "," +
               "\"deadline\":" + helper::quote(opportunity.deadline) + "," +
               "\"status\":" + helper::quote(opportunity.status) + "," +
               "\"created_at\":" + helper::quote(opportunity.created_at) +
               "}";
    }

    string proposalToJson(Proposal proposal)
    {
        return string("{") +
               "\"id\":" + helper::quote(proposal.id) + "," +
               "\"opportunity_id\":" + helper::quote(proposal.opportunity_id) + "," +
               "\"applicant_id\":" + helper::quote(proposal.applicant_id) + "," +
               "\"cover_letter\":" + helper::quote(proposal.cover_letter) + "," +
               "\"portfolio_url\":" + helper::quote(proposal.portfolio_url) + "," +
               "\"status\":" + helper::quote(proposal.status) + "," +
               "\"created_at\":" + helper::quote(proposal.created_at) +
               "}";
    }

    string workroomToJson(Workroom workroom)
    {
        return string("{") +
               "\"id\":" + helper::quote(workroom.id) + "," +
               "\"opportunity_id\":" + helper::quote(workroom.opportunity_id) + "," +
               "\"progress_pct\":" + to_string(workroom.progress_pct) + "," +
               "\"status\":" + helper::quote(workroom.status) + "," +
               "\"created_at\":" + helper::quote(workroom.created_at) +
               "}";
    }

    string taskToJson(Task task)
    {
        return string("{") +
               "\"id\":" + helper::quote(task.id) + "," +
               "\"workroom_id\":" + helper::quote(task.workroom_id) + "," +
               "\"title\":" + helper::quote(task.title) + "," +
               "\"status\":" + helper::quote(task.status) + "," +
               "\"assignee_id\":" + helper::quote(task.assignee_id) + "," +
               "\"created_at\":" + helper::quote(task.created_at) +
               "}";
    }

    string usersToJson()
    {
        string out = "[";
        User *bantu = headUser;
        bool first = true;

        while (bantu != NULL)
        {
            if (!first)
                out += ",";
            out += userToJson(*bantu);
            first = false;
            bantu = bantu->next;
        }

        out += "]";
        return out;
    }

    string opportunitiesToJson()
    {
        string out = "[";
        Opportunity *bantu = headOpportunity;
        bool first = true;

        while (bantu != NULL)
        {
            if (!first)
                out += ",";
            out += opportunityToJson(*bantu);
            first = false;
            bantu = bantu->next;
        }

        out += "]";
        return out;
    }

    string proposalsToJson()
    {
        string out = "[";
        Proposal *bantu = frontProposal;
        bool first = true;

        while (bantu != NULL)
        {
            if (!first)
                out += ",";
            out += proposalToJson(*bantu);
            first = false;
            bantu = bantu->next;
        }

        out += "]";
        return out;
    }

    string workroomsToJson()
    {
        string out = "[";
        Workroom *bantu = headWorkroom;
        bool first = true;

        while (bantu != NULL)
        {
            if (!first)
                out += ",";
            out += workroomToJson(*bantu);
            first = false;
            bantu = bantu->next;
        }

        out += "]";
        return out;
    }

    string tasksToJson()
    {
        string out = "[";
        Task *bantu = headTask;
        bool first = true;

        while (bantu != NULL)
        {
            if (!first)
                out += ",";
            out += taskToJson(*bantu);
            first = false;
            bantu = bantu->next;
        }

        out += "]";
        return out;
    }

    // 15. SORTING

    void sortOpportunitiesByReward()
    {
        if (headOpportunity == NULL)
            return;

        bool swapped;
        do
        {
            swapped = false;
            Opportunity *bantu = headOpportunity;
            Opportunity *prev = NULL;

            while (bantu != NULL && bantu->next != NULL)
            {
                if (rewardToInt(bantu->reward) < rewardToInt(bantu->next->reward))
                {
                    // Pointer swap yang da Linked List
                    Opportunity *nextNode = bantu->next;
                    bantu->next = nextNode->next;
                    nextNode->next = bantu;

                    if (prev == NULL)
                    {
                        headOpportunity = nextNode;
                    }
                    else
                    {
                        prev->next = nextNode;
                    }

                    prev = nextNode;
                    swapped = true;
                }
                else
                {
                    prev = bantu;
                    bantu = bantu->next;
                }
            }
        } while (swapped);

        Opportunity *temp = headOpportunity;
        if (temp != NULL)
        {
            while (temp->next != NULL)
            {
                temp = temp->next;
            }
            tailOpportunity = temp;
        }

        saveAllOpportunities();
    }

    // 16. HASH TABLE

    void buildUserHashTable()
    {
        clearUserHash();

        User *bantu = headUser;
        while (bantu != NULL)
        {
            int idx = hashId(bantu->id);

            UserHashNode *node = new UserHashNode;
            node->data = *bantu;
            node->next = userHashTable[idx];
            userHashTable[idx] = node;

            bantu = bantu->next;
        }
    }

    User *findUserByHash(string id)
    {
        int idx = hashId(id);
        UserHashNode *bantu = userHashTable[idx];

        while (bantu != NULL)
        {
            if (bantu->data.id == id)
                return &(bantu->data);
            bantu = bantu->next;
        }

        return NULL;
    }

    // 17. BST

    OpportunityTree *insertOpportunityTree(OpportunityTree *root, Opportunity data)
    {
        if (root == NULL)
        {
            OpportunityTree *baru = new OpportunityTree;
            baru->data = data;
            baru->left = NULL;
            baru->right = NULL;
            return baru;
        }

        if (rewardToInt(data.reward) < rewardToInt(root->data.reward))
            root->left = insertOpportunityTree(root->left, data);
        else
            root->right = insertOpportunityTree(root->right, data);

        return root;
    }

    void buildOpportunityTree()
    {
        clearOpportunityTree(rootOpportunity);
        rootOpportunity = NULL;

        Opportunity *bantu = headOpportunity;
        while (bantu != NULL)
        {
            rootOpportunity = insertOpportunityTree(rootOpportunity, *bantu);
            bantu = bantu->next;
        }
    }

    OpportunityTree *searchOpportunityTree(OpportunityTree *root, string id)
    {
        if (root == NULL)
            return NULL;

        if (root->data.id == id)
            return root;

        OpportunityTree *leftSearch = searchOpportunityTree(root->left, id);
        if (leftSearch != NULL)
            return leftSearch;

        return searchOpportunityTree(root->right, id);
    }

    void showOpportunityTree(OpportunityTree *root)
    {
        if (root == NULL)
            return;

        showOpportunityTree(root->left);
        cout << root->data.id << " | " << root->data.title << " | " << root->data.reward << endl;
        showOpportunityTree(root->right);
    }

    string proposalsToJsonByApplicant(string applicant_id)
    {
        string out = "[";
        Proposal *bantu = frontProposal;
        bool first = true;

        while (bantu != NULL)
        {
            if (bantu->applicant_id == applicant_id)
            {
                if (!first)
                    out += ",";
                out += proposalToJson(*bantu);
                first = false;
            }
            bantu = bantu->next;
        }

        out += "]";
        return out;
    }

    string proposalsToJsonByOpportunity(string opportunity_id)
    {
        string out = "[";
        Proposal *bantu = frontProposal;
        bool first = true;

        while (bantu != NULL)
        {
            if (bantu->opportunity_id == opportunity_id)
            {
                if (!first)
                    out += ",";
                out += proposalToJson(*bantu);
                first = false;
            }
            bantu = bantu->next;
        }

        out += "]";
        return out;
    }

    string workroomsToJsonByOpportunity(string opportunity_id)
    {
        string out = "[";
        Workroom *bantu = headWorkroom;
        bool first = true;

        while (bantu != NULL)
        {
            if (bantu->opportunity_id == opportunity_id)
            {
                if (!first)
                    out += ",";
                out += workroomToJson(*bantu);
                first = false;
            }
            bantu = bantu->next;
        }

        out += "]";
        return out;
    }

    string tasksToJsonByWorkroom(string workroom_id)
    {
        string out = "[";
        Task *bantu = headTask;
        bool first = true;

        while (bantu != NULL)
        {
            if (bantu->workroom_id == workroom_id)
            {
                if (!first)
                    out += ",";
                out += taskToJson(*bantu);
                first = false;
            }
            bantu = bantu->next;
        }

        out += "]";
        return out;
    }

    string tasksToJsonByAssignee(string assignee_id)
    {
        string out = "[";
        Task *bantu = headTask;
        bool first = true;

        while (bantu != NULL)
        {
            if (bantu->assignee_id == assignee_id)
            {
                if (!first)
                    out += ",";
                out += taskToJson(*bantu);
                first = false;
            }
            bantu = bantu->next;
        }

        out += "]";
        return out;
    }

    string opportunityTreeToJson(OpportunityTree *root)
    {
        if (root == NULL)
            return "[]";

        string left = opportunityTreeToJson(root->left);
        string right = opportunityTreeToJson(root->right);

        string current = string("{") +
                         "\"id\":" + helper::quote(root->data.id) + "," +
                         "\"title\":" + helper::quote(root->data.title) + "," +
                         "\"reward\":" + helper::quote(root->data.reward) + "," +
                         "\"type\":" + helper::quote(root->data.type) + "," +
                         "\"status\":" + helper::quote(root->data.status) +
                         "}";

        if (left == "[]")
            left = "";
        if (right == "[]")
            right = "";

        string out = "[";
        bool first = true;

        auto appendItem = [&](const string &item)
        {
            if (item == "")
                return;
            if (!first)
                out += ",";
            out += item;
            first = false;
        };

        if (left.size() > 2)
        {
            string inner = left.substr(1, left.size() - 2);
            if (inner != "")
            {
                appendItem(inner);
            }
        }

        appendItem(current);

        if (right.size() > 2)
        {
            string inner = right.substr(1, right.size() - 2);
            if (inner != "")
            {
                if (!first)
                    out += ",";
                out += inner;
                first = false;
            }
        }

        out += "]";
        return out;
    }

    string graphToJson()
    {
        string out = "[";
        GraphNode *node = headGraph;
        bool firstNode = true;

        while (node != NULL)
        {
            if (!firstNode)
                out += ",";

            out += string("{") +
                   "\"id_user\":" + helper::quote(node->id_user) + "," +
                   "\"name\":" + helper::quote(node->name) + "," +
                   "\"role_title\":" + helper::quote(node->role_title) + "," +
                   "\"edges\":[";

            GraphEdge *e = node->edges;
            bool firstEdge = true;
            while (e != NULL)
            {
                if (!firstEdge)
                    out += ",";
                out += helper::quote(e->id_user);
                firstEdge = false;
                e = e->next;
            }

            out += "]}";
            firstNode = false;
            node = node->next;
        }

        out += "]";
        return out;
    }

    // 18. GRAPH

    GraphNode *findGraphNode(string id)
    {
        GraphNode *bantu = headGraph;
        while (bantu != NULL)
        {
            if (bantu->id_user == id)
                return bantu;
            bantu = bantu->next;
        }
        return NULL;
    }

    void addGraphUserNode(User user)
    {
        GraphNode *node = new GraphNode;
        node->id_user = user.id;
        node->name = user.name;
        node->role_title = user.role_title;
        node->edges = NULL;
        node->next = NULL;

        if (headGraph == NULL)
        {
            headGraph = tailGraph = node;
        }
        else
        {
            tailGraph->next = node;
            tailGraph = node;
        }
    }

    void addEdge(GraphNode *from, string toId)
    {
        GraphEdge *edge = new GraphEdge;
        edge->id_user = toId;
        edge->next = from->edges;
        from->edges = edge;
    }

    void connectGraphUsers(string id1, string id2)
    {
        GraphNode *a = findGraphNode(id1);
        GraphNode *b = findGraphNode(id2);

        if (a == NULL || b == NULL)
            return;

        addEdge(a, id2);
        addEdge(b, id1);
    }

    void buildGraphFromUsers()
    {
        clearGraph();

        User *u = headUser;
        while (u != NULL)
        {
            addGraphUserNode(*u);
            u = u->next;
        }

        // Graph sederhana:
        // user dengan role_title sama dianggap satu jaringan.
        GraphNode *a = headGraph;
        while (a != NULL)
        {
            GraphNode *b = a->next;
            while (b != NULL)
            {
                if (a->role_title == b->role_title && a->role_title != "")
                {
                    connectGraphUsers(a->id_user, b->id_user);
                }
                b = b->next;
            }
            a = a->next;
        }
    }

    void dfsVisit(GraphNode *node, string visited[], int &count)
    {
        if (node == NULL)
            return;

        for (int i = 0; i < count; i++)
        {
            if (visited[i] == node->id_user)
                return;
        }

        visited[count] = node->id_user;
        count++;

        cout << node->id_user << " -> ";

        GraphEdge *e = node->edges;
        while (e != NULL)
        {
            GraphNode *nextNode = findGraphNode(e->id_user);
            dfsVisit(nextNode, visited, count);
            e = e->next;
        }
    }

    void showGraphDFS(string startId)
    {
        GraphNode *start = findGraphNode(startId);
        if (start == NULL)
        {
            cout << "Graph kosong / start node tidak ditemukan." << endl;
            return;
        }

        string visited[100];
        int count = 0;
        dfsVisit(start, visited, count);
        cout << "NULL" << endl;
    }

    string opportunitiesToJsonByCreator(string creator_id)
    {
        string out = "[";
        Opportunity *bantu = headOpportunity;
        bool first = true;

        while (bantu != NULL)
        {
            if (bantu->creator_id == creator_id)
            {
                if (!first)
                    out += ",";
                out += opportunityToJson(*bantu);
                first = false;
            }
            bantu = bantu->next;
        }

        out += "]";
        return out;
    }

}