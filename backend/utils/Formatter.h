#ifndef FORMATTER_H
#define FORMATTER_H

#include <string>
#include <sstream>

using namespace std;

// ============================================================================
// KELAS FORMATTER (Pembangun JSON Sederhana)
// ============================================================================
// Kenapa dipisah? 
// Parsing dan formatting string itu memakan banyak logika. Jika dicampur di 
// Service Layer, kodenya akan sangat berantakan (Spaghetti Code).
//
// Cara kerja: Fungsi-fungsi statis ini akan menerima data dari Struct (seperti User)
// lalu menyusunnya manual menjadi string berformat {"key": "value"}.
// ============================================================================

class Formatter {
public:
    // Fungsi untuk membersihkan karakter khusus agar tidak merusak format JSON
    // Contoh: Jika user menginput deskripsi "Halo "Dunia"", kutipnya harus di-escape.
    static string escapeJSON(const string& input) {
        stringstream ss;
        for (char c : input) {
            if (c == '"') {
                ss << "\\\""; // Menambahkan backslash sebelum kutip ganda
            } else if (c == '\\') {
                ss << "\\\\";
            } else if (c == '\n') {
                ss << "\\n";
            } else if (c == '\r') {
                ss << "\\r";
            } else if (c == '\t') {
                ss << "\\t";
            } else {
                ss << c;
            }
        }
        return ss.str();
    }

    // Fungsi untuk format tipe data STRING (pakai tanda kutip "")
    static string toJSONProperty(const string& key, const string& value, bool isLast = false) {
        stringstream ss;
        ss << "\"" << key << "\": \"" << escapeJSON(value) << "\"";
        if (!isLast) ss << ", ";
        return ss.str();
    }

    // Fungsi untuk format tipe data INTEGER (tanpa tanda kutip)
    static string toJSONProperty(const string& key, int value, bool isLast = false) {
        stringstream ss;
        ss << "\"" << key << "\": " << value;
        if (!isLast) ss << ", ";
        return ss.str();
    }

    // Fungsi tambahan untuk memformat array sederhana
    // (Nanti akan kita gunakan untuk mengubah Linked List menjadi JSON Array)
    static string wrapJSONArray(const string& arrayContent) {
        return "[\n" + arrayContent + "\n]";
    }

    static string wrapJSONObject(const string& objectContent) {
        return "{\n" + objectContent + "\n}";
    }
};

#endif // FORMATTER_H