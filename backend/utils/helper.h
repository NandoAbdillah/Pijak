#ifndef HELPER_H
#define HELPER_H

#include <string>

using namespace std;

namespace helper
{
    void generateID(char prefix, int number, string *output);

    string nowText();

    string escapeJson(string text);

    string quote(string text);
    string csvEscape(const string &s);
    string csvUnescape(const string &s);
    int splitCSV(string line, string fields[], int maxFields);

    void logInfo(string text);

    void logSuccess(string text);

    void logWarning(string text);

    void logError(string text);
}

#endif