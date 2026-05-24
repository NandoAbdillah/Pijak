#include <iostream>
#include <string>
#include <cstring>
#include <cstdlib>

#include "data.h"
#include "utils/helper.h"

using namespace std;

string getArgValue(int argc, char *argv[], const char *key, string fallback)
{
    for (int i = 2; i < argc; i++)
    {
        string arg = argv[i];
        string pattern = string(key) + "=";

        if (arg == key)
        {
            if (i + 1 < argc && argv[i + 1][0] != '-')
                return string(argv[i + 1]);

            return fallback;
        }

        if (arg.find(pattern) == 0)
        {
            return arg.substr(pattern.size());
        }
    }

    return fallback;
}

bool hasFlag(int argc, char *argv[], const char *flag)
{
    for (int i = 1; i < argc; i++)
    {
        if (strcmp(argv[i], flag) == 0)
            return true;
    }
    return false;
}

int main(int argc, char *argv[])
{
    data::init();
    helper::logInfo("PIJAK backend started.");

    if (argc < 2)
    {
        helper::logError("Command belum diberikan.");
        cout << "{\"ok\":false,\"error\":\"Command belum diberikan\"}" << endl;
        return 1;
    }

    string command = argv[1];

    if (hasFlag(argc, argv, "--debug"))
    {
        helper::logInfo("Debug mode aktif.");
        helper::logInfo("Command: " + command);
    }

    // HEALTH
    if (command == "health")
    {
        helper::logSuccess("Health check success.");
        cout << "{"
             << "\"ok\":true,"
             << "\"service\":\"pijak-backend\","
             << "\"mode\":\"local-csv\""
             << "}" << endl;
        return 0;
    }

    // AUTH
    if (command == "register")
    {
        data::loadAllUsers();
        data::buildAuthHashTable(); // Susun memori tabel hash dulu

        string email = getArgValue(argc, argv, "--email", "");
        string phone = getArgValue(argc, argv, "--phone", "");

        if (email == "" && phone == "")
        {
            cout << "{\"ok\":false,\"error\":\"Wajib isi email atau nomor telepon!\"}" << endl;
            return 1;
        }

        // 1. VALIDASI DUPLIKASI (O(1) Search via Hash Table)
        if (email != "" && data::findUserByAuthKey(email) != NULL)
        {
            cout << "{\"ok\":false,\"error\":\"Email sudah terdaftar! Gunakan email lain.\"}" << endl;
            return 1;
        }
        if (phone != "" && data::findUserByAuthKey(phone) != NULL)
        {
            cout << "{\"ok\":false,\"error\":\"Nomor telepon sudah terdaftar!\"}" << endl;
            return 1;
        }

        // 2. INSERT JIKA AMAN
        data::User u;
        helper::generateID('U', data::countUsers(), &u.id);
        u.name = getArgValue(argc, argv, "--name", "");
        u.email = email;
        u.phone = phone;
        u.password = getArgValue(argc, argv, "--password", "");
        u.role_title = getArgValue(argc, argv, "--role_title", "Kreator Baru");
        u.level = 1;
        u.xp = 0;
        u.stats_hours = 0;
        u.stats_co2 = 0;
        u.created_at = helper::nowText();
        u.next = NULL;

        if (data::addUser(u))
        {
            cout << "{\"ok\":true,\"data\":" << data::userToJson(u) << "}" << endl;
            return 0;
        }
        return 1;
    }

    if (command == "login")
    {
        data::loadAllUsers();
        data::buildAuthHashTable();

        string authKey = getArgValue(argc, argv, "--auth", ""); // Bisa diisi email atau hp
        string password = getArgValue(argc, argv, "--password", "");

        // Pencarian super cepat O(1)
        data::User *found = data::findUserByAuthKey(authKey);

        if (found != NULL)
        {
            if (found->password == password)
            {
                cout << "{\"ok\":true,\"data\":" << data::userToJson(*found) << "}" << endl;
                return 0;
            }
            else
            {
                cout << "{\"ok\":false,\"error\":\"Password salah!\"}" << endl;
                return 1;
            }
        }
        cout << "{\"ok\":false,\"error\":\"Akun tidak ditemukan!\"}" << endl;
        return 1;
    }

    if (command == "forgot-password")
    {
        data::loadAllUsers();
        data::buildAuthHashTable();

        string authKey = getArgValue(argc, argv, "--auth", "");
        string otp = getArgValue(argc, argv, "--otp", "");
        string newPassword = getArgValue(argc, argv, "--new_password", "");

        data::User *found = data::findUserByAuthKey(authKey);

        if (found == NULL)
        {
            cout << "{\"ok\":false,\"error\":\"Email/Telepon tidak terdaftar.\"}" << endl;
            return 1;
        }

        // TAHAP 1: Meminta OTP (User belum ngelempar argumen --otp)
        if (otp == "")
        {
            // Simulasi generate OTP. Nanti React akan nangkep "dummy_otp" ini
            // untuk dicocokkan dengan inputan user di layar.
            string dummyOTP = "123456";
            cout << "{\"ok\":true,\"message\":\"Kode OTP telah dikirim ke " << authKey << "\",\"dummy_otp\":\"" << dummyOTP << "\"}" << endl;
            return 0;
        }

        // TAHAP 2: Verifikasi OTP & Eksekusi Ganti Password
        if (otp != "123456")
        {
            cout << "{\"ok\":false,\"error\":\"Kode OTP yang dimasukkan salah!\"}" << endl;
            return 1;
        }

        if (newPassword == "")
        {
            cout << "{\"ok\":false,\"error\":\"Password baru tidak boleh kosong!\"}" << endl;
            return 1;
        }

        // Jika OTP benar, ubah memori password dan simpan ulang ke CSV
        found->password = newPassword;
        if (data::updateUser(*found))
        {
            cout << "{\"ok\":true,\"message\":\"Password berhasil direset! Silakan login dengan password baru.\"}" << endl;
            return 0;
        }

        cout << "{\"ok\":false,\"error\":\"Gagal menyimpan password baru ke database.\"}" << endl;
        return 1;
    }

    // USERS
    if (command == "list-users")
    {
        data::loadAllUsers();
        cout << "{"
             << "\"ok\":true,"
             << "\"data\":" << data::usersToJson()
             << "}" << endl;
        return 0;
    }

    if (command == "add-user")
    {
        data::loadAllUsers();

        data::User u;
        u.id = getArgValue(argc, argv, "--id", "");
        if (u.id == "")
            helper::generateID('U', data::countUsers(), &u.id);

        u.name = getArgValue(argc, argv, "--name", "");
        u.role_title = getArgValue(argc, argv, "--role_title", "");
        u.level = atoi(getArgValue(argc, argv, "--level", "1").c_str());
        u.xp = atoi(getArgValue(argc, argv, "--xp", "0").c_str());
        u.skills = getArgValue(argc, argv, "--skills", "");
        u.stats_hours = atoi(getArgValue(argc, argv, "--stats_hours", "0").c_str());
        u.stats_co2 = atoi(getArgValue(argc, argv, "--stats_co2", "0").c_str());
        u.created_at = helper::nowText();
        u.next = NULL;

        if (u.name == "")
        {
            helper::logError("Field --name wajib diisi.");
            cout << "{\"ok\":false,\"error\":\"Field --name wajib diisi\"}" << endl;
            return 1;
        }

        if (data::addUser(u))
        {
            helper::logSuccess("User berhasil ditambahkan.");
            cout << "{"
                 << "\"ok\":true,"
                 << "\"data\":" << data::userToJson(u)
                 << "}" << endl;
            return 0;
        }

        helper::logError("Gagal menambah user.");
        cout << "{\"ok\":false,\"error\":\"Gagal menambah user\"}" << endl;
        return 1;
    }

    if (command == "update-user")
    {
        data::loadAllUsers();

        string id = getArgValue(argc, argv, "--id", "");
        if (id == "")
        {
            helper::logError("Field --id wajib diisi.");
            cout << "{\"ok\":false,\"error\":\"Field --id wajib diisi\"}" << endl;
            return 1;
        }

        data::User *found = data::findUserById(id);
        if (found == NULL)
        {
            helper::logWarning("User tidak ditemukan.");
            cout << "{\"ok\":false,\"error\":\"User tidak ditemukan\"}" << endl;
            return 1;
        }

        data::User updated = *found;
        updated.name = getArgValue(argc, argv, "--name", updated.name);
        updated.role_title = getArgValue(argc, argv, "--role_title", updated.role_title);
        updated.skills = getArgValue(argc, argv, "--skills", updated.skills);
        updated.level = atoi(getArgValue(argc, argv, "--level", to_string(updated.level)).c_str());
        updated.xp = atoi(getArgValue(argc, argv, "--xp", to_string(updated.xp)).c_str());
        updated.stats_hours = atoi(getArgValue(argc, argv, "--stats_hours", to_string(updated.stats_hours)).c_str());
        updated.stats_co2 = atoi(getArgValue(argc, argv, "--stats_co2", to_string(updated.stats_co2)).c_str());

        if (data::updateUser(updated))
        {
            helper::logSuccess("User berhasil diupdate.");
            cout << "{"
                 << "\"ok\":true,"
                 << "\"data\":" << data::userToJson(updated)
                 << "}" << endl;
            return 0;
        }

        helper::logError("Gagal update user.");
        cout << "{\"ok\":false,\"error\":\"Gagal update user\"}" << endl;
        return 1;
    }

    if (command == "delete-user")
    {
        data::loadAllUsers();

        string id = getArgValue(argc, argv, "--id", "");
        if (id == "")
        {
            helper::logError("Field --id wajib diisi.");
            cout << "{\"ok\":false,\"error\":\"Field --id wajib diisi\"}" << endl;
            return 1;
        }

        if (data::deleteUser(id))
        {
            helper::logSuccess("User berhasil dihapus.");
            cout << "{"
                 << "\"ok\":true,"
                 << "\"message\":\"User berhasil dihapus\","
                 << "\"id\":" << helper::quote(id)
                 << "}" << endl;
            return 0;
        }

        helper::logWarning("User tidak ditemukan.");
        cout << "{\"ok\":false,\"error\":\"User tidak ditemukan\"}" << endl;
        return 1;
    }

    // OPPORTUNITIES
    if (command == "list-opportunities")
    {
        data::loadAllOpportunities();
        cout << "{"
             << "\"ok\":true,"
             << "\"data\":" << data::opportunitiesToJson()
             << "}" << endl;
        return 0;
    }

    if (command == "add-opportunity")
    {
        data::loadAllOpportunities();

        data::Opportunity o;
        o.id = getArgValue(argc, argv, "--id", "");
        if (o.id == "")
            helper::generateID('O', data::countOpportunities(), &o.id);

        o.creator_id = getArgValue(argc, argv, "--creator_id", "");
        o.title = getArgValue(argc, argv, "--title", "");
        o.type = getArgValue(argc, argv, "--type", "");
        o.category = getArgValue(argc, argv, "--category", "");
        o.location = getArgValue(argc, argv, "--location", "");
        o.reward = getArgValue(argc, argv, "--reward", "");
        o.deadline = getArgValue(argc, argv, "--deadline", "");
        o.status = getArgValue(argc, argv, "--status", "Open");
        o.created_at = helper::nowText();
        o.next = NULL;

        if (o.title == "" || o.type == "")
        {
            helper::logError("Field --title dan --type wajib diisi.");
            cout << "{\"ok\":false,\"error\":\"Field --title dan --type wajib diisi\"}" << endl;
            return 1;
        }

        if (data::addOpportunity(o))
        {
            helper::logSuccess("Opportunity berhasil ditambahkan.");
            cout << "{"
                 << "\"ok\":true,"
                 << "\"data\":" << data::opportunityToJson(o)
                 << "}" << endl;
            return 0;
        }

        helper::logError("Gagal menambah opportunity.");
        cout << "{\"ok\":false,\"error\":\"Gagal menambah opportunity\"}" << endl;
        return 1;
    }

    if (command == "update-opportunity")
    {
        data::loadAllOpportunities();

        string id = getArgValue(argc, argv, "--id", "");
        if (id == "")
        {
            helper::logError("Field --id wajib diisi.");
            cout << "{\"ok\":false,\"error\":\"Field --id wajib diisi\"}" << endl;
            return 1;
        }

        data::Opportunity *found = data::findOpportunityById(id);
        if (found == NULL)
        {
            helper::logWarning("Opportunity tidak ditemukan.");
            cout << "{\"ok\":false,\"error\":\"Opportunity tidak ditemukan\"}" << endl;
            return 1;
        }

        data::Opportunity updated = *found;
        updated.creator_id = getArgValue(argc, argv, "--creator_id", updated.creator_id);
        updated.title = getArgValue(argc, argv, "--title", updated.title);
        updated.type = getArgValue(argc, argv, "--type", updated.type);
        updated.category = getArgValue(argc, argv, "--category", updated.category);
        updated.location = getArgValue(argc, argv, "--location", updated.location);
        updated.reward = getArgValue(argc, argv, "--reward", updated.reward);
        updated.deadline = getArgValue(argc, argv, "--deadline", updated.deadline);
        updated.status = getArgValue(argc, argv, "--status", updated.status);

        if (data::updateOpportunity(updated))
        {
            helper::logSuccess("Opportunity berhasil diupdate.");
            cout << "{"
                 << "\"ok\":true,"
                 << "\"data\":" << data::opportunityToJson(updated)
                 << "}" << endl;
            return 0;
        }

        helper::logError("Gagal update opportunity.");
        cout << "{\"ok\":false,\"error\":\"Gagal update opportunity\"}" << endl;
        return 1;
    }

    if (command == "delete-opportunity")
    {
        data::loadAllOpportunities();

        string id = getArgValue(argc, argv, "--id", "");
        if (id == "")
        {
            helper::logError("Field --id wajib diisi.");
            cout << "{\"ok\":false,\"error\":\"Field --id wajib diisi\"}" << endl;
            return 1;
        }

        if (data::deleteOpportunity(id))
        {
            helper::logSuccess("Opportunity berhasil dihapus.");
            cout << "{"
                 << "\"ok\":true,"
                 << "\"message\":\"Opportunity berhasil dihapus\","
                 << "\"id\":" << helper::quote(id)
                 << "}" << endl;
            return 0;
        }

        helper::logWarning("Opportunity tidak ditemukan.");
        cout << "{\"ok\":false,\"error\":\"Opportunity tidak ditemukan\"}" << endl;
        return 1;
    }

    // PROPOSALS (QUEUE)
    if (command == "list-proposals")
    {
        data::loadAllProposals();
        cout << "{"
             << "\"ok\":true,"
             << "\"data\":" << data::proposalsToJson()
             << "}" << endl;
        return 0;
    }

    if (command == "add-proposal")
    {
        data::loadAllProposals();

        data::Proposal p;
        p.id = getArgValue(argc, argv, "--id", "");
        if (p.id == "")
            helper::generateID('P', data::countProposals(), &p.id);

        p.opportunity_id = getArgValue(argc, argv, "--opportunity_id", "");
        p.applicant_id = getArgValue(argc, argv, "--applicant_id", "");
        p.cover_letter = getArgValue(argc, argv, "--cover_letter", "");
        p.portfolio_url = getArgValue(argc, argv, "--portfolio_url", "");
        p.status = "Menunggu";
        p.created_at = helper::nowText();
        p.next = NULL;

        if (p.opportunity_id == "" || p.applicant_id == "")
        {
            helper::logError("Field --opportunity_id dan --applicant_id wajib diisi.");
            cout << "{\"ok\":false,\"error\":\"Field proposal wajib diisi\"}" << endl;
            return 1;
        }

        if (data::addProposal(p))
        {
            helper::logSuccess("Proposal masuk antrean.");
            cout << "{"
                 << "\"ok\":true,"
                 << "\"data\":" << data::proposalToJson(p)
                 << "}" << endl;
            return 0;
        }

        helper::logError("Gagal menambah proposal.");
        cout << "{\"ok\":false,\"error\":\"Gagal menambah proposal\"}" << endl;
        return 1;
    }

    if (command == "process-proposal")
    {
        data::loadAllProposals();
        data::loadAllWorkrooms();
        data::loadAllActivities();

        string action = getArgValue(argc, argv, "--action", "terima");
        string actorId = getArgValue(argc, argv, "--actor_id", "SYSTEM");

        data::Proposal *p = data::findFirstPendingProposal();
        if (p == NULL)
        {
            helper::logWarning("Proposal kosong atau tidak ada yang berstatus Menunggu.");
            cout << "{\"ok\":false,\"error\":\"Proposal kosong\"}" << endl;
            return 1;
        }

        if (action == "terima")
        {
            p->status = "Diterima";

            data::Workroom w;
            helper::generateID('W', data::countWorkrooms(), &w.id);
            w.opportunity_id = p->opportunity_id;
            w.progress_pct = 0;
            w.status = "Berjalan";
            w.created_at = helper::nowText();
            w.next = NULL;

            data::addWorkroom(w);
            data::pushActivity(actorId, "Proposal " + p->id + " diterima, workroom dibuat.");
        }
        else
        {
            p->status = "Ditolak";
            data::pushActivity(actorId, "Proposal " + p->id + " ditolak.");
        }

        data::saveAllProposals();

        helper::logSuccess("Proposal diproses.");
        cout << "{"
             << "\"ok\":true,"
             << "\"data\":" << data::proposalToJson(*p)
             << "}" << endl;
        return 0;
    }

    if (command == "update-proposal")
    {
        data::loadAllProposals();

        string id = getArgValue(argc, argv, "--id", "");
        if (id == "")
        {
            cout << "{\"ok\":false,\"error\":\"Field --id wajib diisi\"}" << endl;
            return 1;
        }

        data::Proposal *found = data::findProposalById(id);
        if (found == NULL)
        {
            cout << "{\"ok\":false,\"error\":\"Proposal tidak ditemukan\"}" << endl;
            return 1;
        }

        data::Proposal updated = *found;
        updated.opportunity_id = getArgValue(argc, argv, "--opportunity_id", updated.opportunity_id);
        updated.applicant_id = getArgValue(argc, argv, "--applicant_id", updated.applicant_id);
        updated.cover_letter = getArgValue(argc, argv, "--cover_letter", updated.cover_letter);
        updated.portfolio_url = getArgValue(argc, argv, "--portfolio_url", updated.portfolio_url);
        updated.status = getArgValue(argc, argv, "--status", updated.status);

        if (data::updateProposal(updated))
        {
            cout << "{\"ok\":true,\"data\":" << data::proposalToJson(updated) << "}" << endl;
            return 0;
        }

        cout << "{\"ok\":false,\"error\":\"Gagal update proposal\"}" << endl;
        return 1;
    }

    if (command == "delete-proposal")
    {
        data::loadAllProposals();

        string id = getArgValue(argc, argv, "--id", "");
        if (id == "")
        {
            cout << "{\"ok\":false,\"error\":\"Field --id wajib diisi\"}" << endl;
            return 1;
        }

        if (data::deleteProposal(id))
        {
            cout << "{\"ok\":true,\"message\":\"Proposal berhasil dihapus\",\"id\":" << helper::quote(id) << "}" << endl;
            return 0;
        }

        cout << "{\"ok\":false,\"error\":\"Proposal tidak ditemukan\"}" << endl;
        return 1;
    }
    
    // WORKROOMS
    if (command == "list-workrooms")
    {
        data::loadAllWorkrooms();
        cout << "{"
             << "\"ok\":true,"
             << "\"data\":" << data::workroomsToJson()
             << "}" << endl;
        return 0;
    }

    if (command == "add-workroom")
    {
        data::loadAllWorkrooms();

        data::Workroom w;
        w.id = getArgValue(argc, argv, "--id", "");
        if (w.id == "")
            helper::generateID('W', data::countWorkrooms(), &w.id);

        w.opportunity_id = getArgValue(argc, argv, "--opportunity_id", "");
        w.progress_pct = atoi(getArgValue(argc, argv, "--progress_pct", "0").c_str());
        w.status = getArgValue(argc, argv, "--status", "Berjalan");
        w.created_at = helper::nowText();
        w.next = NULL;

        if (w.opportunity_id == "")
        {
            helper::logError("Field --opportunity_id wajib diisi.");
            cout << "{\"ok\":false,\"error\":\"Field workroom wajib diisi\"}" << endl;
            return 1;
        }

        if (data::addWorkroom(w))
        {
            helper::logSuccess("Workroom berhasil ditambahkan.");
            cout << "{"
                 << "\"ok\":true,"
                 << "\"data\":" << data::workroomToJson(w)
                 << "}" << endl;
            return 0;
        }

        helper::logError("Gagal menambah workroom.");
        cout << "{\"ok\":false,\"error\":\"Gagal menambah workroom\"}" << endl;
        return 1;
    }

    if (command == "update-workroom")
    {
        data::loadAllWorkrooms();

        string id = getArgValue(argc, argv, "--id", "");
        if (id == "")
        {
            helper::logError("Field --id wajib diisi.");
            cout << "{\"ok\":false,\"error\":\"Field --id wajib diisi\"}" << endl;
            return 1;
        }

        data::Workroom *found = data::findWorkroomById(id);
        if (found == NULL)
        {
            helper::logWarning("Workroom tidak ditemukan.");
            cout << "{\"ok\":false,\"error\":\"Workroom tidak ditemukan\"}" << endl;
            return 1;
        }

        data::Workroom updated = *found;
        updated.opportunity_id = getArgValue(argc, argv, "--opportunity_id", updated.opportunity_id);
        updated.progress_pct = atoi(getArgValue(argc, argv, "--progress_pct", to_string(updated.progress_pct)).c_str());
        updated.status = getArgValue(argc, argv, "--status", updated.status);

        if (data::updateWorkroom(updated))
        {
            helper::logSuccess("Workroom berhasil diupdate.");
            cout << "{"
                 << "\"ok\":true,"
                 << "\"data\":" << data::workroomToJson(updated)
                 << "}" << endl;
            return 0;
        }

        helper::logError("Gagal update workroom.");
        cout << "{\"ok\":false,\"error\":\"Gagal update workroom\"}" << endl;
        return 1;
    }

    // TASKS
    if (command == "list-tasks")
    {
        data::loadAllTasks();
        cout << "{"
             << "\"ok\":true,"
             << "\"data\":" << data::tasksToJson()
             << "}" << endl;
        return 0;
    }

    if (command == "add-task")
    {
        data::loadAllTasks();

        data::Task t;
        t.id = getArgValue(argc, argv, "--id", "");
        if (t.id == "")
            helper::generateID('T', data::countTasks(), &t.id);

        t.workroom_id = getArgValue(argc, argv, "--workroom_id", "");
        t.title = getArgValue(argc, argv, "--title", "");
        t.status = getArgValue(argc, argv, "--status", "Belum Dimulai");
        t.assignee_id = getArgValue(argc, argv, "--assignee_id", "");
        t.created_at = helper::nowText();
        t.next = NULL;

        if (t.workroom_id == "" || t.title == "")
        {
            helper::logError("Field --workroom_id dan --title wajib diisi.");
            cout << "{\"ok\":false,\"error\":\"Field task wajib diisi\"}" << endl;
            return 1;
        }

        if (data::addTask(t))
        {
            helper::logSuccess("Task berhasil ditambahkan.");
            cout << "{"
                 << "\"ok\":true,"
                 << "\"data\":" << data::taskToJson(t)
                 << "}" << endl;
            return 0;
        }

        helper::logError("Gagal menambah task.");
        cout << "{\"ok\":false,\"error\":\"Gagal menambah task\"}" << endl;
        return 1;
    }

    if (command == "update-task")
    {
        data::loadAllTasks();

        string id = getArgValue(argc, argv, "--id", "");
        if (id == "")
        {
            helper::logError("Field --id wajib diisi.");
            cout << "{\"ok\":false,\"error\":\"Field --id wajib diisi\"}" << endl;
            return 1;
        }

        data::Task *found = data::findTaskById(id);
        if (found == NULL)
        {
            helper::logWarning("Task tidak ditemukan.");
            cout << "{\"ok\":false,\"error\":\"Task tidak ditemukan\"}" << endl;
            return 1;
        }

        data::Task updated = *found;
        updated.workroom_id = getArgValue(argc, argv, "--workroom_id", updated.workroom_id);
        updated.title = getArgValue(argc, argv, "--title", updated.title);
        updated.status = getArgValue(argc, argv, "--status", updated.status);
        updated.assignee_id = getArgValue(argc, argv, "--assignee_id", updated.assignee_id);

        if (data::updateTask(updated))
        {
            helper::logSuccess("Task berhasil diupdate.");
            cout << "{"
                 << "\"ok\":true,"
                 << "\"data\":" << data::taskToJson(updated)
                 << "}" << endl;
            return 0;
        }

        helper::logError("Gagal update task.");
        cout << "{\"ok\":false,\"error\":\"Gagal update task\"}" << endl;
        return 1;
    }

    if (command == "complete-task")
    {
        data::loadAllTasks();
        data::loadAllActivities();

        string id = getArgValue(argc, argv, "--id", "");
        string actorId = getArgValue(argc, argv, "--actor_id", "SYSTEM");

        if (id == "")
        {
            helper::logError("Field --id wajib diisi.");
            cout << "{\"ok\":false,\"error\":\"Field --id wajib diisi\"}" << endl;
            return 1;
        }

        data::Task *found = data::findTaskById(id);
        if (found == NULL)
        {
            helper::logWarning("Task tidak ditemukan.");
            cout << "{\"ok\":false,\"error\":\"Task tidak ditemukan\"}" << endl;
            return 1;
        }

        found->status = "Selesai";
        if (data::updateTask(*found))
        {
            data::pushActivity(actorId, "Task " + id + " selesai.");
            helper::logSuccess("Task selesai.");
            cout << "{"
                 << "\"ok\":true,"
                 << "\"data\":" << data::taskToJson(*found)
                 << "}" << endl;
            return 0;
        }

        helper::logError("Gagal menyelesaikan task.");
        cout << "{\"ok\":false,\"error\":\"Gagal menyelesaikan task\"}" << endl;
        return 1;
    }

    // STACK / ACTIVITY
    if (command == "list-activities")
    {
        data::loadAllActivities();
        cout << "{"
             << "\"ok\":true,"
             << "\"data\":" << data::activitiesToJson()
             << "}" << endl;
        return 0;
    }

    if (command == "show-activities")
    {
        data::loadAllActivities();
        cout << "{"
             << "\"ok\":true,"
             << "\"data\":" << data::activitiesToJson()
             << "}" << endl;
        return 0;
    }

    // SORTING
    if (command == "sort-opportunities")
    {
        data::loadAllOpportunities();
        data::sortOpportunitiesByReward();
        helper::logSuccess("Opportunity berhasil di-sort.");
        cout << "{"
             << "\"ok\":true,"
             << "\"data\":" << data::opportunitiesToJson()
             << "}" << endl;
        return 0;
    }

    // HASH TABLE
    if (command == "build-user-hash")
    {
        data::loadAllUsers();
        data::buildUserHashTable();
        helper::logSuccess("User hash table berhasil dibangun.");
        cout << "{\"ok\":true,\"message\":\"hash table siap\"}" << endl;
        return 0;
    }

    if (command == "search-user-hash")
    {
        data::loadAllUsers();
        data::buildUserHashTable();

        string id = getArgValue(argc, argv, "--id", "");
        if (id == "")
        {
            cout << "{\"ok\":false,\"error\":\"Field --id wajib diisi\"}" << endl;
            return 1;
        }

        data::User *found = data::findUserByHash(id);
        if (found == NULL)
        {
            cout << "{\"ok\":false,\"error\":\"User tidak ditemukan\"}" << endl;
            return 1;
        }

        cout << "{"
             << "\"ok\":true,"
             << "\"data\":" << data::userToJson(*found)
             << "}" << endl;
        return 0;
    }

    if (command == "build-auth-hash")
    {
        data::loadAllUsers();
        data::buildAuthHashTable();
        helper::logSuccess("Auth hash table berhasil dibangun.");
        cout << "{\"ok\":true,\"message\":\"auth hash siap\"}" << endl;
        return 0;
    }

    if (command == "search-user-auth")
    {
        data::loadAllUsers();
        data::buildAuthHashTable();

        string authKey = getArgValue(argc, argv, "--auth", "");
        if (authKey == "")
        {
            cout << "{\"ok\":false,\"error\":\"Field --auth wajib diisi\"}" << endl;
            return 1;
        }

        data::User *found = data::findUserByAuthKey(authKey);
        if (found == NULL)
        {
            cout << "{\"ok\":false,\"error\":\"User tidak ditemukan\"}" << endl;
            return 1;
        }

        cout << "{\"ok\":true,\"data\":" << data::userToJson(*found) << "}" << endl;
        return 0;
    }
   
    // BST
    if (command == "build-opportunity-tree")
    {
        data::loadAllOpportunities();
        data::buildOpportunityTree();
        helper::logSuccess("BST opportunity berhasil dibangun.");
        cout << "{\"ok\":true,\"message\":\"tree siap\"}" << endl;
        return 0;
    }


    if (command == "show-opportunity-tree")
    {
        data::loadAllOpportunities();
        data::buildOpportunityTree();
        cout << "{\"ok\":true,\"data\":" << data::opportunityTreeToJson(data::rootOpportunity) << "}" << endl;
        return 0;
    }

    if (command == "search-opportunity-tree")
    {
        data::loadAllOpportunities();
        data::buildOpportunityTree();

        string id = getArgValue(argc, argv, "--id", "");
        data::OpportunityTree *found = data::searchOpportunityTree(data::rootOpportunity, id);

        if (found == NULL)
        {
            cout << "{\"ok\":false,\"error\":\"Opportunity tidak ditemukan\"}" << endl;
            return 1;
        }

        cout << "{"
             << "\"ok\":true,"
             << "\"data\":" << data::opportunityToJson(found->data)
             << "}" << endl;
        return 0;
    }

    // GRAPH
    if (command == "build-graph")
    {
        data::loadAllUsers();
        data::buildGraphFromUsers();
        helper::logSuccess("Graph berhasil dibangun.");
        cout << "{\"ok\":true,\"message\":\"graph siap\"}" << endl;
        return 0;
    }

    if (command == "show-graph")
    {
        data::loadAllUsers();
        data::buildGraphFromUsers();
        cout << "{\"ok\":true,\"data\":" << data::graphToJson() << "}" << endl;
        return 0;
    }

    // PATCH
    if (command == "list-opportunities-by-creator")
    {
        data::loadAllOpportunities();
        string creatorId = getArgValue(argc, argv, "--creator_id", "");
        if (creatorId == "")
        {
            cout << "{\"ok\":false,\"error\":\"Field --creator_id wajib diisi\"}" << endl;
            return 1;
        }

        cout << "{\"ok\":true,\"data\":" << data::opportunitiesToJsonByCreator(creatorId) << "}" << endl;
        return 0;
    }

    if (command == "list-proposals-by-applicant")
    {
        data::loadAllProposals();
        string applicantId = getArgValue(argc, argv, "--applicant_id", "");
        if (applicantId == "")
        {
            cout << "{\"ok\":false,\"error\":\"Field --applicant_id wajib diisi\"}" << endl;
            return 1;
        }

        cout << "{\"ok\":true,\"data\":" << data::proposalsToJsonByApplicant(applicantId) << "}" << endl;
        return 0;
    }

    if (command == "list-proposals-by-opportunity")
    {
        data::loadAllProposals();
        string opportunityId = getArgValue(argc, argv, "--opportunity_id", "");
        if (opportunityId == "")
        {
            cout << "{\"ok\":false,\"error\":\"Field --opportunity_id wajib diisi\"}" << endl;
            return 1;
        }

        cout << "{\"ok\":true,\"data\":" << data::proposalsToJsonByOpportunity(opportunityId) << "}" << endl;
        return 0;
    }

    if (command == "list-workrooms-by-opportunity")
    {
        data::loadAllWorkrooms();
        string opportunityId = getArgValue(argc, argv, "--opportunity_id", "");
        if (opportunityId == "")
        {
            cout << "{\"ok\":false,\"error\":\"Field --opportunity_id wajib diisi\"}" << endl;
            return 1;
        }

        cout << "{\"ok\":true,\"data\":" << data::workroomsToJsonByOpportunity(opportunityId) << "}" << endl;
        return 0;
    }

    if (command == "list-tasks-by-workroom")
    {
        data::loadAllTasks();
        string workroomId = getArgValue(argc, argv, "--workroom_id", "");
        if (workroomId == "")
        {
            cout << "{\"ok\":false,\"error\":\"Field --workroom_id wajib diisi\"}" << endl;
            return 1;
        }

        cout << "{\"ok\":true,\"data\":" << data::tasksToJsonByWorkroom(workroomId) << "}" << endl;
        return 0;
    }

    if (command == "list-tasks-by-assignee")
    {
        data::loadAllTasks();
        string assigneeId = getArgValue(argc, argv, "--assignee_id", "");
        if (assigneeId == "")
        {
            cout << "{\"ok\":false,\"error\":\"Field --assignee_id wajib diisi\"}" << endl;
            return 1;
        }

        cout << "{\"ok\":true,\"data\":" << data::tasksToJsonByAssignee(assigneeId) << "}" << endl;
        return 0;
    }

    if (command == "list-activities-by-user")
    {
        data::loadAllActivities();
        string userId = getArgValue(argc, argv, "--user_id", "");
        if (userId == "")
        {
            cout << "{\"ok\":false,\"error\":\"Field --user_id wajib diisi\"}" << endl;
            return 1;
        }

        cout << "{\"ok\":true,\"data\":" << data::activitiesToJsonByUser(userId) << "}" << endl;
        return 0;
    }

    // GET DETAIL
    if (command == "get-user")
    {
        data::loadAllUsers();
        string id = getArgValue(argc, argv, "--id", "");
        if (id == "")
        {
            cout << "{\"ok\":false,\"error\":\"Field --id wajib diisi\"}" << endl;
            return 1;
        }

        data::User *found = data::findUserById(id);
        if (found == NULL)
        {
            cout << "{\"ok\":false,\"error\":\"User tidak ditemukan\"}" << endl;
            return 1;
        }

        cout << "{"
             << "\"ok\":true,"
             << "\"data\":" << data::userToJson(*found)
             << "}" << endl;
        return 0;
    }

    if (command == "get-opportunity")
    {
        data::loadAllOpportunities();
        string id = getArgValue(argc, argv, "--id", "");
        if (id == "")
        {
            cout << "{\"ok\":false,\"error\":\"Field --id wajib diisi\"}" << endl;
            return 1;
        }

        data::Opportunity *found = data::findOpportunityById(id);
        if (found == NULL)
        {
            cout << "{\"ok\":false,\"error\":\"Opportunity tidak ditemukan\"}" << endl;
            return 1;
        }

        cout << "{"
             << "\"ok\":true,"
             << "\"data\":" << data::opportunityToJson(*found)
             << "}" << endl;
        return 0;
    }

    if (command == "get-workroom")
    {
        data::loadAllWorkrooms();
        string id = getArgValue(argc, argv, "--id", "");
        if (id == "")
        {
            cout << "{\"ok\":false,\"error\":\"Field --id wajib diisi\"}" << endl;
            return 1;
        }

        data::Workroom *found = data::findWorkroomById(id);
        if (found == NULL)
        {
            cout << "{\"ok\":false,\"error\":\"Workroom tidak ditemukan\"}" << endl;
            return 1;
        }

        cout << "{"
             << "\"ok\":true,"
             << "\"data\":" << data::workroomToJson(*found)
             << "}" << endl;
        return 0;
    }

    if (command == "get-task")
    {
        data::loadAllTasks();
        string id = getArgValue(argc, argv, "--id", "");
        if (id == "")
        {
            cout << "{\"ok\":false,\"error\":\"Field --id wajib diisi\"}" << endl;
            return 1;
        }

        data::Task *found = data::findTaskById(id);
        if (found == NULL)
        {
            cout << "{\"ok\":false,\"error\":\"Task tidak ditemukan\"}" << endl;
            return 1;
        }

        cout << "{"
             << "\"ok\":true,"
             << "\"data\":" << data::taskToJson(*found)
             << "}" << endl;
        return 0;
    }

    if (command == "delete-workroom")
    {
        data::loadAllWorkrooms();
        string id = getArgValue(argc, argv, "--id", "");
        if (id == "")
        {
            cout << "{\"ok\":false,\"error\":\"Field --id wajib diisi\"}" << endl;
            return 1;
        }

        if (data::deleteWorkroom(id))
        {
            cout << "{"
                 << "\"ok\":true,"
                 << "\"message\":\"Workroom berhasil dihapus\","
                 << "\"id\":" << helper::quote(id)
                 << "}" << endl;
            return 0;
        }

        cout << "{\"ok\":false,\"error\":\"Workroom tidak ditemukan\"}" << endl;
        return 1;
    }

    if (command == "delete-task")
    {
        data::loadAllTasks();
        string id = getArgValue(argc, argv, "--id", "");
        if (id == "")
        {
            cout << "{\"ok\":false,\"error\":\"Field --id wajib diisi\"}" << endl;
            return 1;
        }

        if (data::deleteTask(id))
        {
            cout << "{"
                 << "\"ok\":true,"
                 << "\"message\":\"Task berhasil dihapus\","
                 << "\"id\":" << helper::quote(id)
                 << "}" << endl;
            return 0;
        }

        cout << "{\"ok\":false,\"error\":\"Task tidak ditemukan\"}" << endl;
        return 1;
    }

    helper::logWarning("Command tidak dikenal: " + command);
    cout << "{\"ok\":false,\"error\":\"Command tidak dikenal\"}" << endl;
    return 1;
}
