import fs from 'fs';
import ora from 'ora';
import { prompt } from 'enquirer';
import { KeyStore } from 'ton';

export async function openKeystore() {
    let dir = fs.readdirSync('.');
    let keystores = dir.filter((v) => v.endsWith('.keystore'));
    if (keystores.length === 0) {
        ora().fail('No keystores found in current directory. Create a new one.');
        return null;
    }

    let res = await prompt<{ keystore: string }>([{
        type: 'select',
        name: 'keystore',
        message: 'Which keystore to use?',
        choices: keystores,
    }]);

    const store = await KeyStore.load(fs.readFileSync(res.keystore));
    // let p = await prompt<{ password: string }>([{
    //     type: 'password',
    //     name: 'password',
    //     message: 'Keystore password',
    //     validate: async (src) => {
    //         return await store.checkPassword(src);
    //     }
    // }]);
    // let password = p.password;
    return { store, name: res.keystore };
}