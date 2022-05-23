import { readFile } from "fs";

async function readJSON(path: string) {
    const rawData = readFile(path, (err: NodeJS.ErrnoException | null, data: Buffer) => {
        if (err) {
            throw err;
        }
        console.log(data);
    });
    const json = JSON.parse(rawData as unknown as string);
    return json;
}

export default readJSON;