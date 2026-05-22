#ifndef LOGGER_H
#define LOGGER_H

#include <iostream>
#include <string>

using namespace std;

// ============================================================================
// KELAS LOGGER (Sistem Log Pintar & Modular)
// ============================================================================
// Kenapa dipisah? 
// Agar semua pesan di terminal seragam, mudah dikontrol (bisa dimatikan 
// saat mode produksi/Next.js integration), dan tidak ada 'cout' berceceran.
// 
// Konsep: Header-only class dengan 'inline static' (Fitur C++17).
// Ini menghindari error multiple definition saat di-include di banyak file.
// ============================================================================

class Logger {
private:
    // State untuk mengontrol mode output terminal
    // Jika isSilent = true, maka info, success, warning tidak akan di-print.
    // Ini PENTING agar output terminal nanti murni JSON saat dipanggil Next.js.
    inline static bool isSilent = false;
    
    // Jika isDebug = true, maka log perjalanan struktur data (pointer tracking dll) akan muncul.
    inline static bool isDebug = false;

    // Kode ANSI untuk warna terminal
    inline static const string RESET   = "\033[0m";
    inline static const string RED     = "\033[31m";
    inline static const string GREEN   = "\033[32m";
    inline static const string YELLOW  = "\033[33m";
    inline static const string BLUE    = "\033[34m";
    inline static const string CYAN    = "\033[36m";

public:
    // --- KONFIGURASI MODE ---
    static void setSilentMode(bool silent) {
        isSilent = silent;
    }

    static void setDebugMode(bool debug) {
        isDebug = debug;
    }

    // --- FUNGSI PRINT LOG ---

    // Digunakan untuk informasi umum (cth: "Memulai sistem...")
    static void info(const string& message) {
        if (isSilent) return; 
        cout << BLUE << "[INFO] " << RESET << message << "\n";
    }

    // Digunakan saat operasi berhasil (cth: "Data CSV berhasil dimuat")
    static void success(const string& message) {
        if (isSilent) return;
        cout << GREEN << "[SUCCESS] " << RESET << message << "\n";
    }

    // Digunakan untuk peringatan (cth: "ID Duplicate ditemukan, dilewati")
    static void warning(const string& message) {
        if (isSilent) return;
        cout << YELLOW << "[WARNING] " << RESET << message << "\n";
    }

    // Digunakan untuk error fatal. Selalu di-print walau Silent Mode!
    static void error(const string& message) {
        // Error tetap dicetak ke cerr (standard error stream)
        cerr << RED << "[ERROR] " << RESET << message << "\n";
    }

    // Digunakan untuk melacak pergerakan Pointer, Rekursi, atau isi Memori.
    // Sangat penting untuk presentasi dosen dan belajar!
    static void debug(const string& message) {
        if (isSilent || !isDebug) return;
        cout << CYAN << "[DEBUG] " << RESET << message << "\n";
    }

    // Digunakan KHUSUS untuk output mesin (JSON) yang akan dibaca Next.js
    // Ini mengabaikan Silent Mode karena ini adalah hasil akhir algoritma.
    static void machineOutput(const string& jsonString) {
        cout << jsonString << "\n";
    }
};

#endif // LOGGER_H