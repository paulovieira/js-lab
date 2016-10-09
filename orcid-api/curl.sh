curl -H "Content-Type: application/orcid+json" -H "Authorization: Bearer a23c0852-5d99-4595-b801-101d761867de" "https://pub.orcid.org/v1.2/0000-0002-1663-6594/orcid-profile/"  > 0000-0002-1663-6594.json

curl -H "Content-Type: application/orcid+xml" -H "Authorization: Bearer a23c0852-5d99-4595-b801-101d761867de" "https://pub.orcid.org/v1.2/0000-0002-1663-6594/orcid-profile/"  > 0000-0002-1663-6594.xml

curl -H "Content-Type: text/html" -H "Authorization: Bearer a23c0852-5d99-4595-b801-101d761867de" "https://pub.orcid.org/v1.2/0000-0002-1663-6594/orcid-profile/"  > 0000-0002-1663-6594.html

nota: a versao em html nao funciona (o conteúdo vem em xml)