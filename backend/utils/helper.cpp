#include "helper.h"

#include <ctime>
#include <iostream>

using namespace std;

namespace helper
{
    void generateID(char prefix, int number, string *output)
    {
        int urut = number + 1;

        if (urut < 10)
            *output = string(1, prefix) + "0" + to_string(urut);
        else
            *output = string(1, prefix) + to_string(urut);
    }

    string nowText()
    {
        time_t now = time(NULL);
        tm *ltm = localtime(&now);

        char buffer[30];

        strftime(buffer, sizeof(buffer), "%Y-%m-%d %H:%M:%S", ltm);

        return string(buffer);
    }

    string escapeJson(string text)
    {
        string out = "";

        for (int i = 0; i < (int)text.size(); i++)
        {
            char c = text[i];

            if (c == '\\')
                out += "\\\\";
            else if (c == '"')
                out += "\\\"";
            else
                out += c;
        }

        return out;
    }

    string quote(string text)
    {
        return "\"" + escapeJson(text) + "\"";
    }

    void logInfo(string text)
    {
        cerr << "[INFO] " << text << endl;
    }

    void logSuccess(string text)
    {
        cerr << "[SUCCESS] " << text << endl;
    }

    void logWarning(string text)
    {
        cerr << "[WARNING] " << text << endl;
    }

    void logError(string text)
    {
        cerr << "[ERROR] " << text << endl;
    }
}