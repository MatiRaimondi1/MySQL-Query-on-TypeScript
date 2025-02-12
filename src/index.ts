import User from "./user";

async function main() {
    try {
        const users = await User.obtainAll();
        console.log(users);
    } catch (error) {
        console.error('Error: ', error);
    }
}

main();