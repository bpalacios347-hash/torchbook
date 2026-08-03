# Build clean standard JSON bibles

$rawPath = "$PSScriptRoot\data\bibles\es_rvr1960_raw.json"
if (Test-Path $rawPath) {
    Write-Host "Processing RVR1960..."
    $rawBytes = [System.IO.File]::ReadAllBytes($rawPath)
    $utf8Text = [System.Text.Encoding]::UTF8.GetString($rawBytes)
    $rawObj = $utf8Text | ConvertFrom-Json
    $rawKeys = $rawObj.psobject.properties.Name

    # Standard order of 66 books in Spanish
    $canonicalBooks = @(
        @{ match = "g*nesis"; name = "Génesis"; abbr = "gn" },
        @{ match = "*xodo"; name = "Éxodo"; abbr = "ex" },
        @{ match = "lev*tico"; name = "Levítico"; abbr = "lv" },
        @{ match = "n*meros"; name = "Números"; abbr = "nm" },
        @{ match = "deuteronomio"; name = "Deuteronomio"; abbr = "dt" },
        @{ match = "josu*"; name = "Josué"; abbr = "jos" },
        @{ match = "jueces"; name = "Jueces"; abbr = "jue" },
        @{ match = "rut"; name = "Rut"; abbr = "rt" },
        @{ match = "1 samuel"; name = "1 Samuel"; abbr = "1s" },
        @{ match = "2 samuel"; name = "2 Samuel"; abbr = "2s" },
        @{ match = "1 reyes"; name = "1 Reyes"; abbr = "1r" },
        @{ match = "2 reyes"; name = "2 Reyes"; abbr = "2r" },
        @{ match = "1 cr*nicas"; name = "1 Crónicas"; abbr = "1cro" },
        @{ match = "2 cr*nicas"; name = "2 Crónicas"; abbr = "2cro" },
        @{ match = "esdras"; name = "Esdras"; abbr = "esd" },
        @{ match = "nehem*as"; name = "Nehemías"; abbr = "neh" },
        @{ match = "ester"; name = "Ester"; abbr = "est" },
        @{ match = "job"; name = "Job"; abbr = "job" },
        @{ match = "salmos"; name = "Salmos"; abbr = "sal" },
        @{ match = "proverbios"; name = "Proverbios"; abbr = "pr" },
        @{ match = "eclesiast*s"; name = "Eclesiastés"; abbr = "ec" },
        @{ match = "cantares"; name = "Cantares"; abbr = "cnt" },
        @{ match = "isa*as"; name = "Isaías"; abbr = "is" },
        @{ match = "jerem*as"; name = "Jeremías"; abbr = "jer" },
        @{ match = "lamentaciones"; name = "Lamentaciones"; abbr = "lm" },
        @{ match = "ezequiel"; name = "Ezequiel"; abbr = "ez" },
        @{ match = "daniel"; name = "Daniel"; abbr = "dn" },
        @{ match = "oseas"; name = "Oseas"; abbr = "os" },
        @{ match = "joel"; name = "Joel"; abbr = "jl" },
        @{ match = "am*s"; name = "Amós"; abbr = "am" },
        @{ match = "abd*as"; name = "Abdías"; abbr = "abd" },
        @{ match = "jon*s"; name = "Jonás"; abbr = "jon" },
        @{ match = "miqueas"; name = "Miqueas"; abbr = "miq" },
        @{ match = "nah*m"; name = "Nahúm"; abbr = "nah" },
        @{ match = "habacuc"; name = "Habacuc"; abbr = "hab" },
        @{ match = "sofon*as"; name = "Sofonías"; abbr = "sof" },
        @{ match = "hageo"; name = "Hageo"; abbr = "hag" },
        @{ match = "zacar*as"; name = "Zacarías"; abbr = "zac" },
        @{ match = "malaqu*as"; name = "Malaquías"; abbr = "mal" },
        @{ match = "s. mateo"; name = "Mateo"; abbr = "mt" },
        @{ match = "s. marcos"; name = "Marcos"; abbr = "mr" },
        @{ match = "s. lucas"; name = "Lucas"; abbr = "lc" },
        @{ match = "s.juan"; name = "Juan"; abbr = "jn" },
        @{ match = "hechos"; name = "Hechos"; abbr = "hch" },
        @{ match = "romanos"; name = "Romanos"; abbr = "ro" },
        @{ match = "1 corintios"; name = "1 Corintios"; abbr = "1co" },
        @{ match = "2 corintios"; name = "2 Corintios"; abbr = "2co" },
        @{ match = "g*latas"; name = "Gálatas"; abbr = "ga" },
        @{ match = "efesios"; name = "Efesios"; abbr = "ef" },
        @{ match = "filipenses"; name = "Filipenses"; abbr = "flp" },
        @{ match = "colosenses"; name = "Colosenses"; abbr = "col" },
        @{ match = "1 tesalonicenses"; name = "1 Tesalonicenses"; abbr = "1ts" },
        @{ match = "2 tesalonicenses"; name = "2 Tesalonicenses"; abbr = "2ts" },
        @{ match = "1 timoteo"; name = "1 Timoteo"; abbr = "1ti" },
        @{ match = "2 timoteo"; name = "2 Timoteo"; abbr = "2ti" },
        @{ match = "tito"; name = "Tito"; abbr = "tit" },
        @{ match = "filem*n"; name = "Filemón"; abbr = "flm" },
        @{ match = "hebreos"; name = "Hebreos"; abbr = "he" },
        @{ match = "santiago"; name = "Santiago"; abbr = "stg" },
        @{ match = "1 pedro"; name = "1 Pedro"; abbr = "1pe" },
        @{ match = "2 pedro"; name = "2 Pedro"; abbr = "2pe" },
        @{ match = "1 juan"; name = "1 Juan"; abbr = "1jn" },
        @{ match = "2 juan"; name = "2 Juan"; abbr = "2jn" },
        @{ match = "3 juan"; name = "3 Juan"; abbr = "3jn" },
        @{ match = "judas"; name = "Judas"; abbr = "jud" },
        @{ match = "apocalipsis"; name = "Apocalipsis"; abbr = "ap" }
    )

    $outputBooks = @()

    foreach ($spec in $canonicalBooks) {
        $foundKey = $null
        foreach ($rk in $rawKeys) {
            if ($rk -like $spec.match -or ($rk -replace "^s\. *", "") -like ($spec.match -replace "^s\. *", "")) {
                $foundKey = $rk
                break
            }
        }

        if ($foundKey) {
            $bookData = $rawObj.$foundKey
            $chaptersArray = @()
            $chapKeys = $bookData.psobject.properties.Name | Where-Object { $_ -match '^\d+$' } | Sort-Object { [int]$_ }

            foreach ($cKey in $chapKeys) {
                $chapObj = $bookData.$cKey
                $verseKeys = $chapObj.psobject.properties.Name | Where-Object { $_ -match '^\d+$' } | Sort-Object { [int]$_ }
                $versesArray = @()
                foreach ($vKey in $verseKeys) {
                    $vText = $chapObj.$vKey
                    
                    # Modernize archaic spellings
                    $vText = $vText -replace '\bcrió\b', 'creó'
                    $vText = $vText -replace '\bCrió\b', 'Creó'
                    $vText = $vText -replace '\bfué\b', 'fue'
                    $vText = $vText -replace '\bFué\b', 'Fue'
                    $vText = $vText -replace '\bdió\b', 'dio'
                    $vText = $vText -replace '\bDió\b', 'Dio'
                    $vText = $vText -replace '\bvío\b', 'vio'
                    $vText = $vText -replace '\bVío\b', 'Vio'

                    $versesArray += $vText
                }
                $chaptersArray += ,$versesArray
            }

            $outputBooks += @{
                abbrev = $spec.abbr
                book = $spec.name
                chapters = $chaptersArray
            }
        } else {
            Write-Host "WARNING: Missing key for "$spec.name
        }
    }

    Write-Host "Total output books processed: "$outputBooks.Count
    $jsonOut = $outputBooks | ConvertTo-Json -Depth 5
    [System.IO.File]::WriteAllText("$PSScriptRoot\data\bibles\es_rvr.json", $jsonOut, [System.Text.Encoding]::UTF8)
    Write-Host "es_rvr.json successfully generated!"
}
