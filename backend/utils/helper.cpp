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

    string csvEscape(const string &s)
    {
        string out = "\"";
        for (char c : s)
        {
            if (c == '"')
                out += "\"\"";
            else
                out += c;
        }
        out += "\"";
        return out;
    }

    string csvUnescape(const string &s)
    {
        if (s.size() >= 2 && s.front() == '"' && s.back() == '"')
        {
            string inner = s.substr(1, s.size() - 2);
            string out;
            for (size_t i = 0; i < inner.size(); i++)
            {
                if (inner[i] == '"' && i + 1 < inner.size() && inner[i + 1] == '"')
                {
                    out += '"';
                    i++;
                }
                else
                {
                    out += inner[i];
                }
            }
            return out;
        }
        return s;
    }

    int splitCSV(string line, string fields[], int maxFields)
    {
        int count = 0;
        string cur;
        bool inQuotes = false;

        for (size_t i = 0; i < line.size(); i++)
        {
            char c = line[i];

            if (c == '"')
            {
                if (inQuotes && i + 1 < line.size() && line[i + 1] == '"')
                {
                    cur += '"';
                    i++;
                }
                else
                {
                    inQuotes = !inQuotes;
                }
            }
            else if (c == ',' && !inQuotes && count < maxFields - 1)
            {
                fields[count++] = cur;
                cur.clear();
            }
            else
            {
                cur += c;
            }
        }

        fields[count++] = cur;
        return count;
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