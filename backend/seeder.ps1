# ====================================================================
# PIJAK DATABASE SEEDER & REFRESHER
# Script ini akan menghapus database lama, meng-compile ulang C++, 
# dan menyuntikkan data dummy awal (Seeding) secara otomatis.
# ====================================================================

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  PIJAK DATABASE SEEDER & REFRESHER  " -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

# 1. REFRESH DATABASE (Hapus semua CSV lama)
Write-Host "`n[1] Membersihkan database lama..." -ForegroundColor Yellow
Remove-Item -Path ".\database\*.csv" -ErrorAction SilentlyContinue
Write-Host "Database bersih!" -ForegroundColor Green

# 2. COMPILE C++
Write-Host "`n[2] Compile ulang C++..." -ForegroundColor Yellow
g++ main.cpp data.cpp utils/helper.cpp -o pijak.exe
Write-Host "Compile berhasil!" -ForegroundColor Green

# 3. SEEDING USERS (Menggunakan logika Register yang baru)
Write-Host "`n[3] Seeding Users (Register)..." -ForegroundColor Yellow
.\pijak.exe register --name "Raka Mahendra" --email "raka@pijak.com" --phone "08123001" --password "123" --role_title "Kreator Muda"
.\pijak.exe register --name "Ayu Lestari" --email "ayu@pijak.com" --phone "08123002" --password "123" --role_title "Kreator Muda"
.\pijak.exe register --name "Jonan" --email "jonan@pijak.com" --phone "08123003" --password "123" --role_title "Programmer Muda"

# 4. SEEDING OPPORTUNITIES
Write-Host "`n[4] Seeding Peluang (Opportunities)..." -ForegroundColor Yellow
.\pijak.exe add-opportunity --creator_id "U01" --title "Desain Logo" --type "Freelance" --reward "Rp500000"
.\pijak.exe add-opportunity --creator_id "U02" --title "Bikin Web Desa" --type "Freelance" --reward "Rp1500000"
.\pijak.exe add-opportunity --creator_id "U02" --title "Bantu Ngajar" --type "Volunteer" --reward "Rp0"

# 5. SEEDING PROPOSAL
Write-Host "`n[5] Mendaftarkan Proposal Lamaran..." -ForegroundColor Yellow
# Jonan (U03) melamar ke proyek Desain Logo (O01)
.\pijak.exe add-proposal --opportunity_id "O01" --applicant_id "U03" --cover_letter "Saya jago desain bang"

# 6. PROCESS PROPOSAL
Write-Host "`n[6] Memproses Lamaran (Otomatis Bikin Workroom)..." -ForegroundColor Yellow
.\pijak.exe process-proposal --action terima

# 7. ADD TASK
Write-Host "`n[7] Menambahkan Tugas ke Workroom..." -ForegroundColor Yellow
.\pijak.exe add-task --workroom_id "W01" --title "Bikin Sketsa Kasar" --assignee_id "U03"

# 8. TESTING: GRAPH
Write-Host "`n[8] Test Logika: Menampilkan Graph Network Raka (U01)..." -ForegroundColor Magenta
.\pijak.exe show-graph --start "U01"

# 9. TESTING: STACK ACTIVITY
Write-Host "`n[9] Test Logika: Menampilkan Stack Aktivitas..." -ForegroundColor Magenta
.\pijak.exe show-activities

Write-Host "`n=====================================" -ForegroundColor Green
Write-Host " SEEDING SELESAI! APLIKASI SIAP PAKE " -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green


# Register 1: .\pijak.exe register --name "Raka" --email "raka@pijak.com" --password "123" (Bakal Sukses)
# Register 2: .\pijak.exe register --name "Impostor" --email "raka@pijak.com" --password "abc" (Bakal Gagal: "Email sudah terdaftar!")
# Login Sukses: .\pijak.exe login --auth "raka@pijak.com" --password "123"
# Lupa Password: .\pijak.exe forgot-password --auth "raka@pijak.com"
