#ifndef DATA_H
#define DATA_H

#include <string>

#define DB_USERS "./database/users.csv"
#define DB_OPPORTUNITIES "./database/opportunities.csv"
#define DB_PROPOSALS "./database/proposals.csv"
#define DB_WORKROOMS "./database/workrooms.csv"
#define DB_TASKS "./database/tasks.csv"
#define DB_ACTIVITIES "./database/activities.csv"
#define MAX_HASH 10

using namespace std;

namespace data
{
    struct User
    {
        string id;
        string name;
        string role_title;
        int level;
        int xp;
        string skills;
        string email;
        string phone;
        string password;
        int stats_hours;
        int stats_co2;
        string created_at;
        User *next;
    };

    struct Opportunity
    {
        string id;
        string creator_id;
        string title;
        string type;
        string category;
        string location;
        string reward;
        string deadline;
        string status;
        string created_at;
        Opportunity *next;
    };

    struct Proposal
    {
        string id;
        string opportunity_id;
        string applicant_id;
        string cover_letter;
        string portfolio_url;
        string status;
        string created_at;
        Proposal *next;
    };

    struct Workroom
    {
        string id;
        string opportunity_id;
        int progress_pct;
        string status;
        string created_at;
        Workroom *next;
    };

    struct Task
    {
        string id;
        string workroom_id;
        string title;
        string status;
        string assignee_id;
        string created_at;
        Task *next;
    };

    struct Activity
    {
        string text;
        Activity *next;
    };

    struct OpportunityTree
    {
        Opportunity data;
        OpportunityTree *left;
        OpportunityTree *right;
    };

    struct UserHashNode
    {
        User data;
        UserHashNode *next;
    };

    struct GraphEdge
    {
        string id_user;
        GraphEdge *next;
    };

    struct GraphNode
    {
        string id_user;
        string name;
        string role_title;
        GraphEdge *edges;
        GraphNode *next;
    };

    extern User *headUser;
    extern User *tailUser;

    extern Opportunity *headOpportunity;
    extern Opportunity *tailOpportunity;

    extern Proposal *frontProposal;
    extern Proposal *rearProposal;

    extern Workroom *headWorkroom;
    extern Workroom *tailWorkroom;

    extern Task *headTask;
    extern Task *tailTask;

    extern Activity *topActivity;

    extern OpportunityTree *rootOpportunity;
    extern UserHashNode *userHashTable[MAX_HASH];

    extern UserHashNode *authHashTable[MAX_HASH];

    extern GraphNode *headGraph;
    extern GraphNode *tailGraph;

    void init();

    bool loadAllActivities();
    bool saveAllActivities();

    int countUsers();
    int countOpportunities();
    int countProposals();
    int countWorkrooms();
    int countTasks();

    bool loadAllUsers();
    bool loadAllOpportunities();
    bool loadAllProposals();
    bool loadAllWorkrooms();
    bool loadAllTasks();

    bool saveAllUsers();
    bool saveAllOpportunities();
    bool saveAllProposals();
    bool saveAllWorkrooms();
    bool saveAllTasks();

    bool addUser(User newUser);
    bool addOpportunity(Opportunity newOpportunity);
    bool addProposal(Proposal newProposal);
    bool addWorkroom(Workroom newWorkroom);
    bool addTask(Task newTask);

    bool updateUser(User updatedUser);
    bool updateOpportunity(Opportunity updatedOpportunity);
    bool updateProposal(Proposal updatedProposal);
    bool updateWorkroom(Workroom updatedWorkroom);
    bool updateTask(Task updatedTask);

    bool deleteUser(string id);
    bool deleteOpportunity(string id);
    bool deleteProposal(string id);
    bool deleteWorkroom(string id);
    bool deleteTask(string id);

    User *findUserById(string id);
    User *findUserByName(string name);
    Opportunity *findOpportunityById(string id);
    Proposal *findProposalById(string id);
    Workroom *findWorkroomById(string id);
    Task *findTaskById(string id);

    void pushActivity(string text);
    void showActivities();

    void enqueueProposal(Proposal newProposal);
    bool dequeueProposal(Proposal *&outProposal);

    void buildUserHashTable();
    User *findUserByHash(string id);

    void buildAuthHashTable();
    User *findUserByAuthKey(string authKey); 
    int authHashFunction(string key);

    OpportunityTree *insertOpportunityTree(OpportunityTree *root, Opportunity data);
    void buildOpportunityTree();
    OpportunityTree *searchOpportunityTree(OpportunityTree *root, string id);
    void showOpportunityTree(OpportunityTree *root);

    void buildGraphFromUsers();
    GraphNode *findGraphNode(string id);
    void connectGraphUsers(string id1, string id2);
    void showGraphDFS(string startId);

    void sortOpportunitiesByReward();
    int rewardToInt(string reward);

    string usersToJson();
    string opportunitiesToJson();
    string proposalsToJson();
    string workroomsToJson();
    string tasksToJson();

    string userToJson(User user);
    string opportunityToJson(Opportunity opportunity);
    string proposalToJson(Proposal proposal);
    string workroomToJson(Workroom workroom);
    string taskToJson(Task task);
}

#endif