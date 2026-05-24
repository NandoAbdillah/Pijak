# ====================================================================
# PIJAK DATABASE SEEDER & COMMAND VERIFIER
# - Hapus database lama
# - Compile ulang backend
# - Jalankan semua command
# - Tandai PASS / EXPECTED_FAIL / ANOMALY
# ====================================================================

$ErrorActionPreference = "Stop"

$Root = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $Root

$Exe = Join-Path $Root "pijak.exe"
$LogFile = Join-Path $Root "seeder-results.log"
$CsvFile = Join-Path $Root "seeder-results.csv"

if (Test-Path $LogFile) { Remove-Item $LogFile -Force }
if (Test-Path $CsvFile) { Remove-Item $CsvFile -Force }

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host "  PIJAK DATABASE SEEDER & VERIFIER   " -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan

Write-Host "`n[1] Membersihkan database lama..." -ForegroundColor Yellow
if (Test-Path ".\database") {
    Remove-Item -Path ".\database\*.csv" -ErrorAction SilentlyContinue
}
Write-Host "Database bersih." -ForegroundColor Green

Write-Host "`n[2] Compile ulang C++..." -ForegroundColor Yellow
& g++ main.cpp data.cpp utils/helper.cpp -o pijak.exe
if ($LASTEXITCODE -ne 0) {
    Write-Host "Compile gagal." -ForegroundColor Red
    exit 1
}
Write-Host "Compile berhasil." -ForegroundColor Green

function Invoke-PijakCase {
    param(
        [Parameter(Mandatory=$true)][string]$Name,
        [Parameter(Mandatory=$true)][string[]]$Args,
        [ValidateSet("PASS","FAIL","ANY")][string]$Expect = "ANY"
    )

    $stdout = & $Exe @Args 2>&1 | Out-String
    $exit = $LASTEXITCODE

    $okMatch = $stdout -match '"ok"\s*:\s*true'
    $failMatch = $stdout -match '"ok"\s*:\s*false'

    $status = "ANOMALY"
    if ($exit -eq 0 -and $okMatch) {
        $status = "PASS"
    }
    elseif ($failMatch) {
        if ($Expect -eq "FAIL") { $status = "EXPECTED_FAIL" }
        else { $status = "FAIL" }
    }

    if ($Expect -eq "PASS" -and $status -ne "PASS") {
        $status = "ANOMALY"
    }

    $entry = [PSCustomObject]@{
        Name   = $Name
        Expect = $Expect
        Exit   = $exit
        Status = $status
        Output = ($stdout -replace "`r","" -replace "`n"," | ").Trim()
        Args   = ($Args -join " ")
    }

    $entry | Export-Csv -Path $CsvFile -NoTypeInformation -Append
    Add-Content -Path $LogFile -Value ("[" + (Get-Date).ToString("yyyy-MM-dd HH:mm:ss") + "] " + $Name + " => " + $status + " | exit=" + $exit + "`n" + $stdout + "`n---")

    if ($status -eq "PASS") {
        Write-Host ("[PASS] " + $Name) -ForegroundColor Green
    }
    elseif ($status -eq "EXPECTED_FAIL") {
        Write-Host ("[FAIL] " + $Name + " (sesuai ekspektasi)") -ForegroundColor DarkYellow
    }
    else {
        Write-Host ("[ANOMALY] " + $Name) -ForegroundColor Red
        Write-Host $stdout -ForegroundColor DarkGray
    }

    return $entry
}

$results = @()

Write-Host "`n[3] Seeding Users..." -ForegroundColor Yellow
$results += Invoke-PijakCase -Name "health" -Args @("health") -Expect "PASS"

