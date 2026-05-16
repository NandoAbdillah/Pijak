#include <emscripten/emscripten.h>

extern "C" {
    
    // Fungsi ini nanti bakal dipanggil sama React
    EMSCRIPTEN_KEEPALIVE
    const char* getDaftarPekerjaan() {
        // Nanti di tahap selanjutnya, data ini kamu ambil dari struktur Linked List atau BST buatanmu.
        // Format teksnya: ID,Judul Pekerjaan,Bayaran,Klien|ID,Judul,Bayaran,Klien
        // Tanda "|" sebagai pemisah antar pekerjaan, tanda "," pemisah antar detail.
        return "1,Desain Menu Cafe,Rp 50.000,UMKM Kopi|2,Admin Sosmed 1 Minggu,Rp 100.000,Toko Baju Lokal|3,Edit Video Reels,Rp 75.000,Event Organizer";
    }

}