const { google } = require('googleapis')
const fs = require('fs')

const keys = {
    GOOGLE_CLIENT_ID: env,
    GOOGLE_CLIENT_SECRET: env
}

const redirect_uris = [
    "urn:ietf:wg:oauth:2.0:oob",
    "http://localhost"
]

const scopes = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/spreadsheets']

const TOKEN_PATH = 'credenciais.json'

const spreadsheetId = '1-J0BK9btE9HTLjblx3h2ahIN6g-_6pxjHDTre8yUkys'

let sheets, drive

function getAccessToken(oAuth2Client) {
    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: scopes,
    })
    console.log(authUrl)
}

function generateCredentials() {
    const oAuth2Client = new google.auth.OAuth2(keys.GOOGLE_CLIENT_ID, keys.GOOGLE_CLIENT_SECRET, redirect_uris[0])
    getAccessToken(oAuth2Client)
}

function login() {
    const oAuth2Client = new google.auth.OAuth2(keys.GOOGLE_CLIENT_ID, keys.GOOGLE_CLIENT_SECRET, redirect_uris[0])
    const token = fs.readFileSync(TOKEN_PATH)
    oAuth2Client.setCredentials(JSON.parse(token))
    sheets = google.sheets({ version: 'v4', auth: oAuth2Client })
    drive = google.drive({ version: 'v3', auth: oAuth2Client })
}


function createCredentialsWithOauthToken(authToken = '4/1AVHEtk65lu-kSKB2pTw2f-Qjbn-WG3T1Obj836n9-d4dZpJ8_jq-bUtaSHk') {
    const oAuth2Client = new google.auth.OAuth2(keys.GOOGLE_CLIENT_ID, keys.GOOGLE_CLIENT_SECRET, redirect_uris[0])
    oAuth2Client.getToken(authToken, (err, token) => {
        if (err) {
            return console.error('Error retrieving access token', err)
        }

        oAuth2Client.setCredentials(token)

        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) {
                return console.error(err)
            }

            console.log('Token stored to', TOKEN_PATH)
        })
    })
}

function listSpreadsheets() {
    login()
    drive.files.list({
        q: "mimeType='application/vnd.google-apps.spreadsheet'",
        fields: 'nextPageToken, files(id, name)',
    }, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            const files = res.data.files;
            if (files.length) {
                console.log('Planilhas:');
                files.map((file) => {
                    console.log(`${file.name} (${file.id})`);
                });
            } else {
                console.log('Nenhuma planilha encontrada.');
            }
        }
    });
}

function listSpreadsheetContent() {
    login()
    sheets.spreadsheets.values.get({
        spreadsheetId: spreadsheetId,
        range: 'Emprestimos', // Altere o nome da aba se necessário
    }, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            const rows = res.data.values;
            if (rows.length) {
                console.log('Conteúdo da planilha:');
                console.log(rows.length)
                rows.map((row) => {
                    console.log(row.join('\t'));
                });

            } else {
                console.log('Nenhum dado encontrado na planilha.');
            }
        }
    });
}

// Função para obter a última linha vazia da planilha
function getLastEmptyRow() {
    return new Promise((resolve, reject) => {
        sheets.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: 'Emprestimos', // Altere o nome da aba se necessário
        }, (err, res) => {
            if (err) {
                reject(err);
            } else {
                const rows = res.data.values;
                console.log(rows.length)
                
                resolve(rows.length);
            }
        });
    });
}

// Função para inserir o objeto na última linha vazia da planilha
async function insertObj() {
    login()

    const obj = {
        dataHoje: new Date().toLocaleDateString('pt-BR'),
        nome: 'Jean',
        valor: `R$${25.55}`,
        juros: `${3.00}%`,
        parcelas: 1,
        valorTotal: 1000,
        valorParcela: 25.55,
        parcelasPagas: 0,
        valorPago: `R$${25.55}`,
        restante: null  
    };


    let lastEmptyRow = await getLastEmptyRow();
    lastEmptyRow = lastEmptyRow +1
    const range = `Emprestimos!A${lastEmptyRow}:J${lastEmptyRow}`; // Altere o nome da aba e o número de colunas se necessário
    const values = [Object.values(obj)];
    sheets.spreadsheets.values.update({
        spreadsheetId: spreadsheetId,
        range: range,
        valueInputOption: 'USER_ENTERED',
        resource: {
            values: values
        }
    }, (err, res) => {
        if (err) {
            console.log(err);
        } else {
            console.log('Objeto inserido com sucesso na planilha!');
        }
    });
}

insertObj()