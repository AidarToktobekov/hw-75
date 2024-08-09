import express from 'express';
import cors from 'cors';

function vigenereCipher(phrase: string, key: string, encrypt: boolean) {
    let keyArray: number[] = key.split('').map(c => findOffset(c));
    let letters: number[] = [];

    let c = 0;
    for (let i = 0; i < phrase.length; i++) {
        let charCode: number = phrase[i].charCodeAt(0);
        if (((97 <= charCode) && (charCode <= 122)) || ((65 <= charCode) && (charCode <= 90))) {
            letters.push(letterShift(phrase[i], keyArray[c % keyArray.length], encrypt));
            c++;
        } else {
            letters.push(charCode);
        }
    }

    return String.fromCharCode(...letters);
}

// Only shifting latin characters
function letterShift(letter: string, shift: number, forward: boolean) {
    shift = forward ? shift : -1 * shift;
    let charCode: number = letter.charCodeAt(0);
    if ((65 <= charCode) && (charCode <= 90)) {
        charCode = 65 + ((charCode + shift - 65 + 26) % 26);
    } else if ((97 <= charCode) && (charCode <= 122)) {
        charCode = 97 + ((charCode + shift - 97 + 26) % 26);
    }
    return charCode;
}

function findOffset(letter: string) {
    let charCode: number = letter.charCodeAt(0) - 65;
    charCode = (charCode > 32) ? charCode - 32 : charCode;
    return charCode % 26;
}


const app = express();
const port = 8800;

app.use(cors());
app.get('/encode/:phrase/:key', (req, res) => {
    const phrase: string = req.params.phrase;
    const key: string = req.params.key;

    const result: string = vigenereCipher(phrase, key, false);
    res.send(result);
});

app.get('/decode/:phrase/:key', (req, res) => {
    const phrase: string = req.params.phrase;
    const key: string = req.params.key;

    const result: string = vigenereCipher(phrase, key, true);
    res.send(result);
});

app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
});

