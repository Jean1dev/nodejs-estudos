const { google } = require('googleapis');
const auth = require('./credenciais.json');

// Autenticação com as credenciais de API
const authClient = new google.auth.JWT(
    auth.client_email,
    null,
    auth.private_key,
    ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/spreadsheets'],
    null
);

// Criação do objeto de cliente
const sheets = google.sheets({ version: 'v4', auth: authClient });
const drive = google.drive({ version: 'v3', auth: authClient });

// Criação da planilha
sheets.spreadsheets.create({
    resource: {
        properties: {
            title: 'Nova planilha'
        }
    }
}, (err, spreadsheet) => {
    if (err) {
        console.log(err);
    } else {
        console.log(`Planilha criada com sucesso! ID: ${spreadsheet.data.spreadsheetId}`);
        listSpreadsheets();
    }
});

// Função para listar as planilhas
function listSpreadsheets() {
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
