# Script to fetch and format popular Spanish Bible versions for Torchbook
# Versions: NVI, NTV, LBLA, DHH, TLA, RVA2015

$versions = @(
    @{ id = "es_nvi"; name = "NVI_vid_128.json"; label = "Nueva Versión Internacional (NVI)" },
    @{ id = "es_ntv"; name = "NTV_vid_127.json"; label = "Nueva Traducción Viviente (NTV)" },
    @{ id = "es_lbla"; name = "LBLA_vid_89.json"; label = "La Biblia de las Américas (LBLA)" },
    @{ id = "es_dhh"; name = "DHH94I_vid_52.json"; label = "Dios Habla Hoy (DHH)" },
    @{ id = "es_tla"; name = "TLA_vid_176.json"; label = "Traducción en Lenguaje Actual (TLA)" },
    @{ id = "es_rva"; name = "RVA2015_vid_1782.json"; label = "Reina Valera Actualizada 2015 (RVA)" }
)

$baseUrl = "https://raw.githubusercontent.com/mrk214/bible-data-es-spa/main/data/es___spa___spa/"

# Ensure destination directory exists
if (-not (Test-Path "data/bibles")) {
    New-Item -ItemType Directory -Path "data/bibles" | Out-Null
}

foreach ($v in $versions) {
    Write-Host "Procesando $($v.label)..."
    $url = $baseUrl + $v.name
    $destFile = "data/bibles/$($v.id).json"

    try {
        $raw = Invoke-RestMethod -Uri $url -Headers @{ "User-Agent" = "TorchbookApp" }
        $outputBooks = @()

        foreach ($b in $raw.books) {
            $bookName = $b.name
            $chaptersArray = @()

            foreach ($c in $b.chapters) {
                $versesArray = @()
                $items = if ($c.items) { $c.items } else { $c.verses }

                if ($items) {
                    foreach ($vItem in $items) {
                        if ($vItem.type -eq "verse" -or -not $vItem.type) {
                            $t = ""
                            if ($vItem.lines) {
                                if ($vItem.lines -is [array]) {
                                    $t = $vItem.lines -join " "
                                } else {
                                    $t = $vItem.lines
                                }
                            } elseif ($vItem.text) {
                                $t = $vItem.text
                            }
                            $cleanText = ($t -replace '<[^>]+>', '').Trim()
                            if ($cleanText) {
                                $versesArray += $cleanText
                            }
                        }
                    }
                }

                $chaptersArray += ,$versesArray
            }

            $outputBooks += @{
                name = $bookName
                chapters = $chaptersArray
            }
        }

        $jsonStr = $outputBooks | ConvertTo-Json -Depth 10 -Compress
        [System.IO.File]::WriteAllText((Get-Item .).FullName + "/" + $destFile, $jsonStr, [System.Text.Encoding]::UTF8)
        
        $fileSize = (Get-Item $destFile).Length
        Write-Host "Guardado $destFile exitosamente con $($outputBooks.Count) libros. Tamaño: $fileSize bytes."
    } catch {
        Write-Error "Error al procesar $($v.label): $_"
    }
}
