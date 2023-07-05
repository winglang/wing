import Conf from "conf";
import { consola } from "consola";
import c from "chalk";
import inquirer from "inquirer";


export const legalConsent = async (): Promise<boolean> => {
    if(getLegalConsent()) {
        return true;
    }
    process.stdout.write('\n')
    consola.info(`To access ${c.green('Wing Console')}, please take a moment to review our 'Terms and Conditions' by visiting\n
     ${c.cyan.underline('https://github.com/winglang/wing/blob/main/apps/wing-console/LICENSE.md')}.\n
     Once you have thoroughly read and understood the terms, kindly confirm your acceptance.\n`);

    const { accept } = await inquirer.prompt({
        type: 'accept',
        name: 'accept',
        message: 'Type "accept" to continue',
    });
    process.stdout.write('\n')

    if (accept === 'accept') {
        setLegalConsent(true);
        return true
    }
    return false;
}

const getLegalConsent = (): boolean => {
    const conf = new Conf({
        projectName: "@wingconsole/app",
    });

    let legalConsent = conf.get("legalConsent") as boolean | undefined;

    return !!legalConsent;
};

const setLegalConsent = (legalConsent: boolean): void => {
    const conf = new Conf({
        projectName: "@wingconsole/app",
    });

    conf.set("legalConsent", legalConsent);
}