$results += Invoke-PijakCase -Name "register U01 Raka" -Args @(
    "register","--name","Raka Mahendra","--email","raka@pijak.com","--phone","08123001","--password","123","--role_title","Kreator Muda"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "register U02 Ayu" -Args @(
    "register","--name","Ayu Lestari","--email","ayu@pijak.com","--phone","08123002","--password","123","--role_title","Kreator Muda"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "register U03 Jonan" -Args @(
    "register","--name","Jonan","--email","jonan@pijak.com","--phone","08123003","--password","123","--role_title","Programmer Muda"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "register U04 Nando" -Args @(
    "register","--name","Nando","--email","nando@pijak.com","--phone","08123004","--password","123","--role_title","Kreator Muda"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "register duplicate email" -Args @(
    "register","--name","Duplikat","--email","raka@pijak.com","--phone","08123999","--password","123"
) -Expect "FAIL"

$results += Invoke-PijakCase -Name "register missing email and phone" -Args @(
    "register","--name","Tanpa Kontak","--password","123"
) -Expect "FAIL"

$results += Invoke-PijakCase -Name "list-users" -Args @("list-users") -Expect "PASS"
$results += Invoke-PijakCase -Name "get-user U02" -Args @("get-user","--id","U02") -Expect "PASS"
$results += Invoke-PijakCase -Name "update-user U03" -Args @(
    "update-user","--id","U03","--name","Jonan Update","--skills","C++","--level","2","--xp","50","--stats_hours","10","--stats_co2","3"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "delete-user temp U99" -Args @(
    "add-user","--id","U99","--name","Temp User","--role_title","Tester"
) -Expect "PASS"
$results += Invoke-PijakCase -Name "delete-user U99" -Args @("delete-user","--id","U99") -Expect "PASS"

$results += Invoke-PijakCase -Name "login success" -Args @(
    "login","--auth","raka@pijak.com","--password","123"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "login wrong password" -Args @(
    "login","--auth","raka@pijak.com","--password","salah"
) -Expect "FAIL"

$results += Invoke-PijakCase -Name "forgot-password request" -Args @(
    "forgot-password","--auth","raka@pijak.com"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "forgot-password wrong otp" -Args @(
    "forgot-password","--auth","raka@pijak.com","--otp","000000","--new_password","baru123"
) -Expect "FAIL"

$results += Invoke-PijakCase -Name "forgot-password reset success" -Args @(
    "forgot-password","--auth","raka@pijak.com","--otp","123456","--new_password","baru123"
) -Expect "PASS"

Write-Host "`n[4] Seeding Opportunities..." -ForegroundColor Yellow
$results += Invoke-PijakCase -Name "list-opportunities" -Args @("list-opportunities") -Expect "PASS"
$results += Invoke-PijakCase -Name "add-opportunity O01" -Args @(
    "add-opportunity","--creator_id","U01","--title","Desain Logo","--type","Freelance","--reward","Rp500000"
) -Expect "PASS"
$results += Invoke-PijakCase -Name "add-opportunity O02" -Args @(
    "add-opportunity","--creator_id","U02","--title","Bikin Web Desa","--type","Freelance","--reward","Rp1500000"
) -Expect "PASS"
$results += Invoke-PijakCase -Name "add-opportunity O03" -Args @(
    "add-opportunity","--creator_id","U02","--title","Bantu Ngajar","--type","Volunteer","--reward","Rp0"
) -Expect "PASS"
$results += Invoke-PijakCase -Name "add-opportunity O04" -Args @(
    "add-opportunity","--creator_id","U04","--title","Cuci Ompreng MBG","--type","Volunteer","--category","lingkungan","--location","Online","--reward","Rp0","--deadline","2026-05-31"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "add-opportunity missing type" -Args @(
    "add-opportunity","--creator_id","U01","--title","Error Opportunity","--reward","Rp0"
) -Expect "FAIL"

$results += Invoke-PijakCase -Name "list-opportunities-by-creator U02" -Args @(
    "list-opportunities-by-creator","--creator_id","U02"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "get-opportunity O04" -Args @(
    "get-opportunity","--id","O04"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "update-opportunity O04" -Args @(
    "update-opportunity","--id","O04","--status","Open","--location","Surabaya"
) -Expect "PASS"

Write-Host "`n[5] Seeding Proposals..." -ForegroundColor Yellow
$results += Invoke-PijakCase -Name "list-proposals" -Args @("list-proposals") -Expect "PASS"

$results += Invoke-PijakCase -Name "add-proposal P01" -Args @(
    "add-proposal","--opportunity_id","O01","--applicant_id","U04","--cover_letter","Saya jago desain bang","--portfolio_url","http://portfolio.local/u04"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "add-proposal P02" -Args @(
    "add-proposal","--opportunity_id","O02","--applicant_id","U04","--cover_letter","Siap bangun web desa","--portfolio_url","http://portfolio.local/u04"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "add-proposal P03" -Args @(
    "add-proposal","--opportunity_id","O04","--applicant_id","U03","--cover_letter","Saya siap bantu","--portfolio_url","http://portfolio.local/u03"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "add-proposal missing applicant" -Args @(
    "add-proposal","--opportunity_id","O01","--cover_letter","Error"
) -Expect "FAIL"

$results += Invoke-PijakCase -Name "update-proposal P02" -Args @(
    "update-proposal","--id","P02","--status","Ditinjau","--cover_letter","Update cover letter"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "delete-proposal temp P99" -Args @(
    "add-proposal","--id","P99","--opportunity_id","O03","--applicant_id","U01","--cover_letter","Temp delete"
) -Expect "PASS"
$results += Invoke-PijakCase -Name "delete-proposal P99" -Args @(
    "delete-proposal","--id","P99"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "list-proposals-by-applicant U04" -Args @(
    "list-proposals-by-applicant","--applicant_id","U04"
) -Expect "PASS"
$results += Invoke-PijakCase -Name "list-proposals-by-opportunity O01" -Args @(
    "list-proposals-by-opportunity","--opportunity_id","O01"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "process-proposal terima" -Args @(
    "process-proposal","--action","terima","--actor_id","U02"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "process-proposal tolak" -Args @(
    "process-proposal","--action","tolak","--actor_id","U02"
) -Expect "PASS"

Write-Host "`n[6] Seeding Workrooms..." -ForegroundColor Yellow
$results += Invoke-PijakCase -Name "list-workrooms" -Args @("list-workrooms") -Expect "PASS"

$results += Invoke-PijakCase -Name "add-workroom temp W99" -Args @(
    "add-workroom","--id","W99","--opportunity_id","O04","--progress_pct","5","--status","Berjalan"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "update-workroom W99" -Args @(
    "update-workroom","--id","W99","--progress_pct","25","--status","Berjalan"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "delete-workroom W99" -Args @(
    "delete-workroom","--id","W99"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "list-workrooms-by-opportunity O01" -Args @(
    "list-workrooms-by-opportunity","--opportunity_id","O01"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "get-workroom W01" -Args @(
    "get-workroom","--id","W01"
) -Expect "PASS"

Write-Host "`n[7] Seeding Tasks..." -ForegroundColor Yellow
$results += Invoke-PijakCase -Name "list-tasks" -Args @("list-tasks") -Expect "PASS"

$results += Invoke-PijakCase -Name "add-task T01" -Args @(
    "add-task","--workroom_id","W01","--title","Bikin Sketsa Kasar","--assignee_id","U03","--status","Belum Dimulai"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "add-task temp T99" -Args @(
    "add-task","--id","T99","--workroom_id","W01","--title","Temp Task","--assignee_id","U04"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "update-task T01" -Args @(
    "update-task","--id","T01","--title","Bikin Sketsa Final","--status","Proses","--assignee_id","U03"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "complete-task T01" -Args @(
    "complete-task","--id","T01","--actor_id","U03"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "delete-task T99" -Args @(
    "delete-task","--id","T99"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "list-tasks-by-workroom W01" -Args @(
    "list-tasks-by-workroom","--workroom_id","W01"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "list-tasks-by-assignee U03" -Args @(
    "list-tasks-by-assignee","--assignee_id","U03"
) -Expect "PASS"

$results += Invoke-PijakCase -Name "get-task T01" -Args @(
    "get-task","--id","T01"
) -Expect "PASS"

Write-Host "`n[8] Stack / Activities..." -ForegroundColor Yellow
$results += Invoke-PijakCase -Name "list-activities" -Args @("list-activities") -Expect "PASS"
$results += Invoke-PijakCase -Name "list-activities-by-user U04" -Args @("list-activities-by-user","--user_id","U04") -Expect "PASS"
$results += Invoke-PijakCase -Name "show-activities" -Args @("show-activities") -Expect "PASS"

Write-Host "`n[9] Sorting / Hash / Tree / Graph..." -ForegroundColor Yellow
$results += Invoke-PijakCase -Name "sort-opportunities" -Args @("sort-opportunities") -Expect "PASS"
$results += Invoke-PijakCase -Name "build-user-hash" -Args @("build-user-hash") -Expect "PASS"
$results += Invoke-PijakCase -Name "search-user-hash U03" -Args @("search-user-hash","--id","U03") -Expect "PASS"
$results += Invoke-PijakCase -Name "build-auth-hash" -Args @("build-auth-hash") -Expect "PASS"
$results += Invoke-PijakCase -Name "search-user-auth email" -Args @("search-user-auth","--auth","raka@pijak.com") -Expect "PASS"
$results += Invoke-PijakCase -Name "build-opportunity-tree" -Args @("build-opportunity-tree") -Expect "PASS"
$results += Invoke-PijakCase -Name "show-opportunity-tree" -Args @("show-opportunity-tree") -Expect "PASS"
$results += Invoke-PijakCase -Name "search-opportunity-tree O04" -Args @("search-opportunity-tree","--id","O04") -Expect "PASS"
$results += Invoke-PijakCase -Name "build-graph" -Args @("build-graph") -Expect "PASS"
$results += Invoke-PijakCase -Name "show-graph" -Args @("show-graph") -Expect "PASS"

Write-Host "`n=====================================" -ForegroundColor Green
Write-Host " SEEDING DAN VERIFIKASI SELESAI      " -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Green
Write-Host ("Log: " + $LogFile) -ForegroundColor Cyan
Write-Host ("CSV: " + $CsvFile) -ForegroundColor Cyan